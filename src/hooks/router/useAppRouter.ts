// /src/hooks/router/useAppRouter.ts
'use client';

// Change this import
import { useRouter } from '@/i18n/navigation'; // <-- THE ONLY CHANGE IS HERE

export function useAppRouter() {
  const router = useRouter();

  return {
    push: router.push,
    replace: router.replace,
    back: router.back,
    refresh: router.refresh,
  };
}