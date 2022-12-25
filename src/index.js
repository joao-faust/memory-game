import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MemoryGame from './MemoryGame';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <MemoryGame />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
