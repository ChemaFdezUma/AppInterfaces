import logo from './componentes/logo.png';
import dA from './componentes/imagenesInicio/derechaAbajo.png';
import dM from './componentes/imagenesInicio/derechaArriba.png';
import iA from './componentes/imagenesInicio/izqArriba.png';
import iG from './componentes/imagenesInicio/izqAbajo.png';
import iM from './componentes/imagenesInicio/izqMedio.png';
import Titulo from './componentes/RecetAppLetra.svg';
import fL from './componentes/fotoLogin.png'
import flecha from './componentes/flecha.png'

import { useLayoutEffect } from 'react';
import { useState } from 'react';
import { Login } from "./componentes/LoginRegistro/Login";
import { Register } from "./componentes/LoginRegistro/Register";
import './componentes/App.css';
import { gsap } from 'gsap';
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
import { Link, Route, Routes } from "react-router-dom"
import Inicio from './componentes/Inicio.jsx';
//<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
import PaginaLectoraCSV from "./paginasOcultas/paginaLectoraCSV"
import { Explorador } from './componentes/PaginasBuscador/explorador';
import { RecetasExpandidas } from './componentes/PaginasBuscador/recetasExpandidas';
import { AreaPersonal } from './componentes/areaPersonal/areaPersonal';
import { CrearReceta } from './componentes/areaPersonal/crearReceta';
import { EditarReceta } from './componentes/areaPersonal/editarReceta';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/ocultoCSV' element = {<PaginaLectoraCSV/>}/>
        <Route path='/explorador' element = {<Explorador/>}/>
        <Route path='/recetaExtendida/:idReceta' element  = {<RecetasExpandidas/>}/>
        <Route path='/areaPersonal/:idUsuario' element={<AreaPersonal/>}/>
        <Route path='/crearReceta' element = {<CrearReceta/>}/>
        <Route path='/editarReceta/:idReceta' element = {<EditarReceta/>}/>
      </Routes>
    </div>
  )
}

export default App;
