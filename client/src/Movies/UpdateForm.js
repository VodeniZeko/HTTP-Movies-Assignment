import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./UpdateForm.css";

const UpdateForm = props => {
  const history = useHistory();
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  });
  const { id } = useParams();

  useEffect(() => {
    const movieUpdate = props.movie.find(movie => `${movie.id}` === id);
    if (movieUpdate) {
      setMovie(movieUpdate);
    }
  }, []);
  const changeHandler = e => {
    e.persist();
    if (e.target.name === "metascore") {
      e.target.value = parseInt(e.target.value, 10);
    }
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res);
        history.push(`/movies/${id}`);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ display: "table", margin: "0 auto" }}>
      <h2>Update Movie</h2>

      <form onSubmit={handleSubmit}>
        <h3>TITLE</h3>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />
        <h3>DIRECTOR</h3>
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div className="baseline" />
        <h3>METASCORE</h3>
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div className="baseline" />
        <h3>STARS</h3>
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
