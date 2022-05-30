import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataFilter } from "src/config/types";
import { getData } from 'src/services/apiGetData';
import { IDataState, IRootState } from "../types";

const initialState: IDataState = {
    data: [],
    filter: {
        camp: '',
        school: '',
        country: '',
    }
};

export const fetchData = createAsyncThunk(
    'users/fetchData',
    async (arg, thunkAPI) => {
        const state = thunkAPI.getState() as IRootState;

        if (state.dataStore.data.length)
            return state.dataStore.data;

        const response = await getData();
        return response.data
    }
);

const dataSlice = createSlice({
    name: 'dataStore',
    initialState,
    reducers: {
        updateFilter: (
            state: IDataState,
            action: PayloadAction<Partial<IDataFilter>>
        ) => {
            state.filter = {
                ...state.filter,
                ...action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            if (!state.data.length){
                state.data.push(...action.payload)
                const countries = [...new Set(state.data.map(d=>d.country))];
                const camps = [...new Set(state.data.map(d=>d.camp))];
                state.filter.country = countries[0];
                state.filter.camp = camps[0];
            }
        });
    },
});

export default dataSlice.reducer;
export const { updateFilter } = dataSlice.actions;