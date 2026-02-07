import { useState } from 'react';
import './App.css';
import { SPECIALTIES } from './constants/specialties';

// --- NEW IMPORTS FOR AUTH ---
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// ... (Keep your ClientRequestForm and ProviderSignup components exactly as they were) ...

function App() {
  const [view, setView] = useState<'client' | 'provider'>('client');
  const logoPath = "/logo.png";

  return (
    // The Authenticator handles the login screen automatically
    <Authenticator>
      {({ signOut, user }) => (
        <div className="layout" style={{ fontFamily: 'sans-serif' }}>
          <header style={{ 
            padding: '1rem 2rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderBottom: '1px solid #eaeaea' 
          }}>
            <img src={logoPath} alt="The DIY Assist Logo" style={{ height: '50px' }} />
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <button 
                onClick={() => setView(view === 'client' ? 'provider' : 'client')}
                style={{ padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}
              >
                {view === 'client' ? 'Go to Provider View' : 'Go to Client View'}
              </button>
              
              {/* LOGOUT BUTTON */}
              <button 
                onClick={signOut} 
                style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
              >
                Sign Out
              </button>
            </div>
          </header>

          <main style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Welcome, <strong>{user?.signInDetails?.loginId}</strong>!</p>
            
            {view === 'client' ? (
              <div>
                <h1>Need a Hand?</h1>
                <ClientRequestForm />
              </div>
            ) : (
              <div>
                <h1>Work from Anywhere</h1>
                <ProviderSignup />
              </div>
            )}
          </main>
        </div>
      )}
    </Authenticator>
  );
}

export default App;