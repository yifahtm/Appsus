const { useState, useEffect } = React
import { noteService } from '../services/note.service.js'

import { NoteEdit } from '../NoteEdit.jsx'

export function NoteTxt({ note, onUpdateNote }) {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className="note-txt flex">
            {!isEditing && (
                <div onClick={() => setIsEditing(prevIsEdit => !prevIsEdit)}>
                    <React.Fragment>
                        <h2>{note.info.title}</h2>
                        <h2 className="note-content">{note.info.desc}</h2>
                    </React.Fragment>
                </div>
            )}

            {isEditing && (
                <NoteEdit
                    note={note}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    onUpdateNote={onUpdateNote}
                />
            )}
        </div>
    )
}