import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


export const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: 3,
    },
    '& .MuiInputBase-input': {
      borderRadius: 10,
      position: 'relative',
      backgroundColor: "white",
      fontSize: 16,
      padding: '10px 15px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 10,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
      
  }}));



