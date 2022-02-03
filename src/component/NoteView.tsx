import * as React from "react"
import {useState} from "react"

type Props = {
    note?: INote
}

export const NoteView: React.FC<Props> = ({note = {title: '', content: ''}}) => {
    return (
        <div className="note-preview-list">
            <div className="note-container">
                <div className="note-title">
                    <h1>{note.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: note.content}}/>
                </div>
            </div>
        </div>
    )
}