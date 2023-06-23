import React from "react";
const Cards =(props)=>{
return(
     <div className="container bg-success">
               
    <h3> {props.title}</h3>
    <p>{props.averageRating}</p>
    <p>{props.genre}</p>                  
 
</div>
)
}

export default Cards;