import React, { useState } from 'react';
import Page1 from './components/page1';
import Page2 from './components/page2';
import './styles.css';

function App() {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    hallTicketNumber: '',
    email: '',
    event: '',
    participantType: '', // 'individual' or 'team'
    teamName: '', // Only if participantType is 'team'
    teamSize: '', // 2, 3, or 4
    teamMembers: [], // Array of team members (empty by default)
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if registration is successful

  const nextPage = () => setPage(2);
  const prevPage = () => setPage(1);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://event-pn9w.onrender.com'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Registration successful:', data);
      alert('Registration successful!');
      setIsSubmitted(true); // Set registration as successful
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  // Reset the form and go back to Page 1
  const resetForm = () => {
    setFormData({
      name: '',
      class: '',
      hallTicketNumber: '',
      email: '',
      event: '',
      participantType: '',
      teamName: '',
      teamSize: '',
      teamMembers: [],
    });
    setIsSubmitted(false);
    setPage(1);
  };

  return (
    <div className="App">
      <h1>Scient Institute of Technology Event Registration</h1>
      {isSubmitted ? (
        <div className="confirmation">
          <h2>Registration Successful!</h2>
          <p>Thank you for registering. Your details have been submitted successfully.</p>
          <button onClick={resetForm}>Register Again</button>
        </div>
      ) : (
        <>
          {page === 1 && <Page1 formData={formData} setFormData={setFormData} nextPage={nextPage} />}
          {page === 2 && <Page2 formData={formData} setFormData={setFormData} prevPage={prevPage} handleSubmit={handleSubmit} />}
        </>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>Developed by <strong>Vamshi Rathod CSE Dept</strong></p>
      </footer>
    </div>
  );
}

export default App;
