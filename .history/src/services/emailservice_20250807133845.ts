import emailjs from 'emailjs-com';

// EmailJS credentials
// These should be replaced with actual values from your EmailJS account
// You can find these in your EmailJS dashboard
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id';
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || 'user_id';

// Initialize EmailJS with User ID
emailjs.init(USER_ID);

interface EmailParams extends Record<string, unknown> {
  from_name: string;
  from_email: string;
  phone_number: string;
  message: string;
  to_email: string;
}

export const sendEmail = async (params: EmailParams): Promise<void> => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      params,
      USER_ID
    );
    console.log('Email sent successfully:', response);
    return Promise.resolve();
  } catch (error) {
    console.error('Error sending email:', error);
    return Promise.reject(error);
  }
};