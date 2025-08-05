import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useTranslation } from 'react-i18next';
import ArticleDialog from './ArticleDialog';
import { fetchArticles, deleteArticle } from '../../services/fileArticleService';
import './Stiri.css';

export interface NewsArticle {
  id: string;
  title: {
    ro: string;
    en: string;
    ru: string;
  };
  content: {
    ro: string;
    en: string;
    ru: string;
  };
  imageUrl?: string;
  imagePosition?: 'left' | 'right' | 'top' | 'bottom';
  createdAt: string;
  link?: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

const Stiri = () => {
  const { t, i18n } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<NewsArticle | null>(null);
  const [loginError, setLoginError] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const articles = await fetchArticles();
      setNewsArticles(articles);
    } catch (err) {
      setError('Failed to load articles. Please try again later.');
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setUsername('');
    setPassword('');
  };

  const handleAddArticle = () => {
    setCurrentArticle(null);
    setShowAddEdit(true);
  };

  const handleEditArticle = (article: NewsArticle) => {
    setCurrentArticle(article);
    setShowAddEdit(true);
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteArticle(id);
      await loadArticles(); // Reload the articles after deletion
    } catch (err) {
      console.error('Error deleting article:', err);
      // You might want to show an error message to the user here
    }
  };

  if (loading) {
    return (
      <Box className="stiri-container" display="flex" justifyContent="center" alignItems="center">
        <Typography>Loading articles...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="stiri-container" display="flex" justifyContent="center" alignItems="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box className="stiri-container">
      <Box className="stiri-header">
        <Typography variant="h2" className="stiri-title">
          {t('news')}
        </Typography>
        {!isAdmin && (
          <IconButton
            onClick={() => setShowLogin(true)}
            className="admin-login-button"
            size="large"
            sx={{
              bgcolor: '#000',
              color: '#fff',
              '&:hover': {
                bgcolor: '#333'
              }
            }}
          >
            <AdminPanelSettingsIcon />
          </IconButton>
        )}
        {isAdmin && (
          <Box className="admin-controls">
            <Button
              variant="contained"
              onClick={handleAddArticle}
              className="add-article-button"
            >
              Add Article
            </Button>
            <Button
              variant="outlined"
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>

      <Box className="sorting-panel">
        <Button
          onClick={() => setSortBy('date')}
          variant={sortBy === 'date' ? 'contained' : 'outlined'}
        >
          {t('sort_by_date')}
        </Button>
        <Button
          onClick={() => setSortBy('title')}
          variant={sortBy === 'title' ? 'contained' : 'outlined'}
        >
          {t('sort_by_title')}
        </Button>
        <Button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </Button>
      </Box>

      <Box className="news-list">
        {[...newsArticles]
          .sort((a, b) => {
            if (sortBy === 'date') {
              return sortOrder === 'asc'
                ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
              const titleA = a.title[i18n.language as 'ro' | 'en' | 'ru'].toLowerCase();
              const titleB = b.title[i18n.language as 'ro' | 'en' | 'ru'].toLowerCase();
              return sortOrder === 'asc'
                ? titleA.localeCompare(titleB)
                : titleB.localeCompare(titleA);
            }
          })
          .map((article) => (
          <Box key={article.id} className="news-article">
            <Box className={`article-content image-${article.imagePosition}`}>
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.title[i18n.language as 'ro' | 'en' | 'ru']} className="article-image" />
              )}
              <Box className="article-text">
                <Typography variant="h4" className="article-title">
                  {article.title[i18n.language as 'ro' | 'en' | 'ru']}
                </Typography>
                <Typography className="article-date">
                  {new Date(article.createdAt).toLocaleDateString()}
                </Typography>
                <Typography className="article-body">
                  {article.content[i18n.language as 'ro' | 'en' | 'ru']}
                </Typography>
                {article.link && (
                  <Button
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text"
                    className="article-link"
                  >
                    {t('read_more')}
                  </Button>
                )}
                {article.attachmentUrl && (
                  <Button
                    href={article.attachmentUrl}
                    download={article.attachmentName}
                    variant="outlined"
                    className="article-attachment"
                  >
                    {t('download_attachment')}
                  </Button>
                )}
                {isAdmin && (
                  <Box className="article-actions">
                    <Button onClick={() => handleEditArticle(article)}>Edit</Button>
                    <Button onClick={() => handleDeleteArticle(article.id)}>Delete</Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog open={showLogin} onClose={() => setShowLogin(false)}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {loginError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogin(false)}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>

      <ArticleDialog
        open={showAddEdit}
        article={currentArticle}
        onClose={() => setShowAddEdit(false)}
        onSave={async () => {
          try {
            await loadArticles(); // Reload articles after save
            setShowAddEdit(false);
          } catch (err) {
            console.error('Error saving article:', err);
            // You might want to show an error message to the user here
          }
        }}
      />
    </Box>
  );
};

export default Stiri;