
const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM
const { useParams } = ReactRouter

import { NotePreview } from '../cmps/NotePreview.jsx'
// import { NoteFilter } from './../cmps/NoteFilter.jsx'
// import { NOteFilterDesc } from './../cmps/NoteFilterDesc.jsx'

import { noteService } from './../services/note.service.js'
import { NoteAdd } from "../cmps/NoteAdd.jsx"
// import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const { noteId } = useParams()
    // const [filterBy, setFilterBy] = useState(noteService.getFilterFromParams(searchParams))

    useEffect(() => {
        // setSearchParams(filterBy)
        loadNotes()
    }, [])

    function onSetFilter(fieldsToUpdate) {
        console.log('fieldsToUpdate', fieldsToUpdate)

        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadNotes() {
        noteService.query()
            .then((notes) => {
                console.log(notes)
                setNotes(notes)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMsg(`Note removed successfully (${noteId})`)
            })
            .catch((err) => {
                console.log('Had issues removing note', err)
                // showErrorMsg(`Could not remove note #(${noteId})`)
            })
    }

    function addNote(note) {
        noteService.save(note)
            .then((updatedNote) => {
                setNotes(prevNotes => [{ ...updatedNote }, ...prevNotes])
                // showSuccessMsg(`adding ${note.title}`)
            })

            .catch(err => {
                console.log(err)
                // showErrorMsg('already have it.', err)
            })
    }

    function onUpdateNote(noteToUpdate) {
        setNotes((prevNotes) => prevNotes.map((note) => note.id === noteToUpdate.id ? noteToUpdate : note))
    }

    // const { title, createdAt, desc } = filterBy
    if (!notes) return <div>loading...</div>

    return <section className="note-index">
        {/* <NoteFilter
            onSetFilter={onSetFilter}
            filterBy={{ txt, minSpeed }} /> */}

        {/* <NoteFilterDesc
            onSetFilter={onSetFilter}
            filterBy={{ desc }} /> */}
        <NoteAdd addNote={addNote} />
        {!notes || !notes.length && <p>No notes to display.</p>}
        {!noteId &&
            <ul className="note-index preview clean-list flex wrap space-around">
                {
                    notes.map(note => (
                        <li key={note.id}>
                            {/* <Link to={`/note/edit/${note.id}`}> */}
                            <NotePreview
                                // setIsEdit={setIsEdit}
                                note={note}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                            />
                            {/* </Link> */}
                        </li>)
                    )}
            </ul>}
        {/* <Outlet context={[onUpdateNote]}></Outlet> */}
    </section >
}