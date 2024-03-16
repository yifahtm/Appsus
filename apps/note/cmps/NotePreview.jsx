const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { ColorInput } from '../cmps/dynamic-inputs/ColorInput.jsx'
import { DynamicCmp } from '../cmps/dynamic-inputs/DynamicCmp.jsx'

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export function NotePreview({ note, onRemoveNote, onUpdateNote, onDuplicate }) {
    const [cmpType, setCmpType] = useState(note.type)
    const [previewStyle, setPreviewStyle] = useState({ backgroundColor: 'white' })
    const [isPallete, setIsPallete] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(note)
    const [isPinned, setIsPinned] = useState(note.isPinned)

    useEffect(() => {
        // note.isPinned = noteIsPinned

    }, [])

    function onChangeStyle(newStyle) {
        setPreviewStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }

    function onTogglePin() {
        noteToEdit.isPinned = !noteToEdit.isPinned
        onUpdateNote(noteToEdit)
    }

    if (!note) return <div>loading...</div>
    return <article style={previewStyle} onClick={() => setIsEdit(true)} className="note-preview flex column">

        <button title={isPinned ? "Unpin" : "Pin"} className="btn-note pin" onClick={() => {
            onTogglePin()
            setIsPinned((prevIsPin) => !prevIsPin)
            // onTogglePin(isPinned)
        }}><span className="material-symbols-outlined">
                keep
            </span></button>

        <DynamicCmp
            onUpdateNote={onUpdateNote}
            note={note}
            cmpType={cmpType}
        />

        {
            isPallete && <ColorInput
                previewStyle={previewStyle}
                onChangeStyle={onChangeStyle} />
        }

        {/* {!isEditing && <React.Fragment>
            <h2>{note.title}</h2>
            <p>{note.desc}</p>
        </React.Fragment>
        } */}

        <div className="note-actions flex wrap">
            <button className="btn-note" title="Pick a color"
                onClick={() => { setIsPallete((prevIsPallete) => !prevIsPallete) }}>
                <span className="material-symbols-outlined">
                    palette
                </span>
            </button>
            <button className="btn-note" onclick={() => setCmpType('NoteImg')} title="Add image"><span className="material-symbols-outlined">
                image
            </span></button>
            <button className="btn-note" onclick={() => setCmpType('NoteVideo')} title="Add video"><span className="material-symbols-outlined">
                videocam
            </span></button>
            <button className="btn-note" onclick={() => setCmpType('NoteTodo')} title="Add Todo list"><span className="material-symbols-outlined">
                select_check_box
            </span></button>
            <button className="btn-note" title="Add audio"><span class="material-symbols-outlined">
                music_note
            </span></button>
            <button className="btn-note" title="Add scribble"><span class="material-symbols-outlined">
                brush
            </span></button>
            <button className="btn-note" title="Add map"><span class="material-symbols-outlined">
                pin_drop
            </span></button>
            <button className="btn-note" title="Add voice message"><span class="material-symbols-outlined">
                mic
            </span></button>
            <button className="btn-note" title="Copy note" onClick={() => onDuplicate(note)}><span className="material-symbols-outlined">
                file_copy
            </span></button>
            <button className="btn-note" title="Share"><span className="material-symbols-outlined">
                mail
            </span></button>
            <button className="btn-note remove-btn" title="Delete" onClick={() => onRemoveNote(note.id)}><span className="material-symbols-outlined">
                delete
            </span>
            </button>
            {/* {isEditing && <NoteEdit
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onUpdateNote={onUpdateNote}
                noteId={note.id} />} */}
        </div>
    </article>
}