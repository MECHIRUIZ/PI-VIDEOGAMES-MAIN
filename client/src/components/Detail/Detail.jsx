import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams} from "react-router-dom";
import { getVideogameById, deleteGame, getGenres } from "../../actions";


const Detail = (props) =>{
    const dispatch = useDispatch();
    const {id} = useParams();
    const detailGame = useSelector((state)=> state.videoGameDetail);
    console.log(detailGame)
    const [carga, setCarga] = useState(true);
    useEffect(()=>{
        dispatch(getVideogameById(id)).then(() => setCarga(false)).catch(() => {
          alert("No se encontro el juego con ese id")
          window.location.replace("http://localhost:3000/home")});
    },[dispatch, id]);


    const history = useHistory();
    const handleDelete = (event) => {
        event.preventDefault();
        dispatch(deleteGame(id));
        alert("Juego eliminado");
        history.push("/home");
      };
    if (carga) {
        return (
         <div> Loading... </div>
        )
      }

    return(
        <div>
            <h3>name:{detailGame.name}</h3>
            <img src={detailGame.image ? detailGame.image : detailGame.background_image} alt={`${detailGame.name}`} />
        <div>
           
            <p>Generos: {detailGame.genres?.map((e) => e.name).join(", ")}</p>
            <p>
              Plataformas:{" "}
              {typeof detailGame.platforms === "object"
                ? detailGame.platforms.map((e) => e).join(", ")
                : detailGame.platforms.split(",").join(", ")}
            </p>
        </div>
            <p>Description:{detailGame.description}</p>
            <p>Released:{detailGame.released}</p>
            <p>Rating:{detailGame.rating}</p>
            {
            detailGame.createInDb? <div> 
            <button onClick={(event) => handleDelete(event)}>Eliminar juego</button>
          </div> : <div></div>
        }

        </div>
    )
}

export default Detail