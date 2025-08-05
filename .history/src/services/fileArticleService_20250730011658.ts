import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { type NewsArticle } from '../components/Stiri/Stiri';
import { v4 as uuidv4 } from 'uuid';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);
const unlinkAsync = promisify(fs.unlink);

const ARTICLES_DIR = path.join(process.cwd(), 'src', 'data', 'articles');

// Ensure articles directory exists
if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

export const fetchArticles = async (): Promise<NewsArticle[]> => {
  try {
    const files = await readdirAsync(ARTICLES_DIR);
    const articles = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async file => {
          const content = await readFileAsync(path.join(ARTICLES_DIR, file), 'utf-8');
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
  await writeFileAsync(filePath, JSON.stringify(newArticle, null, 2));

  return newArticle;
};

export const updateArticle = async (article: NewsArticle): Promise<NewsArticle> => {
  const filePath = path.join(ARTICLES_DIR, `${article.id}.json`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error('Article not found');
  }

  await writeFileAsync(filePath, JSON.stringify(article, null, 2));
  return article;
};

export const deleteArticle = async (id: string): Promise<void> => {
  const filePath = path.join(ARTICLES_DIR, `${id}.json`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error('Article not found');
  }

  await unlinkAsync(filePath);
};