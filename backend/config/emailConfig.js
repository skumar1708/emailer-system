const nodemailer = require('nodemailer');

const createTransporter = async (options) => {
  return nodemailer.createTransport(options);
};

module.exports = createTransporter;
