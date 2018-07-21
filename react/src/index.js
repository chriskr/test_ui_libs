import React from 'react';
import ReactDOM from 'react-dom';
import './common/calendar.css';
import App from './App';

const div = document.createElement('div');
div.id = 'root';

ReactDOM.render(<App />, div);
document.body.appendChild(div);
