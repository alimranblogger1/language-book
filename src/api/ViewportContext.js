import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const viewportContext = createContext({});

/**
 * This context provider can be used by other components to choose render
 * a different component or element based on viewport size without relying on
 * the mess that CSS can be if used entirely for responsive design
 * @param {*}
 * @returns Child elements contained within context provider
 */

export default function ViewportProvider({ children }) {
  const breakpointHeight = 600;
  const breakpointWidth = 600;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const isMobile = width < breakpointHeight || height < breakpointWidth;

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ viewportDimensions: { width, height }, isMobile }}>
      {children}
    </viewportContext.Provider>
  );
}

export function useViewport() {
  const { viewportDimensions, isMobile } = useContext(viewportContext);
  return { viewportDimensions, isMobile };
}