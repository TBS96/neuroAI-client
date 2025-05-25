import React, { useEffect, useState } from 'react'
import { LifeLine } from 'react-loading-indicators'
import { Container, Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return !loading ? (
    <div className='min-h-screen'>
      <Header />
      <Container>
        <main>
          <Outlet />
        </main>
      </Container>
      <ScrollToTop
        smooth
        viewBox='0 0 32 32'
        svgPath='M0.256 23.481c0 0.269 0.106 0.544 0.313 0.75 0.412 0.413 1.087 0.413 1.5 0l14.119-14.119 13.913 13.912c0.413 0.413 1.087 0.413 1.5 0s0.413-1.087 0-1.5l-14.663-14.669c-0.413-0.412-1.088-0.412-1.5 0l-14.869 14.869c-0.213 0.212-0.313 0.481-0.313 0.756z'
        title='Scroll Up'
        color='#345995'
        className='!btn !btn-circle !bg-base-300 !text-orange-600'
      />
      <Footer />
    </div>
  ) : (
    <div className='grid place-content-center w-full min-h-screen'>
      <LifeLine easing='ease-in' speedPlus={0} text='neuroAI' size='large' />
    </div>
  )
}

export default App