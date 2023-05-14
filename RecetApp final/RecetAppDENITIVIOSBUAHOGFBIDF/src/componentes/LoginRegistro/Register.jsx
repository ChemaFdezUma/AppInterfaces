import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export const Register = (props) => {
    const Swal = require('sweetalert2')
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const uriUsuarios = "https://recetapp-final.herokuapp.com/usuarios/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        const respuesta = await axios.post(uriUsuarios,{
            nombre: name,
            correo: email,
            contrasena: pass,
            horario:null    
        })
        if(respuesta.data.message == "Validation error"){
            //window.alert("YA existe un usuario con este  correo")
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Ya existe un usuario con este  correo',
                }).then((result) => {
                    window.location.reload();
                  })
        }else{
            Swal.fire(
                '¡Ya está!',
                'Usuario registrado correctamente',
                'success'
              ).then((result) => {
                window.location.reload();
              })
            
        }
    }

    return (
        <div className="auth-form-container">
            <h2 title="Registrate aquí">Registro</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Usuario</label>
            <input value={name} className="labelAndInputLoginRegister" required name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Usuario" />
            <label htmlFor="email" className="labelAndInputLoginRegister">Correo</label>
            <input value={email} className="labelAndInputLoginRegister" required onChange={(e) => setEmail(e.target.value)}type="email" placeholder="tucorreo@gmail.com" id="email" name="email" />
            <label htmlFor="password" className="labelAndInputLoginRegister">Contraseña</label>
            <input value={pass} className= "labelAndInputLoginRegister"required onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button className="b1" type="submit">Registrate</button>
        </form>
        <button className="link-btn negro" onClick={() => props.onFormSwitch('login')}>¿Ya tienes una cuenta? Inicia sesión aquí.</button>
    </div>
    )
}