import { create } from "zustand";

export const useStore = create((set) => ({
  watchlist: [],
  watchedlist: [],

  addToWatchlist: (movie) => set((state) => {
      const exists = state.watchlist.some(
        (m) => m.imdbID === movie.imdbID
      );
      if (exists) return state; 

      return { watchlist: [...state.watchlist, movie] };
    }),

  removeFromWatchlist: (id) => set((state) =>({
        watchlist: state.watchlist.filter((m) => m.imdbID !== id)}
      )),
    
      // through this watched list is changed...
  setMovieRating: (movie, rating) =>set((state) => {
      // remove if rating 0
      if (rating === 0) {
        return {
          watchedlist: state.watchedlist.filter((m) => m.imdbID !== movie.imdbID),
        };
      }
      // add or update movie with rating
      const exists = state.watchedlist.some((m) => m.imdbID === movie.imdbID);
      if (exists) {
        return {
          watchedlist: state.watchedlist.map((m) =>
            m.imdbID === movie.imdbID ? { ...m, rating } : m
          ),
        };
      } else {
        return { watchedlist: [...state.watchedlist, { ...movie, rating }] };
      }
    }),
}));