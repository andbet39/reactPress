import axios from 'axios';
import config from '../../config';
import cheerio  from 'cheerio';
import { handlePost } from './index';

export default function loadall(req) {


  return new Promise((resolve, reject) => {
    const page = req.param('page');
    let url = config.baseWPURL + '/wp-json/wp/v2/posts'

    if( page ){
        url = config.baseWPURL + '/wp-json/wp/v2/posts?page=' + page;
    }
    console.log(url);
    axios.get( url )
        .then( (response) => {

            const postArray=[];
            const posts = response.data;
            posts.forEach((post) => {
              postArray.push(handlePost(post));
            });

            response.data = {posts:postArray,
              'info':{total_pages: response.headers["x-wp-totalpages"],
                          total_posts: response.headers["x-wp-total"],
                          currentPage: page }};

            resolve(response.data);
        })
        .catch(function (response) {
          console.log(response);
          reject('Error loading posts');
        });
      });
}


