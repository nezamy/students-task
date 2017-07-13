import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { APP_CONFIG, AppConfig } from '../app/config/config.module';

@Injectable()
export class ClassStudentsService {

    constructor(private http: Http,  @Inject(APP_CONFIG) private config: AppConfig) {
        // console.log('StudentService');
    }

    joined(){
        return this.http.get(`${this.config.apiEndpoint}/joined`).map(this.extractData)
            .catch(this.handleError);
    }

    studentSearch(name){
        return this.http.get(`${this.config.apiEndpoint}/search/student-by-name/${name}`).map(this.extractData)
            .catch(this.handleError);
    }

    classSearch(name){
        return this.http.get(`${this.config.apiEndpoint}/search/class-by-name/${name}`).map(this.extractData)
            .catch(this.handleError);
    }

    create(data){
        return this.http.post(`${this.config.apiEndpoint}/joined`, data).map(this.extractData)
            .catch(this.handleError);
    }

    update(data){
        return this.http.put(`${this.config.apiEndpoint}/joined/${data.id}`, data).map(this.extractData)
            .catch(this.handleError);
    }

    delete(id){
        return this.http.delete(`${this.config.apiEndpoint}/joined/${id}`).map(this.extractData)
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
