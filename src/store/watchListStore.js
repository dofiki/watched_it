import { create } from "zustand";

export const useWatchlistStore = create((set) => ({
  watched: [],

  addToWatchlist: (movie) =>
    set((state) => {
      const exists = state.watched.some(
        (m) => m.imdbID === movie.imdbID
      );
      if (exists) return state; // no changes

      return { watched: [...state.watched, movie] };
    }),
}));
