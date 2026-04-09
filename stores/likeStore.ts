import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LikeState {
  likes: Set<number>;
  addLike: (tmdb_id: number) => void;
  removeLike: (tmdb_id: number) => void;
  isLiked: (tmdb_id: number) => boolean;
}

export const useLikeStore = create<LikeState>()(
  persist(
    (set, get) => ({
      likes: new Set<number>(),
      addLike: (tmdb_id) =>
        set((state) => {
          const next = new Set(state.likes);
          next.add(tmdb_id);
          return { likes: next };
        }),
      removeLike: (tmdb_id) =>
        set((state) => {
          const next = new Set(state.likes);
          next.delete(tmdb_id);
          return { likes: next };
        }),
      isLiked: (tmdb_id) => get().likes.has(tmdb_id),
    }),
    {
      name: "like-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          parsed.state.likes = new Set(parsed.state.likes);
          return parsed;
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: {
              ...value.state,
              likes: Array.from(value.state.likes),
            },
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
