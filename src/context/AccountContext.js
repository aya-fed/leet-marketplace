import { createContext } from "react";

const AccountContext = createContext({
  userId: "",
  name: "",
  profilePic: "",
  timestamp: "",
  wishlist: [],
  purchasedItems: [],
  soldItems: [],
});

export default AccountContext;
