export class Movie {
    _id: number;
    name: string;
    description: string;
    director: string;
    genre: string;
    year: string;
    rating: string;
    duration: string;

    constructor(obj?: any) {
        this._id = obj && obj._id || 0;
        this.name = obj && obj.name || '';
        this.description = obj && obj.description || '';
        this.director = obj && obj.director || '';
        this.genre = obj && obj.genre || '';
        this.year = obj && obj.year || '';
        this.rating = obj && obj.rating || '';
        this.duration = obj && obj.duration || '';

    }

}