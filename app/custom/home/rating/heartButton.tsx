"use client";

import { useRef } from "react";
import { Heart } from "lucide-react";
import { useLikeStore } from "@/stores/likeStore";

interface HeartButtonProps {
  tmdb_id: number;
  genre_ids: number[];
  film_name: string;
  token: string;
}

const HeartButton = ({ tmdb_id, genre_ids, film_name, token }: HeartButtonProps) => {
  const { addLike, removeLike, isLiked } = useLikeStore();
  const liked = isLiked(tmdb_id);
  const pendingRef = useRef<AbortController | null>(null);

  const handleToggleLike = async () => {
    if (pendingRef.current) {
      pendingRef.current.abort();
    }

    const nextLiked = !liked;
    if (nextLiked) addLike(tmdb_id); else removeLike(tmdb_id);

    const controller = new AbortController();
    pendingRef.current = controller;

    try {
      const res = await fetch("/api/rate/like", {
        method: nextLiked ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          nextLiked
            ? { tmdbId: tmdb_id, film_name, genre_ids }
            : { tmdbId: tmdb_id }
        ),
        signal: controller.signal,
      });

      if (!res.ok) {
        if (nextLiked) removeLike(tmdb_id); else addLike(tmdb_id);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        if (nextLiked) removeLike(tmdb_id); else addLike(tmdb_id);
      }
    } finally {
      if (pendingRef.current === controller) {
        pendingRef.current = null;
      }
    }
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleToggleLike();
      }}
      className="cursor-pointer"
    >
      <Heart
        size={25}
        className="transition-all duration-200"
        fill={liked ? "#ef4444" : "transparent"}
        color={liked ? "#ef4444" : "currentColor"}
        strokeWidth={1}
      />
    </button>
  );
};

export default HeartButton;
