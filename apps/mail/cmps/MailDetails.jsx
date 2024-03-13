const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)

    const params = useParams()


    useEffect(() => {
        loadMail()
    }, [params.mailId])

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

    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            <h1>{mail.subject}</h1>
            <h2>{mail.to}</h2>
            <p>{mail.body}</p>
            <button>remove</button>
            <Link to="/mail">
                <button>Go back</button>
            </Link>
        </div>

    )
}