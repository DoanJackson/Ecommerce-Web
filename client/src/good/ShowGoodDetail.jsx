import { lazy, Suspense, useState } from "react";
import reducerManager from "../store/combine_slice.js";
import showDetailSlice from "../store/select_good_slice";
import store from "../store/store.js";
import { LoadingUI } from "../Loading/LoadingComponent.jsx";
const GoodDetail = lazy(() => import("./GoodDetail.jsx"));
function ShowGoodDetail() {
  useEffect(() => {
    if (!reducerManager.has("showDetail")) {
      reducerManager.add("showDetail", showDetailSlice.reducer);
      store.replaceReducer(reducerManager.combined);
    }
    setLoading(true);
  }, []);
  return (
    <>
      <Suspense fallback={<LoadingUI />}>
        <GoodDetail />
      </Suspense>
    </>
  );
}
export default ShowGoodDetail;
