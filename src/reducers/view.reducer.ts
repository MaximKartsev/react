import * as actionTypes from "../store/actionTypes"
import {CREATE_MODE, EDIT_MODE, VIEW_MODE} from "../store/actionTypes";

const initialState: ViewState = {
    type: CREATE_MODE
}

const viewReducer = (
    state: ViewState = initialState,
    action: ViewAction
): ViewState => {
    switch (action.type) {
        case actionTypes.CREATE_MODE:
            return {
                ...state,
                type: CREATE_MODE,
                note: action.note,
            }
        case actionTypes.VIEW_MODE:
            return {
                ...state,
                type: VIEW_MODE,
                note: action.note,
            }
        case actionTypes.EDIT_MODE:
            return {
                ...state,
                type: EDIT_MODE,
                note: action.note,
            }
    }
    return state
}

export default viewReducer