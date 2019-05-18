import React, { Component } from 'react';
import './App.css';
// import MovieRow from "./components/MovieRow.js";

const url = "http://api.themoviedb.org/3/search/movie?query=marvel&api_key=3edc78312597d701f2909d246b009cae"
// works:   https://api.themoviedb.org/3/movie/550?api_key=3edc78312597d701f2909d246b009cae

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      movies: []
    }
    // Call api Search: 
    this.performSearch()
  }
  // api call:
  performSearch() {
    console.log("Performing search using MovieDB")
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        this.setState({
          isLoaded: true,
          movies: data
        })
      })
      .catch(err => console.log("Error: ", err))
  }

  render() {
    var { movies, isLoaded } = this.state;
    if (isLoaded !== true) {
      return <div>Loadidng...</div>
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
            <input type="text" placeholder="Enter Search Term" className="inputSearch" name="inputSearch" />
          </center>

          <ul>
            Result Below: <br />
            <p>Title of first movie: {movies.results[0].title}</p>

            <p>Attempt at iteration: </p>
            {movies.results.map(movie => (
              <table key={movie.id}>
                <tbody>
                  <tr>
                    <td>
                      <img src={movie.poster_path} width="120" alt="Movie Poster" className="moviePosters" />
                    </td>
                    <td>
                      {movie.title}
                      <p>{movie.overview}</p>
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
