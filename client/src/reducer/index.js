const initialState = {
  videoGames: [],
  videoGamesCopy: [],
  genres: [],
  videoGameDetail:{},
  platforms:[],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAME":
      return {
        ...state,
        videoGames: action.payload,
        videoGamesCopy: action.payload,
      };
    case "GET_VIDEOGAMES_NAME":
      return {
        ...state,
        videoGames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "FILTER_GENRES":
      let aux = [];
      if (action.payload) {
        aux = state.videoGamesCopy.filter((a) => {
          if (a.genres.some((e) => e.name === action.payload)) {
            return a.genres.map((el) => el.name === action.payload);
          } else {
            return a.genres.includes(action.payload);
          }
        });
      } else {
        aux = state.videoGamesCopy;
      }
      return {
        ...state,
        videoGames: aux,
      };
    case "FILTER_CREATED_GAME":
      const createdGame =
        action.payload === "createdInDb"
          ? state.videoGamesCopy.filter((e) => e.createInDb)
          : state.videoGamesCopy.filter((e) => !e.createInDb);

      return {
        ...state,
        videoGames: action.payload === "All" ? state.videoGamesCopy : createdGame,
      };

    case "ORDER_NAME":
      let orderedArr =
        action.payload === "asc"
          ? state.videoGamesCopy.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videoGamesCopy.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videoGames: orderedArr,
      };

    case "SORT_BY_RATING":
      let sortByRating =
        action.payload === "bestrt"
          ? state.videoGames.sort((a, b) => b.rating - a.rating)
          : state.videoGames.sort((a, b) => a.rating - b.rating);
      return {
        ...state,
        videoGames: sortByRating,
      };
      case "GET_VIDEOGAME_BY_ID":
      return {
        ...state,
        videoGameDetail: action.payload,
      }
      case "DELETE_GAME":
      return {
        ...state
      }
      case "GET_PLATFORMS":
        return{
          ...state,
          platforms: action.payload,
        }
    default:
      return { ...state };
  }
}

export default rootReducer;
