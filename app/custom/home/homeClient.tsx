
"use client";

import React, { useState } from "react";
import SearchBar from "./search/searchBar";
import FeedSection from "./feed/feedSection";
import WatchlistSection from "./watchlist/watchlistSection";
import { Badge } from "@/components/ui/badge";
import { List, Plus } from "lucide-react";

type FeedItem = {
  tmdb_id: number;
  title: string;
  genre_ids: number[];
  release_year: number;
  photo_url: string;
};

type Feed = {
  films: FeedItem[];
  hasMore: boolean;
  page: number;
  pageSize: number;
}

type ListItem = {
  list_id: string;
  user_id: string;
  name: string;
  is_default: boolean;
  created_at: string;
};

type User = {
  user_id: string;
  email: string;
  name: string;
  genres: string[];
  movies: string[];
  moods: string[];
  disliked_genres: string[];
  completed_registration: boolean;
  rating_count: number;
};

interface HomeClientProps {
  feed: Feed;
  list: ListItem[];
  token: string;
  user: User;
}

const HomeClient: React.FC<HomeClientProps> = ({ feed, list, token, user }) => {
  const [activeTab, setActiveTab] = useState<string>("feed");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) setActiveTab("feed");
  };

  return (
    <div className="font-figtree">
      <div className="sticky top-0 z-10 bg-background">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex gap-3 px-20 pb-4">
        <Badge className="rounded-md px-4 py-2 text-sm cursor-pointer">
          <Plus className="w-4 h-4" />
          Add Friends
        </Badge>
        <Badge className="rounded-md px-4 py-2 text-sm cursor-pointer">
          <List className="w-4 h-4" />
          Create New List
        </Badge>
      </div>
      
      <div className="flex gap-4 w-full px-20 py-4">
        <button
          onClick={() => setActiveTab("feed")}
          className={`text-lg font-medium ${activeTab === "feed" ? "underline decoration-2 underline-offset-8" : "text-muted-foreground"}`}
        >
          Feed
        </button>
        {list.map((l) => (
          <button
            key={l.list_id}
            onClick={() => setActiveTab(l.list_id)}
            className={`text-lg font-medium ${activeTab === l.list_id ? "underline decoration-2 underline-offset-8" : "text-muted-foreground"}`}
          >
            {l.name}
          </button>
        ))}
      </div>
      {activeTab === "feed" ? (
        <FeedSection initialFeed={feed} token={token} lists={list} searchQuery={searchQuery} />
      ) : (
        <WatchlistSection
          name={list.find((l) => l.list_id === activeTab)?.name ?? ""}
          listId={activeTab}
          token={token}
          lists={list}
        />
      )}
    </div>
  );
};

export default HomeClient;
