import React from "react";
import style from '../Cards/Cards.module.css'
import {Link} from "react-router-dom" 

const Cards = (props) => {
  if (props.active === true) {
    return (
      <div className={style.main} style={{marginLeft: '15px 20px'}}>
        <div className={style.container}>
          <img style={{
            maxWidth: '100%',
            maxHeight: '300vh',
            width: '250px',
            height: '250px',
          }} src={props.imageLinks} alt="" className={style.img}/>
          <h3 className={style.title} style={{
            minHeight: '40px'
          }}>{props.title}</h3>
          <p style={{minHeight: '50px'}}>Authors: {props.authors}</p>
          <p style={{minHeight: '55px'}}>Categories: {props.categories}</p>
          <p>Price: ${props.price}</p>
          <p>Stock: {props.stock}</p>
          <p>Rating: {props.averageRating}</p> 
          <Link to={`/detail/${props.id}`} style={{display: 'flex', justifyContent:'center', textDecoration: 'none', width: 'auto'}}>
            <span className={style.read} style={{display: 'flex', justifyContent:'center'}}>Read more</span>
          </Link>
          {/* Agrega más propiedades aquí según tus necesidades */}
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.main} style={{marginLeft: '15px 20px', backgroundColor: 'red'}}>
        <div className={style.container}>
          <img style={{
            maxWidth: '100%',
            maxHeight: '300vh',
            width: '250px',
            height: '250px',
          }} src={props.imageLinks} alt="" className={style.img}/>
          <h3 className={style.title} style={{
            minHeight: '40px'
          }}>{props.title}</h3>
          <p style={{minHeight: '50px'}}>Authors: {props.authors}</p>
          <p style={{minHeight: '55px'}}>Categories: {props.categories}</p>
          <p>Price: ${props.price}</p>
          <p>Stock: {props.stock}</p>
          <p>Rating: {props.averageRating}</p>
          <h4>DISABLED PRODUCT</h4>
          <Link to={`/detail/${props.id}`} style={{display: 'flex', justifyContent:'center', textDecoration: 'none', width: 'auto'}}>
            <span className={style.read} style={{display: 'flex', justifyContent:'center'}}>Read more</span>
          </Link>
          {/* Agrega más propiedades aquí según tus necesidades */}
        </div>
      </div>
    );
  }
};

export default Cards;
