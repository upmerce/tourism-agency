// /src/components/admin/CreateArticleForm.tsx
'use client';

import React, { useState } from 'react';
import { 
  Box, TextField, Button, Typography, Select, MenuItem, InputLabel, 
  FormControl, CircularProgress, Alert, Tabs, Tab 
} from '@mui/material';
import { useAppRouter } from '@/hooks/router/useAppRouter';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';

// A simple function to generate a URL-friendly slug from a title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .replace(/[\s_-]+/g, '-') // collapse whitespace and replace by -
    .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
};

export default function CreateArticleForm() {
  const router = useAppRouter();
  
  // --- 1. STATE UPDATED to match the new multilingual structure ---
  const [formData, setFormData] = useState({
    slug: '',
    status: 'draft' as 'draft' | 'published',
    author: 'Upmerce Adventure', // Added author with a default value

    translations: {
      en: { title: '', description: '', content: '' },
      fr: { title: '', description: '', content: '' }
    }
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'en' | 'fr'>('en'); // To manage which language tab is active

  // --- EDIT 2: CONSOLIDATE CHANGE HANDLERS ---
  // This single handler is cleaner and manages all translatable fields.
  const handleTranslatableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // name = 'title', 'description', or 'content'
    
    // Update the correct field for the current language tab
    const newTranslations = {
      ...formData.translations,
      [currentTab]: { ...formData.translations[currentTab], [name]: value }
    };
    
    // Auto-generate slug only when editing the English title
    if (name === 'title' && currentTab === 'en') {
        setFormData(prev => ({ ...prev, translations: newTranslations, slug: generateSlug(value) }));
    } else {
        setFormData(prev => ({ ...prev, translations: newTranslations }));
    }
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = event.target.value;
    const newTranslations = {
      ...formData.translations,
      [currentTab]: { ...formData.translations[currentTab], content: newContent }
    };
    setFormData(prev => ({ ...prev, translations: newTranslations }));
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true, fileType: 'image/webp' };
    try {
      const compressedFile = await imageCompression(file, options);
      setImageFile(compressedFile);
    } catch {
      setError('Failed to compress image.');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imageFile || !formData.translations.en.title || !formData.slug|| !formData.author || !formData.translations.en.description) {
      setError("English Title, Description, Author, Slug, and a Cover Image are required.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const nameWithoutExtension = imageFile.name.split('.').slice(0, -1).join('.');
      const newFileName = `${Date.now()}_${nameWithoutExtension}.webp`;
      const storageRef = ref(storage, `articles/${newFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      const coverImage = await getDownloadURL((await uploadTask).ref);

      // We now send the entire formData object which has the correct structure
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, coverImage }),
      });

      if (!response.ok) {
        throw new Error('Failed to create article.');
      }

      router.push('/admin/blog');

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* --- 3. NON-TRANSLATABLE FIELDS --- */}
      <TextField
        required
        label="URL Slug"
        value={formData.slug}
        onChange={(e) => setFormData(prev => ({...prev, slug: e.target.value}))}
        fullWidth
        helperText="Auto-generated from English title. Can be edited."
      />
      {/* --- EDIT 3: ADD THE AUTHOR FIELD --- */}
      <TextField
        required
        label="Author"
        value={formData.author}
        onChange={(e) => setFormData(prev => ({...prev, author: e.target.value}))}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          value={formData.status}
          label="Status"
          onChange={(e) => setFormData(prev => ({...prev, status: e.target.value as 'draft' | 'published'}))}
        >
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="published">Published</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" component="label">
        Upload Cover Image
        <input type="file" hidden required accept="image/*" onChange={handleFileChange} />
      </Button>
      {imageFile && <Typography variant="body2">{imageFile.name}</Typography>}
      
      {/* --- 4. TRANSLATABLE FIELDS WITH TABS --- */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
            <Tab label="English Content" value="en" />
            <Tab label="French Content" value="fr" />
        </Tabs>
      </Box>
      <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          required={currentTab === 'en'} // English title is required
          name="title" // Add name attribute
          label="Article Title"
          value={formData.translations[currentTab].title}
          onChange={handleTranslatableChange}
          fullWidth
        />
               {/* --- EDIT 4: ADD THE DESCRIPTION FIELD --- */}
        <TextField
          required={currentTab === 'en'}
          name="description" // Add name attribute
          label="SEO Description"
          value={formData.translations[currentTab].description}
          onChange={handleTranslatableChange} // Use new handler
          fullWidth
          multiline
          rows={3}
          helperText="A short summary for search engines and article previews."
        />
        <TextField
          required={currentTab === 'en'} // English content is required
          label="Article Content"
          value={formData.translations[currentTab].content}
          onChange={handleContentChange}
          fullWidth
          multiline
          rows={15}
          helperText="You can use Markdown for formatting."
        />
      </Box>
      
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Create Article'}
        </Button>
      </Box>
    </Box>
  );
}
