import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Cabecera } from "../cabecera/cabecera";
import React, { useState, useEffect } from 'react';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import Swal from 'sweetalert2';

export const AreaPersonal = () => {
    
    const Swal = require('sweetalert2')
    const { idUsuario } = useParams()
    const URIrecetas = "https://recetapp-final.herokuapp.com/recetas/" 
    const URIrecetasUsuario="https://recetapp-final.herokuapp.com/recetasusuarios/"
    const URIUsuario="https://recetapp-final.herokuapp.com/usuarios/"
    const URIInstrucciones = 'https://recetapp-final.herokuapp.com/instrucciones/'
    const URIIngredientes = 'https://recetapp-final.herokuapp.com/ingredientes/'
    const [recipes, setRecipes] = useState([]);
    const [recetasU, setRecetasU]= useState([])
    const [recetasUG, setRecetasUG]= useState([])
    const [usuario,setUsuario] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        getRecetaByID()
        getRecetaAutor()
        getHorario()
    }, [])

    const [horario,setHorario]=useState({
                d1: "122",
                a1: "122",
                c1: "122",
                d2: "122",
                a2: "122",
                c2: "122",
                d3: "122",
                a3: "122",
                c3: "122",
                d4: "122",
                a4: "122",
                c4: "122",
                d5: "122",
                a5: "122",
                c5: "122",
                d6: "122",
                a6: "122",
                c6: "122",
                d7: "122",
                a7: "122",
                c7: "122"

    })

    async function getHorario(){

        try {
            const user= await axios.get(URIUsuario+idUsuario);
            const horarioUser=user.data.horario;
            const hor=await axios.get(URIhorario+horarioUser);
            setHorario(hor.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    const getRecetaAutor = async () => {
        try {
            
            const res = await axios.get(`${URIrecetasusuarios}/idUsuario/${idUsuario}/tiporelacion/autor`);
           // const res = await axios.get(URIrecetasUsuario + idUsuario);
            
            const promises = res.data.map(async (id) => {
                    const res2 = await axios.get(URIrecetas + id.idReceta);
                    return res2.data;
            });
    
            const recipesData = await Promise.all(promises);
            setRecetasU(recipesData);
        } catch (error) {
            console.error(error);
        }
        const res3 = await axios.get(URIUsuario + idUsuario)
        setUsuario(res3.data)
    };
       
    const getRecetaByID = async () => {
        try {
            
            const res = await axios.get(`${URIrecetasusuarios}/idUsuario/${idUsuario}/tiporelacion/guardada`);
           // const res = await axios.get(URIrecetasUsuario + idUsuario);
            setRecetasUG(res.data);

            const promises = res.data.map(async (id) => {
                    const res2 = await axios.get(URIrecetas + id.idReceta);
                    return res2.data;
            });
    
            const recipesData = await Promise.all(promises);
            setRecipes(recipesData);
        } catch (error) {
            console.error(error);
        }
        const res3 = await axios.get(URIUsuario + idUsuario)
        setUsuario(res3.data)
    };


    const URIhorario="https://recetapp-final.herokuapp.com/horario/"

    const crearHorario = async(e)=>{
        e.preventDefault()
        //Get para ver si horario esta en la bdd
        const user=await axios.get(URIUsuario+idUsuario);
        console.log(user)
        const horarioUser=user.data.horario;
        console.log(horarioUser)
        //const horarioUser=user.data
        //guardar en fkUsuario

        if(horarioUser==null || horarioUser==""){
            const ver= await axios.post(URIhorario, {
                d1: e.target.d1.value,
                a1: e.target.a1.value,
                c1: e.target.c1.value,
                d2: e.target.d2.value,
                a2: e.target.a2.value,
                c2: e.target.c2.value,
                d3: e.target.d3.value,
                a3: e.target.a3.value,
                c3: e.target.c3.value,
                d4: e.target.d4.value,
                a4: e.target.a4.value,
                c4: e.target.c4.value,
                d5: e.target.d5.value,
                a5: e.target.a5.value,
                c5: e.target.c5.value,
                d6: e.target.d6.value,
                a6: e.target.a6.value,
                c6: e.target.c6.value,
                d7: e.target.d7.value,
                a7: e.target.a7.value,
                c7: e.target.c7.value
            })
                
                const idH= ver.data.message.pasar.idhorario;
                
            await axios.put(URIUsuario+idUsuario,{
                //nombre: user.data.name,
                //correo: user.data.correo,
               // contrasena: user.data.contrasena,
                horario:idH
            })
            console.log(ver)
        }else{
            const ver= await axios.put((URIhorario+horarioUser), {
                d1: e.target.d1.value,
                a1: e.target.a1.value,
                c1: e.target.c1.value,
                d2: e.target.d2.value,
                a2: e.target.a2.value,
                c2: e.target.c2.value,
                d3: e.target.d3.value,
                a3: e.target.a3.value,
                c3: e.target.c3.value,
                d4: e.target.d4.value,
                a4: e.target.a4.value,
                c4: e.target.c4.value,
                d5: e.target.d5.value,
                a5: e.target.a5.value,
                c5: e.target.c5.value,
                d6: e.target.d6.value,
                a6: e.target.a6.value,
                c6: e.target.c6.value,
                d7: e.target.d7.value,
                a7: e.target.a7.value,
                c7: e.target.c7.value
            })
            console.log(ver)
        }
        Swal.fire(
            '¡Listo!',
            'Tu horario ha sido actualizado',
            'success'
          ).then((result) => {
            window.location.reload();
          })
        

    }

    const URIrecetasusuarios = "https://recetapp-final.herokuapp.com/recetasusuarios"
    const borrarReceta = async (id, e) => {
        e.preventDefault()
        try{
            const idReceta=id;
            const idUsuario=localStorage.getItem('user');
            axios.delete(`${URIrecetasusuarios}/usuario/${idUsuario}/receta/${idReceta}/tiporelacion/guardada`).then((r) => {
                console.log(r);
            Swal.fire(
                '¡Hecho!',
                'La receta se ha eliminado correctamente',
                'success'
              ).then((result) => {
                window.location.reload();
              })
            })
           
            
        }catch (error){
            console.error("Algo falló " + error);
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Ha ocurrido un error al eliminar la receta',
                })
        }
    }

    const eliminarRecetaDeBDD= async(id,e)=>{
        e.preventDefault()
        try{
            Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Quieres eliminar esta receta de la aplicacion de forma permanente?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                if (result.isConfirmed) {
                    // Aquí se ejecuta el código si el usuario hace clic en "Sí, eliminar"
                    const idReceta=id;
                    const idUsuario=localStorage.getItem('user');
                     await axios.delete(`${URIrecetasusuarios}/idReceta/${idReceta}`)
                     await axios.delete(URIrecetas+idReceta)
                    Swal.fire(
                    'Eliminado!',
                    'La receta ha sido eliminada.',
                    'success'
                    ).then((result) => {
                        window.location.reload();
                      })
                } else {
                    // Aquí se ejecuta el código si el usuario hace clic en "Cancelar"
                    Swal.fire(
                    'Cancelado',
                    'La eliminación de la receta ha sido cancelada.',
                    'error'
                    )
                }
            })      
        }catch (error){
            console.error("Algo falló " + error);
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Ha ocurrido un error al eliminar la receta',
                })
        }
    }

    const responsive = {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1024: {
          items: 3
        }
    };

    const renderNextButton = ({ isDisabled }) => {
        return ( 
        <button className='btn btn-outline-dark' title='Siguiente Receta' > 
            <svg label="Flecha derecha" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16" alt="Flecha hacia la derecha">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
            </svg>
        </button>)
    };
    
      const renderPrevButton = ({ isDisabled }) => {
         return (
            <button className='btn btn-outline-dark'  title='Anterior Receta'> 
            <svg label="Flecha izquierda" xmlns="http://www.w3.org/2000/svg"  width="23" height="23" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16" alt="Flecha hacia la izquierda">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
         </button>)
        
      };

    return (
        <div>
            <Cabecera />
            <div className='parteDeArriba'>
            <h1 className='medioUsuarios tituloBuscador margenTxt' title={`Bienvenido${usuario.nombre}`}>Bienvenido {usuario.nombre}</h1><br></br>
            <div className='container col-6'>
            <h1 className='areaTexto centrarTxt'> Esta es tu área personal, donde podrás consultar tus recetas guardadas, podrás organizar tu comida semanal y además podrás editar y borrar las recetas que has creado </h1><br></br>
            </div>

            <h3 className='h3Usuarios centrarTxt margentB' title="Estas son tus recetas guardadas">Estas son tus recetas guardadas</h3>
            </div>

            {recipes.length === 0 ? (
                <div className="container ">
                    <br></br><br></br><br></br>
                    <h3 className="centrarTxt tituloTarjeta" >¡Todavia no has guardado ninguna receta!</h3>
                    <br></br> <br></br> <br></br>
                </div>
                
                ) : (
                    <AliceCarousel 
                        infinite={false} 
                        mouseDragEnabledd={true} 
                        responsive={responsive} 
                        renderPrevButton={renderPrevButton}
                        renderNextButton={renderNextButton}>
                    {recipes.map(recipe => ( 
                            <div className="card centrarTxt cartaRec" title={`Receta ${recipe.Tittle}`} >
                                <img className="card-img-top" title={`Imagen ${recipe.Tittle}`} src={recipe.Image_Name} style={{ objectFit: 'cover', height: '200px' }} />
                                <div className="card-body">
                                    <h1 className="card-title tituloTarjeta">{recipe.Tittle} </h1>
                                    <div>
                                        <a href={`/#/recetaExtendida/${recipe.id}`} className="btn btn-success btnMargen btnMargen1" title="Ver Receta">Ver Receta</a>
                                        <button onClick={borrarReceta.bind(this, recipe.id)} className="btn btn-outline-dark btnMargen1" type="submit" title="Borrar">Borrar</button>
                                    </div>
                                </div>
                            </div> 
                    ))}
                    </AliceCarousel>
                )
            }
        
            <div className='container'>
        <h2 className='h3Usuarios centrarTxt' title="¡Planifica tu semana con tus recetas guardadas!">¡Planifica tu semana con tus recetas guardadas!</h2>
        <div className="horarioSemanal margenTxt">
            <form name="horario" onSubmit={crearHorario}>
                <table className="table table-bordered" title="Formulario planificador semanal">
                    <tr>
                        <th></th>
                        <th title="Desayuno">DESAYUNO</th>
                        <th title="Almuerzo">ALMUERZO</th>
                        <th title="Cena">CENA</th>
                    </tr>
                    <tr>
                        <th title="Lunes">LUNES</th>
                        <td>
                            
                            <select name="d1" label="Desayuno del Lunes">
                                {console.log(horario)}
                                    <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.d1)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )                               
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="a1" label="Almuerzo del Lunes">
                                <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.a1)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="c1" label="Cena del Lunes">
                                <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.c1)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                    <th title="Martes">MARTES</th>
                    <td>
                        <select name="d2" label="Desayuno del Martes">
                            <option value={""}>{"Selecciona"}</option>
                           {recipes.map(recipe => (
                                (recipe.id==horario.d2)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                            ))}
                        </select>
                     </td>
                     <td>
                        <select name="a2" label="Almuerzo del Martes">
                            <option value={""}>{"Selecciona"}</option>
                            {recipes.map(recipe => (
                                (recipe.id==horario.a2)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                             ))}
                        </select>
                     </td>
                     <td>
                        <select name="c2" label="Cena del Martes">
                        <option value={""}>{"Selecciona"}</option>
                            {recipes.map(recipe => (
                                (recipe.id==horario.c2)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                    <th title="Miercoles">MIERCOLES</th>
                    <td>
                            <select name="d3" label="Desayuno del Miercoles">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.d3)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="a3" label="Almuerzo del Miercoles">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.a3)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="c3" label="Cena del Miercoles">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.c3)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                    <th title="Jueves">JUEVES</th>
                    <td>
                            <select name="d4" label="Desayuno del Jueves">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.d4)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="a4" label="Almuerzo del Jueves">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.a4)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="c4" label="Cena del Jueves">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.c4)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                    <th title="Viernes">VIERNES</th>
                    <td>
                            <select name="d5" label="Desayuno del Viernes">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.d5)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="a5" label="Almuerzo del Viernes">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.a5)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="c5" label="Cena del Viernes">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.c5)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                    <th title="Sabado">SABADO</th>
                    <td>
                            <select name="d6" label="Desayuno del Sabado">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.d6)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="a6" label="Almuerzo del Sabado">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.a6)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="c6" label="Cena del Sabado">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.c6)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                    <th title="Domingo">DOMINGO</th>
                    <td>
                            <select name="d7" label="Desayuno del Domingo">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.d7)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="a7" label="Almuerzo del Domingo">
                            <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.a7)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                        <td>
                            <select name="c7" label="Cena del Domingo">
                                <option value={""}>{"Selecciona"}</option>
                                {recipes.map(recipe => (
                                    (recipe.id==horario.c7)? (<option value={recipe.id} selected>{recipe.Tittle}</option>): (<option value={recipe.id}>{recipe.Tittle}</option> )
                                ))}
                            </select>
                        </td>
                    </tr>
                </table>
                <div className='centrarTxt'>
                <button type="submit" className='btn btn-success btn-lg margenBoton' title="Crear horario">Crear horario</button>
                </div>
            </form>
        </div>
        
        <h3 className='h3Usuarios centrarTxt margentB' title="Estas son tus recetas guardadas">Estas son las recetas que has creado</h3>
        <AliceCarousel infinite={false} mouseDragEnabledd={true} responsive={responsive}
                renderPrevButton={renderPrevButton}
                renderNextButton={renderNextButton}>
            {recetasU.map(recipe => ( 
                    <div className="card centrarTxt cartaRec" title={`Receta ${recipe.Tittle}`} >
                        <img className="card-img-top" title={`Imagen ${recipe.Tittle}`} src={recipe.Image_Name} style={{ objectFit: 'cover', height: '200px' }} />
                        <div className="card-body">
                            <h1 className="card-title tituloTarjeta">{recipe.Tittle} </h1>
                            <div>
                                <a href={`/#/editarReceta/${recipe.id}`} className="btn btn-success btnMargen btnMargen1" title="Editar Receta">Editar Receta</a>
                                <button onClick={eliminarRecetaDeBDD.bind(this, recipe.id)} className="btn btn-outline-dark btnMargen1" type="submit" title="Borrar">Eliminar de RecetApp</button>
                            </div>
                        </div>
                    </div> 
            ))}
        </AliceCarousel>
        </div>
    </div> 
)
}
