const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState()
    const [isOnCompose, setIsOnCompose] = useState(false)
    const [isSent,setIsSent]= useState(false) 

    useEffect(() => {
        loadMails()
    }, [isSent])
    // //filter by in the empty array
    function loadMails() {
        mailService
            .query()
            .then(setMails)
            .catch(err => console.log('Had issues with loading mails: ', err))
            .finally(setIsSent(false))
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

    function sendMail(newMail) {

        mailService
            .save(newMail)
            .then(savedMail => {
                console.log(`mail saved successfully ${savedMail.id}`)
            })
            .catch(err => {
                console.log('Had issues with saving mail: ', err)
            })
        .finally(() => setIsOnCompose(false))
        .finally(() => setIsSent(true))
        loadMails()
    }

    function onCloseCompose(){
        setIsOnCompose(false) 
    }

    return (
        <section className="mail-container">
            <h1>Mail app</h1>
            <div class="side-nav"></div>
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
            {isOnCompose && (< MailCompose sendMail={sendMail} onCloseCompose={onCloseCompose}/>)}
            <button onClick={() => setIsOnCompose(true)}>New Mail</button>
        </section>
    )
}

