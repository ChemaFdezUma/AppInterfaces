import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Cabecera } from "../cabecera/cabecera";
import React, { useState, useEffect,useRef } from 'react';
import Swal from 'sweetalert2';

export const RecetasExpandidas = () => {

    const Swal = require('sweetalert2')
    const { idReceta } = useParams()
    const URIreceta = "https://recetapp-final.herokuapp.com/recetas/"
    const URIinstrucciones = "https://recetapp-final.herokuapp.com/instrucciones/"
    const URIingredientes = "https://recetapp-final.herokuapp.com/ingredientes/"
    
    const [receta, setReceta] = useState({})
    const [instrucciones, setInstrucciones] = useState("")
    const [ingredientes, setIngredientes] = useState("")
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [disliked, setDisliked] = useState(false);
    const [liked, setLiked] = useState(false);
    const like = useRef(null)
    const dislike = useRef(null)

    useEffect(() => {
        getRecetaByID()
    }, [])

    const getRecetaByID = async () => {
        const res = await axios.get(URIreceta + idReceta)
        setReceta(res.data)
        const resIngredientes = await axios.get(URIingredientes + res.data.Ingredients_id)
        setIngredientes(resIngredientes.data.ingredientes)
        const resInstrucciones = await axios.get(URIinstrucciones + res.data.Instructions_id)
        setInstrucciones(resInstrucciones.data.instruccion)
        try {
            const res = await axios.get(URIreceta + idReceta);

            if (res.data.dislikes == null) {
                setDislikes(0)
            } else {
                setDislikes(res.data.dislikes)
            }

            const resultado = await axios.get(`${URIrecetasusuarios}/idReceta/${idReceta}/idUsuario/${localStorage.getItem('user')}/tiporelacion/dislikes`);
        
            if (resultado.data == null) {
                setDisliked(false)
            } else {
                dislike.current.className ='like-button oscuro';
                setDisliked(true)

            }

            
        } catch (error) {
            console.error("Error al obtener los dislikes:", error);
        }

        try {
            console.log("a")
            const res = await axios.get(URIreceta + idReceta);
            console.log(res.data);

            if (res.data.likes == null) {
                setLikes(0)
            } else {
                setLikes(res.data.likes)
            }
            const resultado = await axios.get(`${URIrecetasusuarios}/idReceta/${idReceta}/idUsuario/${localStorage.getItem('user')}/tiporelacion/likes`);
            console.log(resultado.data);
            if (resultado.data == null) {
                setLiked(false)
            } else {
                setLiked(true)
                like.current.className ='like-button oscuro';

            }

        } catch (error) {
            console.error("Error al obtener los likes:", error);
        }

    }
    console.log(receta)

    const URIrecetasusuarios = "https://recetapp-final.herokuapp.com/recetasusuarios/"

    const guardarReceta = async (e) => {
        e.preventDefault()
        try {
   
            const idUsuario = localStorage.getItem('user');
            const receta = await axios.get(`${URIrecetasusuarios}/idReceta/${idReceta}/idUsuario/${idUsuario}/tiporelacion/guardada`);

            if (receta.data == null) {
                console.log("a")
                const result = axios.post(URIrecetasusuarios, {
                    idReceta: idReceta,
                    idUsuario: localStorage.getItem('user'), 
                    tiporelacion: "guardada"
                })
                Swal.fire(
                    '¡Listo!',
                    'La receta se ha guardado en tu area personal',
                    'success'
                )
            } else {
                Swal.fire(
                    'Un momento',
                    'La receta ya está guardada en tu area personal',
                    'info'
                )
            }
        } catch (error) {
            console.error("Algo falló " + error);
            Swal.fire(
                '¡Oh no!',
                'Ha ocurrido un error guardando la receta',
                'error'
            )
        }
       
    }

    document.title = `Receta completa de ${receta.Tittle}`
    
    const handleDislike = async (id, e) => {
        e.preventDefault();
        try {
            if (disliked) {
                Swal.fire(
                    'Un momento',
                    'Te ha dejado de no gustar esta receta',
                    'info'
                )
                await axios.delete(`${URIrecetasusuarios}/usuario/${localStorage.getItem('user')}/receta/${idReceta}/tiporelacion/dislikes`);
                setDislikes(dislikes - 1);
                setDisliked(false);
            } else {
                Swal.fire(
                    '¡Listo!',
                    'Le has dado a no me gusta',
                    'success'
                )
                await axios.post(URIrecetasusuarios, {
                    idReceta: idReceta,
                    idUsuario: localStorage.getItem('user'),
                    tiporelacion: "dislikes"
                });
                setDislikes(dislikes + 1);
                setDisliked(true);
                

                if (liked) {
                    await axios.delete(`${URIrecetasusuarios}/usuario/${localStorage.getItem('user')}/receta/${idReceta}/tiporelacion/likes`);
                    setLikes(likes - 1);
                    setLiked(false);
                    await axios.put(URIreceta + idReceta, {
                        likes: likes - 1

                    });
                }
            }

            await axios.put(URIreceta + idReceta, {
                dislikes: dislikes + (disliked ? -1 : 1)
            });
        } catch (error) {
            console.error("Error al manejar el like:", error);
        }
    };

    const handleLike = async (id, e) => {
        e.preventDefault();
        try {
            if (liked) {
                const response = await axios.delete(`${URIrecetasusuarios}/usuario/${localStorage.getItem('user')}/receta/${idReceta}/tiporelacion/likes`);
                if (response.status === 200) {
                    setLikes(likes - 1);
                    setLiked(false);
                    await axios.put(URIreceta + idReceta, {
                        likes: likes - 1

                    });
                }
                Swal.fire(
                    'Un momento',
                    'Te ha dejado de gustar esta receta',
                    'info'
                )
            } else {
                Swal.fire(
                    '¡Listo!',
                    'Le has dado a me gusta',
                    'success'
                )
                const response = await axios.post(URIrecetasusuarios, {
                    idReceta: idReceta,
                    idUsuario: localStorage.getItem('user'),
                    tiporelacion: "likes"
                });


                await axios.put(URIreceta + idReceta, {
                    likes: likes + 1

                });
                setLikes(likes + 1);
                setLiked(true);

                if (disliked) {
                    await axios.delete(`${URIrecetasusuarios}/usuario/${localStorage.getItem('user')}/receta/${idReceta}/tiporelacion/dislikes`);
                    setDislikes(dislikes - 1);
                    setDisliked(false);
                    await axios.put(URIreceta + idReceta, {
                        dislikes: dislikes - 1

                    });
                }
            }
        } catch (error) {
            console.error("Error al manejar el like:", error);
        }
    };

    return (
        <div>
            <Cabecera />

            <div className='container '>
                <h1 className="tituloBuscador">Detalles de la receta</h1>
                <div className='container cartaMar'>
                    <div className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={receta.Image_Name} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title tituloTarjeta">{receta.Tittle}</h5>
                                    <h6 className="tituloTarjeta"><small>Ingredientes:</small></h6>
                                    <p>{ingredientes}</p>
                                    <h6 className="tituloTarjeta"><small>Pasos a seguir:</small></h6>
                                    <p>{instrucciones}</p>
                                    <h6 className="tituloTarjeta"><small>Numero de comensales:</small></h6>
                                    <p>{receta.comensales}</p>
                                    <h6 className="tituloTarjeta"><small>Tiempo estimado:</small></h6>
                                    <p> {receta.tiempo} minutos</p>
                                    <h6 className="tituloTarjeta"><small>Clasificación:</small></h6>
                                    <p>{receta.clasificacion}</p>
                                    <button
                                        className={`like-button ${liked == true ? 'liked' : ''}`}
                                        onClick={(e) => handleLike(likes, e)}
                                        ref={like}
                                    >
                                        {likes} Me gusta
                                    </button>
                                    <button
                                        className={`like-button ${disliked == true ? 'liked' : ''}`}
                                        onClick={(e) => handleDislike(dislikes, e)}
                                        ref={dislike}
                                    >
                                        {dislikes} No me gusta
                                    </button>
                                </div>
                            </div>
                            <button onClick={guardarReceta.bind(this)} className="btn btn-success" type="submit">Guardar</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}