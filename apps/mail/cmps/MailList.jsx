const { Link, NavLink } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"


export function MailList({ mails, onRemoveMail, isViewSent }) {
  if (!mails || !mails.length)
    return <div className="nothing-to-show">No mails to show</div>

  if (isViewSent) mails = mails.filter(mail => mail.from === 'user@appsus.com')
  else mails = mails.filter(mail => mail.from !== 'user@appsus.com')

  function getClassName(mail) {
    return mail.isRead ? 'mail-li read' : 'mail-li unread'
  }

  function formatDate(sentAt) {
    const date = new Date(sentAt)
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate()
    return `${month} ${day}`
  }


  return (
    <ul className="mail-list clean-list">
      {mails.map(mail => (
        <div key={mail.id} className={getClassName(mail)}>
          <NavLink to={`/mail/${mail.id}`}> 
          <span className="material-symbols-outlined">
              star
            </span>
            <h3>{mail.subject}</h3>
          </NavLink>
          <div className="mail-action">
           
            <span className="material-symbols-outlined">
              mark_email_unread
            </span>
            <span className="material-symbols-outlined" onClick={() => onRemoveMail(mail.id)}>
              delete
            </span>
            <span>
              {formatDate(mail.sentAt)}
            </span>
          </div>
        </div>
      ))}
    </ul>
  )
}
