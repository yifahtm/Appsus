const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter


import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)

    const params = useParams()

    // useEffect(() => {
    //     loadMail()
    //   }, [params.mailId])
    
    //   function loadMail() {
    //     setIsLoading(true)
    //     mailService
    //       .get(params.mailId)
    //       .then(setMail)
    //       .catch(err => {
    //         console.log('Had issues with loading mail:', err)
    //         navigate('/mail')
    //       })
    //       .finally(() => setIsLoading(false))
    //   }
    
    return (
        <div>
            <h1>mail detail</h1>
            <button>remove</button>
        </div>

    )
}