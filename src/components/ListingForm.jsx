// Coded by Aya Saito

import { useEffect, useRef, useState, useContext } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp, getDoc, doc, updateDoc, addDoc, collection, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { useHref, useLocation, useNavigate, useParams } from "react-router";
import { FaTrash } from "react-icons/fa";

import { db } from "../firebaseConfig";
import itemCategories from "../data/categories";
import AuthContext from "../context/AuthContext";
import { useHandleListing } from "../hooks/useHandleListing";

import SelectDropdown from "./form/SelectDropdown";
import Checkbox from "./form/Checkbox";
import InputField from "./form/InputField";
import Select from "./form/SelectDropdown";
import Textarea from "./form/Textarea";
import Button from "./ui/Button";
import Modal from "./Modal";
import PopupAuthForm from "./PopupAuthForm";
import PopupDeleteConfirmation from "./PopupDeleteConfirmation";

export default function ListingForm({ className }) {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [isNewListing, setIsNewListing] = useState(true);
  const [listing, setListing] = useState(null);
  const [itemId, setItemId] = useState();
  const auth = getAuth();
  const formRef = useRef();

  const { createListing, updateListing, deleteListing } = useHandleListing();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const categories = itemCategories;
  const [imageUrls, setImageUrls] = useState();
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    images: {},
    title: "",
    category: "",
    metadata: {},
    condition: "",
    description: "",
    price: "",
    pickup: false,
    pickupSuburb: "",
    postage: "",
  });
  const { images, title, category, metadata, condition, description, price, pickup, pickupSuburb, postage } = formData;
  const [categoryMeta, setCategoryMeta] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // ----------------------------------------------------------------------------
  // Mode - Create new  or Edit existing
  // ----------------------------------------------------------------------------
  // Is it Edit listing? Check path and if edit-listing fetch data
  useEffect(() => {
    if (location.pathname.indexOf("/edit-listing") > -1) {
      setIsNewListing(false);
      setItemId(params.itemId);
    }
  }, [params.itemId]);

  // Check if the listing exists and belongs to the user
  useEffect(() => {
    if (!isNewListing && itemId) {
      const docRef = doc(db, "listings", itemId);
      getItemData(docRef);
      async function getItemData(docRef) {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setListing(data);
          if (auth.currentUser && auth.currentUser.uid === data.seller) {
            setFormData({ ...data });
            setImageUrls(data.imageUrls);
          } else {
            navigate("/");
            toast.error("You can't edit this listing");
          }
        }
      }
    }
  }, [itemId, auth]);

  // If it's editing and user is not logged in, show error and navigate to home page
  useEffect(() => {
    if (listing && !isLoggedIn) {
      navigate("/");
      toast.error("You can't edit this listing");
    }
  }, [listing]);
  // ----------------------------------------------------------------------------
  // onChange - update formData state
  // ----------------------------------------------------------------------------
  useEffect(() => {
    const isImageValid = imageValidation();
  }, [images]);

  function onChange(e) {
    // images
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: e.target.files,
      }));
    } else {
      // other
      setFormData(prev => ({
        ...prev,
        [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
    }
  }
  function onSelectChange(id, e) {
    setFormData(prev => ({
      ...prev,
      [id]: e.value,
    }));
  }

  // ----------------------------------------------------------------------------
  // metadata - display category specific fields
  // ----------------------------------------------------------------------------
  useEffect(() => {
    if (category && category !== "Other") {
      // Identify which category group it's under
      const categoryGroup = itemCategories.filter(catGroup => catGroup.options.some(cat => cat.value === category))[0]
        .options;
      const metadata = categoryGroup.filter(cat => cat.value === category)[0].metadata;
      setCategoryMeta(metadata);
      console.log(metadata);
    } else {
      setCategoryMeta(null);
    }
  }, [category]);

  // ----------------------------------------------------------------------------
  // metadata onChange - update formData state (metadata array)
  // ----------------------------------------------------------------------------

  function onMetaChange(metaName, e) {
    metadata[metaName] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      metadata,
    }));
  }

  function onMetaSelectChange(metaName, e) {
    metadata[metaName] = e.value;
    console.log(metadata);
    setFormData(prev => ({
      ...prev,
      metadata,
    }));
  }

  // ----------------------------------------------------------------------------
  // onSubmit - field validation -> image validation -> upload image -> ad data to db
  // ----------------------------------------------------------------------------
  async function onSubmit(e) {
    setSubmit(true);
    ////// loading spinner
    e.preventDefault();
    // if not authenticated, show login popup
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      // validation - title, category, condition, description, price, postage
      if (!isFormValid) {
        toast.error("Please fill in all the required fields");
      } else if (images !== undefined && images.length > 0) {
        // validation - images: max number of images, file type, max file size
        const isImageValid = imageValidation();
        // upload images to firebase storage
        if (isImageValid) {
          const imgUrls = await Promise.all([...images].map(image => storeImage(image)))
            .then(urls => {
              setImageUrls(urls);
            })
            .catch(error => {
              console.log(error);
              return error;
            });
        }
      } else if (isNewListing) {
        setImageUrls([]);
      } else {
        saveToDb();
      }
    }
  }

  // ----------------------------------------------------------------------------
  // function to store image into Firebase Storage
  // ----------------------------------------------------------------------------
  async function storeImage(image) {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const filename = `${auth.currentUser.uid}--${uuidv4()}-${image.name}`;
      const storageRef = ref(storage, "images/" + filename);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress === 0) {
            toast.info(`Uploading ${image.name}...`, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        error => {
          toast.error(image.name + " upload failed");
          reject(error);
        },
        () => {
          // toast.info(`${image.name} - Upload Completed`, {
          //   position: toast.POSITION.TOP_RIGHT,
          // });
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  // ----------------------------------------------------------------------------
  // Input validation - check if required fields are filled
  // ----------------------------------------------------------------------------
  function onBlur(e) {
    //
    inputValidation(e);
  }

  function inputValidation(e) {
    const targetId = e.target.id;
    if (targetId.indexOf("react-select") > -1) {
      //
    } else if (e.target.required && !e.target.value) {
      setIsFormValid(false);
      findTargetElement(formRef.current.children, e.target.id, false);
    } else {
      setIsFormValid(true);
      findTargetElement(formRef.current.children, e.target.id, true);
    }
  }

  // ----------------------------------------------------------------------------
  // Image validation - checking the number of images, file type & the file size
  // ----------------------------------------------------------------------------
  function imageValidation() {
    if (images !== undefined) {
      let isImageValid = true;
      // exceeds max number
      if (images.length > 5) {
        toast.error("The maximum number of images is 5");
        isImageValid = false;
      } else {
        Array.from(images).forEach(image => {
          // file type - .webp .jpg .jpeg .png
          const type = image.type;
          if (type !== "image/webp" && type !== "image/jpg" && type !== "image/jpeg" && type !== "image/png") {
            toast.error(`Incorrect file format: ${image.name}`);
            isImageValid = false;
            return false;
          }
          // file size - max 2MB (also set in Firebase storage rules as well)
          if (image.size > 2 * 1024 * 1024) {
            // exceeds max size
            toast.error(`${image.name} exceeds the maximum size limit (2MB)`);
            isImageValid = false;
            return false;
          }
        });
      }
      if (!isImageValid) {
        findTargetElement(formRef.current.children, "images", false);
        return false;
      } else {
        findTargetElement(formRef.current.children, "images", true);
        return true;
      }
    }
  }
  // ----------------------------------------------------------------------------
  // Validation invalid- change bg if invalid
  // ----------------------------------------------------------------------------
  function findTargetElement(children, idName, state) {
    [...children].forEach(child => {
      if (child.id === idName) {
        console.log(state);
        if (state === false) {
          child.style.borderColor = "#EA4335";
        } else {
          child.removeAttribute("style");
        }
        return child;
      } else if (child.children) {
        findTargetElement(child.children, idName, state);
      }
      return;
    });
  }

  // ----------------------------------------------------------------------------
  // Save to db
  // ----------------------------------------------------------------------------
  useEffect(() => {
    if (submit) {
      saveToDb();
    }
    // console.log("imageUrls", imageUrls);
  }, [imageUrls]);

  async function saveToDb() {
    // data prep
    let formDataCopy = {
      ...formData,
      price: parseFloat(price), // change type from string to number
      postage: parseFloat(price), // change type from string to number
      imageUrls,
    };
    // delete unnecessary data
    delete formDataCopy.images;

    // New listing - add listing to "listings" collection
    if (isNewListing) {
      // data prep
      formDataCopy = {
        ...formDataCopy,
        timestamp: serverTimestamp(),
        wishlistCount: 0, // will be used for popularity sort
        seller: auth.currentUser.uid, // add seller uid
      };
      console.log(formDataCopy);
      ////// loading spinner
      const docRef = await addDoc(collection(db, "listings"), formDataCopy)
        .then(docRef => {
          ////// loading spinner
          setFormData({
            images: {},
            title: "",
            category: "",
            metadata: {},
            condition: "",
            description: "",
            price: "",
            pickup: false,
            pickupSuburb: "",
            postage: "",
          });
          navigate(`/item-detail/${docRef.id}`);
          toast.success(`created a new listing`);
        })
        .catch(error => {
          toast.error(`Error - Listing has not been created`);
          console.log(error);
        });
    } else {
      // Edit listing - update listing in "listings" collection
      // data prep
      formDataCopy = {
        ...formDataCopy,
        updatedTimestamp: serverTimestamp(), // add updated timestamp
      };
      console.log(formDataCopy);
      const docRef = doc(db, "listings", itemId);
      ////// loading spinner
      await updateDoc(docRef, formDataCopy)
        .then(() => {
          ////// loading spinner
          toast.success(`Listing has been updated`);
          navigate(`/item-detail/${itemId}`);
        })
        .catch(error => {
          toast.error(`Error - Listing has not been updated"}`);
          console.log(error);
        });
    }
  }

  return (
    <div className={className}>
      <form ref={formRef} onSubmit={onSubmit} className="flex flex-col">
        <InputField
          id="images"
          label="Images"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          multiple
          onChange={onChange}
        />
        <div className="sm:grid items-start sm:grid-cols-[1fr_minmax(0,_2fr)]">
          <div></div>
          <p className="text-xs -mt-4">Max 5 images</p>
        </div>

        <InputField
          id="title"
          value={title}
          label="Title"
          placeholder="Listing title"
          onChange={onChange}
          onBlur={onBlur}
          required={true}
        />

        <Select
          id="category"
          value={{ value: category, label: category }}
          label="Category"
          labelClassName="text-white"
          placeholder="Select category"
          options={categories}
          onChange={e => onSelectChange("category", e)}
          onBlur={onBlur}
          required
        />

        {/* Meta data - category specific ----------------------------- */}
        <div className="flex flex-col">
          {categoryMeta &&
            categoryMeta.map((meta, index) => {
              switch (meta.type) {
                case "select":
                  return (
                    <SelectDropdown
                      value={{ value: metadata[meta.name], label: metadata[meta.name] }}
                      label={meta.name}
                      key={index}
                      placeholder="Select..."
                      options={meta.options}
                      closeMenuOnSelect={true}
                      onChange={e => onMetaSelectChange(meta.name, e)}
                    />
                  );
                  break;
                case "checkbox":
                  return (
                    <Checkbox
                      key={index}
                      label={meta.name}
                      reverse
                      checked={false}
                      onChange={e => onMetaChange(meta.name, e)}
                    />
                  );
                  break;
                case "inputNumber":
                  return;
                  break;
              }
            })}
        </div>

        <hr className="my-10 border-background-4" />

        <Select
          id="condition"
          value={{ value: condition, label: condition }}
          label="Condition"
          labelClassName="text-white"
          placeholder="Select item condition"
          options={[
            "Brand new",
            "Opened - never used",
            "Used, like new",
            "Used, good",
            "Used, ok",
            "As-is or not working",
          ]}
          onChange={e => onSelectChange("condition", e)}
          onBlur={onBlur}
          required
        />

        <Textarea
          id="description"
          value={description}
          label="Description"
          placeholder="Listing Description"
          className="h-60"
          onChange={onChange}
          onBlur={onBlur}
          required
        />

        <hr className="my-10 border border-background-4" />

        <InputField
          id="price"
          value={price}
          label="Price"
          placeholder="0"
          currency="$"
          type="number"
          min="1"
          onChange={onChange}
          onBlur={onBlur}
          required
        />

        <Checkbox id="pickup" checked={pickup} label="Allow pick-up" reverse onChange={onChange} />
        {pickup && (
          <>
            <InputField id="pickupSuburb" value={pickupSuburb} label="Pick up location" onChange={onChange} />
            <div className="sm:grid items-start sm:grid-cols-[1fr_minmax(0,_2fr)]">
              <div></div>
              <p className="text-xs -mt-4">Enter town or suburb</p>
            </div>
          </>
        )}

        <InputField
          id="postage"
          value={postage}
          label="Postage"
          placeholder="0"
          currency="$"
          type="number"
          min="0"
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        <div className="sm:grid items-start sm:grid-cols-[1fr_minmax(0,_2fr)]">
          <div></div>
          <p className="text-xs -mt-4">Enter 0 for free shipping</p>
        </div>
      </form>

      <hr className="my-10 border border-background-4" />

      <div className="flex justify-center items-center gap-4">
        <Button className="border-neutral-light text-neutral-light mt-6 w-1/2" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button className="mt-6 w-1/2" onClick={onSubmit} disabled={!isFormValid ? true : false}>
          {`${isNewListing ? "Create" : "Update"} Listing`}
        </Button>
      </div>
      {!isNewListing && (
        <Button className="mt-8 border-neutral-light text-neutral-light" onClick={() => setIsDeleteModalOpen(true)}>
          <FaTrash size={13} />
          Delete this listing
        </Button>
      )}

      {/* lazy login - show Authform modal popup ----------------------------- */}
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <PopupAuthForm
            onSubmit={() => {
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}

      {/* Delete confirmation modal popup ----------------------------- */}
      {isDeleteModalOpen && (
        <Modal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <PopupDeleteConfirmation
            onClose={() => setIsDeleteModalOpen(false)}
            onSubmit={() => {
              setIsDeleteModalOpen(false);
              deleteListing(itemId);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
