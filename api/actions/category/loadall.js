import axios from 'axios';
import config from '../../config';


export default function loadall(req) {

  return new Promise((resolve, reject) => {

    axios.get(config.baseWPURL + '/wp-json/wp/v2/categories')
        .then(function (response) {
            resolve(response.data);
        })
        .catch(function (response) {
          reject('Error loading posts');
        });
      });
}
