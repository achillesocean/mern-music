# Music Library App

Welcome to the Music Library App! This is a simple, user-friendly application where you can manage your personal music collection. You can add, edit, delete, and browse songs, and even view interesting statistics about your library — like how many songs you have per genre, artist, or album.

The project is split into two parts:

- Frontend (client folder): The web interface you interact with in your browser.
- Backend (server folder): The server that stores your songs in a database and provides the data to the frontend.

## How to Run the App

You’ll need to start both the backend and the frontend. The instructions below are beginner-friendly.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for the backend)
- [Node.js](https://nodejs.org/) (version 18 or higher recommended, for the frontend)

### Step 1: Start the Backend (Using Docker)

1. Open a terminal (Command Prompt on Windows, Terminal on macOS/Linux).
2. Navigate to the server folder:
cd server
text3. Build the Docker image (do this the first time, or whenever the backend code changes):
docker build -t my-backend .
textThis may take a few minutes the first time while it downloads everything needed.

4. Once the build finishes successfully, start the backend server:
docker run -p 5000:5000 my-backend
text5. You should see a message that the server is running on port 5000. Keep this terminal window open while using the app.

### Step 2: Start the Frontend

1. Open a new terminal window (don’t close the backend one).
2. Navigate to the client folder:
cd client
text3. Install the required packages (only needed the first time):
npm install
text4. Start the frontend development server:
npm run dev
text5. Your browser should automatically open the app at http://localhost:3000. If it doesn’t, just visit that address manually.

### Enjoy the App!
- Add new songs, edit or delete existing ones.
- Check out the statistics page to see breakdowns by genre, artist, album, and more.
- Your changes are saved automatically thanks to the backend.

## Troubleshooting
- Port 5000 already in use? Stop the other program using it, or change the command to use a different host port, e.g., docker run -p 5001:5000 my-backend.
- Frontend can’t connect to backend? Make sure the backend is running first.
- No songs appear? The library starts empty — just add your first song!