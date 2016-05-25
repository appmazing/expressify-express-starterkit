import { expect } from 'chai';
import api from '../utils/api';

describe('GET /info', () => {
  it('responds with JSON', async () => {
    const response = await api.get({
        path: '/info',
        headers: { Accept: 'application/json' },
    });

    expect(response.status).to.eql(200);
    expect(response.headers['content-type'], /json/);
  });
});
