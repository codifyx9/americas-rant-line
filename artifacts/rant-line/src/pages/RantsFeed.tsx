import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import RantCard from "@/components/RantCard";

const CATEGORIES = [
  { value: "", label: "ALL LINES" },
  { value: "maga", label: "🟥 MAGA" },
  { value: "blue", label: "🟦 BLUE" },
  { value: "neutral", label: "⬜ NEUTRAL" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "trending", label: "Trending" },
];

export default function RantsFeed() {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const params: Record<string, string> = { page: String(page), limit: "10" };
  if (category) params.category = category;
  if (sort) params.sort = sort;
  if (search) params.search = search;

  const { data, isLoading } = useQuery({
    queryKey: ["rants", params],
    queryFn: () => api.rants.latest(params),
  });

  const rants = data?.rants || [];
  const pagination = data?.pagination;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  return (
    <div className="bg-[#0a0e1a] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-black text-3xl text-white mb-2">THE RANTS</h1>
          <p className="text-gray-500 text-sm">Listen to what America is really thinking</p>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search rants..."
                className="w-full bg-[#111827] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#cc0000]/50"
              />
            </div>
            <button type="submit" className="bg-[#cc0000] text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#aa0000] transition-colors">
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex gap-1 bg-[#111827] rounded-lg p-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => { setCategory(cat.value); setPage(1); }}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  category === cat.value
                    ? "bg-white/10 text-white"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="bg-[#111827] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-5 animate-pulse h-28" />
            ))
          ) : rants.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No rants found</p>
              <p className="text-gray-600 text-sm mt-1">Try a different filter or be the first to call in!</p>
            </div>
          ) : (
            rants.map((rant) => <RantCard key={rant.id} rant={rant} />)
          )}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
              disabled={page >= pagination.totalPages}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
