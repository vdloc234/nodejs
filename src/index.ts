import express from 'express';
import { route } from './routes';

const app = express();

const port = 3000;

const prefix = '/api';

app.use(prefix, route);

app.use('/', (req: express.Request, res: express.Response) => {
    res.send('Please change the URL to find images.');
});

app.listen(port, () => {
    console.log(`Listening to server on port ${port}`);
});

export default app;
