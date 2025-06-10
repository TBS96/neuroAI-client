import { createContext, useContext, useState } from 'react'

const FooterVisibilityContext = createContext();

export const FooterVisibilityProvider = ({ children }) => {

  const [showFooter, setShowFooter] = useState(true);

  const hideFooter = () => setShowFooter(false);
  const showFooterFn = () => setShowFooter(true);

  return (
    <FooterVisibilityContext.Provider value={{ showFooter, hideFooter, showFooterFn }}>
      {children}
    </FooterVisibilityContext.Provider>
  )
};

export const useFooterVisibility = () => useContext(FooterVisibilityContext);