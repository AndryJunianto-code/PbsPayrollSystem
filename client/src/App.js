import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Theme from "./assets/styles/theme";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <Theme>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/admin' element={<ProtectedRoute element={<Admin/>}/>}/>
          </Routes>
      </Router>
    </Theme>
  );
}

export default App;
