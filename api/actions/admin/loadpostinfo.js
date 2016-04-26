import axios from 'axios';
import PostInfo from '../../models/postinfo';

export default function loadpostinfo(req) {

  const post_id = req.param('post_id');
  
  return new Promise((resolve, reject) => {
      PostInfo.find({ post_id:post_id},(err, postinfo) => {
            resolve(postinfo);
      });
  });
}
