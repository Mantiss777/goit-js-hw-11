import Notiflix from 'notiflix';
import galleryCard from './templates/gallery-card.hbs';
import GalleryApiService from './api-service';

const DEBOUNCE_DELAY = 500;

const refs = {
  searchForm: document.querySelector('#search-form'),
  addGallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const galleryApiService = new GalleryApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onloadMore);

function onSearch(event) {
  event.preventDefault();

  galleryApiService.query = event.currentTarget.elements.searchQuery.value;

  if (galleryApiService.query === '') {
    clearArticlesContainer();
    return Notiflix.Notify.info(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  }

  galleryApiService.resetPage();

  galleryApiService
    .fetchArticles()
    .then(hits => {
      clearArticlesContainer();
      appendArticlesMarkup(hits);
    })
    .catch(error =>
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      )
    );

  console.log(
    'galleryApiService.getTotalHits()',
    galleryApiService.getTotalHits()
  );
  if (galleryApiService.getTotalHits() !== 0) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

function onloadMore() {
  galleryApiService.fetchArticles().then(appendArticlesMarkup);

  if (galleryApiService.getTotalPage() === galleryApiService.getCurentPage()) {
    refs.loadMoreBtn.classList.add('is-hidden');
  }
}

function appendArticlesMarkup(hits) {
  refs.addGallery.insertAdjacentHTML('beforeend', galleryCard(hits));
}

function clearArticlesContainer() {
  refs.addGallery.innerHTML = '';
}
