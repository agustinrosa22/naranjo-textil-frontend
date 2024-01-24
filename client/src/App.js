import './App.css';
import Home from './views/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Detail from './views/Detail/Detail';
import { Routes,Route, useLocation } from 'react-router-dom';  

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes> 
       <Route path='/' element={ <Home />} />
       <Route path="/detail/:id" element={ <Detail />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
