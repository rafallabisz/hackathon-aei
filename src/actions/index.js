import axios from 'axios';
import store from '../store/configStore';

export const FETCH_ARTICLES_BEGIN = 'FETCH_ARTICLES_BEGIN';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';
export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
export const UPDATE_ARTICLES = 'UPDATE_ARTICLES';

const API_KEY = '76e4c10dba1e4b2f9510e6b97d1afe09';

export const fetchArticlesBegin = () => ({
  type: FETCH_ARTICLES_BEGIN,
});

export const fetchArticlesSuccess = articles => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: {
    articles,
  },
});

export const fetchArticlesFailure = error => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: {
    error,
  },
});

export const requestArticles = () => ({
  type: REQUEST_ARTICLES,
});

export const receivedArticles = json => ({
  type: RECEIVE_ARTICLES,
  json: json.articles,
});

export const updateArticles = data => ({
  type: UPDATE_ARTICLES,
  data,
});

export function fetchArticles() {
  return function(dispatch) {
    dispatch(requestArticles());
    return (
      axios
        .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
        // .get(`https://newsapi.org/v2/sources?itemegory=sport&apiKey=${API_KEY}`)
        .then(
          // response => console.log(response.data),
          response => response.data,
          // error => console.log('An error occurred.', error),
        )
        .then(json => {
          dispatch(receivedArticles(json));
        })
    );
  };
}

export function checkRisk(title = '') {
  return function(dispatch) {
    const items = store.getState().json;
    // const

    const source = [
      'nytimes',
      'newsday',
      'washingpost',
      'infowars',
      'christiantimes',
      'empirenews',
    ];
    const catchwords = [
      'breaking',
      'news',
      'shooting',
      'spreads',
      'across',
      'diseases',
      'epidemy',
      'voting',
      'election',
      'trump',
      'final',
      'to',
      'and',
      'of',
    ];
    const actualDate = new Date();
    const actualYear = actualDate.getFullYear();

    if (items != undefined) {
      const modifiedItems = items.map(item => {
        item.fakeindicator = 1; // 1 to prawda, 100 to fałsz
        if (item.title === title) {
          item.fakeindicator += 10;
        }
        if (actualYear - item.publishedAt.slice(0, 4) >= 2) item.fakeindicator += 10;
        if (item.author == 'null') item.fakeindicator += 10;
        if (item.description == 'null') item.fakeindicator += 10;
        if (
          catchwords.some(function(v) {
            return item.description && item.description.indexOf(v) >= 0;
          })
        ) {
          item.fakeindicator += Math.floor(Math.random() * 70) + 12; // There's at least one substring - catchywords with high risk of fake news from array in description
        }
        if (
          source.some(function(v) {
            return item.url.indexOf(v) >= 0;
          })
        ) {
          item.fakeindicator += 10; // There's at least one substring - sources with high risk of fake news from array in url
        }
        return item;
      });

      dispatch({
        type: UPDATE_ARTICLES,
        data: modifiedItems,
      });
      console.log('stan lalla: ', modifiedItems);
    }
  };
}

export function addVote(like = false, unlike = false, title = '', turnOffRender) {
  return function(dispatch) {
    const items = store.getState().json;

    // console.log(like, unlike, title, turnOffRender);
    if (items.length > 0) {
      const modifiedItems = items.map(item => {
        if (item.title === title) {
          if (like) item.fakeindicator *= 1.2;
          if (unlike) item.fakeindicator /= 1.2;
        }
        return item;
      });

      dispatch(updateArticles(modifiedItems));
      turnOffRender();
    }
  };
}
