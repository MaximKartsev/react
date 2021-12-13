import React from 'react';
import '../App.css';
import {NotePreview} from "./NotePreview";
import {useSelector} from "react-redux";
import {RootState} from "../reducers/root.reducer";

export const NotePreviewList: React.FC = () => {
    const notes: readonly INote[] = useSelector(
        (state: RootState) => state.noteReducer.notes
    )

    return (
        <div className="aside">
            <div className="note-preview-list">
                {notes.map((article: INote) => (
                    <NotePreview
                        key={article.id}
                        note={article}
                    />
                ))}
            </div>
        </div>
    )
}

export default NotePreviewList;
