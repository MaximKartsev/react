import * as React from "react"
import {useEffect, useState} from "react";

type Props = {
    note: INote
}

export const NoteView: React.FC<Props> = ({note}) => {
    const [title] = useState(() => note.title.replace(/(<([^>]+)>)/gi, ""));

    return (
        <div className="note-container">
            <div className="note-title">
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{__html: note.content}}/>
            </div>
        </div>
    )
}