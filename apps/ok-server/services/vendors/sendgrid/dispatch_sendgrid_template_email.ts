import axios from 'axios'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

export default async ({ sendgrid_template_email }) => {
  const HEADERS = {
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }

  const dispatch_response = await axios.post('https://api.sendgrid.com/v3/mail/send', sendgrid_template_email, HEADERS)

  return dispatch_response
}
