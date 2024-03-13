const { useState, useEffect, useRef } = React
const { useNavigate, useParams } = ReactRouter

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"


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
            .then(note => {
                setNoteToEdit(note)
            })
            .catch(err => {
                console.log('Had issues loading note', err)
                showUserMsg(`Could not load`)
                navigate('/note')
            })
    }


    function onSaveNote(ev) {
        ev.preventDefault()

        noteService.save(noteToEdit)
            .then(savedNote => {
                console.log(savedNote)
                showSuccessMsg(`Note saved successfully ${savedNote.id}`)
                // eventBusService.emit('note-updated')
                navigate('/note')
            })
            .catch(err => {
                console.log('Had issues saving note', err)
                showErrorMsg('could not save note')
            })

    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
            case 'date':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, [field]: value || '' }))
    }

    const { title, createdAt, desc } = noteToEdit
    if (!noteToEdit || typeof noteToEdit.title === 'undefined') return <div>Loading details..</div>
    return (
        <section className="note-edit">
            <h3>Edit Note</h3>
            <form className="note-edit flex column" onSubmit={onSaveNote} >
                <div className="input-container flex align-center">
                    <label htmlFor="note-title">Title:</label>
                    <input
                        type="text"
                        id="note-title"
                        placeholder="Enter title"
                        ref={inputRef}

                        name="title"
                        onChange={handleChange}
                        value={title || ''}
                    />
                </div>
                {/* <div className="input-container flex align-center">
                    <label htmlFor="note-created-at">Created at:</label>
                    <input
                        type="date"
                        id="note-created-at"
                        placeholder="Enter creation time"

                        name="createdAt"
                        onChange={handleChange}
                        value={createdAt}
                    />
                </div> */}
                <div className="input-container flex align-center">
                    <label htmlFor="note-desc">Description:</label>
                    <input
                        type="text"
                        id="note-desc"
                        placeholder="Enter description"
                        ref={inputRef}

                        name="desc"
                        onChange={handleChange}
                        value={desc}
                    />
                </div>

                <button>Save</button>
            </form>
        </section>
    )
}