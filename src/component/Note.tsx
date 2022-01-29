import * as React from "react"
import {useEffect, useState} from "react"
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {addNoteAction, editNoteAction} from "../store/actionCreators";

export enum InteractionType {
    CreateNote = 'CreateNote',
    EditNote = 'EditNote'
}

type NoteProps = {
    readonly interactionType: InteractionType
    note: INote
}

export const Note: React.FC<NoteProps> = ({interactionType, note}) => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const maxTitleLength = 50
    const maxContentLength = 1000

    useEffect(() => {
        setTitle(note.title)
        setContent(note.content)
    }, [note])

    const dispatch: Dispatch<any> = useDispatch()
    const saveNoteDispatch = (note: INote) => dispatch(addNoteAction(note));
    const editNoteDispatch = (note: INote) => dispatch(editNoteAction(note));

    const filterTags = (value: string) => {
        return value
            .replaceAll("<iframe>", "")
            .replaceAll("<script>", "");
    }

    const addNewNote = (e: React.FormEvent) => {
        e.preventDefault()
        if (title.length > maxTitleLength || content.length > maxContentLength) {
            alert('Title or content length is greater than allowed')
            return
        }
        saveNoteDispatch({
            id: Date.now() + Math.random().toString(),
            title: filterTags(title),
            content: filterTags(content)
        })
    }

    const editNoteHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (title.length > maxTitleLength || content.length > maxContentLength) {
            alert('Title or content length is greater than allowed')
            return
        }
        editNoteDispatch({...note, title: filterTags(title), content: filterTags(content)})
    }

    return (
        <form onSubmit={interactionType === InteractionType.CreateNote ? addNewNote : editNoteHandler} className="add-note">
            <label>
                {interactionType === InteractionType.CreateNote ? 'Title:' : 'Edit Title:'}
                <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                />
            </label>
            {title.length > maxTitleLength && (
                <React.Fragment>
                    <p>maximum title length is {maxTitleLength} characters</p>
                    <p>maximum length exceeded by {title.length - maxTitleLength} characters</p>
                </React.Fragment>
            )}
            <label>
                {interactionType === InteractionType.CreateNote ? 'Content:' : 'Edit Content:'}
                <textarea
                    id="content"
                    placeholder="Content"
                    value={content}
                    onChange={(event) => setContent(event.currentTarget.value)}
                />
            </label>
            {content.length > maxContentLength && (
                <React.Fragment>
                    <p>maximum content length is {maxContentLength} characters</p>
                    <p>maximum length exceeded by {content.length - maxContentLength} characters</p>
                </React.Fragment>
            )}
            <button disabled={!title || !content}>
                {interactionType === InteractionType.CreateNote ? 'Add note' : 'Edit note'}
            </button>
        </form>
    )
}