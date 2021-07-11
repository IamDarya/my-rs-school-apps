import path from 'path';
import express from 'express';
import cors from 'cors';
import {json} from 'body-parser';
import categories from './category/router';

const staticFilesPath = path.resolve(__dirname, '../wwwroot');

const app = express();
// app.use(bodyParser.urlencoded({extended: false}))
app.use(json());
app.use(cors());
app.use(/^(?!\/api\/)/, express.static(staticFilesPath));
app.use('/api/categories', categories);

app.listen(3000, () => console.log('server started on 3000'));