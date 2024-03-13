const { useState, useEffect } = React
import { mailService } from '../services/mail.service.js'

export function MailCompose({ onSendMail }) {
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())



    function handleInput({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value

        setMailToEdit(prevMailToEdit => ({ ...prevMailToEdit, [field]: value }))
    }

    const { subject, to, from, body } = mailToEdit

    return (
        <div className="mail-compose">
            <form onSubmit={onSendMail}>
                <div className="input-container">
                    <label htmlFor="subject">subject</label>
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
                    <label htmlFor="from">from</label>
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
                    <label htmlFor="to">to</label>
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
                        placeholder=" "
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