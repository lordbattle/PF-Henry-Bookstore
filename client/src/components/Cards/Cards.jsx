import React from "react";
import style from '../Cards/Cards.module.css'
import {Link} from "react-router-dom" 
const Cards =(props)=>{
    return (
      <div className={style.main}>
        <div className={style.container}>
          <img style={{
            maxWidth: '100%',
            maxHeight: '300vh',
            width: '250px',
            height: '250px',
            }} src={props.imageLinks} alt="" className={style.img}/>
          <h3 className={style.title} style={{
            minHeight: '50px'
          }}>{props.title}</h3>
          <p style={{minHeight: '50px'}}>Authors: {props.authors}</p>
          <p>Categories: {props.categories}</p>
          <p>Rating: {props.averageRating}</p>
          <Link to={`/detail/${props.id}`} style={{textDecoration: 'none', width: '30%'}}><span className={style.read}>Read more</span></Link>
          
          {/* Agrega más propiedades aquí según tus necesidades */}
        </div>
        </div>
      );
    };
    
    export default Cards;