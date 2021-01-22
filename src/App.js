import { Button } from '@material-ui/core';
import { createContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar.jsx';
import { ThemeWrapper } from './styles/ThemeWrapper';
import customTheme from './styles/ThemeWrapper/customTheme';
import { useThemeMode } from './styles/useThemeMode';

const StyledContainer = styled.div`
  background: ${(p) => p.theme.palette.background.paper};
  height: 64px;
  border: 1px solid ${(p) => p.theme.palette.divider};
`;

export const SideBarContext = createContext(false);

function App() {
  const [theme, toggleTheme] = useThemeMode();
  const [openSideBar, setOpenSideBar] = useState(false);

  // let themeMode = theme === 'light' ? customTheme('light') : customTheme('dark');

  let themeMode = useMemo(() => customTheme(theme), [theme]);

  return (
    <ThemeWrapper theme={themeMode}>
      <div className="App">
        <SideBarContext.Provider value={false}>
          <NavBar toggleTheme={toggleTheme} />
          <SideBar openSideBar={openSideBar} />
        </SideBarContext.Provider>
        <StyledContainer>
          <h1>Test</h1>
          <h2>Test</h2>
          <p>Even more Test</p>
          <Button variant="contained" color="secondary">
            GOLA
          </Button>
          <Button variant="contained" color="primary">
            adsasd
          </Button>
        </StyledContainer>
      </div>
    </ThemeWrapper>
  );
}

export default App;
