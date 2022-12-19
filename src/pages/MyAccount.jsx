// Coded by Aya Saito

import { useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { db } from "../firebaseConfig";

import AuthContext from "../context/AuthContext";
import AccountContext from "../context/AccountContext";

import AccountMenu from "../components/AccountMenu";
import MyAccountInput from "../components/form/MyAccountInput";
import { PlaceholderProfilePic } from "../components/ui/PlaceholderProfilePic";
import EditIcon from "../components/ui/EditIcon";
import Button from "../components/ui/Button";
import MyAccountTextArea from "../components/form/MyAccountTextArea";

export default function MyAccount() {
  const [userData, setUserData] = useState(null);
  const { isLoggedIn, userId } = useContext(AuthContext);
  const { accountData, setAccountData } = useContext(AccountContext);

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditBankAccount, setIsEditBankAccount] = useState(false);
  const [isEditAccount, setIsEditAccount] = useState(false);
  const [profileFormData, setProfileFormData] = useState(null);
  const [balanceFormData, setBalanceFormData] = useState(null);
  const [accountFormData, setAccountFormData] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    if (accountData.name) {
      resetProfileFormData();
      resetBalanceFormData();
      resetAccountFormData();
    }
  }, [accountData]);

  function resetProfileFormData() {
    setIsEditProfile(false);
    setProfileFormData({
      name: accountData.name,
      location: accountData.location ? accountData.location : "-",
      profilePic: accountData.profilePic ?? "",
    });
  }
  function resetBalanceFormData() {
    setIsEditBankAccount(false);
    setBalanceFormData({
      accountBalance: accountData.account && accountData.account.balance ? accountData.account.balance : 0,
      bankAccount: accountData.account && accountData.account.bankAccount ? accountData.account.bankAccount : "-",
    });
  }
  function resetAccountFormData() {
    setIsEditAccount(false);
    setAccountFormData({
      email: accountData.email,
      recipientName: accountData.account && accountData.account.recipientName ? accountData.account.recipientName : "-",
      address: accountData.account && accountData.account.address ? accountData.account.address : "-",
    });
  }

  console.log(accountData);
  function onChange(e, callback) {
    callback(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    const docRef = doc(db, "users", userId);
    const privateRef = doc(db, "users", userId, "account", "account");
    const data = { ...profileFormData, ...balanceFormData, ...accountFormData };
    let isAuthDiff = false;
    let isDocDiff = false;
    let isPrivateDiff = false;
    Object.keys(data).forEach(key => {
      if (data[key] !== accountData[key]) {
        if (key === "name" || key === "email") {
          isAuthDiff = true;
        }
        if (key === "name" || key === "email" || key === "location" || key === "profilePic") {
          isDocDiff = true;
        } else {
          isPrivateDiff = true;
        }
      }
    });
    // update firebase auth
    if (isAuthDiff) {
      await updateProfile(auth.currentUser, {
        displayName: data.name,
      }).catch(error => {
        console.log(error);
        //
      });
      await updateEmail(auth.currentUser, data.email).catch(error => {
        console.log(error);
        //
      });
    }

    // update user doc
    if (isDocDiff) {
      const userDoc = await getDoc(docRef);
      const prevData = userDoc.data();
      const newData = {
        ...prevData,
        name: data.name,
        email: data.email,
        location: data.location,
        profilePic: data.profilePic,
      };
      await setDoc(docRef, newData).catch(error => {
        console.log(error);
      });
      setAccountData(prev => ({
        ...prev,
        name: data.name,
        email: data.email,
        location: data.location,
        profilePic: data.profilePic,
      }));
    }
    // update subcollection (private) - bank account, address etc
    if (isPrivateDiff) {
      const userDoc = await getDoc(privateRef);
      const prevData = userDoc.data();
      const newData = {
        ...prevData,
        bankAccount: data.bankAccount,
        recipientName: data.recipientName,
        address: data.address,
      };
      await setDoc(privateRef, newData).catch(error => {
        console.log(error);
      });
      setAccountData(prev => ({
        ...prev,
        account: {
          bankAccount: data.bankAccount,
          recipientName: data.recipientName,
          address: data.address,
        },
      }));
    }
  }

  return (
    <div className="w-full h-full mx-auto md:w-[90%] md:max-w-[1200px] md:flex md:justify-center md:gap-10 md:px-10">
      <AccountMenu />
      <div className="w-[85%] mx-auto md:w-full">
        {accountData && profileFormData && (
          <div className="w-full lg:grid lg:grid-cols-2 gap-20">
            <div>
              {/* Profile ---------------------------------------------------------------*/}
              <div className="relative">
                <EditIcon
                  className={`absolute top-2 right-0 text-primary ${isEditProfile && "hidden"}`}
                  showText
                  onClick={() => setIsEditProfile(true)}
                />
                <Button
                  className={`absolute top-0 right-24 h-4 w-20 text-sm border-neutral-light text-neutral-light  ${
                    !isEditProfile && "hidden"
                  }`}
                  onClick={resetProfileFormData}
                >
                  Cancel
                </Button>
                <Button
                  className={`absolute top-0 right-0 h-4 w-20 text-sm bg-primary text-background-1 font-semibold ${
                    !isEditProfile && "hidden"
                  }`}
                  onClick={() => onSubmit()}
                >
                  Save
                </Button>
                <h3 className="mb-6 text-neutral-light">Profile</h3>
                <div className="flex gap-3 items-center lg:flex-wrap lg:justify-center">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 shrink-0">
                    {profileFormData.profilePic ? (
                      <img src={profileFormData.profilePic} className="object-cover w-full h-full rounded-[64px]" />
                    ) : (
                      <PlaceholderProfilePic className="w-full h-full text-neutral" />
                    )}
                  </div>
                  {/* show file uploader in edit more */}
                  {isEditProfile && <div></div>}
                  <div className="w-full">
                    <MyAccountInput
                      id="name"
                      label="Display Name"
                      placeholder={isEditProfile ? "Enter Display Name..." : ""}
                      value={profileFormData.name}
                      disabled={isEditProfile ? false : true}
                      onChange={e => onChange(e, setProfileFormData)}
                    />
                    <MyAccountInput
                      id="location"
                      label="Location"
                      placeholder={isEditProfile ? "Enter suburb..." : ""}
                      value={isEditProfile && profileFormData.location === "-" ? "" : profileFormData.location}
                      disabled={isEditProfile ? false : true}
                      onChange={e => onChange(e, setProfileFormData)}
                    />
                  </div>
                </div>
                <hr className=" my-6 border-background-4" />
              </div>

              {/* Balances ---------------------------------------------------------------*/}

              <div className="relative">
                <h3 className="mb-6 text-neutral-light">Balance</h3>
                <div className="flex gap-5 items-center">
                  <div className="w-full">
                    <div className="relative w-full">
                      <MyAccountInput
                        id="accountBalance"
                        label="Account Balance"
                        value={"$" + balanceFormData.accountBalance.toFixed(2) ?? 0}
                        disabled={true}
                      />
                      <div className="absolute -top-1 right-0 text-primary text-sm">Transfer out</div>
                    </div>
                    <div className="relative w-full">
                      <MyAccountInput
                        id="bankAccount"
                        label="Bank Account"
                        placeholder={isEditBankAccount ? "XX-XXXX-XXXXXXX-XX" : ""}
                        value={
                          isEditBankAccount && balanceFormData.bankAccount === "-" ? "" : balanceFormData.bankAccount
                        }
                        disabled={isEditBankAccount ? false : true}
                        onChange={e => onChange(e, setBalanceFormData)}
                      />
                      <EditIcon
                        className={`absolute -top-[2px] right-0 text-primary ${isEditBankAccount && "hidden"}`}
                        showText
                        onClick={() => setIsEditBankAccount(true)}
                      />
                      <Button
                        className={`absolute -top-[10px] right-24 h-4 w-20 text-sm border-neutral-light text-neutral-light  ${
                          !isEditBankAccount && "hidden"
                        }`}
                        onClick={resetBalanceFormData}
                      >
                        Cancel
                      </Button>
                      <Button
                        className={`absolute -top-[10px] right-0 h-4 w-20 text-sm bg-primary text-background-1 font-semibold ${
                          !isEditBankAccount && "hidden"
                        }`}
                        onClick={() => onSubmit()}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
                <hr className=" my-6 border-background-4 lg:hidden" />
              </div>
            </div>

            {/* Account  ---------------------------------------------------------------*/}
            <div>
              <div className="relative">
                <EditIcon
                  className={`absolute top-2 right-0 text-primary ${isEditAccount && "hidden"}`}
                  showText
                  onClick={() => setIsEditAccount(true)}
                />
                <Button
                  className={`absolute top-0 right-24 h-4 w-20 text-sm border-neutral-light text-neutral-light  ${
                    !isEditAccount && "hidden"
                  }`}
                  onClick={resetAccountFormData}
                >
                  Cancel
                </Button>
                <Button
                  className={`absolute top-0 right-0 h-4 w-20 text-sm bg-primary text-background-1 font-semibold ${
                    !isEditAccount && "hidden"
                  }`}
                  onClick={() => onSubmit()}
                >
                  Save
                </Button>
                <h3 className="mb-6 text-neutral-light">Account</h3>
                <div className="flex gap-5 items-center">
                  <div className="w-full">
                    <div className="w-full">
                      <MyAccountInput
                        id="email"
                        label="Email"
                        placeholder={isEditAccount ? "Enter Email..." : ""}
                        value={accountFormData.email}
                        disabled={isEditAccount ? false : true}
                        onChange={e => onChange(e, setAccountFormData)}
                      />
                    </div>
                    <div className="w-full">
                      <MyAccountInput
                        id="recipientName"
                        label="Shipping Recipient Name"
                        placeholder={isEditAccount ? "Enter Recipient Name..." : ""}
                        value={accountFormData.recipientName ?? "-"}
                        disabled={isEditAccount ? false : true}
                        onChange={e => onChange(e, setAccountFormData)}
                      />
                      <div className="w-full">
                        {/* <MyAccountInput
                          id="address"
                          label="Shipping Address"
                          placeholder={isEditAccount ? "Enter Shipping Address..." : ""}
                          value={accountFormData.address ?? "-"}
                          disabled={isEditAccount ? false : true}
                          onChange={e => onChange(e, setAccountFormData)}
                        /> */}
                        <MyAccountTextArea
                          id="address"
                          label="Shipping Address"
                          placeholder={isEditAccount ? "Enter Shipping Address..." : ""}
                          value={accountFormData.address ?? "-"}
                          disabled={isEditAccount ? false : true}
                          onChange={e => onChange(e, setAccountFormData)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
