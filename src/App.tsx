import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import { Account } from './pages/Dashboard/User/Account';
import { ShowNews } from './pages/Dashboard/User/ShowNews';
import { Users } from './pages/Dashboard/Admin/Users';
import { WriteNews } from './pages/Dashboard/Admin/WriteNews';
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
            <ConnectionChecker>
              <Dashboard />
            </ConnectionChecker>
          </ThemeProvider>
        } >
          <Route path="account" element={<Account />} />
          <Route path="news-article" element={<><WriteNews /><ShowNews /> </>} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path='/login' element={
          <ThemeProvider>
            <ConnectionChecker>
              <Login />
            </ConnectionChecker>
          </ThemeProvider>
        } />
        <Route path='/register' element={
          <ThemeProvider>
            <ConnectionChecker>
              <Register />
            </ConnectionChecker>
          </ThemeProvider>
        } />
        <Route path="*" element={<Error404 />} />

      </Routes>
    </Router>
  );
}

export default App;
