import MockAdapter from 'axios-mock-adapter';
import { TheOneApiClient } from '../src/the-one-api-client';
import { MOVIES_P1, MOVIES_P2 } from './mock-data';

describe('TheOneApiClient', () => {
  const client = new TheOneApiClient({ accessToken: 'accessToken' });

  let mock: MockAdapter;

  beforeAll(() => (mock = new MockAdapter(client.axios)));

  afterEach(() => mock.reset());

  describe('#listMovies()', () => {
    it('should return the first page of the movie list', async () => {
      const url = TheOneApiClient.MOVIES_ENDPOINT;
      mock.onGet(TheOneApiClient.MOVIES_ENDPOINT).reply(200, MOVIES_P1);

      const { docs: movies, total, page, pages } = await client.listMovies();

      expect(mock.history.get[0].url).toEqual(url);
      expect(movies.length).toBe(4);
      expect(total).toBe(8);
      expect(page).toBe(1);
      expect(pages).toBe(2);
    });

    it('should return the second page of the movie list', async () => {
      const url = TheOneApiClient.MOVIES_ENDPOINT;
      const params = { page: 2 };
      mock.onGet(TheOneApiClient.MOVIES_ENDPOINT, params).reply(200, MOVIES_P2);

      const {
        docs: movies,
        total,
        page,
        pages,
      } = await client.listMovies(params);

      expect(mock.history.get[0].url).toEqual(url);
      expect(mock.history.get[0].params).toEqual(params);
      expect(movies.length).toBe(4);
      expect(total).toBe(8);
      expect(page).toBe(2);
      expect(pages).toBe(2);
    });
  });
});
