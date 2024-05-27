import * as request from 'supertest';
import 'dotenv/config';
import { PORT_API } from 'src/app';

const host = `localhost:${PORT_API}`;
const _request = request(host);

export default _request;
