import axios from 'axios';
import config from '../../config';
import { handlePost } from './index';


export default function load(req) {

  const slug = req.param('slug');


  return new Promise((resolve, reject) => {
    axios.get(config.baseWPURL + '/wp-json/wp/v2/posts?filter[name]=' + slug)
        .then((response) => {

          const post = handlePost(response.data[0]);
          
          resolve(post);
        })
       .catch(function (response) {
          reject('Error loading posts');
        });
      });
}
