import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('businessData') || '{}');
    setBusinessData(data);
    setIsLoading(false);
  }, []);

  const getThemeColors = (themeName) => {
    const themes = {
      blue: { primary: '#4F46E5', secondary: '#7C3AED', heroBackground: 'linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)', textDark: '#1E293B', textLight: '#64748B', cardBorder: '#E0E7FF' },
      green: { primary: '#059669', secondary: '#047857', heroBackground: 'linear-gradient(135deg, #047857 0%, #065F46 100%)', textDark: '#1E293B', textLight: '#64748B', cardBorder: '#BBF7D0' },
      purple: { primary: '#7C3AED', secondary: '#6D28D9', heroBackground: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', textDark: '#1E293B', textLight: '#64748B', cardBorder: '#E9D5FF' },
      orange: { primary: '#EA580C', secondary: '#C2410C', heroBackground: 'linear-gradient(135deg, #F97316 0%, #B45309 100%)', textDark: '#1E293B', textLight: '#64748B', cardBorder: '#FED7AA' }
    };
    return themes[themeName] || themes.blue;
  };

  const theme = getThemeColors(businessData.colorTheme);

  const styles = {
    container: { fontFamily: "'Inter', sans-serif", backgroundColor: '#F9FAFB', minHeight: '100vh' },
    header: { background: theme.heroBackground, color: 'white', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    businessName: { fontSize: '1.5rem', fontWeight: 'bold' },
    backButton: { background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' },
    
    section: { padding: '80px 24px' },
    sectionTitle: { fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: '3rem', textAlign: 'center', marginBottom: '50px', color: theme.textDark, fontWeight: 'normal' },
    
    contentGrid: { maxWidth: '900px', margin: '0 auto', display: 'grid', gap: '60px' },
    contentBlock: { backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '16px', border: `1px solid ${theme.cardBorder}`, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
    blockTitle: { fontSize: '1.8rem', color: theme.primary, marginBottom: '20px', fontWeight: '600' },
    blockText: { fontSize: '1.1rem', color: theme.textLight, lineHeight: 1.8, whiteSpace: 'pre-wrap' },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.businessName}>About {businessData.businessName || 'Us'}</h1>
        <button style={styles.backButton} onClick={() => navigate('/preview')}>← Back to Main Site</button>
      </header>
      
      <main>
        <section style={styles.section}>
          <div style={styles.contentGrid}>
            <div style={styles.contentBlock}>
              <h2 style={styles.blockTitle}>Our Mission</h2>
              <p style={styles.blockText}>{businessData.companyMission || 'Our mission is to deliver outstanding value and service to our customers, fostering growth and innovation in our community.'}</p>
            </div>

            <div style={styles.contentBlock}>
              <h2 style={styles.blockTitle}>Our History</h2>
              <p style={styles.blockText}>{businessData.companyHistory || `Founded in ${businessData.establishedYear || 'recent years'}, our company has grown from a small startup into a leading provider in the industry. We are proud of our journey and grateful to our loyal customers.`}</p>
            </div>
            
            {businessData.ownerName && (
                <div style={styles.contentBlock}>
                    <h2 style={styles.blockTitle}>Meet the Founder</h2>
                    <p style={styles.blockText}>Our company was founded by {businessData.ownerName}, whose passion and vision continue to drive our success.</p>
                </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
