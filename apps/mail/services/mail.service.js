
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
            // if (filterBy.txt) {
            //     const regex = new RegExp(filterBy.txt, 'i')
            //     cars = cars.filter(car => regex.test(car.vendor))
            // }
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
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        mail = _createMail(mail.subject, mail.to, mail.body)
        return storageService.post(MAIL_KEY, mail)
    }
}


function _createMail(subject, to, body) {
    const mail = getEmptyMail()

    mail.subject = subject
    mail.to = to
    mail.body = body
}

function getEmptyMail() {
    return {
        to: '',
        from: loggedInUser.email,
        subject: '',
        body: ''
    }
}

function getDefaultFilter() {
    return { search: '', read: true }
}


function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [{
            id: utilService.makeId(),
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Hey!',
            body: 'I just met you... and this is crazy',
            isRead: false,
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
            sentAt: 1551133930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'dingo@momo.com'
        },]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}
