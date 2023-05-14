import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const Login = (props) => {
    const Swal = require('sweetalert2')
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const uriUsuarios = "https://recetapp-final.herokuapp.com/usuarios/"
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [inputType, setInputType] = useState('password');
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
        const usuario = await axios.get(`${uriUsuarios}/email/${email}/contrasena/${pass}`);
        console.log(typeof usuario.data);
        if ((typeof usuario.data) == "number") {
            console.log("OK")
            localStorage.setItem('user', JSON.stringify(usuario.data));
            navigate("/explorador")
            Swal.fire({
                title: 'Bienvenido a RecetApp',
                width: 600,
                padding: '3em',
                color: '#20c997',
                background: '#fff ',
                backdrop: `
                  rgba(32,201,151,0.2)
                  url("RecetApp-main\src\componentes\LoginRegistro\mandalorian-baby-yoda.gif")
                  left top
                  no-repeat
                `
            })
        } else {
            //window.alert("No se han insertado datos correctos")
            Swal.fire({
                icon: 'error',
                title: '¡Oh no!',
                text: 'Datos incorrectos',

            })
        }
    }

    return (
        <div className="auth-form-container">
            <h2 title="Inicio de Sesion">Inicio de Sesion</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email" className="labelAndInputLoginRegister">Correo</label>
                <input value={email} className="labelAndInputLoginRegister" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="tucorreo@mail.com" id="email" name="email" required ></input>
                <label htmlFor="password" className="labelAndInputLoginRegister">Contraseña</label>
                <input value={pass} className="labelAndInputLoginRegister" onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
                <button className="b1" type="submit">Iniciar Sesion</button>
            </form>
            <button className="link-btn negro" onClick={() => props.onFormSwitch('register')}>¿No tienes cuenta todavía? Regístrate aquí.</button>
        </div>
    )
}