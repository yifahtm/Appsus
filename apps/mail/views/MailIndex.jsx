const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM
const { useParams } = ReactRouter

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailActions } from '../cmps/MailActions.jsx'

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isOnCompose, setIsOnCompose] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [sortBy, setSortBy] = useState(mailService.getDefaultSortBy())

    const params = useParams()

    useEffect(() => {
        loadMails()

    }, [isSent, filterBy])
    // //filter by in the empty array
    function loadMails() {
        mailService
            .query(filterBy)
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

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function handleSortChange(updatedSort) {
        console.log(updatedSort)
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

    function onCloseCompose() {
        setIsOnCompose(false)
    }

    function getUnreadCount(mails) {
        if (!mails) return
        return mails.filter(mail => mail.isRead === true).length
    }

    const { search } = filterBy
    const { read } = filterBy

    return (
        <section className="mail-container">
            <div className="compose">
                {isOnCompose && (
                    < MailCompose sendMail={sendMail} onCloseCompose={onCloseCompose} />)}
            </div>
            <div className='mail-header'>
                <button className="compose-btn" onClick={() => setIsOnCompose(true)}>
                    <span className="material-symbols-outlined" >
                        edit
                    </span>
                    compose
                </button>

                <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />

            </div>

            <section className="main-mail">
                <nav className="side-nav" >
                    <Link to="/mail/list">
                        <span className="material-symbols-outlined">
                            inbox
                        </span>
                    </Link>
                    <span className="material-symbols-outlined">
                        star
                    </span>
                    <span className="material-symbols-outlined">
                        send
                    </span>
                    <span className="material-symbols-outlined">
                        draft
                    </span>
                    <span className="material-symbols-outlined">
                        delete
                    </span>

                </nav>
                <Outlet />

                <div className='mail-section'>
                    < MailActions filterBy={{ read }} onSetFilter={onSetFilter} handleSortChange={handleSortChange} />
                    {!params.mailId && <MailList mails={mails} onRemoveMail={onRemoveMail} />}
                </div>
                <span>you have <span>{getUnreadCount(mails)}</span> unread emails</span>
            </section>

        </section>
    )
}

