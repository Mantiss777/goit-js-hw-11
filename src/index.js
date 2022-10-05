// import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryList from './templates/country-list.hbs';
import countryInfo from './templates/country-info.hbs';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 500;

const refs = {
  inputRequest: document.querySelector('#search-box'),
  addCountryList: document.querySelector('.country-list'),
  addCountryInfo: document.querySelector('.country-info'),
};

refs.inputRequest.addEventListener(
  'input',
  debounce(onInputCountry, DEBOUNCE_DELAY)
);

function onInputCountry(event) {
  event.preventDefault();
  const name = event.target.value.trim();

  if (name === '') {
    refs.addCountryList.innerHTML = '';
    refs.addCountryInfo.innerHTML = '';
    return;
  }

  fetchCountries(name.trim()).then(country => {
    if (country.length > 10) {
      Notiflix.Notify.info(
        `Too many matches found. Please enter a more specific name.`
      );
    } else if (country.length >= 2) {
      refs.addCountryInfo.innerHTML = '';
      refs.addCountryList.innerHTML = country.map(countryList).join('');
    } else if (country.length === 1) {
      refs.addCountryList.innerHTML = '';
      const languages = Object.values(country[0].languages).join(', ');

      country[0].languages = languages;

      const markupCountryInfo = country.map(countryInfo).join('');

      refs.addCountryInfo.innerHTML = markupCountryInfo;
    } else {
      refs.addCountryList.innerHTML = '';
      refs.addCountryInfo.innerHTML = '';
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    }
  });
}
