const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)

    //use effect
    const params = useParams()
    const navigate = useNavigate()

    function removeMail() {
        mailService.remove(params.mailId)
            .then(navigate('/mail'))
    }

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    if (mail) console.log(mail.isRead)

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
            <h1>{mail.subject}</h1>
            <h2>{mail.to}</h2>
            <p>{mail.body}</p>
            <span className="material-symbols-outlined" onClick={() => removeMail(mail.id)}>
              delete
            </span>
            <Link to="/mail">
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </Link>
        </div>

    )
}