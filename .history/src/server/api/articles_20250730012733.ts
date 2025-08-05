import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { type NewsArticle } from '../../components/Stiri/Stiri';

export type { NewsArticle };

const router = express.Router();

export default router;

const ARTICLES_DIR = path.join(process.cwd(), 'src', 'data', 'articles');

// Ensure articles directory exists
if (!existsSync(ARTICLES_DIR)) {
  mkdirSync(ARTICLES_DIR, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get all articles
router.get('/', async (req, res) => {
  try {
    const files = await fs.readdir(ARTICLES_DIR);
    const articles = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async file => {
          const content = await fs.readFile(path.join(ARTICLES_DIR, file), 'utf-8');
          return JSON.parse(content) as NewsArticle;
        })
    );
    
    // Sort articles by creation date, newest first
    const sortedArticles = articles.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.json(sortedArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Create new article
router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'attachment', maxCount: 1 }
]), async (req, res) => {
  try {
    const articleData = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files.image) {
      articleData.imageUrl = `/uploads/${files.image[0].filename}`;
    }

    if (files.attachment) {
      articleData.attachmentUrl = `/uploads/${files.attachment[0].filename}`;
      articleData.attachmentName = files.attachment[0].originalname;
    }

    const newArticle: NewsArticle = {
      ...articleData,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };

    const filePath = path.join(ARTICLES_DIR, `${newArticle.id}.json`);
    await fs.writeFile(filePath, JSON.stringify(newArticle, null, 2));

    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Update article
router.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'attachment', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const articleData = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const filePath = path.join(ARTICLES_DIR, `${id}.json`);

    if (!existsSync(filePath)) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (files.image) {
      articleData.imageUrl = `/uploads/${files.image[0].filename}`;
    }

    if (files.attachment) {
      articleData.attachmentUrl = `/uploads/${files.attachment[0].filename}`;
      articleData.attachmentName = files.attachment[0].originalname;
    }

    const updatedArticle: NewsArticle = {
      ...articleData,
      id
    };

    await fs.writeFile(filePath, JSON.stringify(updatedArticle, null, 2));
    res.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete article
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = path.join(ARTICLES_DIR, `${id}.json`);

    if (!existsSync(filePath)) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await fs.unlink(filePath);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});