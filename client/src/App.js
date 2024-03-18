import './App.css';
import Home from './views/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Detail from './views/Detail/Detail';
import ProductForm from './views/ProductForm/ProductForm';
import { Routes,Route, useLocation } from 'react-router-dom';  
import EditProduct from './views/EditPorduct/EditProduct';
import Precio from './views/Precio/Precio';
import CartView from './components/Carrito/Carrito';



function App() {
  const location = useLocation();
  const isPrecioPage = location.pathname.startsWith("/precio");
  return (
    <div className="App">
                 {!isPrecioPage && <NavBar />}
      <Routes> 
       <Route path='/' element={ <Home />} />
       <Route path='/create' element={ <ProductForm />} />
       <Route path="/detail/:id" element={ <Detail />} />
       <Route path="/edit/:id" element={ <EditProduct />} />
       <Route path="/precio/:id" element={ <Precio />} />
       <Route path="/carrito" element={ <CartView />} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
