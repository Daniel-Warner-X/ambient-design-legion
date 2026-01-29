const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 8000;

// Serve static files
app.use(express.static(__dirname));

// API endpoint to list images in mood folder
app.get('/api/images', async (req, res) => {
    try {
        const moodDir = path.join(__dirname, 'mood');
        const files = await fs.readdir(moodDir);

        // Filter for image files only
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
        const images = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });

        res.json(images);
    } catch (error) {
        console.error('Error reading mood directory:', error);
        res.status(500).json({ error: 'Failed to read images' });
    }
});

app.listen(PORT, () => {
    console.log(`\n🎨 Mood Board server running at http://localhost:${PORT}`);
    console.log(`📂 Serving files from: ${__dirname}`);
    console.log(`\nOpen http://localhost:${PORT}/index.html in your browser\n`);
});
