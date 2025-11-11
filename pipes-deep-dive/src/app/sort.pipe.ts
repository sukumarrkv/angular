import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
  pure: false
})
//This pipe is not recommended as it is called whenever we change the value in the temperatire array.
//See usage of pipe property above. Instead it be better to sort the array before displaying.
export class SortPipe implements PipeTransform {

  transform(value: string[] | number [], direction: 'asc' | 'desc' = 'asc') {
    const sortedArray = [...value];

    sortedArray.sort((a,b) => {
      if(direction === 'asc') {
        return a > b? 1 : -1;
      } else {
        return a > b? -1 : 1;
      }
    });
    
    return sortedArray;
  }

}
