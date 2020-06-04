const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const { notFound, errorHandler } = require('./middlewares');

const spotify = require('./api/SpotifyAPI/index');

require('dotenv').config();

const app = express();

mongoose.connect(`${process.env.MONGOOSE_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected To Mongoose!');
});

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
  console.log(`Listening at http://localhost:${port} -- jem v2`);
});
