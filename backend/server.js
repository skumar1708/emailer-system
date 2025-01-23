const { google } = require('googleapis');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { router, emailRoutes } = require('./routes/emailRoutes');
const fileUpload = require('express-fileupload');

const CREDS = {
    "client_id": "866439079538-rv4efei3l45cqsbbg6i1tmbisa9a25h7.apps.googleusercontent.com",
    "project_id": "node-emailer-448706",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "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",
    "redirect_uris": [
      "http://localhost:3000"
    ],
    "javascript_origins": [
      "http://localhost:3000"
    ]
  }

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const CLIENT_ID = CREDS.client_id;
const CLIENT_SECRET = CREDS.client_secret;
const REDIRECT_URI = 'http://localhost:5000/oauth2callback'; // Your redirect URI
const REFRESH_TOKEN = 'your-refresh-token'; // To be dynamically generated

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generate authorization URL for the user to log in
app.get('/auth', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
  });
  res.redirect(authUrl);
});

// Handle the OAuth callback and save the tokens
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
//   res.send('Authorization successful! You can now send emails.');
    res.redirect("http://localhost:3000")
});

emailRoutes(router, oAuth2Client, CREDS); 
app.use('/api/emails', router); 


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});