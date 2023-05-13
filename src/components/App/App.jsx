import { Component } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";

export class App extends Component {
  state = {
    search: '',
  
  }

  handleSearch = (value) => {
    this.setState({search: value})
  }

  render() {
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.handleSearch}/>
        <ImageGallery search={this.state.search}/>
      </div>
    );
  }

  
};
