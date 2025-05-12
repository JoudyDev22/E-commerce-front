import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Users from './Pages/Dashboard/Users/Users';
import Google from './Pages/Auth/Google';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Auth/RequireAuth';
import EditeUser from './Pages/Dashboard/Users/EditeUser';
import AddUser from './Pages/Dashboard/Users/AddUser';
import { useContext } from 'react';
import { Theme } from './Components/Context/ThemeContext';
import Err404 from './Pages/Auth/Err404';
import RequireBack from './Pages/Auth/RequireBack';
import Categories from './Pages/Dashboard/Category/Categories';
import AddCategory from './Pages/Dashboard/Category/AddCategory';
import EditeCategory from './Pages/Dashboard/Category/EditeCategory';
import Products from './Pages/Dashboard/Products/Products';
import AddProduct from './Pages/Dashboard/Products/AddProduct';
import EditProduct from './Pages/Dashboard/Products/EditProduct';
import HomePage from './Pages/Website/Home/HomePage';
import WebsiteCat from './Pages/Website/Categories/WebsiteCat';
import Website from './Pages/Website/Website/Website';
import SingleProduct from './Pages/Website/Products/SingleProduct/SingleProduct';
import ProductbyCat from './Pages/Website/Categories/ProductbyCat';
import Logout from './Pages/Auth/Logout';






function App() {
      const theme=useContext(Theme)
            const mode=theme.mode;
  return (
  
  
    <div className="App" id={mode}>
    <Routes>
    {/* public Routes */}
    <Route path='/' element={<Website></Website>}>
    <Route path='/home' element={<HomePage></HomePage>}></Route>
    <Route path='/categories' element={<WebsiteCat></WebsiteCat>}></Route>
    <Route path='/categories/:id' element={<ProductbyCat></ProductbyCat>}></Route>
    <Route path='/product/:id' element={<SingleProduct></SingleProduct>}></Route>
    </Route>
    <Route path='/logout' element={<Logout></Logout>}></Route>
    <Route element={<RequireBack></RequireBack>}>
    <Route path='/register' element={<Register></Register>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
    </Route>
    <Route path='/users' element={<Users></Users>}></Route>
    <Route path='/auth/google/callback' element={<Google></Google>}></Route>
    <Route path='/*' element={<Err404></Err404>}></Route>
    {/* private Routes */}
    <Route element={<RequireAuth allowedRole={["1995","1996",'1999']}></RequireAuth>}>
    <Route path='/dashboard' element={<Dashboard></Dashboard>}>
    <Route element={<RequireAuth allowedRole={'1995'}></RequireAuth> }>
    <Route path='users' element={<Users></Users>}></Route>
    <Route path='users/:id' element={<EditeUser></EditeUser>}></Route>
    <Route path='user/adduser' element={<AddUser></AddUser>}></Route>
    </Route>
    <Route element={<RequireAuth allowedRole={['1995','1999']}></RequireAuth>}>
    {/* categories */}
    <Route path='categories' element={<Categories></Categories>}></Route>
    <Route path='categories/:id' element={<EditeCategory></EditeCategory>}></Route>
    <Route path='addcat' element={<AddCategory></AddCategory>}></Route>
    {/* products */}
    <Route path='products' element={<Products></Products>}></Route>
    <Route path='products/:id' element={<EditProduct></EditProduct>}></Route>
    <Route path='addpro' element={<AddProduct></AddProduct>}></Route>
    </Route>
    </Route>
    </Route>
    </Routes>  
    </div>

  );
}

export default App;
