import axios from 'axios';
import PostInfo from '../../models/postinfo';

export default function load(req) {

  const slug = req.param('slug');

  return new Promise((resolve, reject) => {

    axios.get('http://api.codetutorial.io/index.php/wp-json/wp/v2/posts?filter[name]=' + slug)
        .then(function (response) {

            PostInfo.findOrCreate({ post_id:response.data[0].id },{view: 0},(err, postinfo, created) => {
                  postinfo.view ++;
                  postinfo.slug = slug;
                  postinfo.save();

                  resolve(response.data);
           });
        })
        .catch(function (response) {
          reject('Error loading posts');
        });
      });
}
