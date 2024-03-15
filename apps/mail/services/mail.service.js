
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
    getDefaultFilter
}

_createMails()

const loggedInUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

function query(filterBy = getDefaultFilter()) {


    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.search) {
                const regex = new RegExp(filterBy.search, 'i')
                mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.body))
                // mails = mails.filter(mail => mail.title.includes(filterBy) || mail.body.includes(filterBy))
            }
            // if (filterBy.minSpeed) {
            //     cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
            // }
            // if (filterBy.desc) {
            //     const regex = new RegExp(filterBy.desc, 'i')
            //     cars = cars.filter(car => regex.test(car.desc))
            // }
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
    return { search: '', read: '' }
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
        },]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}
