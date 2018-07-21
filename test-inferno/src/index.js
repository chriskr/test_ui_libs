import { render } from 'inferno';
import App from './App';
import './common/calendar.css';

console.log(document.getElementById('root'))
render(<App />, document.getElementById('root'));
