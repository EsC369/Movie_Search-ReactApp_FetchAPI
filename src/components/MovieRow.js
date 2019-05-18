import React, { Component } from 'react';

export class MovieRow extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
       <table key={this.props.movie.id}>
          <tbody>
            <tr>
              <td>
                <img src={this.props.movie.posterSrc} width="120" alt="Movie Poster" className="moviePosters"/>
              </td>
              <td>
                {this.props.movie.title}
                <p>{this.props.movie.overviewreview}</p>
              </td>
            </tr>
          </tbody>
          </table>
    )
  }
}

export default MovieRow;