import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColorModeType, IColorMode, IColorModeState } from "../types";

export const colorModes: Record<ColorModeType, IColorMode> = {
    light: {
        mainColor: '#aa82c7',
        backColor: '#f5f6fa',
        secondaryColor: '#ffffff',
        fontColor: '#8b8b8b',
        mode: "light",
    },
    dark: {
        mainColor: '#aa82c7',
        backColor: '#a9aaaf',
        secondaryColor: '#464646',
        fontColor: '#f1f1f1',
        mode: "dark",
    },
}

const initialState: IColorModeState = {
    currentMode: colorModes.light
};

const colorModeSlice = createSlice({
    name: 'colorMode',
    initialState,
    reducers: {
        updateColorMode: (
            state: IColorModeState,
            action: PayloadAction<ColorModeType>
        ) => {
            if(state.currentMode.mode !== action.payload)
                state.currentMode = colorModes[action.payload];
        }
    },
});

export default colorModeSlice.reducer;
export const { updateColorMode } = colorModeSlice.actions;