import React from 'react';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';

// Define the type for the props the component will accept
interface MainHeadingProps {
  titleKey: string;
  t: (key: string) => string; // Represents a translation function like i18next
  sx?: SxProps<Theme>; // Optional sx prop to allow for style overrides
}

const MainHeading: React.FC<MainHeadingProps> = ({ titleKey, t, sx = {} }) => {
  return (
    <Typography
      variant="h1"
      component="h1"
      sx={{
        fontWeight: 800,
        fontSize: { xs: '2rem', sm: '3rem', md: '4.5rem' },
        mb: 3,
        textShadow: '0 4px 24px rgba(0,0,0,0.7)',
        ...sx, // Spread any additional sx props
      }}
    >
      {t(titleKey)}
    </Typography>
  );
};

export default MainHeading;