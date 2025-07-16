import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessInfoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    ownerName: '',
    establishedYear: '',
    email: '',
    phone: '',
    whatsapp: '',
    website: '',
    address: '',
    businessDescription: '',
    servicesOffered: '',
    targetAudience: '',
    logoUrl: '',
    companyMission: '',
    companyHistory: '',
    // --- NEW FIELDS ---
    heroImageUrl: '',
    galleryImageUrls: '',
  });
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = ['businessName', 'businessType', 'ownerName', 'email', 'phone', 'address', 'businessDescription'];
    const newErrors = {};

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!selectedTheme) {
      alert('Please select a color theme for your website');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && selectedTheme;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const selectedIndustry = sessionStorage.getItem('selectedIndustry') || 'Not specified';
      const fullData = {
        ...formData,
        colorTheme: selectedTheme,
        selectedIndustry,
      };
      
      sessionStorage.setItem('businessData', JSON.stringify(fullData));
      alert('Business information saved successfully!');
      navigate('/product-setup');
    }
  };

  const handleThemeSelect = (theme) => setSelectedTheme(theme);

  useEffect(() => {
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = '60%';
    }
  }, []);

  const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', background: 'linear-gradient(135deg, #2d1b3d 0%, #1a0e2e 100%)', minHeight: '100vh', color: '#e0d4f7' },
    header: { textAlign: 'center', color: '#e0d4f7', marginBottom: '30px' },
    h1: { fontSize: '2.5rem', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' },
    formContainer: { background: 'linear-gradient(135deg, #3d2b4f 0%, #2a1f3d 100%)', borderRadius: '20px', padding: '40px', boxShadow: '0 15px 40px rgba(0,0,0,0.4)' },
    label: { display: 'block', marginBottom: '8px', fontWeight: 600, color: '#c794f7' },
    input: { width: '100%', padding: '12px 15px', border: 'none', borderRadius: '8px', fontSize: '1rem', background: '#2a1f3d', color: '#e0d4f7', marginBottom: '15px', outline: 'none', boxSizing: 'border-box' },
    textarea: { resize: 'vertical', minHeight: '100px' },
    button: { background: 'linear-gradient(45deg, #8b5fbf, #6a4c93)', color: '#e0d4f7', padding: '15px 30px', borderRadius: '25px', border: 'none', fontSize: '1.1rem', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold' },
    progressBar: { width: '100%', height: '6px', background: '#4a2c5a', borderRadius: '3px', marginBottom: '30px', overflow: 'hidden' },
    progressFill: { height: '100%', background: 'linear-gradient(45deg, #8b5fbf, #6a4c93)', width: '60%', transition: 'width 0.3s ease' },
    error: { color: '#ff6b8a', fontSize: '0.85rem' },
    colorGrid: { display: 'flex', gap: '10px', marginBottom: '20px' },
    colorBox: (theme) => ({ padding: '15px', borderRadius: '10px', border: selectedTheme === theme ? '3px solid #8b5fbf' : 'none', cursor: 'pointer', textAlign: 'center', background: selectedTheme === theme ? 'linear-gradient(45deg, #8b5fbf, #6a4c93)' : 'linear-gradient(45deg, #342447, #2a1f3d)', color: selectedTheme === theme ? '#e0d4f7' : '#c794f7', flex: 1 }),
  };

  const formFieldsConfig = {
      businessName: { label: "Business Name", type: "input" },
      businessType: { label: "Business Type", type: "input" },
      ownerName: { label: "Owner Name", type: "input" },
      establishedYear: { label: "Established Year", type: "input" },
      email: { label: "Email", type: "input" },
      phone: { label: "Phone", type: "input" },
      whatsapp: { label: "WhatsApp", type: "input" },
      website: { label: "Website", type: "input" },
      address: { label: "Address", type: "textarea" },
      businessDescription: { label: "Business Description (Short)", type: "textarea" },
      servicesOffered: { label: "Services Offered (comma-separated)", type: "textarea" },
      targetAudience: { label: "Target Audience", type: "textarea" },
      logoUrl: { label: "Logo URL", type: "input" },
      companyMission: { label: "Company Mission", type: "textarea" },
      companyHistory: { label: "Company History", type: "textarea" },
      heroImageUrl: { label: "Hero Image URL (Optional)", type: "input" },
      galleryImageUrls: { label: "Gallery Image URLs (comma-separated)", type: "textarea" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Business Information</h1>
        <p style={{ color: '#e0d4f7' }}>Tell us about your business to customize your website</p>
      </div>

      <div style={styles.progressBar}>
        <div id="progressFill" style={styles.progressFill}></div>
      </div>

      <div style={styles.formContainer}>
        <div>
          {Object.entries(formFieldsConfig).map(([key, config]) => (
            <div key={key}>
              <label style={styles.label} htmlFor={key}>{config.label}</label>
              {config.type === 'textarea' ? (
                <textarea
                  style={{ ...styles.input, ...styles.textarea }}
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  style={styles.input}
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              )}
              {errors[key] && <div style={styles.error}>{errors[key]}</div>}
            </div>
          ))}

          <div>
            <label style={styles.label}>Choose Your Brand Color Theme</label>
            <div style={styles.colorGrid}>
              {['blue', 'green', 'purple', 'orange'].map(theme => (
                <div key={theme} style={styles.colorBox(theme)} onClick={() => handleThemeSelect(theme)}>
                  <strong style={{ textTransform: 'capitalize' }}>{theme} Theme</strong>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button onClick={handleSubmit} style={styles.button}>Continue to Products</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoPage;
