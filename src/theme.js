import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: '3.5rem',
                    fontWeight: 700,
                    '@media (max-width: 960px)': {
                        fontSize: '2.5rem',
                    },
                    '@media (max-width: 600px)': {
                        fontSize: '2rem',
                    },
                },
                h2: {
                    fontSize: '2.5rem',
                    fontWeight: 600,
                    '@media (max-width: 960px)': {
                        fontSize: '2rem',
                    },
                    '@media (max-width: 600px)': {
                        fontSize: '1.75rem',
                    },
                },
                h3: {
                    fontSize: '2rem',
                    fontWeight: 600,
                    '@media (max-width: 960px)': {
                        fontSize: '1.75rem',
                    },
                    '@media (max-width: 600px)': {
                        fontSize: '1.5rem',
                    },
                },
                body1: {
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    '@media (max-width: 600px)': {
                        fontSize: '1rem',
                    },
                },
                subtitle1: {
                    fontSize: '1.25rem',
                    lineHeight: 1.6,
                    '@media (max-width: 600px)': {
                        fontSize: '1.1rem',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '50px',
                    padding: '0.75rem 2rem',
                    fontSize: '1.1rem',
                    '@media (max-width: 600px)': {
                        fontSize: '1rem',
                        padding: '0.6rem 1.5rem',
                    },
                },
                contained: {
                    backgroundColor: '#fff',
                    color: '#000',
                    '&:hover': {
                        backgroundColor: '#000',
                        color: '#fff',
                    },
                },
                outlined: {
                    borderColor: '#fff',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#fff',
                    },
                },
            },
        },
    },
});
export default theme;
