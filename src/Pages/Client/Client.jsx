import React, { useEffect } from 'react';
import './Client.css';
import NavigatorBar from '../../components/Navigator-Bar';
import { Routes, Route } from 'react-router-dom';
import Loading from '../../components/Loading';
import Home from './components/Home';
import History from './components/History';
import { useAuth } from '../../components/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const Client = () => {
  const [Client, setClient] = React.useState([]);
  const { verifyToken, user } = useAuth();

  useEffect(() => {
    verifyToken();

    const clientjs = localStorage.getItem('token');
    if (clientjs) {
      const userjs = JSON.parse(atob(clientjs.split('.')[1]));
      setClient(userjs);
    }
  }, []);
  const handleShowwBar = () => {
    document.querySelector('.navigator-bar').classList.add('active');
  };
  return (
    <div className='container'>
      <NavigatorBar Home={"/Client/Home"} History={"/Client/History"} />
      <FontAwesomeIcon icon={faBars} className='icon-menu active' onClick={handleShowwBar} />
      <div className='container-dashboard'>
        <Routes>
          <Route index element={<Home Client={Client} />} />
          <Route path='/Home' element={<Home Client={Client} />} />
          <Route path='/History' element={<History Client={Client} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Client;
