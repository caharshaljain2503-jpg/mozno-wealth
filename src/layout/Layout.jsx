import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/layoutElements/Navbar';
import Footer from '../components/layoutElements/Footer';
import Banner from '../components/layoutElements/Banner';

const Layout = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  // Handle hash links
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location.hash, location.pathname]);

  return (
    <>
    {/* <Banner/> */}
      <main className="min-h-screen">
      <Navbar />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;