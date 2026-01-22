import { useEffect, useRef } from "react";

export function useAutoPlayVideo(threshold = 0.6) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return videoRef;
}
