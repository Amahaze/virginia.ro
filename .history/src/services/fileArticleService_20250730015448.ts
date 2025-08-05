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

export const createArticle = async (formData: FormData): Promise<NewsArticle> => {
  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) throw new Error('Failed to create article');
  return await response.json();
};

export const updateArticle = async (formData: FormData): Promise<NewsArticle> => {
  const articleId = formData.get('id');
  const response = await fetch(`${API_URL}/articles/${articleId}`, {
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