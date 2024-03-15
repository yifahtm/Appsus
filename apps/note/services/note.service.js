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
        info: {
            title: 'Bobi and Me',
            desc: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112222,
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
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
                { desc: 'Driving license', doneAt: null },
                { desc: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
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
    // return axios.get(CAR_KEY, carId)
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
    return { title, desc }
}

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
        // notes.push(_createNote('audu', 300))
        // notes.push(_createNote('fiak', 120))
        // notes.push(_createNote('subali', 50))
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

