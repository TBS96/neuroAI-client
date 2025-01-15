import React, { useState } from 'react'
import { Atom } from 'react-loading-indicators'
import { Container, Header } from './components';
import { Outlet } from 'react-router-dom';

const App = () => {

  const [loading, setLoading] = useState(true);

  return !loading ? (
    <div>
      <div>
        <Header />
        <Container>
        <main>
          <Outlet />
        </main>
        </Container>
      </div>
    </div>
  ) : (
    <div className='grid place-content-center w-full min-h-screen'>
      <Atom color='#5021ec' size='large' />
    </div>
  )
}

export default App