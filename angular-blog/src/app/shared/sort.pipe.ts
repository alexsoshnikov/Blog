import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name:'sort'
})

export class SortPipe implements PipeTransform{
    transform(value: any): any {
        return value.sort((a,b) => b.date.getTime() - a.date.getTime())
    }
}
