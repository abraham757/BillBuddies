// index.js o index.tsx
if (process.env.NODE_ENV === 'development') {
  console.warn = () => {}; // Desactiva los warnings solo en desarrollo
}

import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
