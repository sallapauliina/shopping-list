FROM lukechannings/deno:v1.29.2

EXPOSE 7777

WORKDIR /app

COPY deps.js .

RUN deno cache deps.js

CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "--no-check", "app.js" ]