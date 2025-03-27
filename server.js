const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the current directory
app.use(express.static('./'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 