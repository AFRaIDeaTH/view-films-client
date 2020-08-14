import {HttpClient} from '@angular/common/http';
import {JsonConvert, ValueCheckingMode} from 'json2typescript';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

interface Class {
    new(): any;
}

export abstract class BaseService {
    protected apiUrl = environment.apiUrl;
    protected abstract urls: any;

    private jsonConvert = new JsonConvert();

    constructor(protected http: HttpClient) {
        this.jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
    }

    protected mixUrl(url: string): string {
        return this.apiUrl + url;
    }

    protected get(url: string, classReference?: Class, responseType?: any, ignorePrimitiveChecks = false): Observable<any> {
        return this.http
            .get(url, {responseType })
            .pipe(
                map(data => {
                    if (classReference !== undefined && data) {
                        const jsonConvert = new JsonConvert();
                        jsonConvert.ignorePrimitiveChecks = ignorePrimitiveChecks;
                        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
                        return jsonConvert.deserialize(data, classReference);
                    } else {
                        return data;
                    }
                })
            );
    }

    protected getArray(url: string, classReference?: Class, responseType?: any): Observable<any> {
        return this.http
            .get(url, {responseType})
            .pipe(
                map((data: any) => {
                    if (classReference !== undefined && data) {
                        return this.jsonConvert.deserializeArray(data, classReference);
                    } else {
                        return data;
                    }
                })
            );
    }

    protected post(url: string, body: any, classReference?: Class, responseType?: any): Observable<any> {
        return this.http
            .post(url, this.jsonConvert.serialize(body), {responseType})
            .pipe(
                map(data => {
                    if (classReference !== undefined && data) {
                        return this.jsonConvert.deserialize(data, classReference);
                    } else {
                        return data;
                    }
                })
            );
    }

    protected put(url: string, body: any, classReference?: Class): Observable<any> {
        return this.http
            .put(url, this.jsonConvert.serialize(body))
            .pipe(
                map(data => this.jsonConvert.deserialize(data, classReference))
            );
    }

    protected delete(url: string): Observable<any> {
        return this.http.delete(url);
    }
}
