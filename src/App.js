import logo from './logo.svg';
import './App.css';
import redis from 'redis'

import Home from './Home';
import Landing from './Landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path = '/' element = {<Landing/>} /> 
            <Route exact path = '/home' element = {<Home/>} /> 
        </Routes>
    </Router>
  );
}

export default App;
