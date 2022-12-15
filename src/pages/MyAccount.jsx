// Coded by Aya Saito

import { useContext, useEffect, useState } from "react";
import { useFetchOneUser } from "../hooks/useFetchOneUser";
import AuthContext from "../context/AuthContext";

import { BiEditAlt } from "react-icons/bi";
import AccountMenu from "../components/AccountMenu";
import MyAccountInput from "../components/form/MyAccountInput";
import { PlaceholderProfilePic } from "../components/ui/PlaceholderProfilePic";

export default function MyAccount() {
  const [userData, setUserData] = useState(null);
  const { isLoggedIn, userId } = useContext(AuthContext);

  const { fetchOneUser, userInfo } = useFetchOneUser();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [profileFormData, setProfileFormData] = useState(null);
  const [balanceFormData, setBalanceFormData] = useState(null);
  const [accountFormData, setAccountFormData] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchOneUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userInfo) {
      setProfileFormData({
        name: userInfo.name,
        sellingLocation: userInfo.sellingLocation ?? "",
        profilePic: userInfo.profilePic ?? "",
        timestamp: userInfo.timestamp,
      });
      setBalanceFormData({
        accountBalance: userInfo.accountBalance ?? 0,
        bankAccount: userInfo.bankAccount ?? "12-3456-7890123-00",
      });
      setAccountFormData({
        email: userInfo.email,
        address: userInfo.address ?? "",
      });
    }
  }, [userInfo]);

  return (
    <div className="w-full h-full md:w-[90%] md:max-w-[1200px] md:flex md:justify-center md:gap-20 mx-auto md:px-10">
      <AccountMenu />
      <div className="w-[85%] mx-auto md:w-full">
        {userInfo && profileFormData && (
          <div className="w-full md:grid md:grid-cols-[50%_50%] gap-[10%]">
            <div>
              {/* Profile ---------------------------------------------------------------*/}
              <div className="relative">
                <BiEditAlt className="absolute top-2 right-0 text-primary" />
                <h3 className="mb-6 text-neutral-light">Profile</h3>
                <div className="flex gap-5 items-center">
                  <div className="w-32 h-32 shrink-0">
                    {profileFormData.profilePic ? (
                      <img src={profileFormData.profilePic} className="object-cover w-full h-full rounded-[64px]" />
                    ) : (
                      <PlaceholderProfilePic className="w-full h-full rounded-[28px] text-neutral" />
                    )}
                  </div>
                  {/* show file uploader in edit more */}
                  {isEditingProfile && <div></div>}
                  <div>
                    <MyAccountInput
                      id="name"
                      label="Display Name"
                      value={profileFormData.name}
                      disabled={isEditingProfile ? false : true}
                    />
                    <MyAccountInput
                      id="name"
                      label="Location"
                      value={profileFormData.location ?? ""}
                      disabled={isEditingProfile ? false : true}
                    />
                    <div className="text-xs text-neutral">
                      Member since {profileFormData.timestamp.toDate().toLocaleDateString("en-NZ")}
                    </div>
                  </div>
                </div>
                <hr className=" my-6 border-background-4" />
              </div>

              {/* Balances ---------------------------------------------------------------*/}

              <div className="relative">
                <h3 className="mb-6 text-neutral-light">Balance</h3>
                <div className="flex gap-5 items-center">
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <MyAccountInput
                        id="accountBalance"
                        label="Account Balance"
                        value={"$" + balanceFormData.accountBalance.toFixed(2) ?? 0}
                        disabled={true}
                      />
                      <div className="mt-2 text-primary text-sm whitespace-nowrap">Transfer out</div>
                    </div>
                    <div className="flex justify-between w-full">
                      <MyAccountInput
                        id="bankAccount"
                        label="Bank Account"
                        value={balanceFormData.bankAccount ?? ""}
                        disabled={isEditingBalance ? false : true}
                      />
                      <BiEditAlt className="text-primary mt-2" />
                    </div>
                  </div>
                </div>
                <hr className=" my-6 border-background-4 md:hidden" />
              </div>
            </div>

            {/* Account  ---------------------------------------------------------------*/}
            <div>
              <div className="relative">
                <BiEditAlt className="absolute top-2 right-0 text-primary" />
                <h3 className="mb-6 text-neutral-light">Account</h3>
                <div className="flex gap-5 items-center">
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <MyAccountInput
                        id="email"
                        label="Email"
                        value={accountFormData.email}
                        disabled={isEditingAccount ? false : true}
                      />
                    </div>
                    <div className="flex justify-between w-full">
                      <MyAccountInput
                        id="name"
                        label="Bank Account"
                        value={accountFormData.bankAccount ?? ""}
                        disabled={isEditingAccount ? false : true}
                      />
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
