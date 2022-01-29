import React from 'react';
import '../App.css';
import {useSelector} from "react-redux";
import {InteractionType, Note} from "./Note";
import {CREATE_MODE, VIEW_MODE} from "../store/actionTypes";
import {NoteView} from "./NoteView";
import {RootState} from "../reducers/root.reducer";

export const Explorer: React.FC = () => {
    const viewState = useSelector(
        (state: RootState) => state.viewReducer
    );

    const viewMode = viewState.type;
    const viewNote = viewState.note || {
        id: '',
        title: '',
        content: ''
    };

    if (viewMode === CREATE_MODE || viewMode === undefined) {
        return (
            <div className="aside">
                <Note interactionType={InteractionType.CreateNote} note={{
                    id: '',
                    title: '',
                    content: ''
                }}/>
            </div>
        )
    } else if (viewMode === VIEW_MODE) {
        return (
            <div className="aside">
                <div className="note-preview-list">
                    <NoteView
                        key={viewNote.id}
                        note={viewNote}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div className="aside">
                <Note interactionType={InteractionType.EditNote} note={viewNote}/>
            </div>
        )
    }
}