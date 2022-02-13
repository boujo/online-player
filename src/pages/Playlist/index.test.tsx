import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PlaylistProvider } from '../../providers/Playlist';
import Component from './';

test('renders 0 track row', async () => {
  render(
    <BrowserRouter>
      <PlaylistProvider>
        <Component />
      </PlaylistProvider>
    </BrowserRouter>
  );
  const items = screen.queryAllByRole('listitem');
  expect(items).toHaveLength(0);
});

test('renders correct numbers of track rows', async () => {
  const initialData = [
    {
      key: 1,
      path: 'path 1',
      name: 'name 1',
      artist: 'artist 1',
      title: 'title 1',
      cover: 'cover 1',
    },
    {
      key: 2,
      path: 'path 2',
      name: 'name 2',
      artist: 'artist 2',
      title: 'title 2',
      cover: 'cover 2',
    },
    {
      key: 3,
      path: 'path 3',
      name: 'name 3',
      artist: 'artist 3',
      title: 'title 3',
      cover: 'cover 3',
    },
  ];
  render(
    <BrowserRouter>
      <PlaylistProvider initialData={initialData}>
        <Component />
      </PlaylistProvider>
    </BrowserRouter>
  );
  const items = await screen.findAllByRole('listitem');
  expect(items).toHaveLength(3);
});
