import * as React from "react"
import {useState} from "react"
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {editNoteAction} from "../store/actionCreators";

type EditNoteProps = {
    note: INote
}

export const EditNote: React.FC<EditNoteProps> = ({note}) => {
    const [title, setTitle] = useState<string>(note.title)
    const [content, setContent] = useState<string>(note.content)
    const maxTitleLength = 50
    const maxContentLength = 1000

    const dispatch: Dispatch<any> = useDispatch()

    const editNoteDispatch = React.useCallback(
        (note: INote) => dispatch(editNoteAction(note)),
        [dispatch]
    )

    const filterTags = (value: string) => {
        return value
            .replaceAll("<iframe>", "")
            .replaceAll("<script>", "");
    }

    const editNoteHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (title.length > maxTitleLength || content.length > maxContentLength) {
            alert('Title or content length is greater than allowed')
            return
        }
        editNoteDispatch({
            id: note.id,
            title: filterTags(title),
            content: filterTags(content)
        })
    }

    return (
        <form onSubmit={editNoteHandler} className="add-note">
            <label>
                Edit Title:
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
                Edit Content:
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
                Edit note
            </button>
        </form>
    )
}