const { useState, useEffect } = React

import { DynamicCmp } from '../cmps/dynamic-inputs/DynamicCmp.jsx'

export function NoteAdd({
    addNote,
    // onUpdateNote,noteId
}) {
    const [newNote, setNewNote] = useState({ title: '', desc: '' })
    const [isShown, setIsShown] = useState(false)
    // const [cmpType, setCmpType] = useState(note.type)



    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        // console.log(target);
        setNewNote((prevNote) => ({ ...prevNote, [field]: value }))
        // console.log(newNote);
    }

    function onAddNote(ev) {
        ev.preventDefault()
        addNote(newNote)
        // console.log(newNote);
    }

    // const { title, txt } = newNote
    return <div className="note-add flex justify-center">
        <form className="flex column" onSubmit={onAddNote}>
            <input className="input-add" onClick={() => {
                setIsShown(true)
            }}
                placeholder={isShown ? "Title" : "New Note..."}
                type="text"
                id="add"
                name="title"
                onChange={handleChange}
                value={newNote.title}
            />
            {isShown &&
                <div><input className="input-add"
                    placeholder="New note....."
                    type="text"
                    id="desc"
                    name="desc"
                    onChange={handleChange}
                    value={newNote.desc}
                />
                    {/* <DynamicCmp
                        onUpdateNote={onUpdateNote}
                        note={note}
                        cmpType={cmpType}
                    /> */}
                    <div className="note-add-actions flex ">
                        <button className="btn-note" onclick={() => setCmpType('NoteImg')} title="Add image"><span className="material-symbols-outlined">
                            image
                        </span></button>
                        <button className="btn-note" onclick={() => setCmpType('NoteVideo')} title="Add video"><span className="material-symbols-outlined">
                            videocam
                        </span></button>
                        <button className="btn-note" onclick={() => setCmpType('NoteTodo')} title="Add Todo list"><span className="material-symbols-outlined">
                            select_check_box
                        </span></button>
                    </div></div>}
            <button className="btn-note btn-closure" title="Close" onClick={() => {
                setIsShown(false)
            }}>closure</button>
        </form>
    </div>
}