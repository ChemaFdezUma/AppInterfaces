import React, { useState } from "react";
import axios from 'axios';
import logo from "../logoN.png"
import { useNavigate } from "react-router-dom";
import { useTabIndex } from 'react-tabindex';
import { Link } from 'react-router-dom'


export const Cabecera = () => {
    const navigate = useNavigate();

    const CerrarSesion = ()=> {
        console.log("cerrar sesion")
        localStorage.removeItem('user');
        navigate("/");
    }

    return (
    <div>
        <nav className="navbar navbar-expand-lg colorBg  ">
            <div className="container-fluid bg-body-tertiary">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div  className="tam">
                <Link to="/explorador"><img src={logo} className="fotoCabecera cabeceraMar" href="/explorador" title="Ir a Explorador" alt=""/></Link> 
                </div>
                <div className=" navbar-collapse collapse  " id="navbarNavAltMarkup">
                    <div className="navbar-nav ">   
                        <a className="nav-link  text-black letraCabecera cabeceraMar" href="/#/explorador" title="Ir a Explorador">Explorador</a>
                        <a className="nav-link text-black letraCabecera cabeceraMar" href={`/#/areaPersonal/${localStorage.getItem('user')}`} title="Ir a Area Personal">Area Personal</a>
                        <a className="nav-link text-black letraCabecera" href={`/#/crearReceta`} title="Ir a Crear Receta" >Crear Receta</a>
                    </div>
                </div>
                <button onClick={CerrarSesion} className="link-btn text-black btn-sm buttonEdit nBorde" tabindex="0"title="Cerrar Sesion" >Cerrar sesion</button>   
            </div>
        </nav>
        </div>
    )
}