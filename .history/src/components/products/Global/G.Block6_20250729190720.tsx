import { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SuccessMessage from '../../Contact/SuccessMessage';
import { sendEmail } from '../../../services/emailService';
import './G.Block6.css';

const Block6 = () => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const [phonePrefix, setPhonePrefix] = useState('RO');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });
  const formFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (formRef.current) observer.observe(formRef.current);
    if (illustrationRef.current) observer.observe(illustrationRef.current);

    return () => observer.disconnect();
  }, []);

  const countryPrefixes = [
    { code: 'RO', label: 'Romania', phone: '+40' },
    { code: 'MD', label: 'Moldova', phone: '+373' },
    { code: 'UK', label: 'United Kingdom', phone: '+44' },
    { code: 'US', label: 'United States', phone: '+1' },
    { code: 'DE', label: 'Germany', phone: '+49' },
    { code: 'FR', label: 'France', phone: '+33' },
    { code: 'IT', label: 'Italy', phone: '+39' },
    { code: 'ES', label: 'Spain', phone: '+34' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: false
      });
    }
  };

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      phone: formData.phone.trim() === '',
      message: formData.message.trim() === ''
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const selectedCountry = countryPrefixes.find(country => country.code === phonePrefix);
    const fullPhoneNumber = `${selectedCountry?.phone} ${formData.phone}`;
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone_number: fullPhoneNumber,
      message: formData.message,
      to_email: 'trabotest12@gmail.com'
    };
    
    sendEmail(templateParams)
      .then(() => {
        setFormSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      })
      .catch(error => {
        console.error('Error sending email:', error);
        if (error.status === 0) {
          alert('Failed to send message. Please check your internet connection and try again.');
        } else if (error.status === 400) {
          alert('Failed to send message. Please check if all fields are filled correctly.');
        } else if (error.status === 403) {
          alert('Failed to send message. EmailJS service credentials are invalid or missing.');
        } else {
          alert('Failed to send message. Please try again later.');
        }
      });
  };

  return (
    <Box className="block6-container">
      <Box className="block6-form-section">
        <Box className="block6-form-content" ref={formRef}>
          <Typography variant="h1" className="block6-title">
            {t('contact.title')}
          </Typography>
          <Typography variant="body1" className="block6-subtitle">
            {t('contact.subtitle')}
          </Typography>
          {!formSubmitted ? (
            <Box component="form" ref={formFormRef} onSubmit={handleSubmit} className="block6-form">
              <TextField
                fullWidth
                placeholder={t('contact.name')}
                variant="outlined"
                className="form-field"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={formErrors.name}
                helperText={formErrors.name ? 'Name is required' : ''}
              />
              <TextField
                fullWidth
                placeholder={t('contact.email')}
                type="email"
                variant="outlined"
                className="form-field"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors.email}
                helperText={formErrors.email ? 'Valid email is required' : ''}
              />
              <Box className="phone-field-container">
                <TextField
                  select
                  value={phonePrefix}
                  onChange={(e) => setPhonePrefix(e.target.value)}
                  className="phone-prefix"
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRight: 0 } }}
                >
                  {countryPrefixes.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.code} ({country.phone})
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  placeholder={t('contact.phone')}
                  type="tel"
                  variant="outlined"
                  className="phone-input"
                  sx={{ '& .MuiOutlinedInput-notchedOutline': { borderLeft: 0 } }}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={formErrors.phone}
                  helperText={formErrors.phone ? 'Phone number is required' : ''}
                />
              </Box>
              <TextField
                fullWidth
                placeholder={t('contact.message')}
                multiline
                rows={4}
                variant="outlined"
                className="form-field message-field"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                error={formErrors.message}
                helperText={formErrors.message ? 'Message is required' : ''}
              />
              <Button
                type="submit"
                variant="contained"
                className="submit-button"
              >
                {t('contact.submit')}
              </Button>
            </Box>
          ) : (
            <SuccessMessage />
          )}
        </Box>
        <Box className="block6-illustration" ref={illustrationRef}></Box>
      </Box>
    </Box>
  );
};

export default Block6;