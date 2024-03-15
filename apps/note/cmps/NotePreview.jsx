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
    const [isEditing, setIsEditing] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(note)
    const [isPinned, setIsPinned] = useState(note.isPinned)

    useEffect(() => {
        // note.isPinned = noteIsPinned

    }, [])

    function onChangeStyle(newStyle) {
        setPreviewStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }

    // function onChangeColor(color) {
    //     noteToEdit.style.backgroundColor = color
    //     noteService.save(noteToEdit)
    //         .then((savedNote) => {
    //             setNoteToEdit({ ...savedNote })
    //             setIsColorPicker(false)
    //         })
    // }

    function onTogglePin() {
        noteToEdit.isPinned = !noteToEdit.isPinned
        onUpdateNote(noteToEdit)
    }

    if (!note) return <div>loading...</div>
    return <article style={previewStyle} onClick={() => setIsEditing(true)} className="note-preview flex column">

        <button title={isPinned ? "Unpin" : "Pin"} className="pin" onClick={() => {
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
        // onChangeStyle={onChangeStyle} previewStyle={previewStyle} 
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

        <div className="note-actions">
            <button title="Pick a color"
                onClick={() => { setIsPallete((prevIsPallete) => !prevIsPallete) }}
            >  {/*value="color" 
            onClick={(ev) => { setCmpType(ev.target.value) }}   */}

                {/* <DynamicCmp cmpType={cmpType} onChangeStyle={onChangeStyle} previewStyle={previewStyle} /> */}
                <span className="material-symbols-outlined">
                    palette
                </span>
            </button>
            <button title="Add image"><span className="material-symbols-outlined">
                image
            </span></button>
            <button title="Add video"><span className="material-symbols-outlined">
                videocam
            </span></button>
            <button title="Todo list"><span className="material-symbols-outlined">
                select_check_box
            </span></button>
            <button title="Copy note" onClick={() => onDuplicate(note)}><span className="material-symbols-outlined">
                file_copy
            </span></button>
            <button title="Share"><span className="material-symbols-outlined">
                mail
            </span></button>
            <button title="Delete" className="remove-btn" onClick={() => onRemoveNote(note.id)}><span className="material-symbols-outlined">
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