import { checkToken } from "../../utilities/users-service";

export default function MyAssets() {

  async function handleCheckToken() {
    const expDate = await checkToken()
    console.log(expDate)
  }

  return (
    <>
    <h1>MyAssets</h1>
    <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}