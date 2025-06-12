import { useEffect, useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import NoteModal from "../NoteModal/NoteModal";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const { movies, isLoading, isError, searchMovies } = useMovies();
  const { selectedMovie, selectMovie, closeModal } = useSelectedMovie();

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={searchMovies} />

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={selectMovie} />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
