import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { APP_CONFIG, AppConfig } from '../app/config/config.module';

@Injectable()
export class ClassesService {

    constructor(private http: Http,  @Inject(APP_CONFIG) private config: AppConfig) {
        // console.log('StudentService');
    }

    getAll(){
        return this.http.get(`${this.config.apiEndpoint}/class`).map(this.extractData)
            .catch(this.handleError);
    }

    create(data){
        return this.http.post(`${this.config.apiEndpoint}/class`, data).map(this.extractData)
            .catch(this.handleError);
    }

    update(data){
        return this.http.put(`${this.config.apiEndpoint}/class/${data.id}`, data).map(this.extractData)
            .catch(this.handleError);
    }

    delete(id){
        return this.http.delete(`${this.config.apiEndpoint}/class/${id}`).map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        return errMsg;
    }

}
