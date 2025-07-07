FROM node:20-alpine AS builder 

WORKDIR /app 

RUN npm install -g pnpm 

COPY package.json pnpm-lock.yaml ./ 

RUN pnpm install 

COPY . .


FROM node:20-alpine 

WORKDIR /app

RUN npm install -g pnpm 

COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

COPY --from=builder /app/src ./src/

ENV NODE_ENV=development

EXPOSE 8000

CMD [ "pnpm","dev" ]


