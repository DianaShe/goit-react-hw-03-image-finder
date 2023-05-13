import { Component } from "react";
import css from "./Button.module.css";
import PropTypes from 'prop-types';

export default class Button extends Component {
  handleClick=(e)=> {
    this.props.onClick()
  }

  render() {
    return (
      <button className={css.button} type="button" onClick={this.handleClick}>
        Load more
      </button>
    )
  }
  
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}