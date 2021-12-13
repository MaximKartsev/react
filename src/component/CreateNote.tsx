import * as React from "react"
import {useState} from "react"
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {addNoteAction} from "../store/actionCreators";

export const CreateNote: React.FC = () => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const maxTitleLength = 50
    const maxContentLength = 2000

    const dispatch: Dispatch<any> = useDispatch()

    const saveNoteDispatch = React.useCallback(
        (note: INote) => dispatch(addNoteAction(note)),
        [dispatch]
    )

    const filterTags = (value: string) => {
        return value
            .replaceAll("<iframe>", "")
            .replaceAll("<script>", "");
    }

    const addNewNote = (e: React.FormEvent) => {
        e.preventDefault()
        if(title.length > maxTitleLength || content.length > maxContentLength) {
            return
        }
        saveNoteDispatch({
            id: Date.now() + Math.random().toString(),
            title: filterTags(title),
            content: filterTags(content)
        })
    }

    return (
        <form onSubmit={addNewNote} className="add-note">
            <label>
                Title:
                <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                />
            </label>
            {title.length > maxTitleLength && <p>maximum title length is {maxTitleLength} characters</p>}
            <label>
                Content:
                <textarea
                    id="content"
                    placeholder="Content"
                    value={content}
                    onChange={(event) => setContent(event.currentTarget.value)}
                />
            </label>
            {content.length > maxContentLength && <p>maximum content length is {maxContentLength} characters</p>}
            <button disabled={!title || !content}>
                Add note
            </button>
        </form>
    )
}