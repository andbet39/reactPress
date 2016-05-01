import axios from 'axios';
import PostInfo from '../../models/postinfo';
import cheerio from 'cheerio';

export default function load(req) {

  const slug = req.param('slug');

  return new Promise((resolve, reject) => {

    axios.get('http://api.codetutorial.io/index.php/wp-json/wp/v2/posts?filter[name]=' + slug)
        .then(function (response) {

          const text=response.data[0].content.rendered;
          const subtitleArr = text.match(/<h(.)>.*?<\/h\1>/g);
          const sections = [];
          if (subtitleArr !== null) {
            sections.push({ 'body': text.substring(0, text.indexOf(subtitleArr[0])), 'title': ''});

            for (let index = 0; index < subtitleArr.length; index++) {
              const title = subtitleArr[index];
              const startPos = text.indexOf(title) + title.length;
              let endPos = text.length;
              if ( index + 1 < subtitleArr.length ) {
                const titleEnd = subtitleArr[index + 1];
                endPos = text.indexOf(titleEnd);
              }
              sections.push({'body': text.substring(startPos, endPos), 'title': subtitleArr[index]});
            }
          } else {
            sections.push({'body': text, 'title': ''});
          }

            sections.forEach((section)=>
            {
                var title = section.title.replace('<h2>','');
                section.title=title.replace('<\/h2>','');
            });
            response.data[0].sections = sections;

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
