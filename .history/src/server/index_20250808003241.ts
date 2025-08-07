import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import articlesRouter from './api/articles';

const createServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3001;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Serve static files
  app.use(express.static(path.join(process.cwd(), 'dist')));
  app.use('/uploads', express.static(path.join(process.cwd(), 'dist', 'uploads')));

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'dist', 'uploads');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
  }

  // Serve index.html for all routes except API
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    }
  });

  // API routes
  app.use('/api/articles', articlesRouter);

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

  return app;
};

const app = createServer();

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

export default app;