import React from "react";
import style from '../Cards/Cards.module.css'
import {Link} from "react-router-dom" 
const Cards =(props)=>{
    return (
      <div className={style.main}>
        <div className={style.container}>
          <h3 className={style.title}>{props.title}</h3>
          <img style={{
            maxWidth: '30vh',
            maxHeight: '300vh',
            width: '200px',
            height: '300px'}} src={props.imageLinks} alt="" className={style.img}/>
          <p>Authors: {props.authors}</p>
          <p>Categories: {props.categories}</p>
          <p>Rating: {props.averageRating}</p>
          <Link to={`/detail/${props.id}`}><span>Leer mas</span></Link>
          
          {/* Agrega más propiedades aquí según tus necesidades */}
        </div>
        </div>
      );
    };
    
    export default Cards;