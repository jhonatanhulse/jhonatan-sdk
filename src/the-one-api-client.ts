import axios, { AxiosInstance } from 'axios';
import { Movie, Quote, Resource } from './resources';

export interface ListRequestParams {
  readonly page?: number;
}

export interface TheOneApiClientConfig {
  readonly accessToken: string;
}

export class TheOneApiClient {
  static readonly BASE_URL = 'https://the-one-api.dev/v2';
  static readonly QUOTE_ENDPOINT = 'quote';
  static readonly MOVIES_ENDPOINT = 'movie';
  readonly axios: AxiosInstance;

  constructor(config: TheOneApiClientConfig) {
    const { accessToken } = config;

    this.axios = axios.create({
      baseURL: TheOneApiClient.BASE_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async listQuotes(params: ListRequestParams = {}): Promise<Resource<Quote>> {
    return (
      await this.axios.get<Resource<Quote>>(TheOneApiClient.QUOTE_ENDPOINT, {
        params,
      })
    ).data;
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    return (
      await this.axios.get<Resource<Quote>>(
        `${TheOneApiClient.QUOTE_ENDPOINT}/${id}`,
      )
    ).data.docs[0];
  }

  async listMovies(params: ListRequestParams = {}): Promise<Resource<Movie>> {
    return (
      await this.axios.get<Resource<Movie>>(TheOneApiClient.MOVIES_ENDPOINT, {
        params,
      })
    ).data;
  }

  async getMovie(id: string): Promise<Movie | undefined> {
    return (
      await this.axios.get<Resource<Movie>>(
        `${TheOneApiClient.MOVIES_ENDPOINT}/${id}`,
      )
    ).data.docs[0];
  }
}
