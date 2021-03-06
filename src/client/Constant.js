const env = 'prod';

const API_URL =
  env === 'dev'
    ? 'http://localhost:9000'
    : env === 'prod'
    ? 'https://cryptiq.dawsoncollege.qc.ca/'
    : '';

const CONSTANT = {
  GAME_GEN_ENDPOINT: `${API_URL}/game-generate`,
  STORYLINE_ENDPOINT: `${API_URL}/storyline`,
};

export default CONSTANT;
