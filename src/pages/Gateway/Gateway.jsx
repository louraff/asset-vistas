import LoginForm from '../../components/LoginForm/LoginForm';

export default function Gateway({setUser}) {
  return (
    <main>
    <LoginForm setUser={setUser}/>
    </main>
  );
}