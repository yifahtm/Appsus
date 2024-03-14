const { useState, useEffect } = React

import { DynamicCmp } from '../cmps/dynamic-inputs/DynamicCmp.jsx'

export function NoteAdd({ onChangeStyle, onRemoveNote, addNote }) {
    const [newNote, setNewNote] = useState({ title: '', desc: '' })
    const [isShown, setIsShown] = useState(false)
    const [cmpType, setCmpType] = useState('color')
    const [previewStyle, setPreviewStyle] = useState({ backgroundColor: 'white' })



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
    return <div style={previewStyle} className="add-note flex justify-center">
        <form className="note-add-form flex column" onSubmit={onAddNote}>
            {/* <label htmlFor="add"></label> */}
            <input onClick={() => setIsShown(true)}
                placeholder="New note..."
                type="text"
                id="add"
                name="title"
                onChange={handleChange}
                value={newNote.title}
            />
            {isShown &&
                <React.Fragment><input
                    placeholder="New note....."
                    type="text"
                    id="desc"
                    name="desc"
                    onChange={handleChange}
                    value={newNote.desc}
                />
                    <div className="note-actions-add">
                        {/* <button value="color" onClick={(ev) => { setCmpType(cmpType) }} >
                    <DynamicCmp cmpType={cmpType} onChangeStyle={onChangeStyle} previewStyle={previewStyle} />
                    <span class="material-symbols-outlined">
                        palette
                    </span>
                </button> */}
                        <div>
                            <button><span class="material-symbols-outlined">
                                image
                            </span></button>
                            <button><span class="material-symbols-outlined">
                                videocam
                            </span></button>
                            <button><span class="material-symbols-outlined">
                                select_check_box
                            </span></button>
                            <button><span class="material-symbols-outlined">
                                file_copy
                            </span></button>
                            <button><span class="material-symbols-outlined">
                                mail
                            </span></button>
                            <button className="remove-btn" onClick={() => onRemoveNote(note.id)}><span class="material-symbols-outlined">
                                delete
                            </span></button>
                        </div>
                        <button onClick={() => setIsShown(false)}>closure</button>
                    </div>
                </React.Fragment>
            }

        </form>
    </div>
}