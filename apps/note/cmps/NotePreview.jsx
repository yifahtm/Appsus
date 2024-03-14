const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { DynamicCmp } from '../cmps/dynamic-inputs/DynamicCmp.jsx'

import { noteService } from "../services/note.service.js"

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const [cmpType, setCmpType] = useState('color')
    const [previewStyle, setPreviewStyle] = useState({ backgroundColor: 'white' })
    const [isEditing, setIsEditing] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(note)
    const [isPinned, setIsPinned] = useState(note.isPinned)

    useEffect(() => {
        // note.isPinned = noteIsPinned

    }, [])

    function onChangeStyle(newStyle) {
        setPreviewStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }

    // function onTogglePin() {
    //     noteToEdit.isPinned = !noteToEdit.isPinned
    //     noteService.save(noteToEdit)
    //         .then((savedNote) => {
    //             setNoteToEdit({ ...savedNote })
    //         })
    // }

    if (!note) return <div>loading...</div>
    return <article style={previewStyle} onClick={() => setIsEditing(true)} className="note-preview flex column">

        <button className="pin" onClick={() => {
            onTogglePin()
            setIsPinned((isPin) => !isPin)
            onTogglePin(isPinned)
        }}>pin</button>
        {!isEditing && <React.Fragment>
            <h2>{note.title}</h2>
            <p>{note.desc}</p>
        </React.Fragment>
        }

        <div className="note-actions">
            <button value="color" onClick={(ev) => { setCmpType(ev.target.value) }} >
                <DynamicCmp cmpType={cmpType} onChangeStyle={onChangeStyle} previewStyle={previewStyle} />
                Color
            </button>
            <button>Picture</button>
            <button>Video</button>
            <button>Todo List</button>
            <button>Copy</button>
            <button>Email</button>
            <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>
        </div>
        {isEditing && <NoteEdit
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onUpdateNote={onUpdateNote}
            noteId={note.id} />}
    </article>
}