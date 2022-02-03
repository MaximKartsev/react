import React, {useEffect, useState} from 'react';
import '../App.css';
import {useDispatch, useSelector} from "react-redux";
import {NoteForm} from "./NoteForm";
import {VIEW_MODE} from "../store/actionTypes";
import {NoteView} from "./NoteView";
import {RootState} from "../reducers/root.reducer";
import {Dispatch} from "redux";
import {addNoteAction, editNoteAction} from "../store/actionCreators";

export const Explorer: React.FC = () => {
    const viewState = useSelector(
        (state: RootState) => state.viewReducer
    );

    const dispatch: Dispatch<any> = useDispatch()
    const [title, setTitle] = useState<string>(viewState.note?.title || '')
    const [content, setContent] = useState<string>(viewState.note?.content || '')

    useEffect(() => {
        setTitle(viewState.note?.title || '');
        setContent(viewState.note?.content || '');
    }, [viewState.note])

    const createHandler = () => {
        const note = {...viewState.note, title, content};
        if (note.id && note.id !== '') {
            dispatch(editNoteAction(note))
            return
        }
        dispatch(addNoteAction({...note, id: Date.now() + Math.random().toString()}))
    }

    if (viewState.type === VIEW_MODE) {
        return (
            <div className="aside">
                <NoteView
                    key={viewState.note?.id || 'new'}
                    note={viewState.note}
                />
            </div>
        )
    }

    return (
        <div className="aside">
            <NoteForm note={{...viewState.note, title, content}}
                      setTitle={setTitle}
                      setContent={setContent}
                      createCallback={createHandler}/>
        </div>
    )
}