const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NotePreview({ notes, onRemoveNote, onUpdateNote }) {
    if (!notes || !notes.length) return <p>No notes to display.</p>;
    return <article className="note-preview">
        {notes.map((note, index) => (<React.Fragment>
            <div key={index}>
                <h2>{note.title}</h2>
                <h5>Created at: {note.createdAt}</h5>
                <p>{note.info.desc}</p>
                <img src={`assets/img/audi.jpg`} />
                {/* Include other details and operations for each note */}
            </div>
            <div className="note-actions">
                <button className="remove-btn" onClick={() => onRemoveNote(note.id)}>X</button>

                {/* <Link to={`/car/edit/${car.id}`}><button>Edit car</button></Link> */}
            </div>
        </React.Fragment>
        ))}
    </article>
}