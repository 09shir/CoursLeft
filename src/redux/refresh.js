import { createSlice } from "@reduxjs/toolkit"

export const refreshSlice = createSlice({
    name: "refresh",
    initialState: {
        value: 0
    },
    reducers: {
        plannerRefresh: (state) => {
            state.value = !state.value;
        }
    }
});

export const { plannerRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;