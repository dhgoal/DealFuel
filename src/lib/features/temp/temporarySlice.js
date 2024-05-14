// In your temporarySlice.js or wherever you define this slice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showAddWorkExpModal: false,
};

export const temporarySlice = createSlice({
    name: 'temporary',
    initialState,
    reducers: {
        setShowAddWorkExpModal: (state, action) => {
            state.showAddWorkExpModal = action.payload;
        },
    },
});

// Export actions
export const { setShowAddWorkExpModal } = temporarySlice.actions;

// Export reducer
export default temporarySlice.reducer;
