import React from "react";


export default function Paginado ({gamesPerPage, allGames, paginado}){
    const pageNumbers = []


    for (let i = 1; i <= Math.ceil(allGames/gamesPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul>
                {
                    pageNumbers && pageNumbers.map(number => {
                      return (
                        <li  key={number}>
                            <button onClick={() => paginado(number)}>{number}</button>
                        </li>
                      )
                    })
                }
            </ul>
        </nav>
    )
}

