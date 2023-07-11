// Assets
import './App.css';

// React Components
import { useState } from 'react'

// Router
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';

// Custom Components
import AuthPage from '../AuthPage/AuthPage';
import AddAsset from '../AddAsset/AddAsset'
import MyAssets from '../MyAssets/MyAssets'
import Profile from '../Profile/Profile'
import Dashboard from '../Dashboard/Dashboard'
import NavBar from '../../components/NavBar/NavBar'

export default function App() {

  const [user, setUser] = useState(getUser())

  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar user={user} setUser={setUser} />
          {/* // Routes is sitting inside this ternary so that the AuthPage is always rendered when a user state is null, no matter what the path is. When user has a value, it will render the relevant Route */}
          <Routes>
            <Route path="/assets" element={<MyAssets user={user}/>}/>
            <Route path="/add-asset" element={<AddAsset user={user}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard user={user}/>} />
          </Routes>
          </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
