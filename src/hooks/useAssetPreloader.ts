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
 * All blog page image assets preloaded silently in background when user is on landing page.
 */
const BLOG_IMAGES = [
  '/blogs/table.png',
  '/blogs/board.png',
  '/blogs/board2.png',
  '/blogs/sticky.png',
  '/blogs/plant.png',
  '/blogs/mug.png',
  '/blogs/bookstack.png',
  '/blogs/plant2.png',
  '/blogs/button.png',
  '/blogs/books.png',
  '/blogs/1.png',
  '/cosc logo.png',
  '/blogs/buildathon.png',
  '/blogs/ceatherion.jpeg',
  '/blogs/bug-bounty.png',
  '/blogs/DSA-series.png',
];

function preloadBlogAssets() {
  BLOG_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

/**
 * Preloads all critical images into the browser cache during the loading screen.
 * Returns `imagesReady` when all images are loaded (or failed — we don't block on errors).
 * Also triggers background preloading for blog assets once landing page is ready.
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

      // Preload blog assets in background while user is on landing page
      if (typeof window !== 'undefined') {
        if ('requestIdleCallback' in window) {
          (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
            preloadBlogAssets();
          });
        } else {
          setTimeout(preloadBlogAssets, 300);
        }
      }
    });
  }, []);

  return { imagesReady };
}

