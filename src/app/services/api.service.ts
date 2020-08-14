import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetFilmsByNameRequest, GetFilmsByNameResponse, GetLinksByIdRequest, GetLinksByIdResponse } from '../models/dto/films.dto';

@Injectable()
export class ApiService extends BaseService {
    protected urls = {
      getFilmsByName: this.mixUrl(environment.getFilmsByName),
      getLinksById: this.mixUrl(environment.getLinksById),
    };

    constructor(
        protected http: HttpClient,
        protected router: Router,
    ) {
        super(http);
    }

    /*
    * Получение списка фильмов по названию
    */
    getFilmsByName(body: GetFilmsByNameRequest): Observable<GetFilmsByNameResponse[]> {
        const url = `${this.urls.getFilmsByName}?name=${body.name}`;
        return this.get(url);
    }

    /*
    * Получение информации и ссылки на фильм по id
    */
    getLinksById(body: GetLinksByIdRequest): Observable<GetLinksByIdResponse[]> {
      const url = `${this.urls.getLinksById}?id=${body.id}`;
      return this.get(url);
    }
}
