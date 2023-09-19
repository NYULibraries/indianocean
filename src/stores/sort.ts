import {atom} from 'nanostores';

export type SortType = 'ss_longlabel' | 'ss_sauthor' | 'ss_ssubject' | 'ss_publocation'

export const sort = atom<SortType>('ss_longlabel')

export function changeSortStore(type:any){
	sort.set(type)
}
