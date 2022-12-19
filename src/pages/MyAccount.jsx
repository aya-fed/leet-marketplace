// Coded by Aya Saito

import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import AccountContext from "../context/AccountContext";

import AccountMenu from "../components/AccountMenu";
import MyAccountInput from "../components/form/MyAccountInput";
import { PlaceholderProfilePic } from "../components/ui/PlaceholderProfilePic";
import EditIcon from "../components/ui/EditIcon";
import Button from "../components/ui/Button";

export default function MyAccount() {
  const [userData, setUserData] = useState(null);
  const { isLoggedIn, userId } = useContext(AuthContext);
  const { accountData } = useContext(AccountContext);

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditBankAccount, setIsEditBankAccount] = useState(false);
  const [isEditAccount, setIsEditAccount] = useState(false);
  const [profileFormData, setProfileFormData] = useState(null);
  const [balanceFormData, setBalanceFormData] = useState(null);
  const [accountFormData, setAccountFormData] = useState(null);

  useEffect(() => {
    if (accountData) {
      setProfileFormData({
        name: accountData.name,
        sellingLocation: accountData.account && accountData.account.location ? accountData.account.location : "-",
        profilePic: accountData.profilePic ?? "",
      });
      setBalanceFormData({
        accountBalance: accountData.account && accountData.account.balance ? accountData.account.balance : 0,
        bankAccount: accountData.account && accountData.account.bankAccount ? accountData.account.bankAccount : "-",
      });
      setAccountFormData({
        email: accountData.email,
        recipientName:
          accountData.account && accountData.account.recipientName ? accountData.account.recipientName : "-",
        address: accountData.account && accountData.account.address ? accountData.account.address : "-",
      });
    }
  }, [accountData]);

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
                  className={`absolute top-0 right-0 h-4 w-20 text-sm bg-primary border-none text-background-1 font-semibold ${
                    !isEditProfile && "hidden"
                  }`}
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
                      placeholder={isEditProfile && "Enter Display Name..."}
                      value={profileFormData.name}
                      disabled={isEditProfile ? false : true}
                    />
                    <MyAccountInput
                      id="name"
                      label="Location"
                      placeholder={isEditProfile && "Enter suburb..."}
                      value={
                        isEditProfile && profileFormData.sellingLocation === "-" ? "" : profileFormData.sellingLocation
                      }
                      disabled={isEditProfile ? false : true}
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
                        placeholder={isEditBankAccount && "Enter Bank Account Number..."}
                        value={
                          isEditBankAccount && balanceFormData.bankAccount === "-" ? "" : balanceFormData.bankAccount
                        }
                        disabled={isEditBankAccount ? false : true}
                      />
                      <EditIcon
                        className={`absolute -top-[2px] right-0 text-primary ${isEditBankAccount && "hidden"}`}
                        showText
                        onClick={() => setIsEditBankAccount(true)}
                      />
                      <Button
                        className={`absolute -top-[8px] right-0 h-4 w-20 text-sm bg-primary border-none text-background-1 font-semibold ${
                          !isEditBankAccount && "hidden"
                        }`}
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
                  className={`absolute top-0 right-0 h-4 w-20 text-sm bg-primary border-none text-background-1 font-semibold ${
                    !isEditAccount && "hidden"
                  }`}
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
                        placeholder={isEditAccount && "Enter Email..."}
                        value={accountFormData.email}
                        disabled={isEditAccount ? false : true}
                      />
                    </div>
                    <div className="w-full">
                      <MyAccountInput
                        id="name"
                        label="Shipping Recipient Name"
                        placeholder={isEditAccount && "Enter Recipient Name..."}
                        value={accountFormData.recipientName ?? "-"}
                        disabled={isEditAccount ? false : true}
                      />
                      <div className="w-full">
                        <MyAccountInput
                          id="name"
                          label="Shipping Address"
                          placeholder={isEditAccount && "Enter Shipping Address..."}
                          value={accountFormData.address ?? "-"}
                          disabled={isEditAccount ? false : true}
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
