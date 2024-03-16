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
    const [isStarred, setIsStarred] = useState(false)
    const [isTrash, setIsTrash] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    const params = useParams()

    useEffect(() => {
        loadMails()

    }, [isSent, filterBy, sortBy, isViewSent])

    function loadMails() {
        mailService
            .query(filterBy, sortBy)
            .then(setMails)
            .catch(err => console.log('Had issues with loading mails: ', err))
            .finally(setIsSent(false))
            .finally(setIsStarred(false))
            .finally(setIsTrash(false))
    }


    function onRemoveMail(mail) {
        if (isTrash) {
            mailService.remove(mail.id)
                .then(() => {
                    setMails((prevMails) => prevMails.filter(m => m.id !== mail.id))
                    console.log('i did it!')
                })
                .catch((err) => {
                    console.log('Had issues removing mail', err)
                })
        }
        let date = new Date()
        mail.removedAt = date.getTime()
        mailService.editMail(mail)
        setIsRemoved(true)
        // setMails()

    }

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function onSortChange(newSortBy) {
        setSortBy(newSortBy)
    }

    function setCategory() {
        let field = 'category'
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, [field]: null }))
    }

    function handelFilterChange(value) {
        let field = 'category'
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
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

    function reset() {
        setIsViewSent(false)
        setIsTrash(false)
        setIsRemoved(false)
        setCategory()
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
                        <div className="nav-icon" onClick={() => reset()}>
                            <span className="material-symbols-outlined"  >
                                inbox
                            </span>
                            <h2>Inbox</h2>
                        </div>
                    </Link>

                    <div className="nav-icon">
                        <span onClick={() => handelFilterChange('starred')} className="material-symbols-outlined">
                            star
                        </span>
                        <h2>Starred</h2>
                    </div>
                    <div className="nav-icon" onClick={() => setIsViewSent(true)}>
                        <span className="material-symbols-outlined">
                            send
                        </span>
                        <h2>Sent</h2>
                    </div>
                    <div className="nav-icon" >
                        <span className="material-symbols-outlined">
                            draft
                        </span>
                        <h2>Draft</h2>
                    </div>
                    <div className="nav-icon" >
                        <span className="material-symbols-outlined" onClick={() => setIsTrash(true)}>
                            delete
                        </span>
                        <h2>Trash</h2>
                    </div>


                </nav>


                <div className='mail-section'>
                    < MailActions filterBy={{ read }} onSetFilter={onSetFilter} sortBy={sortBy} onSortChange={onSortChange} />
                    {!params.mailId && <MailList mails={mails} onRemoveMail={onRemoveMail} isViewSent={isViewSent} setIsStarred={setIsStarred} isTrash={isTrash} />}
                    <Link to="/mail/mailId"></Link>
                    <Outlet />
                </div>
            </section>

        </section>
    )
}

