import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ at the top of the file

const MainPage = () => {
  const navigate = useNavigate(); // ✅ inside the component
  const [selected, setSelected] = useState('');

  const industries = [
    { icon: '💊', title: 'Pharmacy', description: 'Medicine ordering, prescription management, health products' },
    { icon: '💄', title: 'Cosmetics', description: 'Beauty products, skincare, makeup, wellness items' },
    { icon: '🍽️', title: 'Restaurant', description: 'Food ordering, menu display, reservation system' },
    { icon: '📱', title: 'Electronics', description: 'Gadgets, accessories, tech products, specifications' },
    { icon: '👗', title: 'Clothing', description: 'Fashion, apparel, accessories, size guides' },
    { icon: '🛒', title: 'Grocery', description: 'Fresh produce, household items, delivery service' },
  ];

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #2d1b3d 0%, #1a0e2e 100%)',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: '3rem',
      marginBottom: '10px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    },
    subtitle: {
      fontSize: '1.2rem',
      opacity: 0.9,
    },
    progressBar: {
      height: '4px',
      background: '#4a2c5a',
      borderRadius: '2px',
      marginBottom: '20px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(45deg, #8b5fbf, #6a4c93)',
      width: selected ? '40%' : '20%',
      transition: 'width 0.3s ease',
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      marginBottom: '40px',
    },
    card: {
      background: 'linear-gradient(135deg, #3d2b4f 0%, #2a1f3d 100%)',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
      color: '#fff',
      border: '1px solid #4a2c5a',
    },
    cardTitle: {
      color: '#c794f7',
      marginBottom: '20px',
      fontSize: '1.8rem',
    },
    featureList: {
      listStyle: 'none',
      paddingLeft: '0',
    },
    featureItem: {
      padding: '8px 0',
      paddingLeft: '25px',
      position: 'relative',
    },
    featureCheck: {
      content: '"✓"',
      position: 'absolute',
      left: '0',
      color: '#8b5fbf',
      fontWeight: 'bold',
    },
    selectorSection: {
      background: 'linear-gradient(135deg, #3d2b4f 0%, #2a1f3d 100%)',
      borderRadius: '15px',
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
      color: '#fff',
      border: '1px solid #4a2c5a',
    },
    selectorHeading: {
      textAlign: 'center',
      color: '#c794f7',
      marginBottom: '30px',
      fontSize: '2rem',
    },
    industryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    industryCard: (isSelected) => ({
      border: `2px solid ${isSelected ? '#8b5fbf' : '#4a2c5a'}`,
      borderRadius: '10px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      background: isSelected
        ? 'linear-gradient(45deg, #8b5fbf, #6a4c93)'
        : 'linear-gradient(45deg, #342447, #2a1f3d)',
      color: isSelected ? 'white' : '#e0d4f7',
      transition: 'all 0.3s ease',
    }),
    icon: {
      fontSize: '3rem',
      marginBottom: '15px',
    },
    cardHeading: {
      fontSize: '1.3rem',
      marginBottom: '10px',
    },
    cardDesc: {
      fontSize: '0.9rem',
      opacity: 0.8,
    },
    btnContainer: {
      textAlign: 'center',
      marginTop: '30px',
    },
    button: {
      background: selected ? 'linear-gradient(45deg, #8b5fbf, #6a4c93)' : '#4a2c5a',
      color: selected ? 'white' : '#9b7bb8',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '25px',
      fontSize: '1.1rem',
      cursor: selected ? 'pointer' : 'not-allowed',
      fontWeight: 'bold',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>WebsiteBoss.com</h1>
        <p style={styles.subtitle}>Rapid Website Generation for MSME Businesses</p>
      </div>

      <div style={styles.progressBar}>
        <div style={styles.progressFill}></div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🚀 Why Choose WebsiteBoss?</h2>
          <ul style={styles.featureList}>
            {[
              'Industry-specific templates pre-configured',
              'Rapid deployment in minutes, not days',
              'Consistent structure across same industry',
              'Customizable content and branding',
              'Built-in e-commerce functionality',
              'Mobile-responsive design',
            ].map((item, i) => (
              <li key={i} style={styles.featureItem}>
                <span style={styles.featureCheck}>✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>📈 Business Benefits</h2>
          <ul style={styles.featureList}>
            {[
              'Reduce development time by 80%',
              'Standardized quality across projects',
              'Focus on client content, not structure',
              'Scale your web development business',
              'Consistent user experience',
              'Easy maintenance and updates',
            ].map((item, i) => (
              <li key={i} style={styles.featureItem}>
                <span style={styles.featureCheck}>✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={styles.selectorSection}>
        <h2 style={styles.selectorHeading}>Select Your Industry</h2>
        <div style={styles.industryGrid}>
          {industries.map((item) => (
            <div
              key={item.title}
              style={styles.industryCard(selected === item.title)}
              onClick={() => setSelected(item.title)}
            >
              <div style={styles.icon}>{item.icon}</div>
              <h3 style={styles.cardHeading}>{item.title}</h3>
              <p style={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>

        <div style={styles.btnContainer}>
          <button
            style={styles.button}
            disabled={!selected}
            onClick={() => {
              if (selected) {
               sessionStorage.setItem('selectedIndustry', selected); // ✅ Save selection
                navigate('/info'); // ✅ Navigate to info page
              }
            }}
          >
            Continue to Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;