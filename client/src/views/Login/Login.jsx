import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png'
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { loginRequest } from '../../redux/actions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(state => state.error); // Obtiene el error del estado global

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    showPassword: false
  });

  const { username, password, showPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !showPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(username, password));
    navigate('/home'); // Redireccionar al inicio después del login
  };
  

  return (
    <div className={style.container}>
    <div clasname={style.imgContainer}>
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