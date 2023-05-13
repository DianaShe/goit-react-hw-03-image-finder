import { nanoid } from 'nanoid';
import { Component } from 'react';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import getPictures from 'services/APIService';
import Loader from 'components/Loader/Loader';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    loading: false,
    showModal: false,
    totalImages: 0,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ loading: true });
      getPictures(this.props.search, this.state.page)
        .then(response =>
          this.setState(prev => ({
            images: [...prev.images, ...response.data.hits],
            totalImages: response.data.totalHits,
          }))
        )
        .then(this.handleScroll)
        .catch(error => {
          console.log(error);
        })
        .finally(() => this.setState({ loading: false }));
    }

    if (prevProps.search !== this.props.search) {
      this.setState({ loading: true, page: 1 });
      getPictures(this.props.search)
        .then(response =>
          this.setState({
            images: response.data.hits,
            totalImages: response.data.totalHits,
          })
        )
        .catch(error => {
          console.log(error);
        })
        .finally(() => this.setState({ loading: false }));
    }
  };

  incrementPage = e => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleScroll = () => {
    const { height: cardHeight } = document
      .querySelector('ul')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, loading, totalImages, page } = this.state;
    const moreImages = Math.ceil(totalImages / 12) > page;

    return (
      <ul className={css.imageGallery}>
        {loading && <Loader />}
        {images && images.length === 0 && !loading && (
          <p>There are no images matching your search.</p>
        )}
        {images &&
          images.length > 0 &&
          images.map(image => (
            <ImageGalleryItem
              key={nanoid()}
              image={image}
              onClick={this.toggleModal}
            />
          ))}
        {images && images.length > 0 && moreImages && (
          <Button onClick={this.incrementPage} />
        )}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
};
