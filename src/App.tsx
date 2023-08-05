import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Error404 } from './pages/error/404';
import Login from './pages/Login';
import { Register } from './pages/Registration';
import { Welcome } from './pages/Welcome';
import { ConnectionChecker } from './providers/ConnectionChecker';
import { ThemeProvider } from './providers/ThemeProvider';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={
          <ThemeProvider>
            <ConnectionChecker />
          </ThemeProvider>
        } />
        <Route path='/login' element={
          <ThemeProvider>
            <Login />
          </ThemeProvider>
        } />
        <Route path='/register' element={
          <ThemeProvider>
            <Register />
          </ThemeProvider>
        } />
        <Route path="*" element={<Error404 />} />

      </Routes>
    </Router>
  );
}

export default App;
