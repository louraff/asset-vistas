// Assets
import './App.css';

// React Components
import { useState } from 'react'

// Router
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';

// Custom Components
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage'
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
            <Route path="/orders/new" element={<NewOrderPage />}/>
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
          </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
