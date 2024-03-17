// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

const gNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        title: 'Bobi and Me',
        desc: 'Fullstack Me Baby!'
    },
    {

        id: 'n102',
        createdAt: 1112222,
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'assets/img/honda.jpg',
            title: 'Bobi and Me',
            desc: 'Fullstack Me Baby!'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n103',
        createdAt: 1112222,
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                {
                    id: 't103',
                    desc: 'Call the dentist',
                    doneAt: null
                },
                {
                    id: 't104',
                    desc: 'listen to better music',
                    doneAt: null,
                },
                {
                    id: 't105',
                    desc: 'find out who framed Roger Rabbit?',
                    doneAt: null,
                },
            ]
        }
    },
    {
        id: 'n104',
        createdAt: 1112222,
        type: 'NoteVideo',
        isPinned: false,
        style: {
            backgroundColor: 'rgb(211, 191, 219)',
        },
        info: {
            src: 'https://www.youtube.com/embed/jfKfPfyJRdk',
            title: 'Muppet show',
        },
    },
]
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    // getEmptyAllNote,
    // getEmptyImgNote,
    // getEmptyTodosNote,
    // getEmptyVideoNote,
    // getEmbedUrl,
    getDefaultFilter,
    getFilterFromParams,
    _setNextPrevNoteId
}
// For Debug only
window.ns = noteService


function query(filterBy = getDefaultFilter()) {
    console.log('filterBy', filterBy)

    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => regex.test(note.title))
            }
            if (filterBy.createdAt) {
                notes = notes.filter(note => note.createdAt >= filterBy.createdAt)
            }
            if (filterBy.desc) {
                const regex = new RegExp(filterBy.desc, 'i')
                notes = notes.filter(note => {
                    //todos is an array-fix
                    if (note.type === 'NoteTodos') regex.test(note.info.todos.desc)
                    else regex.test(note.info.desc)
                })
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevNoteId(note))
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    console.log(note)
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        note = _createNote(note.title, note.createdAt, note.desc)
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(title = '', desc = '') {
    return {
        createdAt: new Date(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#FFD59E',
        },
        title: 'Bobi and Me',
        desc,

    }
}

// function getEmptyAllNote() {
//     return {
//         id: '',
//         createdAt: new Date(),
//         type: '',
//         isPinned: false,
//         style: {
//             backgroundColor: 'rgb(226, 246, 211)',
//         },
//         info: null,
//     }
// }

// function getEmptyImgNote() {
//     return {
//         id: '',
//         createdAt: new Date(),
//         type: 'NoteImg',
//         isPinned: false,
//         style: {
//             backgroundColor: '#FFD59E',
//         },
//         info: {
//             url: '',
//             title: '',
//         },
//     }
// }

// function getEmptyVideoNote() {
//     return {
//         id: '',
//         createdAt: new Date(),
//         type: 'NoteVideo',
//         isPinned: false,
//         style: {
//             backgroundColor: 'rgb(246, 226, 221)',
//         },
//         info: {
//             src: '',
//             title: '',
//         },
//     }
// }

// function getEmptyTodosNote() {
//     return {
//         id: '',
//         createdAt: new Date(),
//         type: 'NoteTodo',
//         isPinned: false,
//         style: {
//             backgroundColor: '#E6E6FA',
//         },
//         info: {
//             title: '',
//             todos: [{ txt: null, doneAt: null }],
//         },
//     }
// }

// function getEmbedUrl(url) {
//     const regExp =
//         /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
//     const match = url.match(regExp)
//     return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : ''
// }


function getDefaultFilter() {
    return { title: '', createdAt: 50, desc: '' }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        title: searchParams.get('title') || defaultFilter.title,
        createdAt: searchParams.get('createdAt') || defaultFilter.createdAt,
        desc: searchParams.get('desc') || defaultFilter.desc
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = gNotes
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(title, createdAt = 250, desc = '') {
    const note = getEmptyNote(title, desc)
    note.id = utilService.makeId()
    const date = Date.now()
    note.createdAt = utilService.getFormattedDate(date)
    return note
}

function _setNextPrevNoteId(note) {
    return storageService.query(NOTE_KEY).then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}

