const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState()

    useEffect(() => {
        loadMails()
    }, [])
    // //filter by in the empty array

    function loadMails() {
        mailService
            .query()
            .then(setMails)
            // .then(setMails)
            .catch(err => console.log('Had issues with loading mails: ', err))
    }

    function onRemoveMail(mailId) {
        mailService
            .remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
            })
            .catch(err => {
                console.log('Has issues with removing mail', err)
            })
    }


    return (
        <section className="mail-container">
            <h1>Mail app</h1>
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
            <MailCompose/>
        </section>
    )
}

// onRemoveMail={onRemoveMail}