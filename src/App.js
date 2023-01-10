import {Routes, Route } from "react-router-dom";
import HomePage from './pages/homePage/homePage'
import EventDetails from './pages/eventDetails/eventDetails';
import Header from './components/header/header';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Header/>
      <div className="app-content">
      
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/eventdetails/:id" element={<EventDetails />}/>
      </Routes>
      </div>
    </div>
    
  );
}

export default App;
