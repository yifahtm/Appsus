const { Link, NavLink } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"
import { mailService } from '../services/mail.service.js'

export function MailList({ mails, onRemoveMail, isViewSent, setIsStarred }) {
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

  function getStar(mail) {

    if (mail.isStarred) return 'star_half'
    else return 'star'
  }

  function onStarClick(mail) {
    mail.isStarred = !mail.isStarred
    console.log(mail)
    mailService.editMail(mail)
    setIsStarred(true)

  }


  return (
    <section className="mail-list">
      {mails.map(mail => (
        <div key={mail.id} className={getClassName(mail)}>
          {<span onClick={() => onStarClick(mail)} className="material-symbols-outlined">
            {getStar(mail)}
          </span>}
          <NavLink to={`/mail/${mail.id}`}>
            <div className="list-title">

              <h3>{mail.subject}</h3>
            </div>

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
    </section>
  )
}
