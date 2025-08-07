import emailjs from 'emailjs-com';

// Email configuration interface
interface EmailConfig {
  serviceId: string;
  templateId: string;
  userId: string;
}

// Email parameters interface
interface EmailParams extends Record<string, unknown> {
  from_name: string;
  from_email: string;
  phone_number: string;
  message: string;
  to_email: string;
}

// Load environment variables with type checking
const getEmailConfig = (): EmailConfig => {
  const config: EmailConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    userId: import.meta.env.VITE_EMAILJS_USER_ID,
  };

  // Validate configuration
  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Missing EmailJS configuration: ${key}`);
    }
  });

  return config;
};

// Initialize EmailJS with configuration
const initializeEmailJS = (userId: string): void => {
  try {
    emailjs.init(userId);
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
    throw new Error('Failed to initialize EmailJS service');
  }
};

export const sendEmail = async (params: EmailParams): Promise<void> => {
  try {
    const config = getEmailConfig();
    
    // Initialize EmailJS
    initializeEmailJS(config.userId);
    
    console.log('Sending email with params:', {
      serviceId: config.serviceId,
      templateId: config.templateId,
      params
    });

    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      params
    );
    
    console.log('Email sent successfully:', response);
    return Promise.resolve();
  } catch (error) {
    console.error('Error sending email:', error);
    // Add specific error handling
    if (error instanceof Error) {
      if (error.message.includes('Invalid public key')) {
        throw new Error('Invalid EmailJS user ID');
      } else if (error.message.includes('Invalid template ID')) {
        throw new Error('Invalid EmailJS template ID');
      } else if (error.message.includes('Invalid service ID')) {
        throw new Error('Invalid EmailJS service ID');
      }
    }
    throw error;
  }
};