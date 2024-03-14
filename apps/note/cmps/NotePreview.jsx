const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteEdit } from '../cmps/NoteEdit.jsx'

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    // const [noteStyle, setNoteStyle] = useState({ backgroundColor: note.style.backgroundColor })
    const [isEditing, setIsEditing] = useState(false)
    // const [isPinned, setIsPinned] = useState(false)
    console.log(isEditing);

    function onChangeStyle(newStyle) {
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }

    if (!note) return <div>loading...</div>
    return <article onClick={() => setIsEditing(prevIsEd => true)} className="note-preview flex column">
        <h2>{note.title}</h2>
        {/* <h5>Created at: {note.createdAt}</h5> */}
        <p>{note.desc}</p>
        {/* <img src={`assets/img/audi.jpg`} /> */}

        <div className="note-actions">
            <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>
        </div>
        {isEditing && <NoteEdit
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onUpdateNote={onUpdateNote}
            noteId={note.id} />}
    </article>
}