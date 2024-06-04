import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    trip: null,
    error: null,
    loading: false,
}

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        createTripStart: (state) => {
            state.loading = true;
        },
        createTripSuccess: (state, action) => {
            state.trip = action.payload;
            state.loading = false;
            state.error = null;
        },
        createTripFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { createTripStart, createTripSuccess, createTripFailure } = tripSlice.actions;

export default tripSlice.reducer;