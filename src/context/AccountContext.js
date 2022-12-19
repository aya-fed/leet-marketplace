// Coded by Aya Saito

import { createContext } from "react";

const AccountContext = createContext({
  userId: "",
  name: "",
  email: "",
  profilePic: "",
  timestamp: "",
  wishlist: [],
  purchasedItems: [],
  soldItems: [],
  account: {
    location: "",
    balance: "",
    recipientName: "",
    address: "",
  },
});

export default AccountContext;
