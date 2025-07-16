import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllProductsPage = () => {
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState({});
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from sessionStorage
    const business = JSON.parse(sessionStorage.getItem('businessData') || '{}');
    const products = JSON.parse(sessionStorage.getItem('productData') || '{}');
    setBusinessData(business);
    setProductData(products);
    setIsLoading(false);
  }, []);

  const getThemeColors = (themeName) => {
    const themes = {
      blue: { primary: '#4F46E5', secondary: '#7C3AED', heroBackground: 'linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)', textDark: '#1E293B', cardBorder: '#E0E7FF' },
      green: { primary: '#059669', secondary: '#047857', heroBackground: 'linear-gradient(135deg, #047857 0%, #065F46 100%)', textDark: '#1E293B', cardBorder: '#BBF7D0' },
      purple: { primary: '#7C3AED', secondary: '#6D28D9', heroBackground: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)', textDark: '#1E293B', cardBorder: '#E9D5FF' },
      orange: { primary: '#EA580C', secondary: '#C2410C', heroBackground: 'linear-gradient(135deg, #F97316 0%, #B45309 100%)', textDark: '#1E293B', cardBorder: '#FED7AA' }
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
    
    productsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' },
    productCard: { background: 'white', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${theme.cardBorder}`, transition: 'transform 0.3s ease, box-shadow 0.3s ease', position: 'relative', display: 'flex', flexDirection: 'column' },
    productImage: { width: '100%', height: '220px', objectFit: 'cover' },
    productInfo: { padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 },
    productName: { fontSize: '1.25rem', fontWeight: '600', color: theme.textDark },
    productPrice: { fontSize: '1.6rem', fontWeight: 'bold', color: theme.primary, margin: '8px 0' },
    productDescription: { color: theme.textLight, flexGrow: 1, marginBottom: '20px', minHeight: '40px' },
    productCategoryBadge: { position: 'absolute', top: '16px', right: '16px', backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500'},
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <style>{`.hover-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }`}</style>
      <header style={styles.header}>
        <h1 style={styles.businessName}>{businessData.businessName || 'Our'} Products</h1>
        <button style={styles.backButton} onClick={() => navigate('/preview')}>← Back to Main Site</button>
      </header>
      
      <main>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Collection</h2>
          {productData.products && productData.products.length > 0 ? (
            <div style={styles.productsGrid}>
              {productData.products.map((product, index) => (
                <div key={index} style={styles.productCard} className="hover-card">
                  <div style={{position: 'relative'}}>
                    <img src={product.productImage || 'https://via.placeholder.com/400x220'} alt={product.productName} style={styles.productImage} />
                    {product.productCategory && <div style={styles.productCategoryBadge}>{product.productCategory}</div>}
                  </div>
                  <div style={styles.productInfo}>
                    <h3 style={styles.productName}>{product.productName || 'Product Name'}</h3>
                    <p style={styles.productPrice}>₹{product.productPrice || '0.00'}</p>
                    <p style={styles.productDescription}>{product.productDescription || 'A brief, engaging description of this fantastic product goes here.'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{textAlign: 'center'}}>No products have been added yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default AllProductsPage;