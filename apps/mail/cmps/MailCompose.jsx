const { useState, useEffect } = React
import { mailService } from '../services/mail.service.js'

export function MailCompose({ sendMail, onCloseCompose }) {
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())

    function onSendMail(ev) {
        ev.preventDefault()
        sendMail(mailToEdit)
    }


    function handleInput({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value

        setMailToEdit(prevMailToEdit => ({ ...prevMailToEdit, [field]: value }))
    }

    const { subject, to, from, body } = mailToEdit

    return (
        <div className="mail-compose">
            <button onClick={onCloseCompose}>x</button>
            <form onSubmit={onSendMail}>
                <div className="input-container">
                    <input
                        type="text"
                        id="subject"
                        placeholder="subject"
                        name="subject"
                        onChange={handleInput}
                        value={subject}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        id="from"
                        placeholder="Your email"
                        name="from"
                        onChange={handleInput}
                        value={from}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="email"
                        id="to"
                        placeholder="to"
                        name="to"
                        onChange={handleInput}
                        value={to}
                    />
                </div>

                <div className="message-body">
                    <input
                        type="text"
                        id="body"
                        placeholder=""
                        name="body"
                        onChange={handleInput}
                        value={body}
                    />
                </div>

                <button>Send</button>
            </form>
        </div>
    )
}