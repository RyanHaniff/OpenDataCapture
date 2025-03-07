# Configuration

## Environment Variables

All intended configuration is handled via environment variables, which should be placed in `.env`. You can create an `.env` file from our template with the following command:

```shell
awk -v secret_key="$(openssl rand -hex 16)" '/^SECRET_KEY=/{print $0 secret_key;next}1' .env.template > .env
```

For the rest of the variables, please refer to the descriptions in the newly created `.env` file.

## Build

Once you have set all the environment variables correctly, you can deploy the stack with the following command:

```shell
docker compose up
```

## Custom Proxy

It is straightforward disable the automatic HTTP on Caddy and use a custom proxy on your host machine. First, in your `.env` file set `SITE_ADDRESS` as follows:

```
SITE_ADDRESS=localhost:80
```

Next, you will need to adjust the default port mapping. We recommend doing so in a new file `docker-compose.prod.yaml`, which we have added to `.gitignore` to avoid merge conflict in the event of upstream changes.

```shell
cat docker-compose.yaml > docker-compose.prod.yaml
```

```diff
services:
  caddy:
    image: caddy:2.7-alpine
    restart: unless-stopped
    ports:
-     - "80:80"
-     - "443:443"
+     - "5500:80"
    ...
```

```shell
docker compose -f docker-compose.prod.yaml up
```
