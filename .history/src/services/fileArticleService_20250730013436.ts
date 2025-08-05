import { type NewsArticle } from '../components/Stiri/Stiri';

const API_URL = 'http://localhost:3000/api';

export const fetchArticles = async (): Promise<NewsArticle[]> => {
  try {
    const response = await fetch(`${API_URL}/articles`);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const createArticle = async (article: Omit<NewsArticle, 'id' | 'createdAt'>): Promise<NewsArticle> => {
  const formData = new FormData();
  
  // Add article data
  Object.entries(article).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key === 'image' ? 'image' : 'attachment', value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) throw new Error('Failed to create article');
  return await response.json();
};

export const updateArticle = async (article: NewsArticle): Promise<NewsArticle> => {
  const formData = new FormData();
  
  // Add article data
  Object.entries(article).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key === 'image' ? 'image' : 'attachment', value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_URL}/articles/${article.id}`, {
    method: 'PUT',
    body: formData
  });

  if (!response.ok) throw new Error('Failed to update article');
  return await response.json();
};

export const deleteArticle = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) throw new Error('Failed to delete article');
};