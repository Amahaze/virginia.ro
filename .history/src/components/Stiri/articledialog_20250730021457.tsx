import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { createArticle, updateArticle } from '../../services/fileArticleService';
import { type NewsArticle } from './Stiri';

interface ArticleDialogProps {
  open: boolean;
  article: NewsArticle | null;
  onClose: () => void;
  onSave: (article: NewsArticle) => void;
}

const ArticleDialog = ({ open, article, onClose, onSave }: ArticleDialogProps) => {
  const [title, setTitle] = useState<{ ro: string; en: string; ru: string; }>({ ro: '', en: '', ru: '' });
  const [content, setContent] = useState<{ ro: string; en: string; ru: string; }>({ ro: '', en: '', ru: '' });
  const [imageUrl, setImageUrl] = useState('');
  const [imagePosition, setImagePosition] = useState<'left' | 'right' | 'top' | 'bottom'>('left');
  const [previewImage, setPreviewImage] = useState('');
  const [link, setLink] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setImageUrl(article.imageUrl || '');
      setImagePosition(article.imagePosition || 'left');
      setPreviewImage(article.imageUrl || '');
      setLink(article.link || '');
      setAttachmentUrl(article.attachmentUrl || '');
      setAttachmentName(article.attachmentName || '');
    } else {
      setTitle({ ro: '', en: '', ru: '' });
      setContent({ ro: '', en: '', ru: '' });
      setImageUrl('');
      setImagePosition('left');
      setPreviewImage('');
      setLink('');
      setAttachmentUrl('');
      setAttachmentName('');
    }
    setError(null);
  }, [article]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageUrl(base64String);
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAttachmentUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const formData = new FormData();
      
      // Add multilingual title and content
      formData.append('title', JSON.stringify(title));
      formData.append('content', JSON.stringify(content));
      
      if (imageUrl) {
        if (imageUrl.startsWith('data:')) {
          // Convert base64 to file
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          formData.append('image', blob, 'image.png');
        } else {
          formData.append('imageUrl', imageUrl);
        }
      }
      
      if (imagePosition) {
        formData.append('imagePosition', imagePosition);
      }
      
      if (link) {
        formData.append('link', link);
      }
      
      if (attachmentUrl) {
        if (attachmentUrl.startsWith('data:')) {
          // Convert base64 to file
          const response = await fetch(attachmentUrl);
          const blob = await response.blob();
          formData.append('attachment', blob, attachmentName);
        } else {
          formData.append('attachmentUrl', attachmentUrl);
          formData.append('attachmentName', attachmentName);
        }
      }

      let savedArticle;
      if (article) {
        formData.append('id', article.id);
        formData.append('createdAt', article.createdAt);
        savedArticle = await updateArticle(formData);
      } else {
        savedArticle = await createArticle(formData);
      }

      onSave(savedArticle);
      onClose();
    } catch (err) {
      setError('Failed to save article. Please try again.');
      console.error('Error saving article:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{article ? 'Edit Article' : 'Add New Article'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {['ro', 'en', 'ru'].map((lang) => (
            <Box key={lang} sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {lang.toUpperCase()}
              </Typography>
              <TextField
                label={`Title (${lang.toUpperCase()})`}
                value={title[lang as 'ro' | 'en' | 'ru']}
                onChange={(e) => setTitle({ ...title, [lang as 'ro' | 'en' | 'ru']: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
                disabled={saving}
              />
              <TextField
                label={`Content (${lang.toUpperCase()})`}
                value={content[lang as 'ro' | 'en' | 'ru']}
                onChange={(e) => setContent({ ...content, [lang as 'ro' | 'en' | 'ru']: e.target.value })}
                multiline
                rows={4}
                fullWidth
                disabled={saving}
              />
            </Box>
          ))}

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="contained"
              component="label"
              sx={{ height: 'fit-content' }}
              disabled={saving}
              className="article-upload-button"
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {previewImage && (
              <Box
                component="img"
                src={previewImage}
                alt="Preview"
                sx={{ width: 100, height: 100, objectFit: 'cover' }}
              />
            )}
          </Box>

          <TextField
            label="Link (optional)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            disabled={saving}
          />

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              disabled={saving}
              className="article-upload-button"
            >
              Upload Attachment
              <input
                type="file"
                hidden
                onChange={handleAttachmentChange}
              />
            </Button>
            {attachmentName && (
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachFileIcon fontSize="small" />
                {attachmentName}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving || !title.ro || !content.ro}
          startIcon={saving ? <CircularProgress size={20} /> : null}
        >
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleDialog;