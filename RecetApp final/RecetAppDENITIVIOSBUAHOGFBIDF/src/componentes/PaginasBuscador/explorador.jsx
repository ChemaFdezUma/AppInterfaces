import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Cabecera } from "../cabecera/cabecera";
import React, { useState, useEffect,useRef } from 'react';
import Swal from 'sweetalert2';

export const Explorador = () => {
    document.title = "Explorador"

    const Swal = require('sweetalert2')
    const [comensales, setComensales] = useState(0);
    const [alimentos, setAlimentos] = useState([]);
    const [tiempo, setTiempo] = useState(0);
    const [clasificacion, setClasificacion] = useState(0);
    const URIrecetas = "https://recetapp-final.herokuapp.com/recetas/"
    const URIrecetasusuarios = "https://recetapp-final.herokuapp.com/recetasusuarios"
    const URIingredientes = "https://recetapp-final.herokuapp.com/ingredientes/"


    const [recipes, setRecipes] = useState([]);
    const [ingrdientes,setIngredientes] = useState("")
    const inputRef = useRef("")
    const [valorDeRecetas,setValorReceta] = useState("")


    useEffect(() => {
        fetch(URIrecetas)
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error(error));
    }, []);
    console.log(localStorage.getItem('user'))
    const [busqueda, setBusqueda] = useState('');

    const buscarRecetas = async (e) => {
        e.preventDefault()
        agregarStringReceta()
        let url = URIrecetas
        if (busqueda) {
            url = `https://recetapp-final.herokuapp.com/recetas/search/${busqueda}`;
        }
        
        try {
          const url = busqueda ? `https://recetapp-final.herokuapp.com/recetas/search/${busqueda}` : URIrecetas;
          if (comensales > 0) {
            url += `?comensales=${comensales}`
        }
        if (tiempo) {
            url += `&tiempo=${tiempo}`
        }
        if(clasificacion){
            url += `&clasificacion=${clasificacion}`
        }
          const response = await fetch(url);
          const recetas = await response.json();
          setRecipes(recetas);
        } catch (error) {
          console.error("Algo falló " + error);
        }
        filtrar()
      }
    
    const guardarReceta = async (id, e) => {
        e.preventDefault()
        try{
            const idReceta=id;
            const idUsuario=localStorage.getItem('user');
            const receta = await axios.get(`${URIrecetasusuarios}/idReceta/${idReceta}/idUsuario/${idUsuario}/tiporelacion/guardada`);
            
            if (receta.data==null) {
                console.log("a")
                const result = axios.post(URIrecetasusuarios,{
                    idReceta: id,
                    idUsuario:localStorage.getItem('user'),
                    tiporelacion:"guardada"
                })
                Swal.fire(
                    '¡Listo!',
                    'La receta se ha guardado en tu area personal',
                    'success'
                  )
            }else{
                  Swal.fire(
                    'Un momento',
                    'La receta ya está guardada en tu area personal',
                    'info'
                  )
            }
        }catch (error){
            console.error("Algo falló " + error);
            Swal.fire(
                '¡Oh no!',
                'Ha ocurrido un error guardando la receta',
                'error'
              )
        }
    }

    const limpiarSeleccion = async (e) => {
        try{
            const busqueda = document.getElementById("busqueda")
            setBusqueda("");
            setValorReceta("");
            setTiempo(0);
            setComensales(0);
            setClasificacion(0);
         
        }catch (error){
            console.error("Fallo al limpiar selección");
        }
      }

      let guardar = recipes.filter(recipe => 
        (comensales == 0 || recipe.comensales == comensales)&&
        ((tiempo === 0 || recipe.tiempo == tiempo) || 
        (tiempo === 1 && recipe.tiempo < 30) ||
        (tiempo === 2 && recipe.tiempo >= 30 && recipe.tiempo <= 60) || 
        (tiempo === 3 && recipe.tiempo > 60)) 
        && ((clasificacion === 0 || recipe.clasificacion == "Todos") ||
        (clasificacion === 1 && recipe.clasificacion?.includes("Vegetariano")) ||
        (clasificacion === 2 && recipe.clasificacion?.includes("Vegano")) ||
        (clasificacion === 3 && recipe.clasificacion?.includes("Sin gluten")) ||
        (clasificacion === 4 && recipe.clasificacion?.includes("Sin fructosa")) ||
        (clasificacion === 5 && recipe.clasificacion?.includes("Sin sacarosa")) ||
        (clasificacion === 6 && recipe.clasificacion?.includes("Sin lactosa"))
        ))

    
    
        const agregarStringReceta = async()=>{
            if(inputRef.current.value!= ""){
            setValorReceta(valorDeRecetas + inputRef.current.value+";") 
            let ingredientes =  (valorDeRecetas + inputRef.current.value+";").split(";")
            document.getElementById("inputDeFiltrar").value = ""
            console.log(ingredientes)
            filtrar(ingredientes)
        }
        }
        
        const loTiene = async(ingredientes,ingrediente)=>{
            var encontrado = false;
            let i = 0;
            while(encontrado==false && i<ingredientes.length && ingredientes[i]!=undefined && ingrediente!=undefined){
    
                if(ingredientes[i].toLowerCase().includes(ingrediente.toLowerCase()) && ingredientes[i]!=" "){
                    encontrado=true
                }
                i++
            }
            return encontrado;
        }
    
        const filtrar = async (listaIngredientes) => {
            let listaRecetas = [];
            let receta = "";
            let ingredientes = [];
            
            for (let i = 0; i < listaIngredientes.length - 1; i++) {
                console.log(listaRecetas);
                const promises = recipes.map(async (rec) => {
                receta = await axios.get(URIingredientes + `${rec.Ingredients_id}`);
                ingredientes = receta.data.ingredientes.split(";");
                const result = await loTiene(ingredientes, listaIngredientes[i]);
                if (result === true) {
                    listaRecetas = listaRecetas.concat(rec);
                    return rec;
                }
                listaRecetas=[];
                });
                const recetasFiltradas= await Promise.all(promises);
                let arrayGuardar= []
                recetasFiltradas.map(async(r)=>{
                    if(r!=undefined){
                       arrayGuardar= arrayGuardar.concat(r);
                    }
                })
                setRecipes(arrayGuardar);
            }
            };

      return (
        <div>
            <Cabecera />
            <h1 className="tituloBuscador">RecetApp</h1>
            <p className="pBuscador " title="Descubre todo nuestro recetario">Descubre todo nuestro recetario</p>
            <form className="busquedaForm" onSubmit={buscarRecetas}>
                <label for="busqueda"></label>
                <input value={busqueda} className="buscador" title="Buscador" onChange={(e) => setBusqueda(e.target.value)} type="text" placeholder="Busca aquí tu receta..." id="busqueda" name="busqueda"  />
                <button className="btn btn-success btn-sm busquedaReceta" type="submit" title="Buscar">Buscar</button>
                <button onClick={limpiarSeleccion} className="btn btn-outline-dark btn-sm busquedaLimpiar" title="Limpiar todos los filtros">Limpiar</button>
             </form>
             <div className="container-fluid">
            <div>
                <div className="row">
                    <div className="sticky-top col-12 col-sm-12 col-md-2 col-lg-2"> 
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <h5>Filtrar por alimentos</h5>
                                </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                   <label for="inputDeFiltrar" className='negrita'>Añadir ingrediente:</label>  
                                   <input type='text' id= "inputDeFiltrar" name='ingrediente' title='Filtrar por ingrediente' placeholder='Ingrediente' ref={inputRef} className='bordeN'></input>
                                    <p className='negrita'>Ingredientes actuales:</p> 
                                     <p>{valorDeRecetas}</p> 
                                    <button onClick={agregarStringReceta} className="btn btn-outline-dark btnMargen1 btn-sm" type="submit" title="Agregar ingrediente">Agregar ingrediente</button> 

                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="card cartaMar centrarTxt"  title="Filtrar por Tiempo">
                            <h5 className="card-title">Filtrar por Tiempo</h5>
                            <label for="filtiempo"></label>
                            <select className="form-control" id="filtiempo"value={tiempo} onChange={(e) => setTiempo(parseInt(e.target.value))} title="Desplegable filtro Tiempo">
                                <option value={0}>Todos</option>
                                <option value={1}>Menos de 30 minutos</option>
                                <option value={2}>Entre 30 y 60 minutos</option>
                                <option value={3}>Más de 60 minutos</option>
                            </select>
                        </div> 
                        <div className="card cartaMar centrarTxt"   title="Filtrar por clasificación">
                            <h5 className="card-title">Filtrar por Alérgenos y Preferencias</h5>
                            <label for="filclasi"></label>
                            <select className="form-control" id="filclasi" value={clasificacion} onChange={(e) => setClasificacion(parseInt(e.target.value))} title="Desplegable filtro Clasificación">
                                <option value={0}>Todos</option>
                                <option value={1}>Vegetariano</option>
                                <option value={2}>Vegano</option>
                                <option value={3}>Sin lactosa</option>
                                <option value={4}>Sin gluten</option>
                                <option value={5}>Sin fructosa</option>
                                <option value={6}>Sin sacarosa</option>
                            </select>
                        </div>   
                        <div className="card cartaMar centrarTxt" title="Filtrar por comensales">
                            <h5 className="card-title" >Filtrar por Comensales</h5>
                            <label for="filcomen"></label>
                            <select className="form-control" id="filcomen" value={comensales} onChange={(e) => setComensales(parseInt(e.target.value))} title="Desplegable filtro comensales">
                                    <option value={0}>Todos</option>
                                    <option value={1}>1 comensal</option>
                                    <option value={2}>2 comensales</option>
                                    <option value={3}>3 comensales</option>
                                    <option value={4}>4 comensales</option>
                                    <option value={5}>5+ comensales</option>
                            </select>
                        </div>    
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9">
                        <div className="row">
                        {guardar.length==0 ? (
                                    <p className="tituloTarjeta">No hay recetas que cumplan con los criterios de búsqueda.</p>
                                ) : guardar.map(recipe => (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={recipe.id} >
                                    <div className="card centrarTxt cartaRec" title={`Receta ${recipe.Tittle}`}>
                                        <img className="card-img-top" title={`Imagen ${recipe.Tittle}`} src={recipe.Image_Name} alt={recipe.Tittle} style={{ objectFit: 'cover', height: '200px' }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{recipe.Tittle}</h5>
                                            <div>
                                                <a href={`/#/recetaExtendida/${recipe.id}`} className="btn btn-success btnMargen btnMargen1" title="Ver receta" >Ver Receta</a>
                                                <button onClick={guardarReceta.bind(this, recipe.id)} className="btn btn-outline-dark btnMargen1" type="submit" title="Guardar Receta">Guardar Receta</button> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}