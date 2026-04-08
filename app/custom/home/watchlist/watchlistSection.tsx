"use client";

import React, { useEffect, useState } from "react";
import FeedCard from "../cards/feedCard";
import RatingDialog from "../rating/ratingDialog";
import { Badge } from "@/components/ui/badge";

type FeedItem = {
  tmdb_id: number;
  title: string;
  genre_ids: number[];
  release_year: number;
  photo_url: string;
};

interface WatchlistSectionProps {
  name: string;
  listId: string;
  token: string;
}

const WatchlistSection: React.FC<WatchlistSectionProps> = ({
  name,
  listId,
  token,
}) => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/list/${listId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || data.films || data.data || []);
      })
      .catch((err) => console.error("Failed to fetch watchlist:", err))
      .finally(() => setLoading(false));
  }, [listId, token]);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full h-[200px] bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700">
        <div className="absolute top-4 right-4 flex gap-2">
          <button>
            <Badge className="rounded-sm text-sm px-3 py-1">Share</Badge>
          </button>
          <button>
            <Badge className="rounded-sm text-sm px-3 py-1">Collaborate</Badge>
          </button>
        </div>
      </div>
      <div className="px-20 -mt-8">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p className="text-muted-foreground mt-2">
          {loading
            ? "Loading..."
            : `${items.length} ${items.length === 1 ? "title" : "titles"}`}
        </p>
      </div>
      <div
        className="flex flex-wrap gap-4 justify-center mx-auto mt-8"
        style={{ maxWidth: "fit-content" }}
      >
        {items.map((item) => (
          <div key={item.tmdb_id} className="animate-fade-in">
            <RatingDialog
              title={item.title}
              tmdb_id={item.tmdb_id}
              genre_ids={item.genre_ids}
              release_year={item.release_year}
              token={token}
            >
              <div>
                <FeedCard
                  tmdb_id={item.tmdb_id}
                  title={item.title}
                  genre_ids={item.genre_ids}
                  release_year={item.release_year}
                  photo_url={item.photo_url}
                />
              </div>
            </RatingDialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistSection;
