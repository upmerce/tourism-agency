// src/hooks/useExperiences.ts
'use client';

import { useQuery } from '@tanstack/react-query';

// This is the function that will fetch the data
const fetchExperiences = async () => {
  const response = await fetch('/api/experiences');
  if (!response.ok) {
    throw new Error('Failed to fetch experiences');
  }
  const data = await response.json();
  return data.experiences;
};

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'], // The key for caching this data
    queryFn: fetchExperiences,
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
   // cacheTime: 10 * 60 * 1000, // Data is kept in cache for 10 minutes
  });
};