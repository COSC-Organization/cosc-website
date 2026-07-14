'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * List of all critical images to preload during the loading screen.
 * Includes poster frames for every video + the building overlay.
 */
const CRITICAL_IMAGES = [
  '/posters/1-poster.webp',
  '/posters/2-poster.webp',
  '/posters/3-poster.webp',
  '/posters/4-poster.webp',
  '/posters/5-poster.webp',
  '/posters/6-poster.webp',
  '/posters/7-poster.webp',
  '/posters/8-poster.webp',
  '/posters/9-poster.webp',
  '/building3.webp',
];

/**
 * Preloads all critical images into the browser cache during the loading screen.
 * Returns `imagesReady` when all images are loaded (or failed — we don't block on errors).
 */
export function useAssetPreloader() {
  const [imagesReady, setImagesReady] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    // Prevent double-execution in React StrictMode
    if (startedRef.current) return;
    startedRef.current = true;

    const promises = CRITICAL_IMAGES.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn(`[Preloader] Failed to preload: ${src}`);
          resolve(); // Don't block on individual failures
        };
        img.src = src;
      });
    });

    Promise.all(promises).then(() => {
      setImagesReady(true);
    });
  }, []);

  return { imagesReady };
}
