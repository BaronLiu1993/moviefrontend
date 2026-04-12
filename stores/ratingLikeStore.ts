import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RatingLikeState {
  likes: Record<string, boolean>;
  counts: Record<string, number>;
  setLiked: (ratingId: string, liked: boolean, count: number) => void;
  toggleLike: (ratingId: string) => void;
  isLiked: (ratingId: string) => boolean;
  getCount: (ratingId: string) => number;
}

export const useRatingLikeStore = create<RatingLikeState>()(
  persist(
    (set, get) => ({
      likes: {},
      counts: {},
      setLiked: (ratingId, liked, count) =>
        set((state) => ({
          likes: { ...state.likes, [ratingId]: liked },
          counts: { ...state.counts, [ratingId]: count },
        })),
      toggleLike: (ratingId) =>
        set((state) => {
          const wasLiked = state.likes[ratingId] ?? false;
          const prevCount = state.counts[ratingId] ?? 0;
          return {
            likes: { ...state.likes, [ratingId]: !wasLiked },
            counts: { ...state.counts, [ratingId]: prevCount + (wasLiked ? -1 : 1) },
          };
        }),
      isLiked: (ratingId) => get().likes[ratingId] ?? false,
      getCount: (ratingId) => get().counts[ratingId] ?? 0,
    }),
    {
      name: "rating-like-storage",
    }
  )
);
