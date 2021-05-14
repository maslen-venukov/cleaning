import mailer from '../core/mailer'
import { SentMessageInfo } from 'nodemailer/lib/sendmail-transport'

interface ISendEmailOptions {
  from: string
  to: string
  subject: string
  html: string
}

const sendEmail = ({ from, to, subject, html }: ISendEmailOptions, cb?: (err?: Error | null, info?: SentMessageInfo) => void) => {
  mailer.sendMail({
    from,
    to,
    subject,
    html
  }, cb || function(err: Error | null, info: SentMessageInfo) {
    console.log(err ? err : info)
  })
}

export default sendEmail