import MockAdapter from 'axios-mock-adapter';
import { Movie } from '../src/resources';
import { TheOneApiClient } from '../src/the-one-api-client';
import { MOVIES_P1, MOVIES_P2, QUOTES_P1, QUOTES_P2 } from './mock-data';

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

  describe('#getMovie()', () => {
    it('should return the movie with the passed id', async () => {
      const id = '5cd95395de30eff6ebccde56';
      const url = `${TheOneApiClient.MOVIES_ENDPOINT}/${id}`;
      mock.onGet(url).reply(200, MOVIES_P1);

      const movie = (await client.getMovie(id)) as Movie;

      expect(movie._id).toBe('5cd95395de30eff6ebccde56');
      expect(movie.name).toBe('The Lord of the Rings Series');
      expect(movie.runtimeInMinutes).toBe(558);
      expect(movie.budgetInMillions).toBe(281);
      expect(movie.boxOfficeRevenueInMillions).toBe(2917);
      expect(movie.academyAwardNominations).toBe(30);
      expect(movie.academyAwardWins).toBe(17);
      expect(movie.rottenTomatoesScore).toBe(94);
    });
  });

  describe('#listQuotes()', () => {
    it('should return the first page of the quote list', async () => {
      const url = TheOneApiClient.QUOTE_ENDPOINT;
      mock.onGet(TheOneApiClient.QUOTE_ENDPOINT).reply(200, QUOTES_P1);

      const { docs: quotes, total, page, pages } = await client.listQuotes();

      expect(mock.history.get[0].url).toEqual(url);
      expect(quotes.length).toBe(10);
      expect(total).toBe(20);
      expect(page).toBe(1);
      expect(pages).toBe(2);
    });

    it('should return the second page of the quote list', async () => {
      const url = TheOneApiClient.QUOTE_ENDPOINT;
      const params = { page: 2 };
      mock.onGet(TheOneApiClient.QUOTE_ENDPOINT, params).reply(200, QUOTES_P2);

      const {
        docs: quotes,
        total,
        page,
        pages,
      } = await client.listQuotes(params);

      expect(mock.history.get[0].url).toEqual(url);
      expect(mock.history.get[0].params).toEqual(params);
      expect(quotes.length).toBe(10);
      expect(total).toBe(20);
      expect(page).toBe(2);
      expect(pages).toBe(2);
    });
  });
});
