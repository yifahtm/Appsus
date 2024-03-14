const { Link } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail }) {
  if (!mails || !mails.length)
    return <div className="nothing-to-show">No mails to show</div>

  return (
    <ul className="mail-list">
      {mails.map(mail => (
        <li key={mail.id} className="list">
          <Link to={`/mail/${mail.id}`}>
            <MailPreview mail={mail} />
          </Link>



          <div className="mail-actions">


            <Link to={`/mail/${mail.id}`}><button>Details</button></Link>
            <button onClick={() => onRemoveMail(mail.id)}>Remove</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
