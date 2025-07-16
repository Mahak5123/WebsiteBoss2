import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductSetupPage = () => {
   const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      productName: '',
      productDescription: '',
      productPrice: '',
      productSku: '',
      productCategory: '',
      productImage: '',
    },
  ]);

  const [categories, setCategories] = useState('');
  const [deliveryAreas, setDeliveryAreas] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  const styles = {
    body: {
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      background: 'linear-gradient(135deg, #2d1b3d 0%, #1a0e2e 100%)',
      minHeight: '100vh',
      color: '#e0d4f7',
      padding: '20px',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      color: '#e0d4f7',
      marginBottom: '30px',
    },
    h1: {
      fontSize: '2.5rem',
      marginBottom: '10px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    },
    progressBar: {
      width: '100%',
      height: '6px',
      background: '#4a2c5a',
      borderRadius: '3px',
      marginBottom: '30px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(45deg, #8b5fbf, #6a4c93)',
      width: '80%',
      borderRadius: '3px',
      transition: 'width 0.3s ease',
    },
    formContainer: {
      background: 'linear-gradient(135deg, #3d2b4f 0%, #2a1f3d 100%)',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
    },
    section: {
      marginBottom: '30px',
    },
    sectionTitle: {
      color: '#e0d4f7',
      marginBottom: '20px',
      fontSize: '1.8rem',
      borderBottom: '3px solid #8b5fbf',
      paddingBottom: '10px',
    },
    productCard: {
      border: '2px solid #4a2c5a',
      borderRadius: '10px',
      padding: '20px',
      background: 'linear-gradient(135deg, #2a1f3d 0%, #1f1729 100%)',
      marginBottom: '20px',
      position: 'relative',
    },
    productNumber: {
      position: 'absolute',
      top: '10px',
      right: '15px',
      background: 'linear-gradient(45deg, #8b5fbf, #6a4c93)',
      color: '#e0d4f7',
      padding: '5px 10px',
      borderRadius: '15px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '600',
      color: '#c794f7',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      background: '#2a1f3d',
      color: '#e0d4f7',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'background-color 0.3s ease',
    },
    textarea: {
      width: '100%',
      padding: '12px 15px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      background: '#2a1f3d',
      color: '#e0d4f7',
      outline: 'none',
      boxSizing: 'border-box',
      resize: 'vertical',
      transition: 'background-color 0.3s ease',
    },
    button: {
      background: 'linear-gradient(45deg, #8b5fbf, #6a4c93)',
      color: '#e0d4f7',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      marginRight: '10px',
    },
    addButton: {
      background: 'linear-gradient(45deg, #8b5fbf, #6a4c93)',
      color: '#e0d4f7',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      marginTop: '15px',
      boxShadow: '0 4px 15px rgba(139, 95, 191, 0.3)',
    },
    danger: {
      background: 'linear-gradient(45deg, #d63384, #b02a5b)',
    },
    secondary: {
      background: 'linear-gradient(45deg, #4a2c5a, #362041)',
    },
    btnContainer: {
      textAlign: 'center',
      marginTop: '30px',
      paddingTop: '20px',
      borderTop: '1px solid #4a2c5a',
    },
    required: {
      color: '#ff6b8a',
    },
    checkboxContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    checkboxItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const addProduct = () => {
    const newProduct = {
      productName: '',
      productDescription: '',
      productPrice: '',
      productSku: '',
      productCategory: '',
      productImage: '',
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      const updated = products.filter((_, i) => i !== index);
      setProducts(updated);
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const productData = {
    categories,
    products,
    deliveryAreas,
    paymentMethods,
    deliveryOptions,
  };

  // ✅ Save the product data to sessionStorage
  sessionStorage.setItem('productData', JSON.stringify(productData));

  alert('Product data saved successfully! Ready to generate website.');
  navigate('/website-generator');
};


  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.h1}>Product Setup</h1>
          <p>Add your products and services</p>
        </div>
        <div style={styles.progressBar}>
          <div style={styles.progressFill}></div>
        </div>
        <div onSubmit={handleSubmit} style={styles.formContainer}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Product Categories</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>Main Product Categories <span style={styles.required}>*</span></label>
              <textarea 
                required 
                value={categories} 
                onChange={(e) => setCategories(e.target.value)} 
                style={styles.textarea} 
                placeholder="e.g., Pain Relief, Vitamins, Skincare"
                rows="3"
              />
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Products/Services ({products.length})</h2>
            {products.map((product, i) => (
              <div key={i} style={styles.productCard}>
                <div style={styles.productNumber}>Product #{i + 1}</div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Product Name <span style={styles.required}>*</span></label>
                  <input 
                    type="text" 
                    required 
                    style={styles.input} 
                    value={product.productName} 
                    onChange={(e) => handleInputChange(i, 'productName', e.target.value)} 
                    placeholder="Enter product name"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Description</label>
                  <textarea 
                    rows="3" 
                    style={styles.textarea} 
                    value={product.productDescription} 
                    onChange={(e) => handleInputChange(i, 'productDescription', e.target.value)} 
                    placeholder="Describe your product"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Price (₹)</label>
                    <input 
                      type="number" 
                      style={styles.input} 
                      value={product.productPrice} 
                      onChange={(e) => handleInputChange(i, 'productPrice', e.target.value)} 
                      placeholder="0"
                      min="0"
                      onWheel={(e) => e.target.blur()}  // ✅ prevents scroll adjustment
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>SKU</label>
                    <input 
                      type="text" 
                      style={styles.input} 
                      value={product.productSku} 
                      onChange={(e) => handleInputChange(i, 'productSku', e.target.value)} 
                      placeholder="SKU-001"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Category</label>
                    <input 
                      type="text" 
                      style={styles.input} 
                      value={product.productCategory} 
                      onChange={(e) => handleInputChange(i, 'productCategory', e.target.value)} 
                      placeholder="Product category"
                    />
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Image URL</label>
                  <input 
                    type="url" 
                    style={styles.input} 
                    value={product.productImage} 
                    onChange={(e) => handleInputChange(i, 'productImage', e.target.value)} 
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {products.length > 1 && (
                  <button 
                    type="button" 
                    style={{ ...styles.button, ...styles.danger }} 
                    onClick={() => removeProduct(i)}
                  >
                    Remove Product
                  </button>
                )}
              </div>
            ))}
            <button 
              type="button" 
              style={styles.addButton} 
              onClick={addProduct}
            >
              + Add Another Product
            </button>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Payment & Delivery</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Payment Methods</label>
                <div style={styles.checkboxContainer}>
                  {['cash', 'upi', 'card', 'netbanking'].map(method => (
                    <div key={method} style={styles.checkboxItem}>
                      <input 
                        type="checkbox" 
                        id={`payment-${method}`}
                        value={method} 
                        checked={paymentMethods.includes(method)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPaymentMethods([...paymentMethods, method]);
                          } else {
                            setPaymentMethods(paymentMethods.filter(m => m !== method));
                          }
                        }} 
                      />
                      <label htmlFor={`payment-${method}`}>{method.toUpperCase()}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Delivery Options</label>
                <div style={styles.checkboxContainer}>
                  {['home', 'pickup', 'express'].map(option => (
                    <div key={option} style={styles.checkboxItem}>
                      <input 
                        type="checkbox" 
                        id={`delivery-${option}`}
                        value={option} 
                        checked={deliveryOptions.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setDeliveryOptions([...deliveryOptions, option]);
                          } else {
                            setDeliveryOptions(deliveryOptions.filter(o => o !== option));
                          }
                        }} 
                      />
                      <label htmlFor={`delivery-${option}`}>{option.charAt(0).toUpperCase() + option.slice(1)}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Delivery Areas</label>
              <textarea 
                style={styles.textarea} 
                value={deliveryAreas} 
                onChange={(e) => setDeliveryAreas(e.target.value)} 
                placeholder="Areas where you provide delivery..."
                rows="3"
              />
            </div>
          </div>

          <div style={styles.btnContainer}>
            <button 
              type="button" 
              style={{ ...styles.button, ...styles.secondary }} 
              onClick={() => window.history.back()}
            >
              Back
            </button>
            <button type="submit" style={styles.button} onClick={handleSubmit}>
              Generate Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSetupPage;