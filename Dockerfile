FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install --no-audit

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]