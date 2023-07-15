import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function AuthPage({setUser}) {
  return (
    <main>
    <h1>AuthPage</h1>
    <SignUpForm setUser={setUser}/>
    </main>
  );
}