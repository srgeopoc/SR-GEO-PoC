import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">
              SR-GEO-PoC Tracker - Earthquake Prediction Monitoring System
            </p>
            <p className="small text-muted">
              Based on the Schumann Resonance Geophysical Energy Observation and Prediction Correlation theory
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              <a href="https://doi.org/10.5281/zenodo.15380641" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                DOI: 10.5281/zenodo.15380641
              </a>
            </p>
            <p className="small text-muted">
              <a href="https://zenodo.org/records/15477659" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                Zenodo Repository
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
