import React from "react";
const Cards =(props)=>{
    return (
        <div className="container bg-info d-flex flex-column" >
          <h3>{props.title}</h3>
          <img style={{
            maxWidth: '30vh',
            maxHeight: '300vh'}} src={props.imageLinks} alt="" />
          <p>Authors: {props.authors}</p>
          <p>Categories: {props.categories}</p>
          <p>Page Count: {props.pageCount}</p>
          <Link to={`/detail/${props.id}`}><span>Leer mas</span></Link>
          
          {/* Agrega más propiedades aquí según tus necesidades */}
        </div>
      );
    };
    
    export default Cards;