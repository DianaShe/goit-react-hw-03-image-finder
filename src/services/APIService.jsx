import axios from 'axios';
import PropTypes from 'prop-types';


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34438281-0af2d234ee7e315fc0f0d81e0';


async function getPictures(value, page = 1) {
  try {
     return await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${value}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    )
    
  } catch (error) {
    console.log(error);
  }
}

getPictures.propTypes = {
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default getPictures;
