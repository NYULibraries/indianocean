import { atom } from 'nanostores';

export const pageNum = atom<number>(1)

export function increasePageNum(){
  pageNum.set( pageNum.get() + 1)
}

export function startPageNum(){
  pageNum.set(1)
}

export function selectPageNum(numValue:number){
  pageNum.set(numValue)
}
