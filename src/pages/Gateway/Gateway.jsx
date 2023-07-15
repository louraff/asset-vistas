import SignUpWizard from "../../components/SignUpWizard/SignUpWizard";
import LoginForm from "../../components/LoginForm/LoginForm";
import '../../components/css/AuthPage.css'
import { Link } from "react-router-dom";

export default function Gateway({setUser}) {
  return (
    <main>
    <h1>Asset Vistas</h1>
    
    <LoginForm setUser={setUser}/>
    </main>
  );
}
