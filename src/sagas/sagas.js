
import {put ,take} from 'redux-saga/effects';
export function* helloSaga() {
  console.log('Hello Sagas!');
   yield put({type: 'IMAGES_LOADED', data:"images"})
}
export function* watchForLoadImages() {
  while(true) {
    yield take('LOAD_IMAGES');
    console.log('LOAD_IMAGES');
    yield helloSaga();
  }
}
