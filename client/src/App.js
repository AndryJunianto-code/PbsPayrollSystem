import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Theme from "./assets/styles/theme";
import AuthProvider from "./auth/AuthProvider";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <Theme>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/admin' element={<Admin/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </Theme>
  );
}

export default App;
