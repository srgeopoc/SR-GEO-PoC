import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const Validation = () => {
  const [validationContent, setValidationContent] = useState('');
  
  useEffect(() => {
    fetch('/content/empirical_validation.md')
      .then(response => response.text())
      .then(text => {
        // Add DOI and Zenodo attribution to the top of the markdown content
        const attributionText = `
# Empirical Validation of SR-GEO-PoC Theory

*This validation examines the original work available at:*
- **DOI**: [10.5281/zenodo.15380641](https://doi.org/10.5281/zenodo.15380641)
- **Zenodo Repository**: [https://zenodo.org/records/15477659](https://zenodo.org/records/15477659)

`;
        setValidationContent(attributionText + text);
      })
      .catch(error => console.error('Error loading validation content:', error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Empirical Validation of SR-GEO-PoC Theory</h1>
          <p className="text-lg">Analysis of the Greece M4.4-4.5 earthquake case study and precursor signal data assessment</p>
          <div className="mt-4 text-sm bg-blue-900 bg-opacity-50 p-2 rounded-lg inline-block">
            <p>Original work: <a href="https://doi.org/10.5281/zenodo.15380641" className="underline hover:text-blue-200" target="_blank" rel="noopener noreferrer">DOI: 10.5281/zenodo.15380641</a></p>
            <p>Source: <a href="https://zenodo.org/records/15477659" className="underline hover:text-blue-200" target="_blank" rel="noopener noreferrer">Zenodo Repository</a></p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="prose prose-lg max-w-none">
            {validationContent ? (
              <ReactMarkdown>{validationContent}</ReactMarkdown>
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
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

export default Validation;
