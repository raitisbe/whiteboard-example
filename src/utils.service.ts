import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PmUtilsService {
  constructor() {}

  capitalizeFirstLetter(string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
