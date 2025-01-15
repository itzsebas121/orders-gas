import React, { useEffect } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom'
import Register from "./Register";
const token = localStorage.getItem("token")

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1]));

                if (decodedToken.usertype === "Client") {
                    navigate("/Client");
                } else if (decodedToken.usertype === "Distributor") {
                    navigate("/Distributor");
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                localStorage.removeItem("token");
            }
        }
    }, [navigate]);
    const handleLogin = (e) => {
        e.preventDefault();
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: password
            })
        }).then(response => response.json()).then(data => {
            if (data.message) {
                alert(data.message);
            } else if (data.token) {
                
                localStorage.setItem('token', data.token);
                const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
                if (decodedToken.usertype == 'Client') {
                    navigate('/Client');
                } else if (decodedToken.usertype == 'Distributor') {
                    navigate('/Distributor');
                }
            }
        }).catch(error => console.error('Error:', error))

    };
    const showRegister = () => {
        document.querySelector('.overlay-register').classList.add('active');
    }
    return (
        <div id="login">
            <form method="GET" action="" className="form-login" onSubmit={handleLogin}>
                <h1>Iniciar Sesión</h1>
                <p>Ingresa tus credenciales para iniciar sesión</p>
                <br />
                <input id="user" className='input' type="text" placeholder="Ingresa tu usuario" required />
                <br />
                <input id="password" className='input' type="password" placeholder="Ingresa tu contraseña" required />
                <br />
                <button>Iniciar Sesión</button>
                <button type="button" onClick={showRegister}>Registrarse</button>
            </form>
            <div className="overlay-register">
                <Register />
            </div>
        </div>
    );
};
export default Login;