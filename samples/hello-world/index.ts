import { Middleware } from '@line/clova-cek-sdk-nodejs';
import { clovaHandler } from './clova-handler';

const express = require('express');
const APPLICATION_ID = process.env.APPLICATION_ID;

const app = new express();
const clovaMiddleware = Middleware({ applicationId: String(APPLICATION_ID) });
app.post('/clova', clovaMiddleware, clovaHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
