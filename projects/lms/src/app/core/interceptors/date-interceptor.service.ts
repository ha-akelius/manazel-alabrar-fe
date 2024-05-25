import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

function parseDates(obj: any): any {
  // If the input is an array, map its elements to recursively parse any date strings
  if (Array.isArray(obj)) {
    return obj.map((item) => parseDates(item));
  }

  // If the input is an object, recursively parse any date strings in its properties
  if (obj instanceof Object) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (typeof value === 'string' && key.toLowerCase().includes('date')) {
          const date = Date.parse(value);
          if (!isNaN(date) && value.length > 5) {
            obj[key] = new Date(date);
          }
        } else if (value instanceof Object) {
          obj[key] = parseDates(value);
        }
      }
    }
  }

  return obj;
}

function fixDate(req: HttpRequest<any>, next: HttpHandlerFn) {
  const modifiedReq = req.clone({
    // Set the response type to JSON
    responseType: 'json',
  });

  return next(modifiedReq).pipe(
    map((event: HttpEvent<any>) => {
      // If the response is JSON, recursively parse any date strings to Date objects
      if (event instanceof HttpResponse && event.body) {
        const modifiedBody = parseDates(event.body);
        return event.clone({ body: modifiedBody });
      }

      return event;
    })
  );
}

export const dateInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  return req.url.includes('api') ? fixDate(req, next) : next(req);
};
