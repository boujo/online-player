import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Component from './';

jest.mock('idb', () => ({
  ...jest.requireActual('idb'),
  openDB: (name: string, version: number) => {
    return {
      get: (storeName: string, key: number) => {
        if (storeName === 'artists') {
          return { name: 'artist 1', tracks: [1, 2] };
        }

        const items: any = {
          1: { path: 'path 1', name: 'name 1', album: 'album 1', artist: 'artist 1', title: 'title 1', cover: '' },
          2: { path: 'path 2', name: 'name 2', album: 'album 1', artist: 'artist 1', title: 'title 2', cover: '' },
        };
        return items[key];
      },
      getAllKeys: (storeName: string) => {
        return [ 1, 2 ];
      },
    };
  },
}));

test('renders correct numbers of track rows', async () => {
  render(<Component />, { wrapper: BrowserRouter });
  const items = await screen.findAllByRole('listitem');
  expect(items).toHaveLength(2);
});
