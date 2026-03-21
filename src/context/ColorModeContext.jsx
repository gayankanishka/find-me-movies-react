import React, { createContext, useContext, useMemo, useState } from 'react';

const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: 'dark' });

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('colorMode') || 'dark');
  const value = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === 'dark' ? 'light' : 'dark';
          localStorage.setItem('colorMode', next);
          return next;
        });
      }
    }),
    [mode]
  );
  return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>;
}

export function useColorMode() {
  return useContext(ColorModeContext);
}

export default ColorModeContext;
