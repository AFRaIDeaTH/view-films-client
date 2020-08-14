export const environmentBase: Environment = {
    production: false,
    apiUrl: '',
    getLinksById: 'getLinksById',
    getFilmsByName: 'getFilmsByName',
};

export interface Environment {
    /** Production сборка */
    production: boolean;

    /** URL до API */
    apiUrl: string;

    /** API URL для получения ссылок на фильм по id */
    getLinksById: string;

    /** API URL для получения фильмов по названию */
    getFilmsByName: string;
}
