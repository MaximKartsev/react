import * as React from "react"
import {useCallback, useState} from "react"
import {Dispatch} from "redux"
import {useDispatch} from "react-redux"
import {deleteNoteAction, editModeAction, viewModeAction} from "../store/actionCreators";

type Props = {
    note: INote
}

export const NotePreview: React.FC<Props> = ({note}) => {
    const dispatch: Dispatch<any> = useDispatch()
    const previewContentLength = 200;

    const viewModeDispatch = useCallback(
        (note: INote) => dispatch(viewModeAction(note)),
        [dispatch]
    )

    const removeNoteDispatch = useCallback(
        (note: INote) => dispatch(deleteNoteAction(note)),
        [dispatch]
    )

    const editNoteDispatch = useCallback(
        (note: INote) => dispatch(editModeAction(note)),
        [dispatch]
    )

    const [title] = useState(() => note.title.replace(/(<([^>]+)>)/gi, ""));
    const [content] = useState(() => note.content.replace(/(<([^>]+)>)/gi, "").substring(0, previewContentLength));

    return (
        <div className="note-container">
            <div className="note-title" onClick={() => viewModeDispatch(note)}>
                <h1>{title}</h1>
                <div>
                    <p>{content}</p>
                </div>
            </div>
            <div className="note-buttons">
                <button className={"red"} onClick={() => removeNoteDispatch(note)}>Delete</button>
                <button className={"blue"} onClick={() => editNoteDispatch(note)}>Edit</button>
            </div>
        </div>
    )
}