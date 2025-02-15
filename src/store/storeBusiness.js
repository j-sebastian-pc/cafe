import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slicesBusiness/userSliceBusiness";
export const store = configureStore({
    reducer: {
        user: userSlice
    }
})
export default store.dispatch;