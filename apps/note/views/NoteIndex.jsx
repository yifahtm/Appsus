const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NotePreview } from '../cmps/NotePreview.jsx'
// import { NoteFilter } from './../cmps/NoteFilter.jsx'
// import { CarFilterDesc } from './../cmps/CarFilterDesc.jsx'

import { noteService } from './../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function NoteIndex() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        loadNotes()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        console.log('fieldsToUpdate', fieldsToUpdate)

        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadNotes() {
        noteService.query(filterBy)
            .then((notes) => {
                console.log(notes)
                setNotes(notes)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note removed successfully (${noteId})`)
            })
            .catch((err) => {
                console.log('Had issues removing note', err)
                showErrorMsg(`Could not remove note #(${noteId})`)
            })
    }

    function onUpdateNote(noteToUpdate) {
        noteService.save(noteToUpdate)
            .then((savedNote) => {
                setNotes(prevNotes => prevNotes.map(note => note.id === savedNote.id ? savedNote : note))
                showSuccessMsg(`Note updated successfully (${noteToUpdate.id})`)
            })
            .catch(err => {
                console.log('Had issues with updating note', err)
                showErrorMsg(`Could not update note (${noteToUpdate.id})`)
            })
    }

    // console.log('cars from car index', cars)
    // console.log('selectedCar from car index', selectedCar)
    const { title, createdAt, desc } = filterBy
    if (!notes) return <div>loading...</div>
    return <section className="note-index">
        {/* <NoteFilter
            onSetFilter={onSetFilter}
            filterBy={{ txt, minSpeed }} /> */}

        {/* <CarFilterDesc
            onSetFilter={onSetFilter}
            filterBy={{ desc }} /> */}

        {/* <Link to="/note/edit"><button>Add a note</button></Link> */}
        {/* <DataTable cars={cars} onRemoveCar={onRemoveCar} /> */}
        <NotePreview
            notes={notes}
            onRemoveNote={onRemoveNote}
            onUpdateNote={onUpdateNote}
        />
    </section >
}