// Coded by Aya Saito

import { createContext } from "react";

const AccountContext = createContext({
  userId: "",
  name: "",
  email: "",
  profilePic: "",
  location: "",
  timestamp: "",
  wishlist: [],
  purchased: [],
  sold: [],
  account: {
    balance: "",
    recipientName: "",
    address: "",
  },
});

export default AccountContext;
