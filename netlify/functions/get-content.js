const https = require('https');

exports.handler = async function(event) {
  const type = event.queryStringParameters.type;
  const folders = { news: '_news', videos: '_videos', books: '_books' };
  const folder = folders[type];
  
  if (!folder) return { statusCode: 400, body: 'Invalid type' };

  const options = {
    hostname: 'api.github.com',
    path: `/repos/AfricaLEARN/africalearn-portal/contents/${folder}`,
    headers: { 'User-Agent': 'AfricaLearn-Portal' }
  };

  return new Promise((resolve) => {
    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: data
        });
      });
    });
  });
};
