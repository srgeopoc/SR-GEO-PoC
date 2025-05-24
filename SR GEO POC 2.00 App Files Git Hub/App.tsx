import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Review from './pages/Review';
import Validation from './pages/Validation';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-800 text-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">SR-GEO-PoC Review</div>
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="hover:text-blue-200 transition">Home</Link>
                <Link to="/review" className="hover:text-blue-200 transition">Comprehensive Review</Link>
                <Link to="/validation" className="hover:text-blue-200 transition">Empirical Validation</Link>
                <Link to="/about" className="hover:text-blue-200 transition">About</Link>
              </div>
              <div className="md:hidden">
                {/* Mobile menu button would go here */}
                <button className="text-white">Menu</button>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/review" element={<Review />} />
            <Route path="/validation" element={<Validation />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p>© 2025 SR-GEO-PoC Theory Review</p>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <a href="https://doi.org/10.5281/zenodo.15380641" className="hover:text-blue-300 transition">DOI: 10.5281/zenodo.15380641</a>
                <a href="https://zenodo.org/records/15477659" className="hover:text-blue-300 transition">Zenodo Repository</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
