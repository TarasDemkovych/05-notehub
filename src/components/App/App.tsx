import { useState } from 'react';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import NoteModal from '../NoteModal/NoteModal';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Pagination from '../Pagination/Pagination';

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 400);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNote = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['notes', debouncedQuery, page],
    queryFn: () => fetchNotes({ page: page, search: debouncedQuery }),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            value={query}
            onChange={(query: string) => {
              setQuery(query);
              setPage(1);
            }}
          />
          {isSuccess && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={(selectedPage: number) => setPage(selectedPage)}
            />
          )}
          {
            <button onClick={handleCreateNote} className={css.button}>
              Create note +
            </button>
          }
        </header>{' '}
        {isLoading && <Loader />}
        {isFetching && <Loader />}
        {isError && <ErrorMessage />}
        {isSuccess && data.notes.length === 0 && (
          <p className={css.empty}>No notes found.</p>
        )}
        {data?.notes && <NoteList notes={data.notes} />}
      </div>
      {isModalOpen && <NoteModal onClose={closeModal} />}
    </>
  );
}

export default App;
