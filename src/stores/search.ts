import {atom} from 'nanostores';

export const searchQuery = atom<String>('')

export function setSearch(str:String){
	searchQuery.set(str)
}

