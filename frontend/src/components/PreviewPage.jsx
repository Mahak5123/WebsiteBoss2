import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PreviewPage = () => {
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState({});
  const [productData, setProductData] = useState({});
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from sessionStorage
    const business = JSON.parse(sessionStorage.getItem('businessData') || '{}');
    const products = JSON.parse(sessionStorage.getItem('productData') || '{}');
    const industry = sessionStorage.getItem('selectedIndustry') || '';

    setBusinessData(business);
    setProductData(products);
    setSelectedIndustry(industry);
    setIsLoading(false);
  }, []);

  const getThemeColors = (themeName) => {
    const themes = {
      blue: { primary: '#4F46E5', secondary: '#7C3AED', heroBackground: 'linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)', textDark: '#1E293B', textLight: '#64748B', cardBorder: '#E0E7FF', subtleBg: '#F0F5FF' },
      green: { primary: '#059669', secondary: '#047857', heroBackground: 'linear-gradient(135deg, #047857 0%, #065F46 100%)', textDark: '#1E293B', textLight: '#64748B', cardBorder: '#BBF7D0', subtleBg: '#F0FDF4' },
      purple: { primary: '#7C3AED', secondary: '#6D28D9', heroBackground: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', textDark: '#1E293B', textLight: '#64748B', cardBorder: '#E9D5FF', subtleBg: '#FAF5FF' },
      orange: { primary: '#EA580C', secondary: '#C2410C', heroBackground: 'linear-gradient(135deg, #F97316 0%, #B45309 100%)', textDark: '#1E293B', textLight: '#64748B', cardBorder: '#FED7AA', subtleBg: '#FFF7ED' }
    };
    return themes[themeName] || themes.blue;
  };

  const theme = getThemeColors(businessData.colorTheme);

  // --- Components for Page Sections ---

  const HeroSection = () => {
    const heroImage = businessData.heroImageUrl;
    const heroStyle = heroImage
      ? { ...styles.heroSection, backgroundImage: `url('${heroImage}')` }
      : { ...styles.heroSection, background: theme.heroBackground };
      
    return (
        <section id="home" style={heroStyle}>
            {!heroImage && <IndustryAnimation industry={selectedIndustry} />}
            <div style={styles.heroOverlay}></div>
            <div style={styles.heroContent}>
                <h1 style={styles.heroTitle}>{businessData.businessName || 'Welcome to Our Website'}</h1>
                <p style={styles.heroSubtitle}>{businessData.businessDescription || 'Your one-stop solution for excellence and quality.'}</p>
            </div>
        </section>
    );
  };

  const IndustryAnimation = ({ industry }) => {
    const industryIcons = {
        'Cosmetics': ['💄', '💅', '🧴', '✨'], 'Pharmacy': ['💊', '➕', '🩺', '🌿'], 'Restaurant': ['🍕', '🍔', '🍜', '🍰'],
        'Electronics': ['📱', '💻', '🎧', '📷'], 'Clothing': ['👗', '👕', '👠', '👜'], 'Grocery': ['🍎', '🍞', '🥕', '🥛'], 'Default': ['⭐', '🛍️', '�', '💡']
    };
    const icons = industryIcons[industry] || industryIcons['Default'];
    const positions = [
        { top: '15%', left: '10%', animation: 'float 6s ease-in-out infinite' }, { top: '70%', left: '20%', animation: 'float 8s ease-in-out infinite' },
        { top: '25%', left: '80%', animation: 'float 7s ease-in-out infinite' }, { top: '60%', left: '90%', animation: 'float 9s ease-in-out infinite' },
    ];
    return <div style={styles.animationContainer}>{icons.map((icon, index) => <div key={index} style={{ ...styles.animatedIcon, ...positions[index] }}>{icon}</div>)}</div>;
  };

  const GallerySection = () => {
    const imageUrls = businessData.galleryImageUrls?.split(',').map(url => url.trim()).filter(Boolean);
    const placeholderImages = [
        `https://placehold.co/1200x600/${theme.primary.substring(1)}/FFFFFF?text=Showcase+1`,
        `https://placehold.co/1200x600/${theme.secondary.substring(1)}/FFFFFF?text=Showcase+2`,
        `https://placehold.co/1200x600/222222/FFFFFF?text=Showcase+3`,
    ];
    const images = imageUrls?.length > 0 ? imageUrls : placeholderImages;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    if (!businessData.galleryImageUrls && !placeholderImages.length) return null;

    return (
        <section id="gallery" style={styles.gallerySection}>
            <h2 style={styles.sectionTitle}>Our Gallery</h2>
            <div style={styles.sliderContainer}>
                {images.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Gallery image ${index + 1}`}
                        style={{ ...styles.sliderImage, opacity: index === currentIndex ? 1 : 0 }}
                    />
                ))}
                <div style={styles.sliderDots}>
                    {images.map((_, index) => (
                        <span key={index} style={{...styles.sliderDot, backgroundColor: index === currentIndex ? theme.primary : '#ccc'}}></span>
                    ))}
                </div>
            </div>
        </section>
    );
  };

  const ServicesSection = () => {
    const userServices = businessData.servicesOffered?.split(',').map(s => s.trim()).filter(Boolean);
    const placeholderServices = ['High-Quality Products', 'Excellent Customer Support', 'Innovative Solutions', 'Satisfaction Guaranteed'];
    const services = userServices?.length > 0 ? userServices : placeholderServices;
    const serviceIcons = ['🌟', '💬', '💡', '✅'];
    return (
      <section id="services" style={styles.servicesSection}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.servicesGrid}>
          {services.slice(0, 4).map((service, index) => (
            <div key={index} style={styles.serviceCard} className="hover-card">
              <div style={{ ...styles.serviceIcon, color: theme.primary }}>{serviceIcons[index % serviceIcons.length]}</div>
              <h3 style={styles.serviceCardTitle}>{service}</h3>
              <p style={styles.serviceCardText}>Experience top-tier quality and dedication with our {service.toLowerCase()} offering.</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

   const OperationsSection = () => {
      if (!productData.paymentMethods?.length && !productData.deliveryOptions?.length) return null;
      return (
          <section id="operations" style={styles.operationsSection}>
              <h2 style={styles.sectionTitle}>Payment & Delivery</h2>
              <div style={styles.operationsGrid}>
                  {productData.paymentMethods?.length > 0 && (
                      <div style={styles.serviceCard} className="hover-card">
                          <div style={{ ...styles.serviceIcon, color: theme.primary }}>💳</div>
                          <h3 style={styles.serviceCardTitle}>Accepted Payments</h3>
                          <div style={styles.badgeContainer}>
                              {productData.paymentMethods.map(method => <span key={method} style={styles.badge}>{method.toUpperCase()}</span>)}
                          </div>
                      </div>
                  )}
                  {productData.deliveryOptions?.length > 0 && (
                      <div style={styles.serviceCard} className="hover-card">
                          <div style={{ ...styles.serviceIcon, color: theme.primary }}>🚚</div>
                          <h3 style={styles.serviceCardTitle}>Delivery Options</h3>
                          <div style={styles.badgeContainer}>
                              {productData.deliveryOptions.map(option => <span key={option} style={styles.badge}>{option.charAt(0).toUpperCase() + option.slice(1)}</span>)}
                          </div>
                      </div>
                  )}
              </div>
          </section>
      );
  };
  
  const TestimonialsSection = () => {
    const placeholderTestimonials = [
      { name: 'Rohan S.', feedback: `The quality from ${businessData.businessName || 'this company'} is unmatched!` },
      { name: 'Priya M.', feedback: 'An amazing experience from start to finish. Highly recommended.' },
    ];
    return (
      <section style={styles.testimonialsSection}>
        <h2 style={{ ...styles.sectionTitle, color: 'white' }}>What Our Clients Say</h2>
        <div style={styles.testimonialsGrid}>
          {placeholderTestimonials.map((testimonial, index) => (
            <div key={index} style={styles.testimonialCard}>
              <p style={styles.testimonialText}>"{testimonial.feedback}"</p>
              <p style={styles.testimonialName}>- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const styles = {
    container: { fontFamily: "'Inter', sans-serif", backgroundColor: '#F9FAFB' },
    previewControls: { position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', color: 'white', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000 },
    controlButton: { background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', margin: '0 6px', fontWeight: '500' },
    websiteContainer: { marginTop: '65px' },
    header: { background: 'transparent', color: 'white', padding: '20px 24px', position: 'absolute', top: '65px', left: 0, right: 0, zIndex: 900 },
    headerContent: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    headerBrand: { display: 'flex', alignItems: 'center', gap: '16px', textShadow: '0 1px 3px rgba(0,0,0,0.3)' },
    logoImage: { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '2px solid rgba(255,255,255,0.5)' },
    businessName: { fontSize: '1.5rem', fontWeight: 'bold' },
    nav: { display: 'flex', gap: '24px', textShadow: '0 1px 3px rgba(0,0,0,0.3)' },
    navLink: { color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'color 0.2s', cursor: 'pointer' },
    heroSection: { height: '80vh', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' },
    heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 2 },
    heroContent: { position: 'relative', zIndex: 3, maxWidth: '800px', padding: '0 20px' },
    heroTitle: { fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 'bold', marginBottom: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' },
    heroSubtitle: { fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', textShadow: '0 1px 3px rgba(0,0,0,0.5)', maxWidth: '600px', margin: '0 auto' },
    section: { padding: '100px 24px', position: 'relative', overflow: 'hidden' },
    sectionTitle: { fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: '3rem', textAlign: 'center', marginBottom: '50px', color: theme.textDark, fontWeight: 'normal' },
    aboutSection: { backgroundColor: '#FFFFFF' },
    aboutContent: { maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 },
    aboutText: { fontSize: '1.2rem', color: theme.textLight, lineHeight: 1.8 },
    readMoreButton: { display: 'inline-block', marginTop: '30px', padding: '12px 24px', border: `2px solid ${theme.primary}`, color: theme.primary, backgroundColor: 'transparent', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.3s ease' },
    animationContainer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 },
    animatedIcon: { position: 'absolute', fontSize: '6rem', opacity: 0.15, color: theme.primary },
    gallerySection: { backgroundColor: '#FFFFFF' },
    sliderContainer: { maxWidth: '1000px', margin: '0 auto', position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' },
    sliderImage: { width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, transition: 'opacity 0.8s ease-in-out' },
    sliderDots: { position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' },
    sliderDot: { width: '12px', height: '12px', borderRadius: '50%', transition: 'background-color 0.3s' },
    servicesSection: { backgroundColor: '#F9FAFB' },
    servicesGrid: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' },
    serviceCard: { background: 'white', padding: '40px', borderRadius: '16px', textAlign: 'center', border: `1px solid ${theme.cardBorder}`, transition: 'transform 0.3s ease, box-shadow 0.3s ease' },
    serviceIcon: { fontSize: '3rem', marginBottom: '24px' },
    serviceCardTitle: { fontSize: '1.4rem', color: theme.textDark, fontWeight: '600', marginBottom: '16px' },
    serviceCardText: { fontSize: '1rem', color: theme.textLight, lineHeight: 1.6 },
    operationsSection: { backgroundColor: '#FFFFFF', padding: '120px 24px' },
    operationsGrid: { maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' },
    badgeContainer: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' },
    badge: { backgroundColor: theme.primary, color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500' },
    productCtaSection: { backgroundColor: theme.subtleBg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
    productCtaIcon: { fontSize: '10rem', color: theme.primary, opacity: 0.2, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 },
    productCtaContent: { position: 'relative', zIndex: 2 },
    ctaButton: { display: 'inline-block', background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: 'white', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', transition: 'transform 0.2s ease', border: 'none' },
    testimonialsSection: { background: theme.heroBackground, padding: '80px 24px' },
    testimonialsGrid: { maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
    testimonialCard: { background: 'rgba(255,255,255,0.1)', padding: '32px', borderRadius: '16px' },
    testimonialText: { color: 'white', fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '20px' },
    testimonialName: { color: 'rgba(255,255,255,0.8)', fontWeight: '600', textAlign: 'right' },
    footer: { background: '#111827', color: 'rgba(255,255,255,0.7)', padding: '50px 24px 20px' },
    footerContent: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' },
    footerTitle: { color: 'white', fontWeight: '600', marginBottom: '12px' },
    footerLink: { color: 'inherit', textDecoration: 'none' },
    footerBottom: { borderTop: '1px solid #374151', marginTop: '40px', paddingTop: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' },
  };

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><div style={{width: '50px', height: '50px', border: `5px solid #e2e8f0`, borderTop: `5px solid ${theme.primary}`, borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div></div>;
  }

  return (
    <div style={styles.container}>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        .hover-card:hover { transform: translateY(-10px); box-shadow: 0 25px 40px -15px rgba(0,0,0,0.1); }
        .nav-link:hover { color: white !important; }
        .read-more-button:hover { background-color: ${theme.primary}; color: white; }
        .cta-button:hover { transform: scale(1.05); }
      `}</style>
      
      <div style={styles.previewControls}>
        <strong>Preview: {businessData.businessName}</strong>
        <div>
          <button style={styles.controlButton} onClick={() => navigate(-1)}>← Back</button>
        </div>
      </div>

      <main>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerBrand}>
              {businessData.logoUrl && <img src={businessData.logoUrl} alt="Logo" style={styles.logoImage} />}
              <h1 style={styles.businessName}>{businessData.businessName || 'Business Name'}</h1>
            </div>
            <nav style={styles.nav}>
              <a href="#home" style={styles.navLink} className="nav-link">Home</a>
              <a onClick={() => navigate('/about')} style={styles.navLink} className="nav-link">About</a>
              <a href="#services" style={styles.navLink} className="nav-link">Services</a>
              <a href="#gallery" style={styles.navLink} className="nav-link">Gallery</a>
              <a href="#operations" style={styles.navLink} className="nav-link">Payment/Delivery</a>
            </nav>
          </div>
        </header>

        <HeroSection />

        <section id="about" style={{...styles.section, ...styles.aboutSection}}>
          <div style={styles.aboutContent}>
            <h2 style={styles.sectionTitle}>Welcome to {businessData.businessName || 'Our Company'}</h2>
            <p style={styles.aboutText}>{businessData.businessDescription || 'Here is a brief description of the business, its mission, and values. We are committed to providing excellent services and products to our valued customers.'}</p>
            <button onClick={() => navigate('/about')} style={styles.readMoreButton} className="read-more-button">
              Read More About Us
            </button>
          </div>
        </section>

        <ServicesSection />
        <GallerySection />
        <OperationsSection />
        
        {productData.products && productData.products.length > 0 && (
          <section id="products-cta" style={{...styles.section, ...styles.productCtaSection}}>
            <div style={styles.productCtaIcon}>🛍️</div>
            <div style={styles.productCtaContent}>
                <h2 style={styles.sectionTitle}>Our Products</h2>
                <p style={{...styles.aboutText, marginBottom: '40px', maxWidth: '600px'}}>We have a wide range of products available. Click the button below to see our full catalog.</p>
                <button style={styles.ctaButton} className="cta-button" onClick={() => navigate('/products')}>
                View All Products
                </button>
            </div>
          </section>
        )}

        <TestimonialsSection />
        
        <footer id="contact" style={styles.footer}>
          <div style={styles.footerContent}>
            <div>
              <h4 style={styles.footerTitle}>{businessData.businessName}</h4>
              <p>{businessData.address}</p>
            </div>
            <div>
              <h4 style={styles.footerTitle}>Contact Us</h4>
              <p>Email: {businessData.email}</p>
              <p>Phone: {businessData.phone}</p>
            </div>
            <div>
                <h4 style={styles.footerTitle}>Quick Links</h4>
                <p><a href="#home" style={styles.footerLink}>Home</a></p>
                <p><a href="#about" style={styles.footerLink}>About</a></p>
                <p><a href="#services" style={styles.footerLink}>Services</a></p>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p>© {new Date().getFullYear()} {businessData.businessName}. All Rights Reserved. Generated by WebsiteBoss</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PreviewPage;