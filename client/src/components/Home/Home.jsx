import React , { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCreatedGame, filterGenres, getVideogames, orderByName, sortByRating } from "../../actions";
import Paginado from "../Paginado/Paginado.jsx";
import {Card}   from "../Card/Card";
import { SearchBar } from "../SearchBar/SearchBar";
import { Link, NavLink } from "react-router-dom";
import Filters from "../../components/Filters/Filters.jsx"

export default function Home(props){

    const dispatch = useDispatch()
    const allGames = useSelector((state) => state.videoGames);
    const [orden, setOrden] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPages] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage; 
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getVideogames())
    },[dispatch]);

    const handleFilterGenres = (e) =>{
        e.preventDefault();
        if(e.target.value === "Generos"){
            dispatch(getVideogames());
            setCurrentPage(1);
        }else{
            dispatch(filterGenres(e.target.value));
            setCurrentPage(1);
            setOrden(`Ordenado${e.target.value}`);
        }
    }
    const handleFilterCreatedInDb = (e)=>{
        dispatch(filterCreatedGame(e.target.value));
        setCurrentPage(1);
    }
    const handleSortByName = (e)=>{
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado${e.target.value}`);
        
    }
    const handleSortByRating = (e) =>{
        e.preventDefault();
        dispatch(sortByRating(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado${e.target.value}`);
    }

    return(
        <>
        <div>
            <Filters handleFilterGenres={handleFilterGenres} handleFilterCreatedInDb={handleFilterCreatedInDb} handleSortByName={(e) =>handleSortByName(e)} handleSortByRating={handleSortByRating}/>
        </div>
        <div>
            <SearchBar setCurrentPage={setCurrentPage} />
        </div>
        <div>
            <Paginado gamesPerPage={gamesPerPage} allGames={allGames.length} paginado={paginado}/>
        </div>
        <div>
            <Link to="/create"> 
            <button>CREATE VIDEOGAME</button>
            </Link>
        </div>
            {
                allGames.length? currentGames.map((e)=>{
                    return(
                        <div>
                            <NavLink to={"/videogames/" + e.id}>
                            <Card
                             key={e.id} 
                             id={e.id}
                             name={e.name} 
                             released={e.released}
                             createdInDb={e.createdInDb}
                             platforms={e.platforms
                             .map((e) => (typeof e === "object" ? e.name : e))
                             .join(", ")}
                             image={e.image}
                             genres={e.genres
                             ?.map((e) => (typeof e === "object" ? e.name : e))
                             .join(", ")}
                             rating={e.rating}/>
                             </NavLink>
                        </div>
                    )
                }):(
                    <div>
                        <h6>Juegos no encontrados</h6>
                    </div>
                )
            }
        <div>
            <h1> HOME </h1>
        </div>
        </>
    )

}
