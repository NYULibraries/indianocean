import {atom} from 'nanostores';

export type SortType = 'title' | 'author' | 'subject' | 'place'

export const $sort = atom<SortType>('title')
