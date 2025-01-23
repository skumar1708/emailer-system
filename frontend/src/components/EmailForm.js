import React, { useState } from 'react';
import { sendEmails } from '../services/emailService';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    recipients: '',
    subject: '',
    body: '',
  });
  const [attachment, setAttachment] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipientsArray = formData.recipients.split(',').map((email) => email.trim());
    const emailData = new FormData();
    // emailData.append('email', formData.email);
    // emailData.append('password', formData.password);
    emailData.append('recipients', JSON.stringify(recipientsArray));
    emailData.append('subject', formData.subject);
    emailData.append('body', formData.body);
    if (attachment) emailData.append('attachment', attachment);

    try {
      await sendEmails(emailData);
      alert('Emails sent successfully!');
    } catch (error) {
      alert('Error sending emails: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Emailer System</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div> */}
        {/* <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="mb-3">
          <label>Recipients (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            name="recipients"
            value={formData.recipients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Subject</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Body</label>
          <textarea
            className="form-control"
            name="body"
            rows="5"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Attachment</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Emails</button>
      </form>
    </div>
  );
};

export default EmailForm;