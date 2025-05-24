import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';

const AIAssistant = () => {
  const { askAssistant } = useData();
  
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your SR-GEO-PoC AI Assistant. I can help explain the data, answer questions about earthquake prediction, and provide insights about the SR-GEO-PoC theory. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  // Suggested questions
  const suggestedQuestions = [
    'What is the SR-GEO-PoC theory?',
    'How does the prediction algorithm work?',
    'What do the current anomalies mean?',
    'Explain the Schumann Resonance parameter',
    'How accurate are the predictions?',
    'What regions are currently at risk?'
  ];

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    try {
      // Send request to backend via context
      const response = await askAssistant(input);
      
      // Add AI response
      const aiResponse = { role: 'assistant', content: response };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setError(null);
    } catch (err) {
      console.error('Error getting AI response:', err);
      setIsTyping(false);
      setError('Failed to get a response. Please try again.');
      
      // Add error message
      const errorMessage = { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error processing your request. Please try again or ask a different question.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Handle suggested question click
  const handleSuggestedQuestion = async (question) => {
    // Add user message
    const userMessage = { role: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI typing
    setIsTyping(true);
    
    try {
      // Send request to backend via context
      const response = await askAssistant(question);
      
      // Add AI response
      const aiResponse = { role: 'assistant', content: response };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setError(null);
    } catch (err) {
      console.error('Error getting AI response:', err);
      setIsTyping(false);
      setError('Failed to get a response. Please try again.');
      
      // Add error message
      const errorMessage = { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error processing your request. Please try again or ask a different question.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="container">
      <h2>AI Assistant</h2>
      <p className="lead">Ask questions about the SR-GEO-PoC theory, data interpretation, and earthquake predictions</p>
      
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="chat-container">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.role}`}>
                    <div className="message-bubble">
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="message assistant">
                    <div className="message-bubble">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>
              
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ask a question about SR-GEO-PoC..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                <button 
                  className="btn btn-primary" 
                  onClick={handleSendMessage}
                  disabled={isTyping || input.trim() === ''}
                >
                  Send
                </button>
              </div>
              
              <div className="suggested-questions">
                <p className="text-muted">Suggested questions:</p>
                <div>
                  {suggestedQuestions.map((question, index) => (
                    <span 
                      key={index} 
                      className="question-chip"
                      onClick={() => !isTyping && handleSuggestedQuestion(question)}
                      style={{ cursor: isTyping ? 'not-allowed' : 'pointer' }}
                    >
                      {question}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">About the AI Assistant</h5>
              <p>
                This AI assistant is designed to help you understand the SR-GEO-PoC theory, interpret the data displayed in the tracker,
                and learn about earthquake prediction methodologies. It can explain:
              </p>
              <ul>
                <li>The scientific principles behind the SR-GEO-PoC theory</li>
                <li>How the prediction algorithm works and interprets multiple parameters</li>
                <li>What current anomalies mean and their significance</li>
                <li>Historical patterns and their correlation with seismic events</li>
                <li>The accuracy and limitations of the prediction system</li>
              </ul>
              <p>
                The assistant has been trained on the SR-GEO-PoC documentation and research papers, including the Master Document,
                White Paper, and supporting scientific literature.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="attribution">
        <p>Based on SR-GEO-PoC Theory | DOI: <a href="https://doi.org/10.5281/zenodo.15380641" target="_blank" rel="noopener noreferrer">10.5281/zenodo.15380641</a> | <a href="https://zenodo.org/records/15477659" target="_blank" rel="noopener noreferrer">Zenodo Repository</a></p>
      </div>
    </div>
  );
};

export default AIAssistant;
