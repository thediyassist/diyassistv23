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
function App() {
  const logoPath = "/logo.png";

  return (
    <div className="layout">
      <header style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eaeaea' }}>
        <a href="/">
          <img src={logoPath} alt="The DIY Assist Logo" style={{ height: '60px' }} />
        </a>
      </header>

      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>The DIY Assist</h1>
        <p>Expert DIY help, right when you need it.</p>
        
        <hr style={{ margin: '40px 0', opacity: 0.2 }} />

        {/* We are "calling" the ProviderSignup component here */}
        <ProviderSignup />

      </main>
    </div>
  );
}

export default App;