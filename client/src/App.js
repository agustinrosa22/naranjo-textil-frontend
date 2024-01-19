import './App.css';
import Home from './views/Home/Home';
import { Routes,Route, useLocation } from 'react-router-dom';  

function App() {
  return (
    <div className="App">
      <Routes> 
       <Route path='/' element={ <Home />} />
      </Routes>
    </div>
  );
}

export default App;
