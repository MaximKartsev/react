import * as actionTypes from "./actionTypes"

export function addNoteAction(note: INote) {
    const action: NoteAction = {
        type: actionTypes.CREATE_NOTE,
        note: note,
    }
    createModeAction()
    return dispatchNode(action)
}

export function editNoteAction(note: INote) {
    const action: NoteAction = {
        type: actionTypes.EDIT_NOTE,
        note: note,
    }
    viewModeAction(note)
    return dispatchNode(action)
}

export function deleteNoteAction(note: INote) {
    const action: NoteAction = {
        type: actionTypes.DELETE_NOTE,
        note: note,
    }
    return dispatchNode(action)
}

export function createModeAction() {
    const action: ViewAction = {
        type: actionTypes.CREATE_MODE,
    }
    return dispatchView(action)
}

export function viewModeAction(note: INote) {
    const action: ViewAction = {
        type: actionTypes.VIEW_MODE,
        note: note
    }
    return dispatchView(action)
}

export function editModeAction(note: INote) {
    const action: ViewAction = {
        type: actionTypes.EDIT_MODE,
        note: note
    }
    return dispatchView(action)
}

export function dispatchNode(action: NoteAction) {
    return (dispatch: NoteDispatchType) => dispatch(action)
}

export function dispatchView(action: ViewAction) {
    return (dispatch: ViewDispatchType) => dispatch(action)
}