const { Link } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail, isViewSent }) {
  if (!mails || !mails.length)
    return <div className="nothing-to-show">No mails to show</div>

  if (isViewSent) mails = mails.filter(mail => mail.from === 'user@appsus.com')
  else mails = mails.filter(mail => mail.from !== 'user@appsus.com')

  function getClassName(mail) {
    return mail.isRead ? 'mail-li read' : 'mail-li unread'
  }

  return (
    <ul className="mail-list clean-list">
      {mails.map(mail => (
        <li key={mail.id} className={getClassName(mail)}>
          <Link to={`/mail/${mail.id}`}>
            <MailPreview mail={mail} />
          </Link>
          <div className="mail-actions">
            <span className="material-symbols-outlined">
              star
            </span>
            <span className="material-symbols-outlined">
              mark_email_unread
            </span>
            <span className="material-symbols-outlined" onClick={() => onRemoveMail(mail.id)}>
              delete
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
