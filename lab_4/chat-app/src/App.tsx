import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import NotFound from "./components/NotFound";
function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>
              <Route path="/users" element={<Users/>}/>
              <Route path="/users/:id" element={<User/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}
export default App;
