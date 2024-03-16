const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link, NavLink } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'


export function MailDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)

    //use effect
    const params = useParams()
    const navigate = useNavigate()


    function removeMail() {
        mailService.remove(params.mailId)
            .then(() => {
                navigate('/mail')
            })
            .catch((err) => {
                console.log('Had issues removing mail', err)
            })
    }

    function readMail() {
        if (!mail) return
        if (!mail.isRead) mail.isRead = true
        mailService.editMail(mail)
    }

    useEffect(() => {
        loadMail()
    }, [params.mailId])


    readMail()

    function loadMail() {
        setIsLoading(true)
        mailService
            .get(params.mailId)
            .then(setMail)
            .catch(err => {
                console.log('Had issues with loading', err)
                navigate('/mail')
            })
            .finally(() => setIsLoading(false))
    }



    if (isLoading) return <div className="nothing to show">Loading...</div>

    return (
        <div className="mail-display">
            <div className="display-title">
                <h1>{mail.subject}</h1>
                <span className="material-symbols-outlined" onClick={() => removeMail(mail.id)}>
                    delete
                </span>
                <NavLink to="/mail">
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                </NavLink>
            </div>

            <h2>{mail.to}</h2>  
            <p>{mail.body}</p>
            <small>{utilService.getFormattedDate(mail.sentAt)}</small>

        </div>

    )
}