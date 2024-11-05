import React, { Suspense, useEffect, useState } from "react";
import { LoadingUI } from "../Loading/LoadingComponent";
import { useSelector } from "react-redux";
import formBuySlice from "../store/form_submit_buy";
import store from "../store/store";
import reducerManager from "../store/combine_slice";
const ShoppingComponent = React.lazy(() => import("./Shopping"));
const GoodDetailComponent = React.lazy(() => import("../good/GoodDetail"));

function ManageShopping() {
  useEffect(() => {
    if (!reducerManager.has("formBuy")) {
      reducerManager.add("formBuy", formBuySlice.reducer);
      store.replaceReducer(reducerManager.combined);
    }
  }, []);
  const showGood = useSelector((state) => state.showDetail);

  return (
    <>
      {showGood && (
        <>
          {!showGood.isShow && (
            <Suspense fallback={<LoadingUI />}>
              <ShoppingComponent />
            </Suspense>
          )}
          {showGood.isShow && (
            <Suspense fallback={<LoadingUI />}>
              <GoodDetailComponent />
            </Suspense>
          )}
        </>
      )}
    </>
  );
}

export default ManageShopping;
