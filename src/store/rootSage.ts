import { all } from 'redux-saga/effects';

import { authSaga } from '@/modules/auth/core/authSaga';

function* rootSaga() {
  yield all([authSaga()]);
}

export { rootSaga };
