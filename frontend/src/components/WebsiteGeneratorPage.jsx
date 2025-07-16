import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WebsiteGeneratorPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');
  const [subStatus, setSubStatus] = useState('Setting up your website structure');
  const [summary, setSummary] = useState({
    industry: 'Loading...',
    businessName: 'Loading...',
    colorTheme: 'Loading...',
    productCount: 'Loading...'
  });

  const steps = [
    { text: "Initializing...", sub: "Setting up your website structure" },
    { text: "Loading Templates...", sub: "Selecting industry-specific template" },
    { text: "Applying Branding...", sub: "Customizing colors and layout" },
    { text: "Adding Products...", sub: "Integrating your product catalog" },
    { text: "Configuring Features...", sub: "Setting up payment and delivery" },
    { text: "Optimizing Performance...", sub: "Ensuring fast loading times" },
    { text: "Final Checks...", sub: "Validating all components" },
    { text: "Website Ready!", sub: "Your website has been generated successfully" }
  ];

  useEffect(() => {
    const businessData = JSON.parse(sessionStorage.getItem('businessData') || '{}');
    const productData = JSON.parse(sessionStorage.getItem('productData') || '{}');
    const industry = sessionStorage.getItem('selectedIndustry');
    const productCount = productData.products?.length || 0;

    setSummary({
      industry: industry || 'Not specified',
      businessName: businessData.businessName || 'Not specified',
      colorTheme: businessData.colorTheme || 'Default',
      productCount: `${productCount} products`
    });

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 2000);
  }, []);

  useEffect(() => {
    setStatusText(steps[currentStep].text);
    setSubStatus(steps[currentStep].sub);
  }, [currentStep]);

  const handleDeploy = () => {
    alert("Website deployment initiated! You will receive deployment details shortly.");
    window.location.href = 'deployment-success.html';
  };

  const handlePreview = () => {
    navigate('/preview');
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      background: 'linear-gradient(135deg, #2d1b3d 0%, #1a0e2e 100%)',
      minHeight: '100vh', padding: '20px', color: '#e0d4f7'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: '#e0d4f7', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Website Generator</h1>
          <p>Creating your professional website...</p>
        </div>

        <div style={{ width: '100%', height: '6px', background: '#4a2c5a', borderRadius: '3px', marginBottom: '30px' }}>
          <div style={{
            height: '100%',
            width: `${((currentStep + 1) / steps.length) * 100}%`,
            background: 'linear-gradient(45deg, #8b5fbf, #6a4c93)',
            transition: 'width 0.3s ease'
          }} />
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #3d2b4f 0%, #2a1f3d 100%)',
          borderRadius: '20px', padding: '30px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.4)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            {currentStep < steps.length - 1 && (
              <div style={{
                border: '4px solid #50325e',
                borderTop: '4px solid #8b5fbf',
                borderRadius: '50%',
                width: '60px', height: '60px',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px'
              }} />
            )}
            <div style={{ fontSize: '1.2rem', color: currentStep === steps.length - 1 ? '#8b5fbf' : '#c794f7', marginBottom: '10px' }}>{statusText}</div>
            <div style={{ color: '#c794f7', fontSize: '0.9rem' }}>{subStatus}</div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px', marginBottom: '30px'
          }}>
            {['Industry', 'Business', 'Products', 'Theme'].map((label, index) => {
              const key = ['industry', 'businessName', 'productCount', 'colorTheme'][index];
              return (
                <div key={label} style={{
                  background: '#2a1f3d',
                  padding: '20px',
                  borderRadius: '10px',
                  borderLeft: '4px solid #8b5fbf'
                }}>
                  <h3 style={{ color: '#c794f7', marginBottom: '10px' }}>{label}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#d9c6f0' }}>{summary[key]}</p>
                </div>
              );
            })}
          </div>

          <div style={{
            textAlign: 'center', marginTop: '30px',
            paddingTop: '20px', borderTop: '1px solid #50325e'
          }}>
            <button onClick={() => window.history.back()} style={{
              background: '#4a2c5a', color: 'white',
              border: 'none', padding: '12px 25px',
              borderRadius: '20px', cursor: 'pointer',
              fontSize: '1rem', margin: '0 10px'
            }}>Back</button>

            {currentStep === steps.length - 1 && (
              <>
                <button onClick={handlePreview} style={{
                  background: 'linear-gradient(45deg, #8b5fbf, #6a4c93)',
                  color: 'white', border: 'none',
                  padding: '12px 25px', borderRadius: '20px',
                  cursor: 'pointer', fontSize: '1rem', margin: '0 10px'
                }}>Preview Website</button>
                <button onClick={handleDeploy} style={{
                  background: '#28a745', color: 'white',
                  border: 'none', padding: '12px 25px',
                  borderRadius: '20px', cursor: 'pointer',
                  fontSize: '1rem', margin: '0 10px'
                }}>Deploy Website</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteGeneratorPage;
