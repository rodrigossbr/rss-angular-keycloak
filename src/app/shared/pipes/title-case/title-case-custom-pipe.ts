import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleUpperCase'
})
export class TitleCaseCustomPipe implements PipeTransform {

  transform(value: string | undefined | null): string {
    if (!value) return '';
    const exceptions = ['de', 'do', 'da', 'dos', 'das', 'e'];

    return value
      .toLowerCase()
      .split(' ')
      .map((word, index) => {
        if (index === 0 || !exceptions.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(' ');
  }
}
