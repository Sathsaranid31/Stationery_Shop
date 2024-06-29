import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Products from "./Components/Products/Products";
import HomePage from "./Components/HomePage";
import Auth from "./Components/Auth/Auth";
import Admin from "./Components/Auth/Admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Order from "./Components/Orders/Order";
import UserProfile from "./profile/UserProfile";
import AddProduct from "./Components/Products/AddProduct";
import AdminProfile from "./profile/AdminProfile";

function App() {
const dispatch = useDispatch();

  const isAdminLoggedIn = useSelector((state) =>state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) =>state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
        dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  },[dispatch]);
  return (
    <div>
     <Header/>
     <section>
      <Routes>
      <Route path="/" element={<HomePage/>} />
        <Route path="/products" element={<Products/>} />

      {!isUserLoggedIn && !isAdminLoggedIn && (
        <>
        {" "}
        <Route path="/admin" element={<Admin/>} />
        <Route path="/auth" element={<Auth/>} />
        </>
      )}
        {isUserLoggedIn && !isAdminLoggedIn && (
        <>
        {" "}
        <Route path="/user" element={<UserProfile/>} />
        <Route path="/order/:id" element={<Order/>} />
        </>
      )}
         {!isUserLoggedIn && isAdminLoggedIn && (
        <>
        {" "}
        <Route path="/add" element={<AddProduct/>} />
        <Route path="/user-admin" element={<AdminProfile/>} />
        <Route path="/edit/:id" element={<AddProduct/>} />
        </>
      )}
        
     
        
      </Routes>
     </section>
    </div>
  )
};

export default App;
