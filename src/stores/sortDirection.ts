import {atom} from 'nanostores';

export const sortDirection = atom<string>('asc')

export function changeDirection(){
	if(sortDirection.get() == 'desc'){
		sortDirection.set('asc')
	}else{
		sortDirection.set('desc')
	}
}

