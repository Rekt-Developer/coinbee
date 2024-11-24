import { useEffect, useState } from 'react'
import { AuthForm } from '../AuthForm/AuthForm'
import './Auth.scss'
import { useLocation, useNavigate } from 'react-router-dom'

export const Auth = () => {
  const [authType, setAuthType] = useState<string>("register");
  const navigate = useNavigate(); 
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/register');
  }
  if (location.pathname.includes('register')) {
    setAuthType("register");
    } 
    if (location.pathname.includes('login')) {
      setAuthType("auth");
      } 
  },[location.pathname, navigate])

  const handleClick = () => {
    setAuthType((prevState) => {
        const newAuthType = prevState === "register" ? "auth" : "register";
        if (newAuthType === "auth") {
            navigate('/login'); 
        } else {
            navigate('/register');
        }
        return newAuthType;
    });
};

  return (
    <div className="auth-form">
      <p className="auth-form__title">
        {authType === "register" ? "Register" : "Login"}
      </p>
      {authType === "register" ? <AuthForm title='register' /> : <AuthForm title='login' />}
      <div className="auth-form__info">
        <span>
          {authType === "register" ? "Already have an account?" : "No account?"}
        </span>
        <button className="auth-form__button" onClick={handleClick}>
          {authType === "register" ? "Login" : "Create on account"}
        </button>
      </div>
    </div>
  );
};