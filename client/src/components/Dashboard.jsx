import * as React from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { url, useAuth } from "../Login/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { getDataLocal } from "../user/GetDataLocal";
import { LoadingUI } from "../Loading/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { userInforActions } from "../store/user_infor_slice";
import userInforSlice from "../store/user_infor_slice";
import reducerManager from "../store/combine_slice";
import store from "../store/store";
import showDetailSlice from "../store/select_good_slice";

const InformationUser = React.lazy(() => import("../user/Information"));
const Selling = React.lazy(() => import("../user/Selling"));
const ManageShopping = React.lazy(() => import("../shopping/ManageShopping"));
const CartComponent = React.lazy(() => import("../cartComponent/CartMainPage"));

const NAVIGATION = [
  {
    segment: "user/information",
    title: "Information",
    icon: <PersonIcon />,
  },
  {
    segment: "user/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "user/shopping",
    title: "Shopping",
    icon: <AddShoppingCartIcon />,
  },
  {
    segment: "user/selling",
    title: "Selling",
    icon: <StorefrontIcon />,
  },
  {
    segment: "user/cart",
    title: "Cart",
    icon: <ShoppingCartIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutAccount() {
  React.useEffect(() => {
    if (!reducerManager.has("userInfor")) {
      reducerManager.add("userInfor", userInforSlice.reducer);
      store.replaceReducer(reducerManager.combined);
    }
    if (!reducerManager.has("showDetail")) {
      reducerManager.add("showDetail", showDetailSlice.reducer);
      store.replaceReducer(reducerManager.combined);
    }
  }, []);

  const userState = useSelector((state) => state.userInitial);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [session, setSession] = React.useState({
    user: {
      name: userState.name,
      email: userState.email,
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const { logout } = useAuth();

  React.useEffect(() => {
    setSession({
      user: {
        name: userState.name,
        email: userState.email,
        image: "https://avatars.githubusercontent.com/u/19550456",
      },
    });
  }, [userState]);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {},
      signOut: () => {
        setSession(null);
        logout();
        navigate("/login");
      },
    };
  }, [userState, logout, navigate]);

  const pathname = location.pathname;

  async function getInforClientNormal() {
    const localData = getDataLocal();
    if (localData === undefined) {
      console.log("error from getDataLocal");
      return;
    }

    try {
      await axios
        .post(
          url + "/api/get-data/client-normal",
          {},
          {
            headers: {
              Authorization: `Bearer ${localData.token}`,
            },
          }
        )
        .then((response) => {
          const res = response.data;
          dispatch(userInforActions.changeData(res));
        })
        .catch((err) => {
          console.log(
            "ERROR from retrieving data from /api/get-data/client-normlal",
            err
          );
        });
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getInforClientNormal();
  }, []);

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: () => item.onClick(navigate),
      }))}
      router={{
        pathname: pathname,
        navigate,
      }}
      theme={demoTheme}
    >
      <DashboardLayout>
        {pathname === "/user/information" && (
          <React.Suspense fallback={<LoadingUI />}>
            <InformationUser />
          </React.Suspense>
        )}
        {pathname === "/user/selling" && (
          <>
            <React.Suspense fallback={<LoadingUI />}>
              <Selling />
            </React.Suspense>
          </>
        )}
        {pathname === "/user/shopping" && (
          <React.Suspense fallback={<LoadingUI />}>
            <ManageShopping />
          </React.Suspense>
        )}
        {pathname === "/user/cart" && (
          <>
            <React.Suspense fallback={<LoadingUI />}>
              <CartComponent />
            </React.Suspense>
          </>
        )}
      </DashboardLayout>
    </AppProvider>
  );
}
export default DashboardLayoutAccount;
