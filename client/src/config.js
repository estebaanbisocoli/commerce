const PORT_LOCAL = 3001;
const LOCAL_HOST = 'http://127.0.0.1';
const HEROKU_URL = 'https://commerce-.herokuapp.com';
export default {
  API_LOCAL_V1: `${LOCAL_HOST}:${PORT_LOCAL}/v1`,
  API_REMOTE_V1: `${HEROKU_URL}/v1`
};
