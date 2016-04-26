import axios from 'axios';

export default function loadall(req) {

  return new Promise((resolve, reject) => {

    axios.get('http://api.codetutorial.io/index.php/wp-json/wp/v2/categories')
        .then(function (response) {
            resolve(response.data);
        })
        .catch(function (response) {
          reject('Error loading posts');
        });
      });
}
