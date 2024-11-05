import { lazy, Suspense } from "react";
import { LoadingUI } from "../Loading/LoadingComponent";
import { useSelector } from "react-redux";
const ManageStore = lazy(() => import("./ManageGood"));
const ChangeToMerchant = lazy(() => import("./ChangeToMerchant"));

function Selling() {
  const role = useSelector((state) => state.userInfor);

  return (
    <>
      {role.roleclient === "user_normal" && (
        <>
          <Suspense fallback={<LoadingUI />}>
            <ChangeToMerchant />
          </Suspense>
        </>
      )}
      {role.roleclient === "merchant" && (
        <Suspense fallback={<LoadingUI />}>
          <ManageStore />
        </Suspense>
      )}
    </>
  );
}
export default Selling;
