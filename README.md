# Project 1: Shared shopping list

This projects works with Mac computer. If you run the code with Windows laptop,
change these things: In the Dockerfile, change the first row to this: FROM
denoland/deno:alpine-1.37.0 In the docker-compose file, change the flyway to
this:

flyway: image: flyway/flyway:9.11.0-alpine depends_on: - database volumes: -
.:/flyway/sql command: -connectRetries=60 -baselineOnMigrate=true migrate
env_file: - project.env

Write the documentation of your project here. Do not include your personal
details (e.g. name or student number).

Remember to include the address of the online location where your project is
running as it is a key part of the submission.
