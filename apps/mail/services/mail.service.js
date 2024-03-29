
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
// import { storageService } from '.../se'

const MAIL_KEY = 'mailDB'
const TRASH_KEY = 'trashDB'

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getDefaultSortBy,
    editMail
}

_createMails()

const loggedInUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSortBy()) {

    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.search) {
                const regex = new RegExp(filterBy.search, 'i')
                mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.body))
            }
            if (filterBy.read === 'read') {
                mails = mails.filter(mail => mail.isRead)
            }
            if (filterBy.read === 'unread') {
                mails = mails.filter(mail => !mail.isRead)
            }
            if (filterBy.category === 'starred') {
                mails = mails.filter(mail => mail.isStarred)
            }
            // if (filterBy.category === 'delete') {
            //     mails = mails.filter(mail => mail.DeletedAt === null)
            // }else {
            //     mails = mails.filter(mail => mail.DeletedAt !== null) 
            // }
            if (sortBy.subject !== undefined) {
                mails = mails.sort((m1, m2) => m1.subject.localeCompare(m2.subject) * sortBy.subject)
            }
            if (sortBy.date !== undefined) {
                mails = mails.sort((m1, m2) => (new Date(m1.sentAt) - new Date(m2.sentAt)) * sortBy.date)
            }
            return mails
        })
}

function getUnreadCount(mails){
    mails = mails.filter(mail => mail.from === 'user@appsus.com')
    return mails.filter(mail => mail.isRead === true).length
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}


// function addToTrash(mailId) {
//     get(mailId)
//         .then(mail => storageService.post(TRASH_KEY, mail))
//         .then(remove(mailId))
//         .finally(console.log('i did it!'))
//         .catch(err => console.log('i couldnt do it so sorry', err))
// }

// function getTrash() {
//     return storageService.query(TRASH_KEY)
//         .then(trash => {
//             return trash
//         })
// }


function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    let newMail = _createMail(mail)
    return storageService.post(MAIL_KEY, newMail)
}

function editMail(mail) {
    return storageService.put(MAIL_KEY, mail)
}

function getDefaultSortBy() {
    return {}
}

function _createMail({ subject, to, body }) {
    const mail = getEmptyMail()
    let date = new Date()
    mail.subject = subject
    mail.to = to
    mail.body = body
    mail.sentAt = date.getTime()

    return mail
}

function getEmptyMail() {
    return {
        id: utilService.makeId(),
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: loggedInUser.email,
        to: ''
    }
}

function getDefaultFilter() {
    return { search: '', read: 'all', category: null}
}


function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [{
            id: utilService.makeId(),
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Hey!',
            body: 'I just met you... and this is crazy',
            isRead: true,
            isStarred: false,
            sentAt: 1679075200000,
            removedAt: null,
            from: 'dingo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: '  Hes behind me',
            body: 'help help help help help help help help',
            isRead: false,
            isStarred: true,
            sentAt: 1647478755000,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'puki@momo.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Ummm',
            body: 'How do i use this?',
            isRead: true,
            isStarred: true,
            sentAt: 1681185600000,
            removedAt: null,
            from: 'fakemail@fakemail',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Am trying to see summ',
            body: 'did this sorting shit work?',
            isRead: false,
            isStarred: true,
            sentAt: 1685001600000,
            removedAt: null,
            from: 'lolo@haha.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: 'But wait... ',
            body: 'I can sort things bitches!!!!!!',
            isRead: false,
            isStarred: true,
            sentAt: 1685001600000,
            removedAt: null,
            from: 'lolo@haha.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Making fake emails',
            body: 'Its not easy alright... ',
            isRead: false,
            isStarred: true,
            sentAt: 1685001600000,
            removedAt: null,
            from: 'lolo@haha.com',
            to: 'user@appsus.com'
        },]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}
