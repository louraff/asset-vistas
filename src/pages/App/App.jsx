// // Assets
// import './App.css';
// import '../../components/css/Dashboard.css'

// // React Components
// import { useState, useEffect } from 'react'

// // Router
// import { Routes, Route } from 'react-router-dom'
// import { getUser } from '../../utilities/users-service';

// // Custom Components
// import AuthPage from '../AuthPage/AuthPage';
// import AddAsset from '../AddAsset/AddAsset'
// import MyAssets from '../MyAssets/MyAssets'
// import Profile from '../Profile/Profile'
// import Dashboard from '../Dashboard/Dashboard'
// import NavBar from '../../components/NavBar/NavBar'
// import Gateway from '../Gateway/Gateway';

// export default function App() {

//   const [user, setUser] = useState(getUser())

//   const [portfolio, setPortfolio] = useState(null);
//   const [historicalData, setHistoricalData] = useState([]);
//   const [sectorAllocations, setSectorAllocations] = useState(null);
//   const [highestValueAsset, setHighestValueAsset] = useState({});
//   const [highestGrowthAsset, setHighestGrowthAsset] = useState({});
//   const [highestLossAsset, setHighestLossAsset] = useState({});
//   const [numAssets, setNumAssets] = useState(0);

//   const localStorageSidebarState = localStorage.getItem('isSidebarOpen');

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   useEffect(() => {
//     localStorage.setItem('isSidebarOpen', isSidebarOpen);
//   }, [isSidebarOpen]);

//   return (
    
//     <main className="App">
//       {
//         user ?
//         <div id="sidebar-wrapper" className={isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}>
//         <div className='total-body'>
          
//         <div className="navbar">
//           <NavBar user={user} setUser={setUser} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
//         </div>
//           {/* // Routes is sitting inside this ternary so that the AuthPage is always rendered when a user state is null, no matter what the path is. When user has a value, it will render the relevant Route */}
//           <Routes>
//             <Route path="/assets" element={<MyAssets 
//               user={user}
//               portfolio={portfolio}
//               setPortfolio={setPortfolio}/>}/>
//             <Route path="/add-asset" element={<AddAsset user={user}/>} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/dashboard" element={<Dashboard 
//               user={user}
//               portfolio={portfolio}
//               setPortfolio={setPortfolio}
//               historicalData={historicalData}
//               setHistoricalData={setHistoricalData}
//               sectorAllocations={sectorAllocations}
//               setSectorAllocations={setSectorAllocations}
//               highestValueAsset={highestValueAsset}
//               setHighestValueAsset={setHighestValueAsset}
//               highestGrowthAsset={highestGrowthAsset}
//               setHighestGrowthAsset={setHighestGrowthAsset}
//               highestLossAsset={highestLossAsset}
//               setHighestLossAsset={setHighestLossAsset}
//               numAssets={numAssets}
//               setNumAssets={setNumAssets}
//               />} />
//           </Routes>
//           </div>
//           </div>
//         :
//       <Routes>
//           <Route path="/signup" element={<AuthPage  user={user} setUser={setUser}/>} />
//           <Route path="/" element={<Gateway user={user} setUser={setUser} />} />
//         </Routes>      }
//     </main>

//   );
// }

// Assets
import './App.css';
import '../../components/css/Dashboard.css'

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
import Gateway from '../Gateway/Gateway';

export default function App() {

  const [user, setUser] = useState(getUser())

  return (
    <main className="App">
      {
        user ?
        <div className='total-body'>
        <div className="navbar">
          <NavBar user={user} setUser={setUser} />
        </div>
          {/* // Routes is sitting inside this ternary so that the AuthPage is always rendered when a user state is null, no matter what the path is. When user has a value, it will render the relevant Route */}
          <Routes>
            <Route path="/assets" element={<MyAssets user={user}/>}/>
            <Route path="/add-asset" element={<AddAsset user={user}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard user={user}/>} />
          </Routes>
          </div>
        :
      <Routes>
          <Route path="/signup" element={<AuthPage  user={user} setUser={setUser}/>} />
          <Route path="/" element={<Gateway user={user} setUser={setUser} />} />
        </Routes>      }
    </main>
  );
}