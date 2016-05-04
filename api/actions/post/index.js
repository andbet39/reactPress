import cheerio  from 'cheerio';

export loadall from './loadall';
export load from './load';




export function  handlePost(post){
  var $ = cheerio;

  console.log(post.slug);
  let text = post.content.rendered;

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

  sections.forEach((section) =>
  {
    var rendered = $('<div>' + section.body + '</div>');

    rendered.find('.crayon-syntax').each((i,val) => {
      var content = $(val).find('textarea').val();
      var id =  $(val).attr('id');

      var lang = $(val).find('.crayon-language').text();

      console.log(lang.toLowerCase());

      rendered.find("#"+id).replaceWith('<pre class="'+lang.toLowerCase()+'"><code class="'+lang.toLowerCase()+'">'+content+'</code></pre>');
    });


    rendered.find('div').removeClass();
    rendered.find('img').removeClass().addClass('img-responsive center-block').wrap( "<div class='article-image' layout='row' layout-align='center'></div>" );

    section.body = rendered.html();

    var title = section.title.replace('<h2>', '');
    section.title = title.replace('<\/h2>', '');

  });

  post.sections = sections;
  post.content = {};

  return post;
}