import React, { Component } from 'react';
import './App.css';
// import MovieRow from "./components/MovieRow.js";

// const url = "http://api.themoviedb.org/3/search/movie?query=marvel&api_key=3edc78312597d701f2909d246b009cae"
const posterBaseURL = "https://image.tmdb.org/t/p/w185"
// works:   https://api.themoviedb.org/3/movie/550?api_key=3edc78312597d701f2909d246b009cae

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      movies: []
    }
    // Call api Search: 
    this.performSearch("avengers")
  }
  // api call:
  performSearch(searchTerm) {
    const url = `http://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=3edc78312597d701f2909d246b009cae`
    console.log("Performing search using MovieDB")
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(JSON.stringify(data.results[0].poster_path));
        this.setState({
          isLoaded: true,
          movies: data
        })
      })
      .catch(err => console.log("Error: ", err))
  }

  searchHanlder(e) {
    // e.preventDefault();
    // console.log(e.target.value)
    const searchTerm = e.target.value;
    this.performSearch(searchTerm);
  }

  viewMovie(id) {
    console.log("Trying to view movie of ID: ", id)
    window.location.href = 'https://www.themoviedb.org/movie/' + id;
  }


  render() {
    const { movies, isLoaded } = this.state;
    
    if (isLoaded !== true) {
      return (
        <div>Loadidng...</div>
        )
    } else {
      return (
        <div className="App">
          <table className="titleBar">
            <tbody>
              <td className="logoStyle"><img width="50" src="movie_icon.png" alt="Movie Icon Pic" /></td>
              <h3>Movies DB Search</h3>
            </tbody>
          </table>
          <center>
            <input onChange={this.searchHanlder.bind(this)} type="text" placeholder="Enter Search Term" className="inputSearch" name="inputSearch" />
          </center>

          <ul>
            {movies.results.map(movie => (
              <table key={movie.id}>
              <p>Movie id: {movie.id}</p>
                <tbody>
                  <tr>
                    <td>
                      <img src={posterBaseURL + movie.poster_path} width="120" alt="Movie Poster" className="moviePosters" />
                    </td>
                    <td>
                      <h3>{movie.title}</h3>
                      <p>{movie.overview}</p>
                      <input onClick={this.viewMovie.bind(this, movie.id)} type="button" value="View" />
                    </td>
                  </tr>
                </tbody>
              </table>
              
          ))}

          </ul>

        </div>
      );
    }
  }
}

export default App;
