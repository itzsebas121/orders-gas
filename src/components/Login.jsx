import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        if (user === 'admin' && password === 'admin') {
            alert("Acceso concedido");
            navigate('/Dashboard');
        } else {
            alert('Credenciales incorrectas');
        }
    };
    return (
        <div id="login">
            <form method="GET" action="" onSubmit={handleLogin}>
                <h1>Iniciar Sesión</h1>
                <p>Ingresa tus credenciales para iniciar sesión</p>
                <br />
                <input type="text" onChange={(e)=>setUser(e.target.value)} placeholder="Ingresa tu usuario" required />
                <br />
                <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Ingresa tu contraseña" required />
                <br />
                <button>Iniciar Sesión</button>
            </form>
        </div>
    );
};
export default Login;