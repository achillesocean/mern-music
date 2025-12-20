# Step 1: Choose a base image (a pre-built environment with Node.js installed).
# We're using the official Node.js image for version 20 (LTS as of 2025), slim variant for smaller size.
FROM node:20-slim AS base

# Step 2: Set the working directory inside the container to /app.
# All commands after this will run in /app.
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if it exists) first.
# This optimizes builds by caching dependencies.
COPY package*.json ./

# Step 4: Install dependencies.
# --production skips devDependencies (like typescript) for a smaller image.
RUN npm install

# Step 5: Copy the rest of your code into the container.
COPY . .

# Step 6: Compile TypeScript to JavaScript (assuming you have a tsconfig.json).
# This runs 'tsc' (TypeScript compiler) via npm if you have a "build" script in package.json.
# If not, add "build": "tsc" to your package.json scripts.
RUN npm run build

# Step 7: Expose the port your app listens on (change 3000 if your app uses a different port).
EXPOSE 5000

# Step 8: Command to run your app when the container starts.
# This assumes your compiled JS is in dist/index.js; adjust if different.
CMD ["node", "dist/index.js"]