FROM node

WORKDIR /opt/Stremio/Addon

RUN chmod -R 777 /opt

USER node


COPY --chown=node:node ./jest.config.js .
COPY --chown=node:node ./package-lock.json .
COPY --chown=node:node ./src src
COPY --chown=node:node ./node_modules node_modules
COPY --chown=node:node ./package.json .
COPY --chown=node:node ./.js .
COPY --chown=node:node ./test test

RUN npm install
ENTRYPOINT [ "npm" ]
CMD [ "test" ]