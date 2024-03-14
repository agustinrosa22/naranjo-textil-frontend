import './App.css';
import Home from './views/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Detail from './views/Detail/Detail';
import ProductForm from './views/ProductForm/ProductForm';
import { Routes,Route, useLocation } from 'react-router-dom';  
import EditProduct from './views/EditPorduct/EditProduct';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes> 
       <Route path='/' element={ <Home />} />
       <Route path='/create' element={ <ProductForm />} />
       <Route path="/detail/:id" element={ <Detail />} />
       <Route path="/edit/:id" element={ <EditProduct />} />

      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
