import axios from 'axios';

const { S3_URL = 'https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json' } = process.env;

const s3 = axios.create({
  baseURL: S3_URL,
});

export default s3;
