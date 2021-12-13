import { combineReducers } from 'redux';
import noteReducer from "./note.reducer";
import viewReducer from "./view.reducer";

export const rootReducer = combineReducers({
    noteReducer,
    viewReducer
});

export type RootState = ReturnType<typeof rootReducer>;
