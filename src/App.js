import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Header from './components/Header'



import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';

function App() {
  
  let authenticated=false
  return (
    <div className="App">
      <Router>
          <AuthProvider>
        <Header />
        <Routes>

          <Route path="/"  element={<HomePage/>}/>
          <Route path="/login" element={< LoginPage/>}/>
        </Routes>
          </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
