import React, { useEffect, useState } from "react";
import Navbar from "./buyerComponent/Homepage/Navbar";
import Login from "./buyerComponent/LoginRegister/Login";
import ForgotPassword from "./buyerComponent/LoginRegister/ForgotPassword";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./buyerComponent/Homepage/Homepage";
import MyAccount from "./buyerComponent/MyAccount/MyAccount";
import Address from "./buyerComponent/MyAccount/Address";
import Account from "./buyerComponent/MyAccount/Account";
import Favourites from "./buyerComponent/MyAccount/Favourites";
import Contact from "./buyerComponent/Contact/Contact";
import SignUp from "./buyerComponent/LoginRegister/SignUp";
import AdminLogin from "./AdminComponent/AdminLogin/AdminLogin";
import Dashboard from "./AdminComponent/AdminDashboard/Dashboard";
import CategorySub from "./AdminComponent/AdminDashboard/Category&SubCategory/CategorySub";
import Inventory from "./AdminComponent/AdminDashboard/Inventory/Inventory";
import UserManage from "./AdminComponent/AdminDashboard/UserManage/UserManage";
import BrandsManage from "./AdminComponent/AdminDashboard/BrandsManage/BrandsManage";
import Cms from "./AdminComponent/AdminDashboard/ContentManage/Cms";
import OrderReq from "./AdminComponent/AdminDashboard/OrdersManage/OrderReq";
import AgeVerification from "./buyerComponent/AgeVerification";
import AdminForgotPassword from "./AdminComponent/AdminLogin/AdminForgotPassword";
import AdminSendOtp from "./AdminComponent/AdminLogin/AdminSendOtp";
import AdminResetPassword from "./AdminComponent/AdminLogin/AdminResetPassword";
import PendingView from "./AdminComponent/AdminDashboard/UserManage/PendingView";
import ReturnedView from "./AdminComponent/AdminDashboard/UserManage/RetunedView";
import ApprovedView from "./AdminComponent/AdminDashboard/UserManage/ApprovedView";
import EditUser from "./AdminComponent/AdminDashboard/UserManage/EditUser";
import AddUser from "./AdminComponent/AdminDashboard/UserManage/AddUser";
import EditProfile from "./AdminComponent/AdminDashboard/EditProfile";
import ChangePassword from "./AdminComponent/AdminDashboard/ChangePassword";
import RequestOrders from "./buyerComponent/MyAccount/RequestOrder";
import MainMenu from "./buyerComponent/MyAccount/MainMenu";
import PrivacyPolicies from "./buyerComponent/Homepage/PrivacyPolicies";
import ProductByCate from "./buyerComponent/AllProducts/ProductByCate";
import AllBrands from "./buyerComponent/AllProducts/AllBrands";
import ProductBySubCate from "./buyerComponent/AllProducts/ProductBySub";
import ProductByBrand from "./buyerComponent/AllProducts/ProductByBrand";
import TermsCondition from "./buyerComponent/Homepage/Terms&Condition";
import AboutUs from "./buyerComponent/Homepage/AboutUs";
import EditInventory from "./AdminComponent/AdminDashboard/Inventory/EditInventory";
import SingleProduct from "./buyerComponent/AllProducts/SingleProduct";
import AppLogin from "./pwaComponents/loginComponent/appLogin";
import AppSignUp from "./pwaComponents/loginComponent/appSignUp";
import AppForgotPassword from "./pwaComponents/loginComponent/appForgotPassword";
import AppOtp from "./pwaComponents/loginComponent/appOtp";
import AppOtpVerification from "./pwaComponents/loginComponent/appOtpVerify";
import AppForgotPasswordSuccess from "./pwaComponents/loginComponent/appForgotPasswordSuccess";
import AppHome from "./pwaComponents/homeComponent/appHome";
import AppCart from "./pwaComponents/homeComponent/appCart";
import ScrollToTop from "./pwaComponents/homeComponent/scrollToTop";
import AppSettings from "./pwaComponents/homeComponent/appSettings";
import AppAboutUs from "./pwaComponents/homeComponent/appAboutUs";
import AppConditions from "./pwaComponents/homeComponent/appConditions";
import AppPrivacy from "./pwaComponents/homeComponent/appPrivacy";
import AppChangePassword from "./pwaComponents/homeComponent/appChangePassword";
import AppProfile from "./pwaComponents/homeComponent/appProfile";
import AppEditProfile from "./pwaComponents/homeComponent/appEditProfile";
import AppMyOrder from "./pwaComponents/homeComponent/appMyOrder";
import AppRequests from "./pwaComponents/homeComponent/appRequests";
import AppNotifications from "./pwaComponents/homeComponent/appNotifications";
import AppWishlist from "./pwaComponents/homeComponent/appWishlist";
import AppBrands from "./pwaComponents/homeComponent/appBrands";
import AppProductDetail from "./pwaComponents/homeComponent/appProductDetail";
import AppRequestDetail from "./pwaComponents/homeComponent/appRequestDetail";
import AppNotificationDetail from "./pwaComponents/homeComponent/appNotificationDetail";
import AppOrderDetail from "./pwaComponents/homeComponent/appOrderDetail";
import AppProductCategory from "./pwaComponents/homeComponent/appProductCategory";
import AppProductList from "./pwaComponents/homeComponent/appProductList";
import AppCheckout from "./pwaComponents/homeComponent/appCheckout";
import AppThankyou from "./pwaComponents/homeComponent/appThankyou";
import AppContactUs from "./pwaComponents/homeComponent/appContactUs";
import AppLogout from "./pwaComponents/homeComponent/appLogout";
import Cart from "./buyerComponent/Cart/Cart";
import BuyAgain from "./buyerComponent/MyAccount/BuyAgain";
import SignUpAgain from "./buyerComponent/LoginRegister/SignUpAgain";
import MyQuotes from "./buyerComponent/Homepage/MyQuotes";
import Checkout from "./buyerComponent/Cart/Checkout";
import AppPreLogin from "./pwaComponents/loginComponent/appPreLogin";
import AppReSignUp from "./pwaComponents/loginComponent/appReSignUp";
import AppProductBySearch from "./pwaComponents/homeComponent/appProductBySearch";
import AppPreLoginPassword from "./pwaComponents/loginComponent/appPreLoginPasword";
import ViewOrder from "./AdminComponent/AdminDashboard/OrdersManage/viewOrder";
import ViewQuoteReq from "./AdminComponent/AdminDashboard/OrdersManage/viewQuoteReq";
import UserDetails from "./AdminComponent/AdminDashboard/userDetails";
import AppProductBrands from "./pwaComponents/homeComponent/appProductBrands";
import AppCategories from "./pwaComponents/homeComponent/appCategories";
import AppQuotes from "./pwaComponents/homeComponent/appQuotes";
import OrderDetails from "./buyerComponent/MyAccount/OrdersDetails";
import RequestDetails from "./buyerComponent/MyAccount/ReqDetails";

function App() {
  const [apiData, setApiData] = useState([]);
  const [cateName, setCateName] = useState();

  const GetData = (data) => {
    console.log(data);
    setCateName(data);
  };

  const width = window.innerWidth;

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage GetData={GetData} />} />
          <Route path="/Register" element={<SignUp />} />
          <Route path="/Register/ReSubmit" element={<SignUpAgain />} />
          <Route path="/login" element={<Login newData={GetData} />} />
          <Route
            path="/MyAccount"
            element={<MyAccount newData={GetData} apiData={apiData} />}
          />
          <Route path="/RequestOrder" element={<RequestOrders />} />
          <Route path="/OrderDetails" element={<OrderDetails />} />
          <Route path="/RequestDetails" element={<RequestDetails />} />
          <Route path="/MainMenu" element={<MainMenu />} />
          <Route path="/Address" element={<Address />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Favourites" element={<Favourites />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/BuyAgain" element={<BuyAgain />} />

          <Route path="/AgeVerified" element={<AgeVerification />} />
          <Route path="/PrivacyPolicies" element={<PrivacyPolicies />} />
          <Route path="/Terms&Condition" element={<TermsCondition />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route
            path="/CategoryProducts"
            element={<ProductByCate CateName={cateName} />}
          />
          <Route path="/SubCategory/Products" element={<ProductBySubCate />} />
          <Route path="/Brands/Products" element={<ProductByBrand />} />
          <Route path="/AllProducts/Product" element={<SingleProduct />} />
          <Route path="/AllBrands" element={<AllBrands />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/MyQuotes" element={<MyQuotes />} />

          {/* admin Routes */}
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route
            path="/AdminForgotPassword"
            element={<AdminForgotPassword />}
          />
          <Route path="/AdminVerifyOtp" element={<AdminSendOtp />} />
          <Route path="/AdminResetPassword" element={<AdminResetPassword />} />
          <Route path="/AdminDashboard" element={<Dashboard />} />
          <Route path="/AdminDashboard/EditProfile" element={<EditProfile />} />
          <Route
            path="/AdminDashboard/ChangePassword"
            element={<ChangePassword />}
          />
          <Route path="/UserManage" element={<UserManage />} />
          <Route path="/UserManage/PendingView" element={<PendingView />} />
          <Route path="/UserManage/ReturnedView" element={<ReturnedView />} />
          <Route path="/UserManage/ApprovedView" element={<ApprovedView />} />
          <Route
            path="/UserManage/ApprovedView-editUser"
            element={<EditUser />}
          />
          <Route path="/UserManage/AddUser" element={<AddUser />} />
          <Route path="/CategorySub" element={<CategorySub />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/Inventory/View-Edit" element={<EditInventory />} />
          <Route path="/BrandsManage" element={<BrandsManage />} />
          <Route path="/Cms" element={<Cms />} />
          <Route path="/OrderRequest" element={<OrderReq />} />
          <Route path="/OrderRequest/ViewOrder" element={<ViewOrder/>} />
          <Route path="/OrderRequest/ViewQuotationRequest" element={<ViewQuoteReq/>} />
          <Route path="/OrderRequest" element={<OrderReq />} />
          <Route path="/Dashboard/UserDetails" element={<UserDetails />} />
          <Route path="/Cart/Checkout" element={<Checkout />} />

          {/* App Routes */}
          <Route
            path="/app/pre-login"
            element={width < 768 ? <AppPreLogin /> : <Login />}
          />
          <Route
            path="/app/login"
            element={width < 768 ? <AppPreLogin /> : <Login />}
          />
          <Route
            path="/app/pre-login-password"
            element={width < 768 ? <AppPreLoginPassword /> : <Login />}
          />
          <Route
            path="/app/register"
            element={width < 768 ? <AppSignUp /> : <SignUp />}
          />
          <Route
            path="/app/re-register"
            element={width < 768 ? <AppReSignUp /> : <SignUp />}
          />
          <Route
            path="/app/forgot-password"
            element={width < 768 ? <AppForgotPassword /> : <Homepage />}
          />
          <Route
            path="/app/otp"
            element={width < 768 ? <AppOtp /> : <Homepage />}
          />
          <Route
            path="/app/otp-verification"
            element={width < 768 ? <AppOtpVerification /> : <Homepage />}
          />
          <Route
            path="/app/success"
            element={width < 768 ? <AppForgotPasswordSuccess /> : <Homepage />}
          />
          <Route
            path="/app/home"
            element={width < 768 ? <AppHome /> : <Homepage />}
          />
          <Route
            path="/app/homeGuest"
            element={width < 768 ? <AppHome /> : <Homepage />}
          />
          <Route path="/app/cart" element={<AppCart />} />
          <Route path="/app/quotes" element={<AppQuotes />} />
          <Route
            path="/app/settings"
            element={width < 768 ? <AppSettings /> : <MyAccount />}
          />
          <Route
            path="/app/privacy-policy"
            element={width < 768 ? <AppPrivacy /> : <PrivacyPolicies />}
          />
          <Route
            path="/app/term-condition"
            element={width < 768 ? <AppConditions /> : <TermsCondition />}
          />
          <Route
            path="/app/about-us"
            element={width < 768 ? <AppAboutUs /> : <AboutUs />}
          />
          <Route
            path="/app/change-password"
            element={width < 768 ? <AppChangePassword /> : <Account />}
          />
          <Route
            path="/app/profile"
            element={width < 768 ? <AppProfile /> : <Account />}
          />
          <Route
            path="/app/edit-profile"
            element={width < 768 ? <AppEditProfile /> : <Account />}
          />
          <Route path="/app/my-order" element={<AppMyOrder />} />
          <Route path="/app/my-request" element={<AppRequests />} />
          <Route path="/app/notifications" element={<AppNotifications />} />
          <Route path="/app/brands" element={<AppBrands />} />
          <Route path="/app/Categories" element={<AppCategories />} />
          <Route path="/app/wishlist" element={<AppWishlist />} />
          <Route
            path="/app/product-detail/:id"
            element={<AppProductDetail />}
          />
          <Route
            path="/app/product-by-search"
            element={<AppProductBySearch />}
          />
          <Route path="/app/request-detail" element={<AppRequestDetail />} />
          <Route
            path="/app/notification-detail"
            element={<AppNotificationDetail />}
          />
          <Route path="/app/order-detail" element={<AppOrderDetail />} />
          <Route
            path="/app/product-category/:id"
            element={<AppProductCategory />}
          />
           <Route
            path="/app/productBrands"
            element={<AppProductBrands />}
          />
          <Route path="/app/product-list" element={<AppProductList />} />
          <Route path="/app/checkout" element={<AppCheckout />} />
          <Route path="/app/thankyou" element={<AppThankyou />} />
          <Route path="/app/contact-us" element={<AppContactUs />} />
          <Route path="/app/logout" element={<AppLogout />} />

          {/*  */}

          {/*  */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
