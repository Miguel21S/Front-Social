
import { createSlice } from '@reduxjs/toolkit'
import { updateCriteria } from './searchSlice'

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        criterial: ""
    },
    reducers: {
        profile: (state, action) => {
            return{
                ...state,
                ...action.payload
            }
        },
    }
})

export const { profile } = profileSlice.actions;

export const profileData = (state) => state.profile;

export default profileSlice.reducer;