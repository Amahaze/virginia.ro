import express, { Request, Response, NextFunctionconst express = require('express');
const cors = require('cors');
const path = require('path');
const { existsSync, mkdirSync } = require('fs');
const articlesRouter = require('./api/articles');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

// API routes
app.use('/api/articles', articlesRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});