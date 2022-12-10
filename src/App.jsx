import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import ItemCard from "./components/ItemCard";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {/* <ItemCard /> */}
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
