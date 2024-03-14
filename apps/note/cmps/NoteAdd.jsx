const { useState, useEffect } = React

export function NoteAdd({ addNote }) {
    const [newNote, setNewNote] = useState({ title: '', desc: '' })



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
    return <div className="add-note-form flex justify-center">
        <form onSubmit={onAddNote}>
            <label htmlFor="add"></label>
            <input
                placeholder="Take a note"
                type="text"
                id="add"
                name="title"
                onChange={handleChange}
                value={newNote.title}
            />
            <input
                placeholder="Add description here.."
                type="text"
                id="desc"
                name="desc"
                onChange={handleChange}
                value={newNote.desc}
            />

            <button>add</button>
        </form>
    </div>
}