const express = require('express');

const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const { notFound, errorHandler } = require('./middlewares');

const spotify = require('./api/SpotifyAPI/index');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome',
  });
});

app.use('/api/spotify', spotify);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
