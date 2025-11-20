import { create } from "zustand";

export const useWatchListStore = create((set) => ({
  watchlist: [],

  addToWatchlist: (movie) =>
  set((state) => {
      const exists = state.watchlist.some(
        (m) => m.imdbID === movie.imdbID
      );
      if (exists) return state; 

      return { watchlist: [...state.watchlist, movie] };
    }),

    removeFromWatchlist: (id) =>
      set((state) =>({
        watchlist: state.watchlist.filter((m) => m.imdbID !== id)
      }))
}));
