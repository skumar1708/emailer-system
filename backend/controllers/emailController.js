const createTransporter = require('../config/emailConfig');
const path = require('path');

const sendEmails = async (req, res, oAuth2Client, creds) => {
  const { recipients, subject, body, email, password } = req.body;
  const file = req.files?.attachment;
//   const transporter = await createTransporter(email, password);
    console.log("receipients", recipients)
    console.log("CREDS.CLIENT_ID", creds.client_id)
  const tokenConfig = await oAuth2Client.getAccessToken();

  console.log("oAuth2Client.credentials", oAuth2Client.credentials)
  const transporter = await createTransporter({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'kunsh.me@gmail.com',
      clientId: creds.client_id,
      clientSecret: creds.client_secret,
      refreshToken: oAuth2Client.credentials.refresh_token,
    //   accessToken: tokenConfig.token,
    },
  });
  
  try {
    const finalREciArra = JSON.parse(recipients.replace(/'/g, '"'));
      for (const to of finalREciArra) {
      const mailOptions = {
        from: "itbhu.sk@gmail.com",
        to,
        subject: subject,
        html: body,
        attachments: file ? [{
          filename: file.name,
          content: file.data
        }] : []
      };
      

      await transporter.sendMail(mailOptions);
    }

    res.status(200).send('Emails sent successfully');
  } catch (error) {
    res.status(500).send('Error sending emails: ' + error.message);
  }
};

module.exports = { sendEmails };

// const createTransporter = require('../config/emailConfig');

// const sendEmail = async (req, res) => {
//   const { email, password, recipients, subject, body } = req.body;

//   try {
//     const transporter = await createTransporter(email, password);

//     recipients.forEach(async (recipient) => {
//       await transporter.sendMail({
//         from: email,
//         to: recipient,
//         subject,
//         text: body,
//         html: `<p>${body}</p>`,
//       });
//     });

//     res.status(200).json({ message: 'Emails sent successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to send emails', error });
//   }
// };

// module.exports = { sendEmail };
