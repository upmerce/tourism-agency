// /src/components/ui/ExperienceCard.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation'; // <-- Use the i18n Link
import { locations } from '@/config/locations';

// Update the props to match our new data structure
interface ExperienceCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  price: {
    amount: number;
    currency: string;
    prefix: string;
  };
  locationId: string;
}

export default function ExperienceCard({ id, title, description, coverImage, price, locationId }: ExperienceCardProps) {
  const t = useTranslations('ExperienceCard');
  const t_price = useTranslations('Price');

  // Find the full location object based on the ID
  const location = locations.find(loc => loc.id === locationId);

  // Format the price string for display
  const formattedPrice = price?.amount 
    ? `${t_price(price.prefix)} ${price.amount} ${price.currency}`
    : t_price('contactUs');

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={coverImage}
        alt={title}
        sx={{ height: 192, objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Display the location name if it exists */}
        {location && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {location.name}
          </Typography>
        )}
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
        }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" color="primary">
          {formattedPrice}
        </Typography>
        <Button size="small" variant="contained" component={Link} href={`/experiences/${id}`}>
          {t('learnMoreButton')}
        </Button>
      </CardActions>
    </Card>
  );
}