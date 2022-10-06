import Notiflix from 'notiflix';
const API_KEY = '30385659-fcd311115b160b2c1dc9cd0da';
const BASE_URL = 'https://pixabay.com/api/';

const options = {
  headers: {
    key: API_KEY,
  },
};

export default class GalleryApiService {
  constructor() {
    this.earchQuery = '';
    this.page = 1;
  }
  async fetchArticles() {
    console.log(this);

    const url = `${BASE_URL}?key=30385659-fcd311115b160b2c1dc9cd0da&q=${this.earchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`;

    //  return fetch(url)
    //    .then(response => response.json())
    //    .then(data => {
    //      console.log(data);
    //      this.insertPage();
    //      return data.hits;
    //    });

    const response = await fetch(url);

    const newGalery = await response.json();

    this.insertPage();
    return newGalery.hits;
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
