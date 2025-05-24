import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">About This Review</h1>
          <p className="text-lg">Methodology, scope, and limitations of the SR-GEO-PoC theory assessment</p>
          <div className="mt-4 text-sm bg-blue-900 bg-opacity-50 p-2 rounded-lg inline-block">
            <p>Original work: <a href="https://doi.org/10.5281/zenodo.15380641" className="underline hover:text-blue-200" target="_blank" rel="noopener noreferrer">DOI: 10.5281/zenodo.15380641</a></p>
            <p>Source: <a href="https://zenodo.org/records/15477659" className="underline hover:text-blue-200" target="_blank" rel="noopener noreferrer">Zenodo Repository</a></p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="prose prose-lg max-w-none">
            <h2>Review Methodology</h2>
            <p>
              This comprehensive review of the SR-GEO-PoC theory was conducted using a systematic approach that included:
            </p>
            <ul>
              <li>Thorough analysis of all available documentation from Zenodo and GitHub repositories</li>
              <li>Testing of key claims against peer-reviewed scientific literature</li>
              <li>Empirical validation of the Greece M4.4-4.5 earthquake case study</li>
              <li>Evaluation against established geophysical knowledge and earthquake prediction practices</li>
              <li>Assessment of the theory's scientific merit, limitations, and potential applications</li>
            </ul>
            
            <h2>Scope of Review</h2>
            <p>
              The review examined version 9 of the SR-GEO-PoC theory as available on Zenodo as of May 2025. 
              Despite attempts to access previous versions (v1-v8), only the latest version was available for review.
              The scope included:
            </p>
            <ul>
              <li>The theoretical foundation and mathematical framework</li>
              <li>The multi-parameter approach to earthquake prediction</li>
              <li>The SERD-M subsystem for silent event detection</li>
              <li>The Greece M4.4-4.5 earthquake case study</li>
              <li>Comparison with current earthquake prediction practices</li>
            </ul>
            
            <h2>Data Limitations</h2>
            <p>
              The empirical validation encountered significant limitations in data availability:
            </p>
            <ul>
              <li>Direct Schumann Resonance data for May 2025 was not accessible through open-access sources</li>
              <li>NOAA's Total Electron Content products were out of service during the review period</li>
              <li>Direct ELF and gravity measurements for the specific event window were not publicly available</li>
              <li>The proprietary algorithms and methodologies used in the model were not fully disclosed</li>
            </ul>
            <p>
              These limitations prevented full empirical validation of the theory's claims regarding precursor signals 
              and prediction mechanisms, though the earthquake event itself was verified through multiple authoritative sources.
            </p>
            
            <h2>Scientific Standards</h2>
            <p>
              This review adheres to rigorous scientific standards, including:
            </p>
            <ul>
              <li>Reliance on peer-reviewed research and authoritative sources</li>
              <li>Clear distinction between verified facts and theoretical claims</li>
              <li>Transparent documentation of data limitations and uncertainties</li>
              <li>Balanced assessment of both strengths and limitations</li>
              <li>Evidence-based conclusions and recommendations</li>
            </ul>
            
            <h2>About the Reviewer</h2>
            <p>
              This review was conducted by an independent analyst with expertise in scientific assessment, 
              data analysis, and research evaluation. The reviewer has no affiliation with the SR-GEO-PoC 
              development team or competing earthquake prediction methodologies.
            </p>
            
            <h2>Contact</h2>
            <p>
              For questions or further information about this review, please contact the reviewer through 
              the original communication channel.
            </p>
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

export default About;
