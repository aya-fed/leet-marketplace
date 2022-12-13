import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AccountContext from "./context/AccountContext";
import AuthContext from "./context/AuthContext";
import { useAuthStatus } from "./hooks/useAuthStatus";
import { useAccountData } from "./hooks/useAccountData";

import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Category from "./pages/Category";
import ItemDetail from "./pages/ItemDetail";
import UserProfile from "./pages/UserProfile";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import MyAccount from "./pages/MyAccount";
import MyListings from "./pages/MyListings";
import MyPurchases from "./pages/MyPurchases";
import SoldItems from "./pages/SoldItems";
import Wishlist from "./pages/Wishlist";
import CheckOut from "./pages/CheckOut";
import TEST from "./pages/TEST";

function App() {
  const { loggedIn, currentUserId } = useAuthStatus();
  const { userInfo } = useAccountData();

  const [accountData, setAccountData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // auth status to save in context
  useEffect(() => {
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, [loggedIn]);

  // user info to save in context
  useEffect(() => {
    if (userInfo) {
      console.log("checking", userInfo);
      setAccountData({
        ...userInfo,
        userId: currentUserId,
      });
    } else if (!isLoggedIn) {
      setAccountData({
        userId: "",
        name: "",
        profilePic: "",
        timestamp: "",
        wishlist: [],
        purchasedItems: [],
        soldItems: [],
      });
    }
  }, [userInfo]);

  return (
    <div className="App">
      <Router>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <AccountContext.Provider value={{ accountData, setAccountData }}>
            <Header />
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keywords" element={<Search />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/item-detail/:itemId" element={<ItemDetail />} />
              <Route path="/user-profile/:userId" element={<UserProfile />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/edit-listing/:itemId" element={<EditListing />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/my-listings" element={<MyListings />} />
              <Route path="/my-purchases" element={<MyPurchases />} />
              <Route path="/sold-items" element={<SoldItems />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
            <Footer />
          </AccountContext.Provider>
        </AuthContext.Provider>
      </Router>
      <BottomNav />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
