import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuContext from './Components/Context/MenuContext';
import WindowContext from './Components/Context/WindowContext';
import ThemeContext from './Components/Context/ThemeContext';
import "react-image-gallery/styles/css/image-gallery.css";
import CartContext from './Components/Context/CartContext';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <ThemeContext>
  <WindowContext>
  <MenuContext>
  <React.StrictMode>
  <CartContext>
    <Router>
    <App />
    </Router>
    </CartContext>
  </React.StrictMode>
  </MenuContext>
  </WindowContext>
  </ThemeContext>

);

