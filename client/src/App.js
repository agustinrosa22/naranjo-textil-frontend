import './App.css';
import Home from './views/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { Routes,Route, useLocation } from 'react-router-dom';  

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes> 
       <Route path='/' element={ <Home />} />
      </Routes>
    </div>
  );
}

export default App;
