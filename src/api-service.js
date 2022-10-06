import Notiflix from 'notiflix';
const API_KEY = '30385659-fcd311115b160b2c1dc9cd0da';
const BASE_URL = 'https://pixabay.com/api/';
// const newGalery = null;

const options = {
  headers: {
    key: API_KEY,
  },
};

export default class GalleryApiService {
  constructor() {
    this.earchQuery = '';
    this.totalPage = 0;
    this.page = 1;
    this.totalHitsChek = 0;
  }

  async fetchArticles() {
    const url = `${BASE_URL}?key=30385659-fcd311115b160b2c1dc9cd0da&q=${this.earchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`;

    const response = await fetch(url);

    const newGalery = await response.json();

    this.totalPage = Math.ceil(newGalery.totalHits / 20);
    this.totalHitsChek = newGalery.totalHits;
    console.log(this.totalHitsChek);
    this.insertPage();
    return newGalery.hits;
  }

  getTotalHits() {
    return this.totalHitsChek;
  }

  getCurentPage() {
    return this.page;
  }

  getTotalPage() {
    return this.totalPage;
  }

  insertPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.earchQuery;
  }

  set query(newQuery) {
    this.earchQuery = newQuery;
  }
}
