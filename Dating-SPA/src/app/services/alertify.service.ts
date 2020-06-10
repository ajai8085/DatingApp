import { Injectable } from '@angular/core';
import * as alerfity from 'alertifyjs';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alerfity.confirm(message, (e: any) => {
      if (e) {
        okCallback();
      } else {
      }
    });
  }

  success(message: string) {
    alerfity.success(message);
  }

  error(message: string) {
    alerfity.error(message);
  }

  warning(message: string) {
    alerfity.warning(message);
  }

  message(message: string) {
    alerfity.message(message);
  }
}
