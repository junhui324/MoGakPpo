import ROUTES from '../../constants/Routes';
import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/main');
  }, []);

  return null;
}

export default Home;
