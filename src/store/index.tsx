import { configureStore } from "@reduxjs/toolkit";
import colorModeReducer from './slices/colorMode';
import dataReducer from './slices/data';

export const store = configureStore({
    reducer: {
        colorMode: colorModeReducer,
        dataStore: dataReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['beOverrides'],
        ignoredActions: ['beOverrides/overrideApis'],
      },
    }),
});

// (getDefaultMiddleware) => {
//     return getDefaultMiddleware({
//       serializableCheck: false
//     });
// }