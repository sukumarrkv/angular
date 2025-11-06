import { Pipe, PipeDecorator, PipeTransform } from "@angular/core";

@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemparaturePipe implements PipeTransform{
  transform(value: string | number) {
    let val = value;
    if(typeof value === 'string') {
      val = parseFloat(value);
    } else{
      val = value;
    }

    const outputTemp = val * (9/5) + 32;
    return `${outputTemp} F`;
  }
}