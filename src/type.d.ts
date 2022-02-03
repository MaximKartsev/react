interface INote {
    id?: string
    title: string
    content: string
}

type NoteState = {
    notes: INote[]
}

type NoteAction = {
    type: string
    note: INote
}

type ViewState = {
    type: string
    note?: INote
}

type ViewAction = {
    type: string
    note?: INote
}

type NoteDispatchType = (args: NoteAction) => NoteAction
type ViewDispatchType = (args: ViewAction) => ViewAction