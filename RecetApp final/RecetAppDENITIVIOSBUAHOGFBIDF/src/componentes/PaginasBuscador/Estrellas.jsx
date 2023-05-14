import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Esto es una prueba para que puntuen las recetas con estrellas
 const StarRanking = (props) => {
    const [ranking, setRanking] = useState(props.ranking)
    const [estrellas, setEstrellas]= useState(props.style)
    useEffect(()=>{
        if(props.card == false){
            if(ranking <= 2){
                setEstrellas({color: "red"})
              }else{
                setEstrellas({color: "green"})
              }
        }     
    }, [ranking])
    const indexStart= (index)=>{
        setRanking(index+1)
    }
    return (
        <div className='star-container' >
            {
                [... new Array(5)].map((star, index)=>{
                    return index < ranking ? <FontAwesomeIcon icon="fa-solid fa-star" key={index} style={estrellas} onClick={() =>indexStart(index)}/> : <FontAwesomeIcon icon="fa-regular fa-star" key={index} style={estrellas} onClick={() =>indexStart(index)}/>

                })
            }
            
        
        </div>
    );
};

export default StarRanking;