const { useState, useEffect, useRef } = React
const { useNavigate, useParams } = ReactRouter

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function NoteEdit() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const inputRef = useRef()
    const navigate = useNavigate()
    const { noteId } = useParams()

    useEffect(() => {
        console.log('inputRef', inputRef)
        inputRef.current.focus()
        if (noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(noteId)
            .then(note => setNoteToEdit(note))
            .catch(err => {
                console.log('Had issues loading note', err)
                navigate('/note')
            })
    }


    function onSaveNote(ev) {
        ev.preventDefault()

        noteService.save(noteToEdit)
            .then(savedNote => {
                navigate('/note')
                showSuccessMsg('Note saved successfully')
            })
            .catch(err => {
                console.log('Had issues saving note', err)
                showErrorMsg('could not save note')
            })

    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, [field]: value }))
    }

    const { title, createdAt, desc } = noteToEdit
    return (
        <section className="note-edit">
            <form onSubmit={onSaveNote} >
                <label htmlFor="note-title">Title:</label>
                <input
                    type="text"
                    id="note-title"
                    placeholder="Enter title"
                    ref={inputRef}

                    name="title"
                    onChange={handleChange}
                    value={title}
                />

                {/* <label htmlFor="note-created-at">Created at:</label>
                <input
                    type="number"
                    id="note-created-at"
                    placeholder="Enter creation time"

                    name="note-created-at"
                    onChange={handleChange}
                    value={createdAt}
                /> */}
                <label htmlFor="note-desc">Description:</label>
                <input
                    type="text"
                    id="note-desc"
                    placeholder="Enter description"
                    ref={inputRef}

                    name="note-desc"
                    onChange={handleChange}
                    value={desc}
                />


                <button>Save</button>
            </form>
        </section>
    )
}