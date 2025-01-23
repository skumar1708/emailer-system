const express = require('express');
const { sendEmails } = require('../controllers/emailController');
const router = express.Router();


function emailRoutes(router, oAuth2Client, CREDS) {
  
    // Your email route logic here
    router.post('/send', (req, res) => {
        sendEmails(req, res, oAuth2Client, CREDS)
    });
 
  }
  
  module.exports = { 
    router, 
    emailRoutes 
  };

