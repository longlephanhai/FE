import LayoutAdmin from "../layouts/admin/LayoutAdmin";
import LayoutClient from "../layouts/clients/LayoutClient";
import ListProduct from "../pages/admin/Product/ListProduct";
import Login from "../pages/admin/Login/Login";
import Home from "../pages/client/Home/Home";
import DetailProduct from "../pages/admin/Product/DetailProduct";
import CreateProduct from "../pages/admin/Product/CreateProduct";
import ProductCategory from "../pages/admin/ProductCategory/ProductCategory";
import CreateProductCategory from "../pages/admin/ProductCategory/CreateProductCategory";
import EditProduct from "../pages/admin/Product/EditProduct";
import DetailProductCategory from "../pages/admin/ProductCategory/DetailProductCategory";
import EditProductCategory from "../pages/admin/ProductCategory/EditProductCategory";
import Role from "../pages/admin/Role/Role";
import CreateRole from "../pages/admin/Role/CreateRole";
import DetailRole from "../pages/admin/Role/DetailRole";
import EditRole from "../pages/admin/Role/EditRole";
import Permissions from "../pages/admin/Permissions/Permissions";
import Account from "../pages/admin/Account/Account";
import CreateAccount from "../pages/admin/Account/CreateAccount";
import AccountDetail from "../pages/admin/Account/DetailAccount";
import EditAccount from "../pages/admin/Account/EditAccount";
import Setting from "../pages/admin/Setting/Setting";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import SignIn from "../pages/client/SignIn/SignIn";
import SignUp from "../pages/client/SignUp/SignUp";
import Detail from "../pages/client/Detail/Detail";
import Cart from "../pages/client/Cart/Cart";
import Payment from "../pages/client/Payment/Payment";
import Order from "../pages/client/Order/Order";
import Verify from "../pages/client/Payment/Verify";
import Success from "../pages/client/Payment/Success";
import DetailOrder from "../pages/client/Order/DetailOrder";
import CategoryProduct from "../pages/client/CategoryProduct/CategoryProduct";
import ForgotPassword from "../pages/client/SignIn/ForgotPassword";
import OTP_Password from "../pages/client/SignIn/OTP-Password";
import ResetPassword from "../pages/client/SignIn/ResetPassword";
import SendEmail from "../pages/client/SendEmail/SendEmail";
import Email from "../pages/admin/Email/Email";
import Response from "../pages/admin/Email/Response";
import OrderAdmin from "../pages/admin/Orders/OrderAdmin";
import Charts from "../pages/admin/Charts/Charts";

export const routesClient = [
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "sign-in",
        element: <SignIn />
      },
      {
        path: "sign-in/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "sign-in/forgot-password/otp-password",
        element: <OTP_Password />
      },
      {
        path: "sign-in/reset-password",
        element: <ResetPassword />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "products/detail/:slug",
        element: <Detail />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "payment",
        element: <Payment />
      },
      {
        path: "verify",
        element: <Verify />
      },
      {
        path: "success",
        element: <Success />
      },
      {
        path: "order",
        element: <Order />
      },
      {
        path: "order/:id",
        element: <DetailOrder />
      },
      {
        path: "books/:slug",
        element: <CategoryProduct />
      },
      {
        path: "send-email",
        element: <SendEmail />
      }
    ]
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "products",
        element: <ListProduct />
      },
      {
        path: "products/detail/:id",
        element: <DetailProduct />
      },
      {
        path: "products/create",
        element: <CreateProduct />
      },
      {
        path: "products/edit/:id",
        element: <EditProduct />
      },
      {
        path: "products-category",
        element: <ProductCategory />,
      },
      {
        path: "products-category/detail/:slug",
        element: <DetailProductCategory />,
      },
      {
        path: "products-category/create",
        element: <CreateProductCategory />,
      },
      {
        path: "products-category/edit/:slug",
        element: <EditProductCategory />,
      },
      {
        path: "roles",
        element: <Role />
      },
      {
        path: "roles/create",
        element: <CreateRole />
      },
      {
        path: "roles/detail/:id",
        element: <DetailRole />
      },
      {
        path: "roles/edit/:id",
        element: <EditRole />
      },
      {
        path: "permissions",
        element: <Permissions />
      },
      {
        path: "accounts",
        element: <Account />
      },
      {
        path: "accounts/create",
        element: <CreateAccount />
      },
      {
        path: "accounts/detail/:id",
        element: <AccountDetail />
      },
      {
        path: "accounts/edit/:id",
        element: <EditAccount />
      },
      {
        path: "settings",
        element: <Setting />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "email",
        element: <Email />
      },
      {
        path: "email/:email",
        element: <Response />
      },
      {
        path: "orders",
        element: <OrderAdmin />
      },
      {
        path:"charts",
        element:<Charts/>
      }
    ],
  },
  {
    path: "/admin/auth/login",
    element: <Login />
  }
];

