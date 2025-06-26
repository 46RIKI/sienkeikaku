import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';

// Components
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import AudioUpload from './pages/AudioUpload/AudioUpload';
import PlanEditor from './pages/PlanEditor/PlanEditor';
import PlanList from './pages/PlanList/PlanList';
import PlanView from './pages/PlanView/PlanView';

// Create a theme instance
const theme: Theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    fontFamily: ['Roboto', 'Noto Sans JP', 'sans-serif'].join(','),
  },
});

const queryClient = new QueryClient();

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<AudioUpload />} />
            <Route path="/editor/:planId" element={<PlanEditor />} />
            <Route path="/plans" element={<PlanList />} />
            <Route path="/plan/:planId" element={<PlanView />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App; 