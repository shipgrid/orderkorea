FROM node:16-alpine AS base
ARG PNPM_VERSION=6.17.0
RUN npm --no-update-notifier --no-fund --global install pnpm@${PNPM_VERSION}
WORKDIR /root/shipgrid

COPY . ./
RUN npm -g install typescript
RUN pnpm install --filter "sg-client..."
 
RUN pnpm --filter "sg-client" build

RUN echo ls -la /root/shipgrid
# EXPOSE 3000
# ENTRYPOINT ["pnpm", "preview"]
