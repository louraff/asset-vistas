// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SignUpForm from "../../components/SignUpForm/SignUpForm";
// import NewAssetForm from "../../components/NewAssetForm/NewAssetForm";
// import AdditionalInfoForm from "../../components/AdditionalInfoForm/AdditionalInfoForm";
// import FormWizard from "react-form-wizard-component";
// import "../css/SignUpWizard.css";
// import "react-form-wizard-component/dist/style.css";
// import { FaUser, FaCog, FaCheck } from "react-icons/fa"; // Importing icons from react-icons

// export default function SignupWizard({ user, setUser }) {
//   const [userData, setUserData] = useState({});
//   const navigate = useNavigate();

//   const handleComplete = () => {
//     console.log("Form completed!");
//     navigate("/dashboard");
//   };

//   const tabChanged = ({ prevIndex, nextIndex }) => {
//     console.log("prevIndex", prevIndex);
//     console.log("nextIndex", nextIndex);
//   };

//   function updateUserData(newData) {
//     setUserData({ ...userData, ...newData });
//   }

//   return (
//     <>
//     <FormWizard
//       shape="circle"
//       className="form-wizard"
//       onComplete={handleComplete}
//       onTabChange={tabChanged}
//       nav={
//         <FormWizard.Nav>
//           <FormWizard.NavItem title="Personal details" icon={<FaUser />} />
//           <FormWizard.NavItem title="Additional Info" icon={<FaCog />} />
//           <FormWizard.NavItem title="Last step" icon={<FaCheck />} />
//         </FormWizard.Nav>
//       }
//     >
//       <FormWizard.TabContent title="Personal details" icon={<FaUser />}>
//         <SignUpForm updateUserData={updateUserData} />
//       </FormWizard.TabContent>
//       <FormWizard.TabContent title="Additional Info" icon={<FaCog />}>
//         <NewAssetForm updateUserData={updateUserData} user={user} />
//       </FormWizard.TabContent>
//       <FormWizard.TabContent title="Last step" icon="ti-check">
//         <AdditionalInfoForm
//           setUser={setUser}
//           userData={userData}
//           updateUserData={updateUserData}
//         />
//       </FormWizard.TabContent>
      
//     </FormWizard>
//     <style>{`
//     @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
//   `}</style>
//   </>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import NewAssetForm from "../../components/NewAssetForm/NewAssetForm";
import AdditionalInfoForm from "../../components/AdditionalInfoForm/AdditionalInfoForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import StepWizard, {Step} from "react-step-wizard";
import "../css/SignUpWizard.css";
import { Button, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const steps = [
  {
    title: "Sign Up",
    icon: faUser,
    component: SignUpForm,
  },
  {
    title: "New Asset",
    icon: faPlus,
    component: NewAssetForm,
  },
  {
    title: "Additional Info",
    icon: faBriefcase,
    component: AdditionalInfoForm,
  },
];

// const StepIcon = ({icon, title, isActive}) => (
//   <div className={`step-icon-wrapper ${isActive ? 'active' : ''}`}>
//     <FontAwesomeIcon icon={icon} className="step-icon" />
//     <div className="step-title">{title}</div>
//     {isActive && <ProgressBar now={100} />}
//   </div>
// )

export default function SignupWizard({ user, setUser }) {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleComplete = () => {
    console.log("Form completed!");
    navigate("/dashboard");
  };

  function updateUserData(newData) {
    setUserData({ ...userData, ...newData });
  }

  return (
    <div className="form-wizard">
      <ProgressBar now={((userData.step || 0) / steps.length) * 100} />
      <StepWizard>
        {steps.map((step, index) => {
          const StepComponent = step.component;
          return (
            <Step key={index}>
              <div className="step-header">
                <FontAwesomeIcon icon={step.icon} className="step-icon" />
                <div className="step-title">{step.title}</div>
              </div>
              <StepComponent
                updateUserData={updateUserData}
                onComplete={() => {
                  setUserData((prevData) => ({
                    ...prevData,
                    step: index + 1,
                  }));
                }}
              />
            </Step>
          );
        })}
      </StepWizard>
      <Button className="wizard-btn" onClick={handleComplete} disabled={userData.step !== steps.length}>
        Complete
      </Button>
    </div>
  );
}
