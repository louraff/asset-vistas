import LoginForm from '../../components/LoginForm/LoginForm';

export default function Gateway({setUser}) {
  return (
    <main>
    <h1>Asset Vistas</h1>
    
    <LoginForm setUser={setUser}/>
    </main>
  );
}