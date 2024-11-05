import axios from "axios";
import { lazy, Suspense, useEffect } from "react";
import { url } from "../Login/AuthContext";
import { getDataLocal } from "../user/GetDataLocal";
import { userActions } from "../store/user_slice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingUI } from "../Loading/LoadingComponent";
const DashboardLayoutAccount = lazy(() => import("./Dashboard"));

function UserPage() {
  const data = useSelector((state) => state.userInitial);
  const dispatch = useDispatch();

  async function getData() {
    const user = getDataLocal();
    if (user === undefined) {
      console.log("error from getDataLocal");
      return;
    }

    try {
      await axios
        .post(
          url + "/api/user/get-data",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          const res = response.data;
          const data = { email: res.email, name: res.name, role: res.role };
          dispatch(userActions.SetDataUser(data));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data.role === "" && <div>Page for none</div>}
      {data.role === "admin" && <div>Page for admin</div>}
      {data.role === "user" && (
        <Suspense fallback={<LoadingUI />}>
          <DashboardLayoutAccount />
        </Suspense>
      )}
    </>
  );
}
export default UserPage;
