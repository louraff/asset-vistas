import { checkToken } from "../../utilities/users-service";
import BarChart from "../Visualisations/BarChart";
import LineChart from "../Visualisations/LineChart";


export default function OrderHistoryPage() {

  async function handleCheckToken() {
    const expDate = await checkToken()
    console.log(expDate)
  }

  return (
    <>
    <h1>OrderHistoryPage</h1>
    <h2>BarChart</h2>
    <BarChart />
    <LineChart />
    
    <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}