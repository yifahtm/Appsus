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
    const [isViewSent, setIsViewSent] = useState(false)
    const [isTrash, setIsTrash] = useState(false)


    const params = useParams()

    useEffect(() => {
        loadMails()

    }, [isSent, filterBy, sortBy, isTrash])

   
    function loadMails() {

        if (isTrash) {
            mailService
                .getTrash()
                .then(setMails)
                .catch(err => console.log('Had issues with loading mails: ', err))
            return
        }

        mailService
            .query(filterBy, sortBy)
            .then(setMails)
            .catch(err => console.log('Had issues with loading mails: ', err))
            .finally(setIsSent(false))
    }


    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
                console.log('i did it!')
            })
            .catch((err) => {
                console.log('Had issues removing mail', err)
            })
    }

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function onSortChange(newSortBy) {
        setSortBy(newSortBy)
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
                        <span className="material-symbols-outlined" onClick={() => setIsViewSent(false)} >
                            inbox
                        </span>
                    </Link>
                    <span className="material-symbols-outlined">
                        star
                    </span>
                    <span onClick={() => setIsViewSent(true)} className="material-symbols-outlined">
                        send
                    </span>
                    <span className="material-symbols-outlined">
                        draft
                    </span>
                    <span className="material-symbols-outlined" onClick={() => setIsTrash(true)}>
                        delete
                    </span>

                </nav>
                <Outlet />

                <div className='mail-section'>
                    < MailActions filterBy={{ read }} onSetFilter={onSetFilter} sortBy={sortBy} onSortChange={onSortChange} />
                    {!params.mailId && <MailList mails={mails} onRemoveMail={onRemoveMail} isViewSent={isViewSent} />}
                </div>
                <span>you have <span>{getUnreadCount(mails)}</span> unread emails</span>
            </section>

        </section>
    )
}

