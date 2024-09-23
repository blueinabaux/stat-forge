import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './layout/Layout'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import LinksPage from './pages/LinksPage';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>} >
      <Route index element={<Dashboard/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<SignUp/>} />
      <Route path='/allLinks' element={<LinksPage/>} />



    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
  <PersistGate loading={null} persistor={persistor} >
    <RouterProvider router={router} />
  </PersistGate>
</Provider>
)
