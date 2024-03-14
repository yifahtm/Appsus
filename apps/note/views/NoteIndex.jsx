const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NotePreview } from '../cmps/NotePreview.jsx'
// import { NoteFilter } from './../cmps/NoteFilter.jsx'
// import { NOteFilterDesc } from './../cmps/NoteFilterDesc.jsx'

import { noteService } from './../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function NoteIndex() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        // const unsub = eventBusService.createEventEmitter('note-updated', loadNotes)
        loadNotes()
        // return () => {
        //     unsub(); // Clean up the listener
        // };
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

    // console.log('notes from note index', notes)
    // console.log('selectedNote from note index', selectedNote)
    const { title, createdAt, desc } = filterBy
    if (!notes) return <div>loading...</div>
    if (!notes || !notes.length) return <p>No notes to display.</p>;
    return <section className="note-index">
        {/* <NoteFilter
            onSetFilter={onSetFilter}
            filterBy={{ txt, minSpeed }} /> */}

        {/* <NoteFilterDesc
            onSetFilter={onSetFilter}
            filterBy={{ desc }} /> */}

        <Link to="/note/edit"><button>Add a note</button></Link>
        <article className="note-container">
            {notes.map(note => <React.Fragment key={note.id}>
                <Link to={`/note/edit/?${note.id}`}>
                    <NotePreview
                        note={note}
                        onRemoveNote={onRemoveNote}
                        onUpdateNote={onUpdateNote}
                    />
                </Link></React.Fragment>)}
            {/* <div className="note-actions">
            <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button> */}

            {/* <Link to={`/note/edit/${note.id}`}><button>Edit note</button></Link> */}
            {/* </div> */}
            {/* </Link> */}
        </article>
    </section >
}