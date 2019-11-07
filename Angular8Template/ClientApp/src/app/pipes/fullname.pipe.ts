import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../models/User';

@Pipe({ name: 'fullnamePipe' })

export class FullnamePipe implements PipeTransform {
    transform(value: string, user: IUser): string {
        return (user.lastname == null ? '' : (user.lastname + ', ')) + user.firstname;
    }
}
