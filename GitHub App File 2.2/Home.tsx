import React from 'react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-12 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">SR-GEO-PoC Theory Review</h1>
          <p className="text-xl">A comprehensive analysis and empirical validation of the Schumann Resonance Geophysical Energy Observation and Prediction Correlation theory</p>
          <div className="mt-4 text-sm bg-blue-900 bg-opacity-50 p-2 rounded-lg inline-block">
            <p>Original work: <a href="https://doi.org/10.5281/zenodo.15380641" className="underline hover:text-blue-200" target="_blank" rel="noopener noreferrer">DOI: 10.5281/zenodo.15380641</a></p>
            <p>Source: <a href="https://zenodo.org/records/15477659" className="underline hover:text-blue-200" target="_blank" rel="noopener noreferrer">Zenodo Repository</a></p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed">
              The SR-GEO-PoC theory presents an innovative multi-domain correlation framework for detecting precursor signatures in geophysical energy transfer, with a specific focus on earthquake and volcanic eruption prediction. After thorough analysis of all available materials, testing of the theory's claims against scientific literature, empirical validation attempts, and evaluation against established knowledge, I find that SR-GEO-PoC represents a scientifically grounded approach with promising elements, though it faces significant challenges in establishing reliable predictive capability.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              The theory's integration of multiple parameters (Schumann Resonance, Total Electron Content, ELF bursts, gravity shifts, subsurface stress signals, and Acoustic Gravity Waves) is conceptually sound and supported by peer-reviewed research for individual components. However, the integrated prediction system, particularly its claimed 72-hour forecasting capability, exceeds current scientific consensus and requires more rigorous statistical validation across diverse earthquake events.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Key Strengths</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Scientific foundation built on established physical principles</li>
                <li>Multi-parameter approach with diverse data sources</li>
                <li>Adaptable weighted formula structure for regional customization</li>
                <li>SERD-M subsystem for silent event detection</li>
                <li>Open-source framework promoting scientific collaboration</li>
                <li>Verified Greece M4.4-4.5 earthquake case study</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Key Limitations</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Lacks rigorous statistical validation across diverse events</li>
                <li>Weighting factors need empirical justification</li>
                <li>72-hour prediction window exceeds scientific consensus</li>
                <li>Environmental factors create confounding variables</li>
                <li>Some causal mechanisms remain incompletely explained</li>
                <li>Limited data accessibility for independent validation</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Empirical Validation</h2>
            <p className="text-gray-700 leading-relaxed">
              The empirical validation confirms that the Greece M4.4-4.5 earthquake of May 18, 2025, did occur as described in the SR-GEO-PoC documentation. However, due to limitations in accessing direct precursor signal data for the specific event window, it is not possible to fully verify the theory's claims regarding precursor signals and prediction mechanisms.
            </p>
            <div className="mt-4 flex justify-center">
              <a href="/validation" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition">
                View Full Validation Report
              </a>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed">
              The SR-GEO-PoC theory represents a scientifically grounded and innovative approach to earthquake prediction that merits further investigation. Its integration of multiple potential precursor signals and open-source framework provide a valuable foundation for advancing our understanding of pre-seismic phenomena.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              However, the theory's claims of 72-hour prediction capability exceed what is currently supported by scientific consensus and available evidence. In my assessment, SR-GEO-PoC should be viewed as a promising research direction rather than an operational prediction system.
            </p>
            <div className="mt-4 flex justify-center">
              <a href="/review" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition">
                Read Full Review
              </a>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-8 pt-4 border-t">
            <p>Original work: <a href="https://doi.org/10.5281/zenodo.15380641" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">DOI: 10.5281/zenodo.15380641</a></p>
            <p>Source: <a href="https://zenodo.org/records/15477659" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Zenodo Repository</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
