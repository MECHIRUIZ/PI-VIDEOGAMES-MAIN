import React from 'react';


export const Card = ({name, image, genres, id, createdInDb, rating }) => {




    return (
        <div id={id} key={id}>


             <h3>{name}</h3>
             <h4>Genres: {genres}</h4>
             <h5>Rating: {rating}</h5>

            <div>
              <img src={image} alt="imagen juego"/>
            </div>

        </div> 
    )
}