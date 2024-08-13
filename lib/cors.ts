import Cors from 'cors';
import initMiddleware from './init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    origin: 'https://imagine-beach-volley.com', // Replace with your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

export default cors;