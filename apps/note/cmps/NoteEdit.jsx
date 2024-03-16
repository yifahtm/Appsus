const { useState, useEffect, useRef } = React
const { useNavigate, useParams } = ReactRouter
// const { Outlet, useOutletContext } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"


export function NoteEdit({ noteId, onUpdateNote, isEditing, setIsEditing }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    // const { noteId } = useParams()
    // const [onUpdateNote] = useOutletContext()


    useEffect(() => {
        if (noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(noteId)
            .then(setNoteToEdit)
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
                onUpdateNote(savedNote)
                setIsEditing(isEditing => false)
                console.log(savedNote, 'saved successfuly')
                showSuccessMsg(`Note saved successfully ${savedNote.id}`)
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

    console.log(noteToEdit)
    const { title, desc } = noteToEdit
    if (!noteToEdit) return <div>Loading details..</div>
    return (
        <section className="note-edit">
            <h3>Edit Note</h3>
            <form className="note-edit flex column" onSubmit={onSaveNote} >
                <div className="input-container flex align-center">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleChange}
                        value={title || ''}
                    />
                </div>
                <div className="input-container flex align-center">
                    <label htmlFor="desc">Description:</label>
                    <input
                        type="text"
                        id="desc"
                        name="desc"
                        onChange={handleChange}
                        value={desc}
                    />
                </div>

                <button className="btn-note">Save</button>
            </form>
        </section>
    )
}