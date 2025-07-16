import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import InfoPage from './components/InfoPage';
import ProductSetupPage from './components/ProductSetupPage';
import WebsiteGeneratorPage from './components/WebsiteGeneratorPage';
import PreviewPage from './components/PreviewPage';
import AboutPage from './components/pages/AboutPage';
// Add this new import
import AllProductsPage from './components/pages/AllProductsPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/product-setup" element={<ProductSetupPage />} />
        <Route path="/website-generator" element={<WebsiteGeneratorPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        {/* Add this new route */}
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;