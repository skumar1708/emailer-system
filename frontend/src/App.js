import React from 'react';
import EmailForm from './components/EmailForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const handleGoogleAuth = () => {
        window.location.href = 'http://localhost:5000/auth';
      };
      
  return (
    <div className="container mt-4">
      <h1>Emailer System</h1>
      <button onClick={handleGoogleAuth}>Authorize Google</button>
      <EmailForm />
    </div>
  );
}

export default App;
