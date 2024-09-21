import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

const doc = {
  info: {
    title: 'Text Analyzer Tool API',
  },
  host: `localhost:${PORT}/api`,
  securityDefinitions: {
    AccessToken: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Please enter token as "Bearer token"',
    },
  },
  security: [
    {
      AccessToken: [],
    },
  ],
};

const outputFile = 'src/docs/swagger.json';
const routes = ['../routes/apiRouter.ts'];

swaggerAutogen()(outputFile, routes, doc);
