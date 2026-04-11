"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Heart, Star } from "lucide-react";

type FriendRating = {
  rating_id: string;
  user_id: string;
  user_name: string;
  tmdb_id: number;
  rating: number;
  note: string;
  film_name: string;
  genre_ids: number[];
  like_count: number;
  has_liked: boolean;
  created_at: string;
};

interface FriendFeedClientProps {
  token: string;
}

const FriendFeedClient = ({ token }: FriendFeedClientProps) => {
  const [ratings, setRatings] = useState<FriendRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const pageRef = useRef(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(`/api/friend/feed?page=${pageRef.current}&pageSize=20`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!data.ratings || data.ratings.length === 0) {
        setHasMore(false);
      } else {
        setRatings((prev) => [...prev, ...data.ratings]);
        pageRef.current += 1;
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error("Failed to load friend feed:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    if (!hasMore) return;
    const check = () => {
      if (!sentinelRef.current || loadingRef.current) return;
      const rect = sentinelRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight + 400) {
        loadMore();
      }
    };
    const interval = setInterval(check, 300);
    return () => clearInterval(interval);
  }, [loadMore, hasMore]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="font-figtree max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Friend Activity</h1>
      <div className="flex flex-col gap-4">
        {ratings.map((r) => (
          <div key={r.rating_id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-300 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{r.user_name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(r.created_at)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < r.rating ? "#facc15" : "transparent"}
                    color={i < r.rating ? "#facc15" : "#a1a1aa"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium">{r.film_name}</p>
              {r.note && <p className="text-sm text-muted-foreground mt-1">{r.note}</p>}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-foreground transition cursor-pointer">
                <Heart
                  size={16}
                  fill={r.has_liked ? "#ef4444" : "transparent"}
                  color={r.has_liked ? "#ef4444" : "currentColor"}
                  strokeWidth={1.5}
                />
                {r.like_count}
              </button>
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-center text-muted-foreground py-4">Loading...</p>
        )}
        {!loading && ratings.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No friend activity yet. Invite some friends to get started!</p>
        )}
      </div>
      {hasMore && <div ref={sentinelRef} style={{ height: "40px" }} />}
    </div>
  );
};

export default FriendFeedClient;
