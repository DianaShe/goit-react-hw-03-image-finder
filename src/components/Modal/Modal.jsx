import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'scroll';
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      e.stopPropagation();
      this.props.onClose();
    }
    e.stopPropagation();
  };

  render() {
    const { url, title } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img src={url} alt={title} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}