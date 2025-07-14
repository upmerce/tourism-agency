// /src/hooks/useExperienceForm.ts
'use client';

import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { Experience, GalleryImage } from '@/types/experience';



// This now only contains data that is part of the form fields
const initialFormData = {
    price: { amount: '', currency: 'MAD', prefix: 'from' },
    locationId: '',
    coverImage: '',
    // galleryImages is now managed in a separate state
    translations: {
      en: { title: '', description: '', included: '', notIncluded: '', importantInfo: '', itinerary: '' },
      fr: { title: '', description: '', included: '', notIncluded: '', importantInfo: '', itinerary: '' }
    }
};

export const useExperienceForm = (initialExperience: Experience | null) => {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState(initialFormData);
  // ✅ **NEW**: Separate state to explicitly hold and manage the initial gallery images
  const [initialGalleryImages, setInitialGalleryImages] = useState<GalleryImage[]>([]);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [newGalleryImageFiles, setNewGalleryImageFiles] = useState<File[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [currentTab, setCurrentTab] = useState<'en' | 'fr'>('en');

  // --- DATA HYDRATION EFFECT ---
  useEffect(() => {
    if (initialExperience) {
        // De-structure to separate galleryImages from the rest of the form data
        const { galleryImages, ...restOfExperience } = initialExperience;
        
        // Populate the main form data
        setFormData({
            ...initialFormData,
            ...restOfExperience,
            price: initialExperience.price ? { ...initialExperience.price, amount: String(initialExperience.price.amount) } : initialFormData.price,
            translations: {
                en: {
                  title: initialExperience.translations?.en?.title ?? '',
                  description: initialExperience.translations?.en?.description ?? '',
                  included: initialExperience.translations?.en?.included ?? '',
                  notIncluded: initialExperience.translations?.en?.notIncluded ?? '',
                  importantInfo: initialExperience.translations?.en?.importantInfo ?? '',
                  itinerary: initialExperience.translations?.en?.itinerary ?? ''
                },
                fr: {
                  title: initialExperience.translations?.fr?.title ?? '',
                  description: initialExperience.translations?.fr?.description ?? '',
                  included: initialExperience.translations?.fr?.included ?? '',
                  notIncluded: initialExperience.translations?.fr?.notIncluded ?? '',
                  importantInfo: initialExperience.translations?.fr?.importantInfo ?? '',
                  itinerary: initialExperience.translations?.fr?.itinerary ?? ''
                }
            }
        });

        // ✅ **NEW**: Populate the separate state for existing gallery images
        setInitialGalleryImages(galleryImages || []);
    } else {
        // Reset form for 'create' mode
        setFormData(initialFormData);
        setInitialGalleryImages([]);
    }
    // Reset file inputs whenever the initial data changes
    setCoverImageFile(null);
    setNewGalleryImageFiles([]);
  }, [initialExperience]);

  // --- HANDLERS ---
  const handleNestedChange = (path: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => {
      const newState = { ...prev };
      let current: Record<string, unknown> = newState;
      const parts = path.split('.');
      for (let index = 0; index < parts.length; index++) {
        const part = parts[index];
        if (index === parts.length - 1) {
          if (typeof current[part] === 'object' && current[part] !== null) {
            (current[part] as Record<string, unknown>)[name] = value;
          } else {
            (current as Record<string, unknown>)[part] = { [name]: value };
          }
        } else {
          if (typeof current[part] === 'object' && current[part] !== null) {
            current = current[part] as Record<string, unknown>;
          } else {
            // If the path does not exist, break out to avoid type errors
            return prev;
          }
        }
      }
      return newState;
    });
  };

  const handleCoverImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsCompressing(true);
    try {
      const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true, fileType: 'image/webp' });
      setCoverImageFile(compressedFile);
    } catch(e) {
      console.error("Cover image compression failed:", e);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleGalleryImagesChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setIsCompressing(true);
    try {
      const compressedFiles = await Promise.all(
        Array.from(files).map(file => imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true, fileType: 'image/webp' }))
      );
      setNewGalleryImageFiles(prev => [...prev, ...compressedFiles]);
    } catch (e) {
      console.error("Gallery image compression failed:", e);
    } finally {
      setIsCompressing(false);
    }
  };

  // ✅ **UPDATED**: This function now modifies the separate `initialGalleryImages` state
  const removeInitialGalleryImage = (pathToRemove: string) => {
    setInitialGalleryImages(prev => prev.filter(img => img.path !== pathToRemove));
  };

  const removeNewGalleryImage = (fileName: string) => {
    setNewGalleryImageFiles(prev => prev.filter(file => file.name !== fileName));
  };

  const resetForm = () => {
      setFormData(initialFormData);
      setInitialGalleryImages([]);
      setCoverImageFile(null);
      setNewGalleryImageFiles([]);
      setCurrentTab('en');
  };

  return {
    formData,
    initialGalleryImages, // ✅ **EXPOSED**: Make the initial images available to the component
    coverImageFile,
    newGalleryImageFiles,
    isCompressing,
    currentTab,
    setCurrentTab,
    handleNestedChange,
    handleCoverImageChange,
    handleGalleryImagesChange,
    removeInitialGalleryImage, // ✅ **EXPOSED**: Expose the updated removal function
    removeNewGalleryImage,
    resetForm,
    setFormData
  };
};
