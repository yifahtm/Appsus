
const { useState, useEffect } = React
const { Link, Outlet, useSearchParams } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouter

import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteFilter } from './../cmps/NoteFilter.jsx'
// import { NOteFilterDesc } from './../cmps/NoteFilterDesc.jsx'

import { noteService } from './../services/note.service.js'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const { noteId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    // const [previewStyle, setPreviewStyle] = useState({ backgroundColor: 'white' })
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromParams(searchParams))
    // const [isPinned, setIsPinned] = useState(note.isPinned)

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

    function addNote(note) {
        noteService.save(note)
            .then((updatedNote) => {
                setNotes(prevNotes => [updatedNote, ...prevNotes])
                showSuccessMsg(`Successfully saved note #${note.id}`)
            })

            .catch(err => {
                console.log(err)
                showErrorMsg('Could not save note', err)
            })
    }

    function onUpdateNote(noteToUpdate) {
        notes
            .sort((note1, note2) =>
                (note1.isPinned + '').localeCompare(note2.isPinned + '')
            )
            .reverse()
        noteService.save(noteToUpdate)
            .then((saved) => {
                setNotes((prevNotes) => prevNotes.map((note) => note.id === saved.id ? saved : note))
            })
    }

    function onDuplicate(note) {
        console.log(note);
        const duplicateNote = { ...note, id: '', createdAt: Date.now() }
        noteService.save(duplicateNote)
            .then((saved) => {
                setNotes((prevNotes) => [saved, ...prevNotes])
                showSuccessMsg('Note copied')
            })
            .catch(err => showErrorMsg('could not copy', err))
    }

    const { title, createdAt, desc } = filterBy
    if (!notes) return <div>loading...</div>

    return <section className="note-index">
        <NoteFilter
            onSetFilter={onSetFilter}
            filterBy={filterBy} />

        {/* <NoteFilterDesc
            onSetFilter={onSetFilter}
            filterBy={{ desc }} /> */}
        {/* {notes.find(note=> {return note.id===noteId */}
        <NoteAdd
            addNote={addNote}
        // onUpdateNote={onUpdateNote}
        // note={note}
        />
        {/* )} */}
        {!notes || !notes.length && <p>No notes to display.</p>}
        {!noteId &&
            <ul className="note-container clean-list  ">
                {
                    notes.map(note => (
                        <li key={note.id}>
                            {/* <Link to={`/note/edit/${note.id}`}> */}
                            <NotePreview
                                // setIsEdit={setIsEdit}
                                note={note}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                                onDuplicate={onDuplicate}
                            />
                            {/* </Link> */}
                        </li>)
                    )}
            </ul>}
        <Outlet context={[onUpdateNote]}></Outlet>
    </section >
}