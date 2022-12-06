import {getByName } from "../../actions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

 export const SearchBar = ({setCurrentPage}) => {
 
    const [searchState, setSearchState] = useState("");
    const dispatch = useDispatch();

        const handleInputChange = (e) =>{
            e.preventDefault();
            setSearchState(e.target.value);
        };
        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(getByName(searchState))
            setCurrentPage(1)
        }

    return (
        <div>

             <input type="text" onChange={(e) => handleInputChange(e)} placeholder = "Buscar juego por nombre" />

             <button type="submit" onClick={(e) => handleSubmit(e)} >Buscar</button>

        </div>
    )

};