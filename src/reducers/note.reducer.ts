import * as actionTypes from "../store/actionTypes"

const initialState: NoteState = {
    notes: [
        {
            id: '1',
            title: "Title 1",
            content:
                "Note 1",
        },
        {
            id: '2',
            title: "Title 2",
            content:
                "Note 2",
        },
    ],
}

const noteReducer = (
    state: NoteState = initialState,
    action: NoteAction
): NoteState => {
    switch (action.type) {
        case actionTypes.CREATE_NOTE:
            const newNote: INote = {
                id: action.note.id,
                title: action.note.title,
                content: action.note.content,
            }
            return {
                ...state,
                notes: state.notes.concat(newNote),
            }
        case actionTypes.EDIT_NOTE:
            const editNote = state.notes.find(
                note => note.id === action.note.id
            )
            if(editNote) {
                editNote.title = action.note.title
                editNote.content = action.note.content
            }
            const editedArray = state.notes.map(function(item) {
                return item.id === action.note.id ? editNote as INote : item;
            });
            return {
                ...state,
                notes: editedArray
            }
        case actionTypes.DELETE_NOTE:
            const updatedNotes: INote[] = state.notes.filter(
                note => note.id !== action.note.id
            )
            return {
                ...state,
                notes: updatedNotes,
            }
    }
    return state
}

export default noteReducer