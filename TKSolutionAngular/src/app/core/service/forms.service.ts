import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';
import { HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { tap, filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable()
export class FormsService {
    markAllAsDirty( form: FormGroup ) {
        for ( const control of Object.keys(form.controls) ) {
          form.controls[control].markAsDirty();
        }
    }
    
    toFormData<T>( formValue: T ) {
        const formData = new FormData();
      
        for ( const key of Object.keys(formValue) ) {
          const value = formValue[key];
          formData.append(key, value);
        }
      
        return formData;
    }
    
    uploadProgress<T>( cb: ( progress: number ) => void ) {
        return tap(( event: HttpEvent<T> ) => {
          if ( event.type === HttpEventType.UploadProgress ) {
            cb(Math.round((100 * event.loaded) / event.total));
          }
        });
      }
      
      toResponseBody<T>() {
        return pipe(
          filter(( event: HttpEvent<T> ) => event.type === HttpEventType.Response),
          map(( res: HttpResponse<T> ) => res.body)
        );
      }
}