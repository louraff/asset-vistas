import SignUpWizard from "../../components/SignUpWizard/SignUpWizard";
import LoginForm from "../../components/LoginForm/LoginForm";
import '../../components/css/AuthPage.css'

export default function AuthPage({setUser}) {
  return (
    <main>
    <h1>Asset Vistas</h1>
    <SignUpWizard setUser={setUser}/>
    </main>
  );
}
