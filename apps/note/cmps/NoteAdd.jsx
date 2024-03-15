const { useState, useEffect } = React

export function NoteAdd({ addNote }) {
    const [newNote, setNewNote] = useState({ title: '', desc: '' })
    const [isShown, setIsShown] = useState(false)



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
    return <div className="add-note flex justify-center">
        <form className="flex column" onSubmit={onAddNote}>
            <input onClick={() => {
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
                <div><input
                    placeholder="New note....."
                    type="text"
                    id="desc"
                    name="desc"
                    onChange={handleChange}
                    value={newNote.desc}
                />
                    <div className="note-add-actions flex ">
                        <button><span className="material-symbols-outlined">
                            image
                        </span></button>
                        <button><span className="material-symbols-outlined">
                            videocam
                        </span></button>
                        <button><span className="material-symbols-outlined">
                            select_check_box
                        </span></button>
                        <button><span className="material-symbols-outlined">
                            file_copy
                        </span></button>
                        <button><span className="material-symbols-outlined">
                            mail
                        </span></button>
                    </div></div>}
            <div><button onClick={() => {
                setIsShown(false)
            }}>closure</button></div>
        </form>
    </div>
}