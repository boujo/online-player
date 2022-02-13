import React from 'react';

export type ItemType = {
  key: number;
  path: string;
  name: string;
  artist: string;
  title: string;
  cover: string;
};

export interface ContextInterface {
  list: Array<ItemType>;
  add: (list: ItemType) => void;
  remove: (list: ItemType) => void;
  empty: () => void;
}

export interface ProviderInterface {
  initialData?: Array<ItemType>;
  children: React.ReactElement;
}
