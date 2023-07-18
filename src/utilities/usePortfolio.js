// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function usePortfolio(user) {
//   const [portfolio, setPortfolio] = useState(null);

//   const fetchPortfolio = async () => {
//     try {
//       const res = await axios.get(`/api/portfolio/${user._id}`);
//       if (res.data) {
//         setPortfolio(res.data);
//       }
//     } catch (error) {
//       console.error('Error fetching data: ', error);
//     }
//   };

//   const updateAsset = async (updatedAsset) => {
//     try {
//       const res = await axios.put(`/api/portfolio/${user._id}/asset/${updatedAsset._id}`, updatedAsset);
//       if (res.data) {
//         // Asset update was successful, fetch the portfolio again
//         await fetchPortfolio();
//       }
//     } catch (error) {
//       console.error('Error updating asset: ', error);
//       alert('Error updating asset');
//       throw error;
//     }
//   };

//   const deleteAsset = (id) => {
//     axios
//       .delete(`/api/portfolio/${user._id}/asset/${id}`)
//       .then((res) => {
//         if (res.data) {
//           setPortfolio(res.data);
//         }
//       })
//       .catch((error) => {
//         console.error('Error deleting asset: ', error);
//       });
//   };
  

//   useEffect(() => {
//     fetchPortfolio();
//   }, []);

//   return { portfolio, updateAsset, deleteAsset, setPortfolio };
// }

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePortfolio(user) {
  const [portfolio, setPortfolio] = useState(null);

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`/api/portfolio/${user._id}`);
      if (res.data) {
        setPortfolio(res.data);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const updateAsset = async (updatedAsset) => {
    try {
      const res = await axios.put(`/api/portfolio/${user._id}/asset/${updatedAsset._id}`, updatedAsset);
      if (res.data) {
        // Asset update was successful, fetch the portfolio again
        await fetchPortfolio();
      }
    } catch (error) {
      console.error('Error updating asset: ', error);
      alert('Error updating asset');
      throw error;
    }
  };

  const deleteAsset = (id) => {
    axios
      .delete(`/api/portfolio/${user._id}/asset/${id}`)
      .then((res) => {
        if (res.data) {
          setPortfolio(res.data);
        }
      })
      .catch((error) => {
        console.error('Error deleting asset: ', error);
      });
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return { portfolio, updateAsset, deleteAsset, setPortfolio };
}