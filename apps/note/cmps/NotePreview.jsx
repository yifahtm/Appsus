const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { DynamicCmp } from '../cmps/dynamic-inputs/DynamicCmp.jsx'

import { noteService } from "../services/note.service.js"

export function NotePreview({ note, onRemoveNote, onUpdateNote, onChangeStyle }) {
    const [cmpType, setCmpType] = useState('color')
    const [previewStyle, setPreviewStyle] = useState({ backgroundColor: 'white' })
    const [isEditing, setIsEditing] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(note)
    const [isPinned, setIsPinned] = useState(note.isPinned)

    useEffect(() => {
        // note.isPinned = noteIsPinned

    }, [])



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
        }}><span class="material-symbols-outlined">
                keep
            </span></button>
        {!isEditing && <React.Fragment>
            <h2>{note.title}</h2>
            <p>{note.desc}</p>
        </React.Fragment>
        }

        <div className="note-actions">
            <button value="color" onClick={(ev) => { setCmpType(ev.target.value) }} >
                <DynamicCmp cmpType={cmpType} onChangeStyle={onChangeStyle} previewStyle={previewStyle} />
                <span class="material-symbols-outlined">
                    palette
                </span>
            </button>
            <button><span class="material-symbols-outlined">
                image
            </span></button>
            <button><span class="material-symbols-outlined">
                videocam
            </span></button>
            <button><span class="material-symbols-outlined">
                select_check_box
            </span></button>
            <button><span class="material-symbols-outlined">
                file_copy
            </span></button>
            <button><span class="material-symbols-outlined">
                mail
            </span></button>
            <button className="remove-btn" onClick={() => onRemoveNote(note.id)}><span class="material-symbols-outlined">
                delete
            </span></button>
        </div>
        {isEditing && <NoteEdit
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onUpdateNote={onUpdateNote}
            noteId={note.id} />}
    </article>
}