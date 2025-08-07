import { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SuccessMessage from './SuccessMessage';
import { sendEmail } from '../../services/emailService';
import './Contact.css';

const Contact = () => {
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
      { threshold: 0.2 }
    );

    const animatedElements = document.querySelectorAll(
      '.contact-form-content, .contact-illustration, .contact-info-card, .contact-map-info, .contact-map-container'
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => {
      animatedElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  const { t } = useTranslation();
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
  const formRef = useRef<HTMLFormElement>(null);

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
    
    // Clear error when user types
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
      console.log('Form validation failed:', formErrors);
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
    
    console.log('Submitting form with data:', templateParams);
    
    sendEmail(templateParams)
      .then(() => {
        setFormSubmitted(true);
        // Reset form data after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      })
      .catch(error => {
        console.error('Error in handleSubmit:', error);
        // Show a more user-friendly error message
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
    <Box className="contact-container">
      <Box className="contact-form-section">
        <Box className="contact-form-content">
          <Typography variant="h1" className="contact-title">
            {t('contact.title')}
          </Typography>
          <Typography variant="body1" className="contact-subtitle">
            {t('contact.subtitle')}
          </Typography>
          {!formSubmitted ? (
            <Box component="form" ref={formRef} onSubmit={handleSubmit} className="contact-form">
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
        <Box className="contact-illustration" />
      </Box>
      <Box className="contact-info-section">
        <Box className="contact-info-header">
          <Typography variant="h2" className="contact-info-title">
            {t('contact.info.title')}
          </Typography>
          <Typography variant="body1" className="contact-info-subtitle">
            {t('contact.info.subtitle')}
          </Typography>
        </Box>

        <Box className="contact-info-cards">
          <Box className="contact-info-card">
            <svg className="contact-info-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
            </svg>
            <Box className="contact-info-content">
              <Typography variant="h6" className="contact-info-label">
                {t('contact.info.email')}
              </Typography>
              <Typography variant="body1" className="contact-info-value">
                office@verginia.ro
              </Typography>
            </Box>
          </Box>

          <Box className="contact-info-card">
            <svg className="contact-info-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
            </svg>
            <Box className="contact-info-content">
              <Typography variant="h6" className="contact-info-label">
                {t('contact.info.address')}
              </Typography>
              <Typography variant="body1" className="contact-info-value">
                Șoseaua Mihai Bravu, nr. 136, bl. D20, sc. 2, et. 3, ap. 39
                <br />
                Sector 2, București, România
                <br />
                Cod poștal: 021337
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="contact-info-cards" sx={{ marginTop: '2rem' }}>
          <Box className="contact-info-card" sx={{ width: '100%' }}>
            <Box className="contact-info-phones">
              <Box className="phone-title-section">
                <Typography variant="h6" className="contact-info-label" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg className="contact-info-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px', marginTop: '-2px' }}>
                    <path d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.3 14.9 16.2 14.9 16.1 14.9C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5ZM19 12H21C21 7 17 3 12 3V5C15.9 5 19 8.1 19 12ZM15 12H17C17 9.2 14.8 7 12 7V9C13.7 9 15 10.3 15 12Z" fill="currentColor"/>
                  </svg>
                  {t('contact.info.phone')}
                </Typography>
              </Box>
              <Box className="phone-number-section">
                <Typography variant="subtitle2" className="contact-info-country-label">
                  {t('contact.info.romania')}
                </Typography>
                <Typography variant="body1" className="contact-info-value">
                  +40 (215) 691 778
                </Typography>
                <Typography variant="body1" className="contact-info-value">
                  +40 (735) 721 286
                </Typography>
              </Box>
              <Box className="phone-number-section">
                <Typography variant="subtitle2" className="contact-info-country-label">
                  {t('contact.info.usa')}
                </Typography>
                <Typography variant="body1" className="contact-info-value">
                  +1 (703) 909 5487
                </Typography>
                <Typography variant="body1" className="contact-info-value">
                  +1 (703) 840 0616
                </Typography>
              </Box>
              <Box className="phone-number-section">
                <Typography variant="subtitle2" className="contact-info-country-label">
                  {t('contact.info.moldova')}
                </Typography>
                <Typography variant="body1" className="contact-info-value">
                  +373 (79) 422 107
                </Typography>
                <Typography variant="body1" className="contact-info-value">
                  +373 (22) 808022
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="contact-map-section">
        <Box className="contact-map-content">
          <Box className="contact-map-info">
            <Typography variant="h2" className="contact-map-title">
              {t('contact.map.title')}
            </Typography>
            <Typography variant="body1" className="contact-map-address" style={{ whiteSpace: 'pre-line' }}>
              {t('contact.map.address')}
            </Typography>
            <Button
              variant="contained"
              className="open-map-button"
              href="https://www.google.com/maps/search/?api=1&query=Șoseaua+Mihai+Bravu+136+București"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('contact.map.openMap')}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
              </svg>
            </Button>
          </Box>
          <Box className="contact-map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.8847167833584!2d26.1316905!3d44.4352675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f8c8e8b4c8f9%3A0x7b0c8b0c8b0c8b0c!2sSos.+Mihai+Bravu+136%2C+Bucure%C8%99ti!5e0!3m2!1sen!2sro!4v1625147200000!5m2!1sen!2sro"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;