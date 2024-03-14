const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { DynamicCmp } from '../cmps/dynamic-inputs/DynamicCmp.jsx'

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const [cmpType, setCmpType] = useState('color')
    const [previewStyle, setPreviewStyle] = useState({ backgroundColor: 'white' })
    const [isEditing, setIsEditing] = useState(false)
    // const [isPinned, setIsPinned] = useState(false)

    function onChangeStyle(newStyle) {
        setPreviewStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }

    if (!note) return <div>loading...</div>
    return <article style={previewStyle} onClick={() => setIsEditing(prevIsEd => true)} className="note-preview flex column">
        <h2>{note.title}</h2>
        <p>{note.desc}</p>
        <section>
            <select onChange={(ev) => { setCmpType(ev.target.value) }}>
                <option value="none" select>None</option>
                <option value="color">Color</option>
            </select>
        </section>
        <DynamicCmp cmpType={cmpType} onChangeStyle={onChangeStyle} previewStyle={previewStyle} />

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