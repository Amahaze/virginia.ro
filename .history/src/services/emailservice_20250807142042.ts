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
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
    userId: import.meta.env.VITE_EMAILJS_USER_ID as string,
  };

  // Validate configuration
  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Missing EmailJS configuration: ${key}`);
    }
  });

  return config;
};

export const sendEmail = async (params: EmailParams): Promise<void> => {
  try {
    const config = getEmailConfig();
    
    // Initialize EmailJS before sending
    emailjs.init(config.userId);
    
    console.log('Sending email with params:', {
      serviceId: config.serviceId,
      templateId: config.templateId,
      userId: config.userId,
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
    return Promise.reject(error);
  }
};