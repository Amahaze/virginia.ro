import { type NewsArticle } from '../components/Stiri/Stiri';

const API_BASE_URL = 'http://localhost:5001';

export const fetchArticles = async (): Promise<NewsArticle[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const createArticle = async (articleData: Omit<NewsArticle, 'id' | 'createdAt'>): Promise<NewsArticle> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData)
    });
    if (!response.ok) throw new Error('Failed to create article');
    return await response.json();
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

export const updateArticle = async (article: NewsArticle): Promise<NewsArticle> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${article.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    });
    if (!response.ok) throw new Error('Failed to update article');
    return await response.json();
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

export const deleteArticle = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete article');
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};