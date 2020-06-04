const fetch = require('node-fetch');
const { Router } = require('express');
const qs = require('qs');

require('dotenv').config();
// IP ADDRESS'http://192.168.0.10:3001';
const router = Router();
const API_URI = 'https://accounts.spotify.com';
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI =
  process.env.REDIRECT_VALUE || 'http://localhost:3000/callback';
const SCOPES =
  'user-read-private user-read-email playlist-read-private user-follow-read user-top-read';

const HASHED_CLIENT_AND_SECRET = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
).toString('base64');

router.get('/', (req, res) => {
  res.json({
    message: 'Spotify Api',
  });
});

router.get('/login', (req, res) => {
  const userScope = SCOPES ? `&scope=${encodeURIComponent(SCOPES)}` : '';
  res.redirect(
    `${API_URI}/authorize?response_type=code&show_dialog=true&client_id=${CLIENT_ID}${userScope}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}`,
  );
});

router.post('/getToken', async (req, res, next) => {
  const { code } = req.body;
  try {
    if (!code) {
      const error = new Error('Error code is required!');
      res.status(400);
      next(error);
    } else {
      const querystring = qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      });

      const result = await fetch(`${API_URI}/api/token`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${HASHED_CLIENT_AND_SECRET}`,
        },
        method: 'POST',
        body: querystring,
      });
      const response = await result.json();
      return res.json(response);
    }
  } catch (err) {
    return res.json(err);
  }
});

router.post('/refreshToken', async (req, res, next) => {
  const { refresh_token } = req.body;
  try {
    if (!refresh_token) {
      const error = new Error('Error refresh token is required!');
      res.status(400);
      next(error);
    } else {
      const querystring = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        redirect_uri: REDIRECT_URI,
      });

      const result = await fetch(`${API_URI}/api/token`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${HASHED_CLIENT_AND_SECRET}`,
        },
        method: 'POST',
        body: querystring,
      });

      const response = await result.json();
      return res.json(response);
    }
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
