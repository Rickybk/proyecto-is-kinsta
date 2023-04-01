import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route, Link, Outlet, createRoutesFromElements } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ModalProducto from './Forms/FormProductModal';
import SideMenu from './components/Layout';
import Casa from './Home';


const Inicio = () => {
  //Asociar el menu para la navegacion
  return (
    <>
      <SideMenu />
      <Outlet />
    </>);
}

//Construimos las rutas
const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Inicio />}>
    <Route path='/' element={null} />
    <Route path='/Home' element={<Casa />} />
    <Route path='/Inventario' element={<ModalProducto />} />
  </Route>

));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        "token": {
          "colorPrimary": "#fe9688",
          "colorSuccess": "#b86fd6",
          "colorWarning": "#ff9966",
          "colorError": "#eb636b",
          "colorInfo": "#77ddec",
          "colorBgBase": "#ffeae6",
          "colorTextQuaternary": "#000000",
          "fontSize": 14,
          "colorFill": "#fa8072"
        }
      }}
    >
      <RouterProvider router={router} className="menu">
      </RouterProvider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
