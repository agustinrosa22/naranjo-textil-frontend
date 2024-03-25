import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { loginRequest } from '../../redux/actions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    showPassword: false,
    isLoggedIn: false // Estado de inicio de sesión
  });

  const { username, password, showPassword, isLoggedIn } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginRequest(username, password));
    // Redirigir solo si el inicio de sesión fue exitoso
    if (!error) {
      setFormData({ ...formData, isLoggedIn: true });
    }
  };

  // Redirigir si el inicio de sesión fue exitoso
  if (isLoggedIn) {
    navigate('/home');
  }

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img className={style.img} src={logo} alt="" />
      </div>
      <div className={style.card}>
        <div className={style.content}>
          <h2 className={style.title}>Ingresar</h2>
          <form className={style.form} onSubmit={handleSubmit}>
            <label>Usuario:</label>
            <div className={style.formGroup}>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                required
                className={style.inputForm}
              />
            </div>
            <label>Contraseña:</label>
            <div className={style.passwordGroup}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={onChange}
                required
                className={style.inputForm}
              />
              <div className={style.passwordIcon} onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <FaEyeSlash onClick={togglePasswordVisibility} /> 
                ) : (
                  <FaEye onClick={togglePasswordVisibility} /> 
                )}
              </div>
            </div>
            <button className={style.buttonSubmit} type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
