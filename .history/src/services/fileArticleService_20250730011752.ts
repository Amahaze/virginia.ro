import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { type NewsArticle } from '../components/Stiri/Stiri';
import { v4 as uuidv4 } from 'uuid';

const ARTICLES_DIR = path.join(process.cwd(), 'src', 'data', 'articles');

// Ensure articles directory exists
if (!existsSync(ARTICLES_DIR)) {
  mkdirSync(ARTICLES_DIR, { recursive: true });
}

export const fetchArticles = async (): Promise<NewsArticle[]> => {
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
    return articles.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const createArticle = async (articleData: Omit<NewsArticle, 'id' | 'createdAt'>): Promise<NewsArticle> => {
  const newArticle: NewsArticle = {
    ...articleData,
    id: uuidv4(),
    createdAt: new Date().toISOString()
  };

  const filePath = path.join(ARTICLES_DIR, `${newArticle.id}.json`);
  await fs.writeFile(filePath, JSON.stringify(newArticle, null, 2));

  return newArticle;
};

export const updateArticle = async (article: NewsArticle): Promise<NewsArticle> => {
  const filePath = path.join(ARTICLES_DIR, `${article.id}.json`);
  
  if (!existsSync(filePath)) {
    throw new Error('Article not found');
  }

  await fs.writeFile(filePath, JSON.stringify(article, null, 2));
  return article;
};

export const deleteArticle = async (id: string): Promise<void> => {
  const filePath = path.join(ARTICLES_DIR, `${id}.json`);
  
  if (!existsSync(filePath)) {
    throw new Error('Article not found');
  }

  await fs.unlink(filePath);
};