// -------------------------------------------------------------------------
// 1. NEW FILE: /src/hooks/useReviews.ts
// This custom hook fetches and caches the reviews for a specific experience.
// -------------------------------------------------------------------------
'use client';

import { useQuery } from '@tanstack/react-query';

// The function that will fetch the data from our API
const fetchReviews = async (experienceId: string) => {
  // We return null if there is no ID to prevent an unnecessary fetch
  if (!experienceId) return null;

  const response = await fetch(`/api/reviews/${experienceId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }
  const data = await response.json();
  return data.reviews;
};

// The custom hook
export const useReviews = (experienceId: string) => {
  return useQuery({
    // The query key is an array that uniquely identifies this data.
    // Including the experienceId ensures reviews for different tours are cached separately.
    queryKey: ['reviews', experienceId],
    queryFn: () => fetchReviews(experienceId),
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
  });
};
