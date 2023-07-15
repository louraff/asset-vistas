import './App.css';
import '../../components/css/Dashboard.css'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import AddAsset from '../AddAsset/AddAsset'
import MyAssets from '../MyAssets/MyAssets'
import Profile from '../Profile/Profile'
import Dashboard from '../Dashboard/Dashboard'
import NavBar from '../../components/NavBar/NavBar'
import Gateway from '../../pages/Gateway/Gateway'

export default function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignUp = (signedUpUser) => {
    setUser(signedUpUser);
    navigate('/add-asset');
  };

  return (
    <main className="App">
      {user ? (
        <div className='total-body'>
          <div className="navbar">
            <NavBar user={user} setUser={setUser} />
          </div>
          <Routes>
            <Route path="/assets" element={<MyAssets user={user}/>}/>
            <Route path="/add-asset" element={<AddAsset user={user}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard user={user}/>} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/signup" element={<AuthPage handleSignUp={handleSignUp}  user={user} setUser={setUser}/>} />
          <Route path="/" element={<Gateway user={user} setUser={setUser} />} />
        </Routes>
      )}
    </main>
  );
}