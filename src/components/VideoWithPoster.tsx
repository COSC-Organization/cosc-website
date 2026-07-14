'use client';

import React, { useState, useRef, useCallback } from 'react';

interface VideoWithPosterProps {
  /** Path to the video file, e.g. "/1.mp4" */
  src: string;
  /** Path to the poster image, e.g. "/posters/1-poster.webp" */
  posterSrc: string;
  /** Additional className for the wrapper container */
  className?: string;
}

/**
 * Renders a poster image that is immediately visible (already cached by useAssetPreloader),
 * with a <video> layered on top at opacity 0. Once the video has buffered enough to play
 * smoothly (canplaythrough), it fades in over 300ms and the poster is removed from the DOM.
 */
export default function VideoWithPoster({
  src,
  posterSrc,
  className = '',
}: VideoWithPosterProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [posterRemoved, setPosterRemoved] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasTriggered = useRef(false);

  const handleCanPlayThrough = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    // Start playing the video
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked; still show the video
      });
    }

    // Trigger the crossfade
    setVideoReady(true);

    // Remove poster from DOM after the transition completes (400ms buffer)
    setTimeout(() => {
      setPosterRemoved(true);
    }, 400);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Poster image — shown instantly from cache */}
      {!posterRemoved && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{
            opacity: videoReady ? 0 : 1,
            transition: 'opacity 300ms ease-out',
          }}
        />
      )}

      {/* Video — layered on top, fades in once buffered */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nopictureinpicture"
        onCanPlayThrough={handleCanPlayThrough}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 300ms ease-out',
        }}
      />
    </div>
  );
}
