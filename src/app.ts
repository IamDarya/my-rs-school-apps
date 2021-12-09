import path from 'path';
import express from 'express';
import cors from 'cors';
import {json} from 'body-parser';
import categories from './category/router';
import cards from './card/router-cards';

const staticFilesPath = path.resolve(__dirname, '../wwwroot');

const app = express();
// app.use(bodyParser.urlencoded({extended: false}))
app.use(json());
app.use(cors());
//app.use(/^(?!\/api\/)/, express.static(staticFilesPath));
app.use('/api/categories', categories);
app.use('/api/cards', cards);

let port = process.env.PORT;
if (port == null || port == "") {
  port = '8000';
}
app.listen(port);