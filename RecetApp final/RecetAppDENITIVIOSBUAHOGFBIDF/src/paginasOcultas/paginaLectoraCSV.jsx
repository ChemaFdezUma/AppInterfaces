import React from "react";

import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import Papa from "papaparse";

const PaginaLectoraCSV = () => {
    const [file, setFile] = useState("");
    const [datos, setDatos] = useState([]);
    // This state will store the parsed data
    const [data, setData] = useState([]);

    // Aqui almacenamos si nos ha metido un archivo no valido.
    const [error, setError] = useState("");
    const allowedExtensions = ["csv"];
    const URIRecetas = 'https://recetap.herokuapp.com/recetas/'
    const URIInstrucciones = 'https://recetap.herokuapp.com/instrucciones/'
    const URIIngredientes = 'https://recetap.herokuapp.com/ingredientes/'


    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
    // Esta funcion la vamos a llamar cuando se suba el archivo
    const handleFileChange = (e) => {
        setError("");

        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            // If input type is correct set the state
            setFile(inputFile);
        }
    };
    function handleParse() {
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Enter a valid file");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            const columns = Object.keys(parsedData[0]);
            setData(columns);
            setDatos(parsedData);
            almacenar();
        };
        reader.readAsText(file);
    };

    const almacenar = async (e) => {
        for (const receta of datos) {
            console.log(receta)
            const responseIngredientes = await axios.post(URIIngredientes, {
                ingredientes: receta.Ingredientes
            })
    
            // Guarda el ID de los ingredientes en la variable idIngredientes
            const idIngredientes = responseIngredientes.data.message.pasar.id
    
            // Envía la solicitud HTTP para crear las instrucciones
            const responseInstrucciones = await axios.post(URIInstrucciones, {
                instruccion: receta.Pasos
            })
    
            // Guarda el ID de las instrucciones en la variable idInstrucciones
            const idInstrucciones = responseInstrucciones.data.message.pasar.id
    
            const ver =await axios.post(URIRecetas, {
                Tittle: receta.Nombre,
                Ingredients_id: idIngredientes,
                Instructions_id: idInstrucciones,
                Image_Name: receta.NombreImagen,
                comensales: receta.Comensales,
                tiempo: receta.tiempo
            })
            console.log(ver)
            sleep(20)
        }


    }

    return (
        <div>
            <button className="BotonesAr" nombre="Subir Alumnos" onClick={handleParse}>Subir Archivo</button>
            <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
                className="inputBoton"
            />
        </div>
    )
}
export default PaginaLectoraCSV