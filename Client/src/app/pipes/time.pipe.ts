import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time',
    standalone: true
})
export class TimePipe implements PipeTransform {

    transform(value: string | undefined): string | undefined {
        if (typeof(value) === undefined) {
            return;
        } else {
            const timeNow = new Date();
            const createdDate = new Date(value!);
            const timeInSeconds =timeNow.getTime()-createdDate.getTime() ;
            const seconds = Math.floor(timeInSeconds / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const weeks=Math.floor(days/7);

            if(minutes<=0 && minutes<60){
                return `Now`;
            }else if (hours <= 0) {
                return `${minutes}m`;
            } else if (hours > 0 && days <= 0) {
                return `${hours}h`;
            } else if(days >0 && weeks<=0){
                return `${days}d`;
            }else{
                return `${weeks}w`;
            }
        }
    }
}
