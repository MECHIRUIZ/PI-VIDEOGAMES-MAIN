import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame } from "../../actions";
import { getGenres } from "../../actions";
import { getVideogames} from "../../actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
    let errors = {};
    if (!input.name) errors.name = "The name is required for created a videogame";
    if (!input.description)
      errors.description = "The description is requiere";
    if (!input.rating || !/^[1-5]$/.test(input.rating)) {
      errors.rating = "Rating must be a number between 0-5";
    } if (!input.image || input.image.length > 255) {
      errors.image = "The url of image is require and its length less than 255";
    } if (input.genres.length === 0) {
      errors.genres = "The game requires at least one genre";
    } else if (input.platforms.length === 0) {
      errors.platforms = "The game requires at least one platform";
    }
    return errors;
  }

  export default function Create(){
    const dispatch = useDispatch();
    const history = useHistory();
    const allGenres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.videoGames);
    


    useEffect(() => {
        dispatch(getGenres());
        dispatch(getVideogames());
      },[dispatch]);
      console.log([...new Set(platforms.map((e)=>e.platforms).flat())]);

      const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        image: "",
        genres: [],
        platforms: [],
      });

     const [errors, setErrors] = useState({});

     const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        )
        console.log(input);
     };

     const handleCheckPlatform = (e) =>{
        if(e.target.checked) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value],
            });
        }
        }
        console.log(input);
     };

     const handleCheckGenre = (e) => {
        if(e.target.checked){
            setInput({
                ...input,
                genres:[...input.genres, e.target.value]
            });
        }
        console.log(input);
     };

     const handleSubmit = (e) =>{
        e.preventDefault();
        if(
            input.name &&
            input.name !== " " &&
            input.description &&
            input.rating &&
            input.rating > 1 &&
            input.rating <= 5 &&
            input.image &&
            input.platforms.length &&
            input.genres.length
        ){
            dispatch(postVideogame(input));
            setInput({
                name: "",
                description: "",
                released: "",
                rating: 0,
                image: "",
                platforms: [],
                genres: [],
            });
            history.push("/home");
        } else {
            alert(`Some important data is missing`);
        }
     };

     const deleteGenre = (name) => {
        let genresFilter = input.genres.filter((g) => g !== name )
        setInput({
            ...input,
            genres: genresFilter,
        });
        console.log(genresFilter);
     };

     const deletePlatform = (name) => {
        let platformFilter = input.platforms.filter((p) => p !== name);
        setInput({
            ...input,
            platforms: platformFilter,
        });
     };

     return(
        <div>
            <h1>Add Videogame in the App</h1>
            <Link to="/home">
                <button>Come back home</button>
            </Link>
            <div>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Name</label>
                <input
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div>
            <label>Released</label>
            <input
                type="date"
                name="released"
                value={input.released}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                value={input.rating}
                onChange={(e) => handleChange(e)}
              />
              {errors.rating && <p>{errors.rating}</p>}
            </div>
            <div>
             <label>Description</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              value={input.description}
              onChange={(e) => handleChange(e)}
            ></textarea>
            {errors.description && (
              <p>{errors.description}</p>
            )}
          </div>
          <div>
            <label>Image</label>
            <input
              type="text"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p>{errors.image}</p>}
          </div>
          <label>Genres: </label>
          <div>
            {allGenres.map((genre) => {
              return (
                <section key={genre.name}>
                  <input
                    type="checkbox"
                    name={genre.name}
                    value={genre.name}
                    onChange={(e) => handleCheckGenre(e)}
                  />
                  <label>{genre.name}</label>
                  {input.genres.includes(genre.name) ? (
                    <button
                      onClick={() => deleteGenre(genre.name)}
                    >
                      X
                    </button>
                  ) : null}
                </section>
              );
            })}
          </div>
          {input.genres.length == 0 && (
            <p>{errors.genres}</p>
          )}
           <label>Platforms: </label>
           <div>
            {[...new Set(platforms.map((e)=>e.platforms).flat())].map((platform) => {
              return (
                <section key={platform}>
                  <input
                    type="checkbox"
                    name={platform}
                    value={platform}
                    onChange={(e) => handleCheckPlatform(e)}
                  />
                  <label>{platform}</label>
                  {input.platforms.includes(platform) ? (
                    <button
                      onClick={() => deletePlatform(platform)}
                    >
                      X
                    </button>
                  ) : null}
                </section>
              );
            })}
            {!input.platforms.length && (
              <p>{errors.platforms}</p>
            )}
          </div>
          <button type="submit">
            Created
          </button>
     </form>
     </div>
    </div>
       
     );
  };



