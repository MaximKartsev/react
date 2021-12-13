import React from 'react';
import '../App.css';
import {useSelector} from "react-redux";
import {CreateNote} from "./CreateNote";
import {CREATE_MODE, VIEW_MODE} from "../store/actionTypes";
import {Note} from "./Note";
import {RootState} from "../reducers/root.reducer";
import {EditNote} from "./EditNote";

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
                <CreateNote/>
            </div>
        )
    } else if (viewMode === VIEW_MODE) {
        return (
            <div className="aside">
                <div className="note-preview-list">
                    <Note
                        key={viewNote.id}
                        note={viewNote}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div className="aside">
                <EditNote note={viewNote} />
            </div>
        )
    }
}