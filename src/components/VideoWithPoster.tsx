'use client';

import React, { useState, useRef, useEffect } from 'react';

interface VideoWithPosterProps {
  /** Path to the video file, e.g. "/1.mp4" */
  src: string;
  /** Path to the poster image, e.g. "/posters/1-poster.webp" */
  posterSrc: string;
  /** Additional className for the wrapper container */
  className?: string;
  /** Controls if the video should start loading/playing (defaults to true) */
  isAnimationComplete?: boolean;
}

export default function VideoWithPoster({
  src,
  posterSrc,
  className = '',
  isAnimationComplete = true,
}: VideoWithPosterProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [posterRemoved, setPosterRemoved] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isAnimationComplete && videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, [isAnimationComplete, videoReady]);

  const handleCanPlay = () => {
    setVideoReady(true);
    setTimeout(() => setPosterRemoved(true), 400);
  };

  return (
    <div className={`relative w-full h-full transform-gpu ${className}`}>
      {!posterRemoved && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ease-out"
          style={{ opacity: videoReady ? 0 : 1 }}
        />
      )}
      {isAnimationComplete && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          preload="metadata"
          disablePictureInPicture
          controlsList="nopictureinpicture"
          onCanPlayThrough={handleCanPlay}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ease-out"
          style={{ opacity: videoReady ? 1 : 0 }}
        />
      )}
    </div>
  );
}
