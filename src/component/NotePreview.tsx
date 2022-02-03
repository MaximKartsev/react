import * as React from "react"
import {useCallback, useMemo, useState} from "react"
import {Dispatch} from "redux"
import {useDispatch} from "react-redux"
import {deleteNoteAction, editModeAction, viewModeAction} from "../store/actionCreators";
import {removeHTMLTags} from "../helper/html";

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

    const title = useMemo(() => removeHTMLTags(note.title), [note.title]);
    const content = useMemo(() => removeHTMLTags(note.content).substring(0, previewContentLength), [note.content]);

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