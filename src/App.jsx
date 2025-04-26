import React, { useEffect, useState } from 'react'
import { LifeLine } from 'react-loading-indicators'
import { Container, Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

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
      <Footer />
    </div>
  ) : (
    <div className='grid place-content-center w-full min-h-screen'>
      <LifeLine easing='ease-in' speedPlus={0} text='neuroAI' size='large' />
    </div>
  )
}

export default App