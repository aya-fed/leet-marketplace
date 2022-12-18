import { useNavigate, useParams } from "react-router";
import { useFetchOneItem } from "../hooks/useFetchOneItem";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import InputField from "../components/form/InputField";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function CheckOut() {
  const params = useParams();
  const navigate = useNavigate();
  const itemId = params.itemId;
  const { item, sellerInfo, isLoading } = useFetchOneItem(itemId);

  const [isPickup, setIsPickup] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  function onChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    if (currentStep === 3) {
      setShowSpinner(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setShowSpinner(false);
      }, 1000);
    }
  }, [currentStep]);

  // show spinner while loading
  if (isLoading || showSpinner) {
    return <LoadingSpinner />;
  }

  const postage = !item.postage || item.postage === "" ? 0 : parseFloat(item.postage);

  return (
    <div className="w-[90%] mx-auto">
      {(currentStep === 1 || currentStep === 2) && <h3 className="text-neutral-light mb-6">Check Out</h3>}
      <div className="md:flex md:gap-8 lg:gap-12">
        {(currentStep === 1 || currentStep === 2) && (
          <div className="w-full md:w-1/2 h-fit p-4 rounded-[10px] flex gap-4 mb-7 bg-background-4 ">
            <div className="w-20 h-20 md:w-[160px] md:h-[160px] rounded-[10px] overflow-hidden bg-background-3 shrink-0">
              <img className="w-full h-full object-cover" src={item.imageUrls[0]} />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="line-clamp-2">{item.title}</div>
                <div className="text-primary">${item.price.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}
        {/* Step 1 ----------------------------------------------------------------------------------------- */}
        {currentStep === 1 && (
          <div className="w-full md:w-1/2 md:-mt-8">
            <div>
              <InputField
                id="name"
                value={formData.name}
                label="Recipient Name"
                labelClassName="text-sm"
                placeholder="Enter recipient name..."
                stacked
                required
                onChange={onChange}
              />
              <InputField
                id="address"
                value={formData.address}
                label="Shipping Address"
                labelClassName="text-sm"
                placeholder="Enter shipping address..."
                stacked
                required
                onChange={onChange}
              />
            </div>
            <div className="mt-10 grid grid-flow-row gap-5 text-neutral ">
              <div className="flex justify-between gap-4">
                <div>{item.title}</div>
                <div>${item.price.toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping </div>
                <div>${postage.toFixed(2)}</div>
              </div>
              <hr className="border-neutral" />
              <div className="flex justify-between font-medium text-xl">
                <div className="text-white">Total:</div>
                <div className="text-primary">${(item.price + postage).toFixed(2)}</div>
              </div>
              <div className="mt-10 flex gap-4">
                <Button className="text-neutral-light border-neutral-light" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button onClick={() => setCurrentStep(prev => prev + 1)}>Next</Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 ----------------------------------------------------------------------------------------- */}
        {currentStep === 2 && (
          <div className="w-full md:w-1/2 text-neutral-light">
            <div>
              <h4 className="mb-3">Shipping Address</h4>
              <div>{formData.name}</div>
              <div>{formData.address}</div>
            </div>
            <hr className="mt-8 border-neutral" />
            <div className="mt-10 grid grid-flow-row">
              <div className="flex justify-between">
                <h4>Payment method</h4>
                <div className="flex items-center gap-2">
                  <div className="w-14 h-7 flex justify-center items-center bg-neutral-light rounded-2xl p-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/800px-Visa_2021.svg.png?20210725080425"
                      alt="Visa 2021 SVG"
                      className="object-contain"
                    />
                  </div>
                  <div className="w-14 h-7 flex justify-center items-center bg-neutral-light rounded-2xl py-0 px-[14px]">
                    <img
                      alt="File:Mastercard-logo.svg"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/772px-Mastercard-logo.svg.png?20210817144358"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <div>
                <InputField
                  id="nameOnCard"
                  value="Firstname Lastname"
                  label="Name on Card"
                  labelClassName="text-xs"
                  placeholder="Enter name on card..."
                  stacked
                  onChange={() => {}}
                />
                <div className="md:-mt-6 md:grid md:grid-cols-[3fr_2fr] gap-2">
                  <InputField
                    id="cardNumber"
                    value="1234-5678-9012-3456"
                    label="Card Number"
                    labelClassName="text-xs"
                    placeholder="Enter shipping address..."
                    stacked
                    onChange={() => {}}
                  />
                  <div className="-mt-6 w-40 flex items-end gap-2 md:mt-[unset] md:w-[unset]">
                    <InputField
                      id="expiryDate"
                      value="01/24"
                      label="Expiry Date"
                      labelClassName="text-xs whitespace-nowrap"
                      className="px-3 text-center"
                      placeholder="MM/YY"
                      stacked
                      onChange={() => {}}
                    />
                    <InputField
                      id="cvv"
                      value="XXX"
                      label=""
                      labelClassName="text-xs"
                      className="px-3 text-center"
                      placeholder="CVV"
                      stacked
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex gap-4">
                <Button
                  className="text-neutral-light border-neutral-light"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                >
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(prev => prev + 1)}>Next</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step 3 ----------------------------------------------------------------------------------------- */}
      {currentStep === 3 && (
        <div className="flex justify-center items-center text-neutral-light text-center">
          <div className="flex flex-wrap flex-col items-center gap-8">
            <BsFillCheckCircleFill className="text-primary" size={147} />
            <div className="flex flex-wrap flex-col items-center gap-5">
              <div>Thank you for your purchase!</div>
              <div className="-mt-3 text-sm font-light">Order #5504</div>
              <hr className="w-full border-neutral" />
              <div>The seller will contact you to arrange delivery / pickup.</div>
              <Button onClick={() => navigate("/")}>Continue shopping</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
