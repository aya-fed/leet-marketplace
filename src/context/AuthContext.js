// Coded by Aya Saito

import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
});

export default AuthContext;
