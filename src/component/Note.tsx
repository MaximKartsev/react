import * as React from "react"
import {useEffect, useState} from "react"
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {addNoteAction, editNoteAction} from "../store/actionCreators";
import {NoteLengthValidator} from "./validator/NoteLengthValidator";

export enum InteractionType {
    CreateNote = 'CreateNote',
    EditNote = 'EditNote'
}

type NoteProps = {
    readonly interactionType: InteractionType
    readonly note: INote
}

export const Note: React.FC<NoteProps> = ({interactionType, note}) => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [titleValid, setTitleValid] = useState<boolean>()
    const [contentValid, setContentValid] = useState<boolean>()

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
        saveNoteDispatch({
            id: Date.now() + Math.random().toString(),
            title: filterTags(title),
            content: filterTags(content)
        })
    }

    const editNoteHandler = (e: React.FormEvent) => {
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
            <NoteLengthValidator value={title}
                                 fieldName = {'title'}
                                 maxLength = {50}
                                 callback={(valid) => setTitleValid(valid)}/>
            <label>
                {interactionType === InteractionType.CreateNote ? 'Content:' : 'Edit Content:'}
                <textarea
                    id="content"
                    placeholder="Content"
                    value={content}
                    onChange={(event) => setContent(event.currentTarget.value)}
                />
            </label>
            <NoteLengthValidator value={content}
                                        fieldName = {'content'}
                                        maxLength = {1000}
                                        callback={(valid) => setContentValid(valid)}/>
            <button disabled={!titleValid || !contentValid}>
                {interactionType === InteractionType.CreateNote ? 'Add note' : 'Edit note'}
            </button>
        </form>
    )
}