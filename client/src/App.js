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
import Login from './views/Login/Login';
import TransactionView from './views/Balance/Balance';
import { Navigate } from 'react-router-dom';
import GroupEdit from './views/GroupEdit/GroupEdit';


function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isPrecioPage = location.pathname.startsWith("/precio");
  const user = JSON.parse(localStorage.getItem('user'));
// console.log(user);

  return (
    <div className="App">
                  {!isLoginPage && !isPrecioPage && <NavBar />}
      <Routes> 
      <Route path='/' element={<Login />} />
       <Route path='/home' element={user ? <Home /> :  <Navigate to="/" />}  />
       <Route path='/create' element={user ? <ProductForm />:  <Navigate to="/" />} />
       <Route path='/groupedit' element={user ? <GroupEdit />:  <Navigate to="/" />} />
       <Route path="/detail/:id" element={user ?  <Detail />:  <Navigate to="/" />} />
       <Route path="/edit/:id" element={ user ? <EditProduct />: <Navigate to="/" />} />
       <Route path="/precio/:id" element={ <Precio />} />
       <Route path="/carrito" element={ user ? <CartView />: <Navigate to="/" />} />
       <Route path="/balance" element={ user ? <TransactionView />: <Navigate to="/" />} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
