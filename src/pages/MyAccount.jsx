// Coded by Aya Saito

import AccountMenu from "../components/AccountMenu";

export default function MyAccount() {
  return (
    <div className="w-full h-full relative md:flex md:gap-24">
      <AccountMenu />
      <div className="w-full mx-auto">
        <div
          onClick={() => {
            if (currentUser) {
              alert("logged in!");
            } else {
              setIsModalOpen(true);
              alert("not logged in!");
            }
          }}
        ></div>
        <h3 className="mb-9">MyAccount</h3>
        <div></div>
      </div>
    </div>
  );
}
