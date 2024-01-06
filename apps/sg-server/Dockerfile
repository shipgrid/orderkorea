FROM node:16-alpine AS base
ARG PNPM_VERSION=6.17.0
RUN npm --no-update-notifier --no-fund --global install pnpm@${PNPM_VERSION}
WORKDIR /root/shipgrid

ARG PACKAGE_PATH
COPY . ./
RUN npm -g install typescript
RUN pnpm install --filter "sg-server" 

WORKDIR /root/shipgrid/sg-server
EXPOSE 4000
ENTRYPOINT ["pnpm", "compile"]
