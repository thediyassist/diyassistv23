import { useState } from 'react';
import './App.css';
import { SPECIALTIES } from './constants/specialties';

// --- SUB-COMPONENT: PROVIDER SIGNUP ---
// This is the "brick" we built for the skills list
function ProviderSignup() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleCheckboxChange = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div style={{ 
      textAlign: 'left', 
      maxWidth: '400px', 
      margin: '20px auto', 
      padding: '20px', 
      border: '1px solid #ddd',
      borderRadius: '8px' 
    }}>
      <h3>Provider: Select Your Specialties</h3>
      <p style={{ fontSize: '0.8rem', color: '#666' }}>Pick the skills you can offer via video chat.</p>
      
      {SPECIALTIES.map(skill => (
        <div key={skill} style={{ marginBottom: '8px' }}>
          <label style={{ cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={selectedSkills.includes(skill)}
              onChange={() => handleCheckboxChange(skill)}
            /> {skill}
          </label>
        </div>
      ))}
      
      <button 
        onClick={() => alert(`Saving skills: ${selectedSkills.join(', ')}`)}
        style={{ marginTop: '15px', width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Save Specialties
      </button>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
// This is what actually renders on your screen
// --- SUB-COMPONENT: CLIENT REQUEST FORM ---
function ClientRequestForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: SPECIALTIES[0],
    date: '',
    time: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is where we will eventually call the AWS database
    console.log("Submitting Request to Providers:", formData);
    alert("Request sent to matching providers!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      textAlign: 'left', 
      maxWidth: '500px', 
      margin: '20px auto', 
      padding: '20px', 
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: 0 }}>Request DIY Help</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Project Title</label>
        <input 
          type="text" 
          placeholder="e.g., Install Ceiling Fan"
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          required
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Category</label>
        <select 
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Description & Tools You Have</label>
        <textarea 
          placeholder="Describe what you need help with..."
          style={{ width: '100%', padding: '8px', marginTop: '5px', height: '80px' }}
          required
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Date</label>
          <input 
            type="date" 
            style={{ width: '100%', padding: '8px' }} 
            required
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Time</label>
          <input 
            type="time" 
            style={{ width: '100%', padding: '8px' }} 
            required
            onChange={(e) => setFormData({...formData, time: e.target.value})}
          />
        </div>
      </div>

      <button type="submit" style={{ 
        width: '100%', 
        padding: '12px', 
        backgroundColor: '#28a745', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>
        Send Request to Experts
      </button>
    </form>
  );
}
function App() {
  // This state tracks if we are looking at the Client or Provider screen
  const [view, setView] = useState<'client' | 'provider'>('client');
  const logoPath = "/logo.png";

  return (
    <div className="layout" style={{ fontFamily: 'sans-serif' }}>
      {/* HEADER SECTION */}
      <header style={{ 
        padding: '1rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #eaeaea' 
      }}>
        <img src={logoPath} alt="The DIY Assist Logo" style={{ height: '50px' }} />
        
        {/* THE SWITCH BUTTON */}
        <button 
          onClick={() => setView(view === 'client' ? 'provider' : 'client')}
          style={{ 
            padding: '8px 16px', 
            borderRadius: '20px', 
            border: '2px solid #007bff', 
            background: view === 'provider' ? '#007bff' : 'white', 
            color: view === 'provider' ? 'white' : '#007bff', 
            fontWeight: 'bold',
            cursor: 'pointer' 
          }}
        >
          {view === 'client' ? 'Switch to Provider View' : 'Switch to Client View'}
        </button>
      </header>

      {/* MAIN CONTENT SECTION */}
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        
        {view === 'client' ? (
          // THIS SHOWS IF VIEW IS 'CLIENT'
          <div>
            <h1 style={{ color: '#333' }}>Need a Hand?</h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Describe your project and an expert will guide you through the fix.
            </p>
            <ClientRequestForm />
          </div>
        ) : (
          // THIS SHOWS IF VIEW IS 'PROVIDER'
          <div>
            <h1 style={{ color: '#333' }}>Work from Anywhere</h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Help others with your expertise and set your own rates.
            </p>
            <ProviderSignup />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;