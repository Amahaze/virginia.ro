import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { type NewsArticle } from '../components/Stiri/Stiri';

const ARTICLES_DIR = path.join(process.cwd(), 'articles');

// Ensure articles directory exists
if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

export const saveArticle = async (articleData: Omit<NewsArticle, 'id' | 'createdAt'>): Promise<NewsArticle> => {
  const id = uuidv4();
  const createdAt = new Date().toISOString();
  const article: NewsArticle = {
    ...articleData,
    id,
    createdAt
  };

  // Save article data
  const articlePath = path.join(ARTICLES_DIR, `${id}.json`);
  await fs.promises.writeFile(articlePath, JSON.stringify(article, null, 2));

  // If there's an image, save it separately
  if (articleData.imageUrl) {
    const imageData = articleData.imageUrl.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(imageData, 'base64');
    const imageExt = articleData.imageUrl.match(/data:image\/(\w+);/)?.[1] || 'png';
    const imagePath = path.join(ARTICLES_DIR, `${id}.${imageExt}`);
    await fs.promises.writeFile(imagePath, imageBuffer);
    article.imageUrl = `/articles/${id}.${imageExt}`;
  }

  // If there's an attachment, save it separately
  if (articleData.attachmentUrl) {
    const attachmentData = articleData.attachmentUrl.replace(/^data:.*?;base64,/, '');
    const attachmentBuffer = Buffer.from(attachmentData, 'base64');
    const attachmentExt = articleData.attachmentName?.split('.').pop() || 'pdf';
    const attachmentPath = path.join(ARTICLES_DIR, `${id}_attachment.${attachmentExt}`);
    await fs.promises.writeFile(attachmentPath, attachmentBuffer);
    article.attachmentUrl = `/articles/${id}_attachment.${attachmentExt}`;
  }

  return article;
};

export const getAllArticles = async (): Promise<NewsArticle[]> => {
  const files = await fs.promises.readdir(ARTICLES_DIR);
  const articleFiles = files.filter(file => file.endsWith('.json'));

  const articles = await Promise.all(
    articleFiles.map(async (file) => {
      const content = await fs.promises.readFile(path.join(ARTICLES_DIR, file), 'utf8');
      return JSON.parse(content) as NewsArticle;
    })
  );

  return articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const updateArticle = async (article: NewsArticle): Promise<NewsArticle> => {
  const articlePath = path.join(ARTICLES_DIR, `${article.id}.json`);
  
  // Verify article exists
  if (!fs.existsSync(articlePath)) {
    throw new Error('Article not found');
  }

  // Read existing article to get original image and attachment paths
  const existingArticle = JSON.parse(
    await fs.promises.readFile(articlePath, 'utf8')
  ) as NewsArticle;

  // Handle image update
  if (article.imageUrl && article.imageUrl !== existingArticle.imageUrl) {
    // Delete old image if it exists
    if (existingArticle.imageUrl) {
      const oldImagePath = path.join(ARTICLES_DIR, path.basename(existingArticle.imageUrl));
      if (fs.existsSync(oldImagePath)) {
        await fs.promises.unlink(oldImagePath);
      }
    }

    // Save new image
    const imageData = article.imageUrl.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(imageData, 'base64');
    const imageExt = article.imageUrl.match(/data:image\/(\w+);/)?.[1] || 'png';
    const imagePath = path.join(ARTICLES_DIR, `${article.id}.${imageExt}`);
    await fs.promises.writeFile(imagePath, imageBuffer);
    article.imageUrl = `/articles/${article.id}.${imageExt}`;
  }

  // Handle attachment update
  if (article.attachmentUrl && article.attachmentUrl !== existingArticle.attachmentUrl) {
    // Delete old attachment if it exists
    if (existingArticle.attachmentUrl) {
      const oldAttachmentPath = path.join(ARTICLES_DIR, path.basename(existingArticle.attachmentUrl));
      if (fs.existsSync(oldAttachmentPath)) {
        await fs.promises.unlink(oldAttachmentPath);
      }
    }

    // Save new attachment
    const attachmentData = article.attachmentUrl.replace(/^data:.*?;base64,/, '');
    const attachmentBuffer = Buffer.from(attachmentData, 'base64');
    const attachmentExt = article.attachmentName?.split('.').pop() || 'pdf';
    const attachmentPath = path.join(ARTICLES_DIR, `${article.id}_attachment.${attachmentExt}`);
    await fs.promises.writeFile(attachmentPath, attachmentBuffer);
    article.attachmentUrl = `/articles/${article.id}_attachment.${attachmentExt}`;
  }

  // Save updated article data
  await fs.promises.writeFile(articlePath, JSON.stringify(article, null, 2));
  return article;
};

export const deleteArticle = async (id: string): Promise<void> => {
  const articlePath = path.join(ARTICLES_DIR, `${id}.json`);
  
  // Verify article exists
  if (!fs.existsSync(articlePath)) {
    throw new Error('Article not found');
  }

  // Read article to get image and attachment paths
  const article = JSON.parse(
    await fs.promises.readFile(articlePath, 'utf8')
  ) as NewsArticle;

  // Delete image if it exists
  if (article.imageUrl) {
    const imagePath = path.join(ARTICLES_DIR, path.basename(article.imageUrl));
    if (fs.existsSync(imagePath)) {
      await fs.promises.unlink(imagePath);
    }
  }

  // Delete attachment if it exists
  if (article.attachmentUrl) {
    const attachmentPath = path.join(ARTICLES_DIR, path.basename(article.attachmentUrl));
    if (fs.existsSync(attachmentPath)) {
      await fs.promises.unlink(attachmentPath);
    }
  }

  // Delete article data
  await fs.promises.unlink(articlePath);
};