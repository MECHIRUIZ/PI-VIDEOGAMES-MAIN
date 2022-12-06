import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAME",
      payload: response.data,
    });
  };
}

export function getByName(name){
    return async function(dispatch) {
        let response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
        console.log(response);
        return dispatch({
            type: "GET_VIDEOGAMES_NAME",
            payload: response.data,
        })
    }
}

export function videogameDetail(id){
    return async function(dispatch){
        let response = await axios.get(`http://localhost:3001/videogames/${id}`);
        return dispatch({
            type: "VIDEOGAME_DETAIL",
            payload: response.data,
        })
    }
}

export function postVideogame(payload){
    return async function(dispatch){
        try {
            let response = await axios.post("http://localhost:3001/videogames", payload);
            return response;
        } catch (error) {
            console.log("Error en la acción POST_VIDEOGAME", error)
        }
    }
}
export const getGenres = () => async  (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: "GET_GENRES",
        payload: response.data,
      })
    } catch (error) {
      return error;
    }
  
  };
export const filterGenres = (payload) => {
    return {
      type: "FILTER_GENRES",
      payload,
    }
  }
  
  export const filterCreatedGame = (payload) => {
      return{
        type: "FILTER_CREATED_GAME",
        payload,
      }
  };
  
  export const orderByName = (payload) => {
      return {
          type: "ORDER_NAME",
          payload,
      }
  };
  
  export const sortByRating = (payload) => {
    return {
      type: "SORT_BY_RATING",
      payload,
    };
};
export function getVideogameById(id) {
    return async function(dispatch) {
       let response = await axios.get(`http://localhost:3001/videogames/${id}`);
         return dispatch({
            type: "GET_VIDEOGAME_BY_ID",
            payload: response.data,
          })
    };
  }
  export const deleteGame = (id) => async (dispatch) =>{

    try {
    return await axios.delete(`http://localhost:3001/videogames/${id}`).then( (g) => dispatch ({
    type: "DELETE_GAME",
    payload: g.data
  }))
    } catch (error) {
      return error;
    }

  
   
};


