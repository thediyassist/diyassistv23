import './App.css'

function App() {
  // Since logo.png is in the public folder, we reference it with /logo.png
  const logoPath = "/logo.png";

  return (
    <div className="layout">
      <header style={{ 
        padding: '1rem 2rem', 
        display: 'flex', 
        alignItems: 'center',
        borderBottom: '1px solid #eaeaea' 
      }}>
        <a href="/">
          <img 
            src={logoPath} 
            alt="The DIY Assist Logo" 
            style={{ height: '60px', width: 'auto' }} 
          />
        </a>
      </header>

      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <section style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1>The DIY Assist</h1>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>
            Get expert guidance for your home maintenance, tech, and social media projects.
          </p>
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button style={{ padding: '10px 20px', cursor: 'pointer' }}>I need help (Client)</button>
            <button style={{ padding: '10px 20px', cursor: 'pointer' }}>I want to help (Provider)</button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App