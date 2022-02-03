import * as React from "react"
import {useMemo} from "react"
import {NoteValidationMessage} from "./NoteValidationMessage";
import {MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH} from "../helper/const";
import {removeHTMLTags} from "../helper/html";

type NoteProps = {
    readonly note?: INote
    readonly setTitle: (title: string) => void
    readonly setContent: (title: string) => void
    readonly createCallback: () => void
}

export const NoteForm: React.FC<NoteProps> = ({
                                                  note = {title: "", content: ""},
                                                  setTitle,
                                                  setContent,
                                                  createCallback
                                              }) => {
    const titleValid = useMemo(() => {
        const titleLength = removeHTMLTags(note?.title).length;
        return titleLength > 0 && titleLength < MAX_TITLE_LENGTH
    }, [note])
    const contentValid = useMemo(() => {
        const contentLength = removeHTMLTags(note?.content).length;
        return contentLength > 0 && contentLength < MAX_CONTENT_LENGTH
    }, [note])

    const handleSubmit = () => {
        createCallback()
    }

    const createMode = !note.id;

    return (
        <div className="add-note">
            <label>
                {createMode ? 'Title:' : 'Edit Title:'}
                <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    value={note.title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                />
            </label>
            <NoteValidationMessage text={note.title.length ===0 ? '' : `maximum title length is ${MAX_TITLE_LENGTH} characters
            maximum length exceeded by ${note.title.length - MAX_TITLE_LENGTH} characters`}
                                   isValid={titleValid}/>
            <label>
                {createMode ? 'Content:' : 'Edit Content:'}
                <textarea
                    id="content"
                    placeholder="Content"
                    value={note.content}
                    onChange={(event) => setContent(event.currentTarget.value)}
                />
            </label>
            <NoteValidationMessage text={note.content.length === 0 ? '' : `maximum content length is ${MAX_CONTENT_LENGTH} characters
            maximum length exceeded by ${note.content.length - MAX_CONTENT_LENGTH} characters`}
                                   isValid={contentValid}/>
            <button onClick={handleSubmit}
                    disabled={!titleValid || !contentValid}>
                {createMode ? 'Add note' : 'Edit note'}
            </button>
        </div>
    )
}