const env = 'dev';

const API_URL =
  env === 'dev'
    ? 'http://localhost:9000'
    : env === 'prod'
    ? 'http://http://dc42.dawsoncollege.qc.ca/'
    : '';

const CONSTANT = {
  GAME_GEN_ENDPOINT: `${API_URL}/game-generate`,
  STORYLINE_ENDPOINT: `${API_URL}/storyline`,
};

export default CONSTANT;
