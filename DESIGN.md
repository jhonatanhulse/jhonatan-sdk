# Implementation

The idea around the implementation was to simply to replicate the behavior that
the API has but some features were left behind because of the time constraints.

The client `TheOneApiClient` is essentially a wrapper around [Axios](https://github.com/axios/axios)
that delegates requests to the Axios client.

## Resources

The One API returns all types of records using a wrapper like this:

```json5
{
  "docs": [
     // ... 
  ],
  "total": 10,
  "page": 1,
  "pages": 2
}
```

Because of that a generic interface was create to replicate the same behavior:

```typescript
export interface Resource<T> {
  readonly docs: Array<T>;
  readonly total: number;
  readonly page?: number;
  readonly pages?: number;
}
```

The type `T` can be whatever type of document the API supports. Currently the
following types are supported:

```typescript
export interface Movie {
  readonly _id: string;
  readonly name: string;
  readonly runtimeInMinutes: number;
  readonly budgetInMillions: number;
  readonly boxOfficeRevenueInMillions: number;
  readonly academyAwardNominations: number;
  readonly academyAwardWins: number;
  readonly rottenTomatoesScore: number;
}
```

```typescript
export interface Quote {
  readonly _id: string;
  readonly dialog: string;
  readonly movie: string;
}
```

Here is an example of `Movie` response:

```json5
{
  "docs": [
    {
      "_id": "5cd95395de30eff6ebccde56",
      "name": "The Lord of the Rings Series",
      "runtimeInMinutes": 558,
      "budgetInMillions": 281,
      "boxOfficeRevenueInMillions": 2917,
      "academyAwardNominations": 30,
      "academyAwardWins": 17,
      "rottenTomatoesScore": 94
    },
  ],
  "total": 1,
  "page": 1,
  "pages": 1
}
```
