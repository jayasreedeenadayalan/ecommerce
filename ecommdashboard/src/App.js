
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './Components/Header'; 
import Login from './Components/Login';

import Register from './Components/Register';
import AddProduct from './Components/Products/AddProduct';
import UpdateProduct from './Components/Products/UpdateProduct';
import Protected from './Components/Protected';
import ProductList from './Components/Products/ProductList';
import SearchProduct from './Components/Products/SearchProduct';

function App() {
  return (
   
    <div className="App">
       
       <BrowserRouter>
       <Header />
      
      <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/addProduct' element={<Protected Cmp={AddProduct} />}></Route>
      <Route path='/updateProduct/:id' element={<Protected  Cmp={UpdateProduct} />}></Route>
      <Route path='/SearchProduct' element={<Protected  Cmp={SearchProduct} />}></Route>
      <Route path='/' element={<Protected  Cmp={ProductList} />}></Route>
     
      </Routes>
      
       
      </BrowserRouter>
    </div>
    
  );
}

export default App;
