# Arc Viewer

This viewer aims to provide the ability to navigate and view exported JSON files
from [Big Paua's Arc App](https://www.bigpaua.com/arcapp/) as well as providing
a simple timeline for animations.

[Go to viewer](https://hubendubler.github.io/arc-viewer)

## Development

For local development, a Mapbox access token is required. You can create one in
your [Mapbox account](https://account.mapbox.com/).

Place the token in a `.env.local` file in the root of the repository:

```
MAPBOX_ACCESS_TOKEN=XXXXXXXXXXXXXXXX
```

For the environment to start, first install the dependencies
via `npm install`, then run `npm run start`.
