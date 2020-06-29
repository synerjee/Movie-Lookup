import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    axios.get("https://api.themoviedb.org/3/movie/"+this.props.match.params.post_id+"?api_key=[API_KEY]&language=en-US").then(
      res => {
        this.setState({
          data: res.data
        })
      }
    )
  }

  render() {

    if (this.state.data !== null) {
      const { data } = this.state;

      let renderPoster = null;
      if (data["poster_path"] !== null) {
        let path = "https://image.tmdb.org/t/p/w500" + data["poster_path"];
        renderPoster = (
          <img src={path} />
        )
      }

      let renderGenres = null;
      if (data["genres"] !== null) {
        const genres = data["genres"];
        let genreList = "";
        for (let i = 0; i < genres.length - 1; i++) {
          genreList += genres[i]["name"] + ", "
        }
        genreList += genres[genres.length-1]["name"];
        const genreTag = (genres.length === 1) ? ("Genre"):("Genres");
        renderGenres = (
          <p><b>{genreTag}</b>: {genreList}</p>
        )
      }

      let renderCountries = null;
      if (data["production_countries"] !== null) {
        const countries = data["production_countries"];
        let countryList = "";
        for (let i = 0; i < countries.length - 1; i++) {
          countryList += countries[i]["name"] + ", "
        }
        countryList += countries[countries.length-1]["name"];
        const countryTag = (countries.length === 1) ? ("Country"):("Countries");
        renderCountries = (
          <p><b>{countryTag}</b>: {countryList}</p>
        )
      }

      let renderCompanies = null;
      if (data["production_companies"] !== null) {
        const companies = data["production_companies"];
        let companyList = "";
        for (let i = 0; i < companies.length - 1; i++) {
          companyList += companies[i]["name"] + ", "
        }
        companyList += companies[companies.length-1]["name"];
        const companyTag = (companies.length === 1) ? ("Company"):("Companies");
        renderCompanies = (
          <p><b>{companyTag}</b>: {companyList}</p>
        )
      }

      let infoList = ["overview", "vote_average", "release_date", "runtime", "status"];
      infoList = infoList.filter(info => {
        return data[info] !== null;
      })
      let renderInfos = null;
      if (infoList != null) {
        renderInfos = infoList.map(info => {
          let newName = info[0].toUpperCase() + info.slice(1);
          newName = newName.replace(/_/g, " ");
          if (newName === "Runtime") {
            return (
              <p><b>{newName}</b>: {data[info]} minutes</p>
            )
          }
          else {
            return (
              <p><b>{newName}</b>: {data[info]}</p>
            )
          }
        })
      }

      return (
        <div>
          <h3 className="center Movie-title">{data["title"]}</h3>
          <div className="center">
            {renderPoster}
          </div>
          {renderGenres}
          {renderCountries}
          {renderCompanies}
          {renderInfos}
        </div>
      )
    }

    else {
      return (
        <div>
          <h3>Movie not found!</h3>
        </div>
      )
    }
  }
}

export default Post;
