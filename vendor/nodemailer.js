async function nodemailder(autor = 'garant.gg', text = 'Кое-что новое с вашим профилем. Зайдите, чтобы проверить https://garant.gg.ru') {
  const nodemailer = require('nodemailer')

  let transporter = nodemailer.createTransport({
    service: 'mail',
    auth: {
      user: 'youremail@mail.com',
      pass: 'yourpassword',
    },
  })

  await transporter.sendMail({
    // from: '"Node js" <nodejs@example.com>',
    from: `${autor} <youremail@mail.com>`,
    to: 'user@example.com, user@example.com',
    subject: 'Attachments',
    text
  })
}

module.exports = nodemailder