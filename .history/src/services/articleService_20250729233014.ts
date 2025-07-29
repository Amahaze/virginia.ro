import { type NewsArticle } from '../components/Stiri/Stiri';
import { v4 as uuidv4 } from 'uuid';

export const fetchArticles = async (): Promise<NewsArticle[]> => {
  const savedArticles = localStorage.getItem('newsArticles');
  return savedArticles ? JSON.parse(savedArticles) : [];
};

export const createArticle = async (articleData: Omit<NewsArticle, 'id' | 'createdAt'>): Promise<NewsArticle> => {
  const newArticle: NewsArticle = {
    ...articleData,
    id: uuidv4(),
    createdAt: new Date().toISOString()
  };

  const articles = await fetchArticles();
  articles.push(newArticle);
  localStorage.setItem('newsArticles', JSON.stringify(articles));

  return newArticle;
};

export const updateArticle = async (article: NewsArticle): Promise<NewsArticle> => {
  const articles = await fetchArticles();
  const index = articles.findIndex(a => a.id === article.id);
  
  if (index === -1) {
    throw new Error('Article not found');
  }

  articles[index] = article;
  localStorage.setItem('newsArticles', JSON.stringify(articles));

  return article;
};

export const deleteArticle = async (id: string): Promise<void> => {
  const articles = await fetchArticles();
  const filteredArticles = articles.filter(article => article.id !== id);
  localStorage.setItem('newsArticles', JSON.stringify(filteredArticles));
};