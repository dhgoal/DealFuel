// In /lib/features/dashboard/dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        profiles: [],
        filters: {
            desiredProfessionalRoles: [],
            professionalRoles: [],
            niche: [],
            calls: [],
            timezone: [],
            workHours: [],
            amountClosed: [],
            language: [],
        },
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        isLoading: true,
        error: null,
    },
    reducers: {
        setFilter(state, action) {
            const { filterName, value } = action.payload;
            // Ensure the filter array exists before trying to access it
            if (!state.filters[filterName]) {
                state.filters[filterName] = [];
            }
            const currentFilterValues = state.filters[filterName];
            if (!currentFilterValues.includes(value)) {
                currentFilterValues.push(value);
            }
        },

        removeFilter(state, action) {
            const { filterName, value } = action.payload;
            state.filters[filterName] = state.filters[filterName].filter(item => item !== value);
        },
        fetchProfilesStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchProfilesSuccess(state, action) {
            state.profiles = action.payload;
            state.isLoading = false;
        },
        fetchProfilesFailure(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        }
    },

});

export const { setFilter, removeFilter,fetchProfilesStart, fetchProfilesSuccess, fetchProfilesFailure } = dashboardSlice.actions;

export default dashboardSlice.reducer;
