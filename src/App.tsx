import { MantineThemeProvider } from './components/MantineTheme/MantineThemeProvider';
import Routes from './routes';

function App() {
  return (
    <MantineThemeProvider>
      <Routes />
    </MantineThemeProvider>
  );
}

export default App;
