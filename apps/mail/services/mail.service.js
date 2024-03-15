
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
// import { storageService } from '.../se'

const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getDefaultSortBy
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
            if (sortBy.subject !== undefined) {
                mails = mails.sort((m1, m2) => m1.subject.localeCompare(m2.subject))
                // * gSortBy
            }

            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}


function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    let newMail = _createMail(mail)
    return storageService.post(MAIL_KEY, newMail)
}

function getDefaultSortBy() {
    return {}
}

function _createMail({ subject, to, body }) {
    const mail = getEmptyMail()
    mail.subject = subject
    mail.to = to
    mail.body = body
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
    return { search: '', read: 'all' }
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
            sentAt: 1551133930594,
            removedAt: null,
            from: 'dingo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Ummm',
            body: 'How do i use this?',
            isRead: false,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'dingo@momo.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Ummm',
            body: 'How do i use this?',
            isRead: true,
            isStarred: true,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'dingo@momo.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Am trying to see summ',
            body: 'did this sorting shit work?',
            isRead: false,
            isStarred: true,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'lolo@haha.com'
        },]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}
