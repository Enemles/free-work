const axios = require('axios');
const qs = require('qs');

async function getGithubToken(code) {
  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      qs.stringify({
        client_id: "Ov23li8hLeMN1s5QpuCe",
        client_secret: "0a9c5c62ae7ceedeb6f2b53d2377a6feec2ad51a",
        code: code,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }
    );

    console.log('Response data:', response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting GitHub token:', error.response ? error.response.data : error.message);
    return null;
  }
}

getGithubToken("7ce78c5c544ef43dcba3")
  .then(token => {
    console.log('Your GitHub Token:', token);
  })
  .catch(error => {
    console.error('Failed to get GitHub token:', error);
  });
