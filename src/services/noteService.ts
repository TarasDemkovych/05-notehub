import axios from 'axios';
import type { Note, SortBy, Tag } from '../types/note';

const myKeyNotehub = import.meta.env.VITE_NOTEHUB_TOKEN;
if (!myKeyNotehub) throw new Error('VITE_NOTEHUB_TOKEN is not defined');

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/notes';
axios.defaults.headers.common['Authorization'] = `Bearer ${myKeyNotehub}`;
axios.defaults.headers.common['Accept'] = 'application/json';

interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: Tag;
  sortBy?: SortBy;
  perPage?: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: Tag;
}

export async function fetchNotes({
  search,
  page = 1,
  tag,
  sortBy = 'created',
}: FetchNotesParams) {
  const params: FetchNotesParams = {
    page,
    perPage: 12,
    sortBy,
    ...(search && { search }),
    ...(tag && { tag }),
  };

  const response = await axios.get<FetchNotesHTTPResponse>('', { params });
  return response.data;
}

export async function createNote({
  title,
  content = '',
  tag = 'Todo',
}: CreateNoteParams) {
  const response = await axios.post<Note>('', {
    title,
    content,
    tag,
  });
  return response.data;
}

export async function deleteNote(noteId: number) {
  const response = await axios.delete<Note>(`/${noteId}`);
  return response.data;
}
