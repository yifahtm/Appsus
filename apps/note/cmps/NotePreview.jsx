const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    if (!note) return <div>loading...</div>
    return <article className="note-preview">
        <React.Fragment>
            <div>
                <h2>{note.title}</h2>
                <h5>Created at: {note.createdAt}</h5>
                <p>{note.desc}</p>
                {/* <img src={`assets/img/audi.jpg`} /> */}
            </div>
            <div className="note-actions">
                <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>

                <Link to={`/note/edit/${note.id}`}><button onClick={() => onUpdateNote(note.id)}>Edit note</button></Link>
            </div>
        </React.Fragment>
    </article>
}