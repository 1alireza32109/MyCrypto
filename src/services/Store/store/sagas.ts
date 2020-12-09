import { all } from 'redux-saga/effects';

import { watchIncrement } from '@features/DevTools/slice';

import { assetSaga } from './asset.slice';
import { fetchMembershipsSaga } from './membership.slice';
import { networkSaga } from './network.slice';
import { scanTokensSaga } from './tokenScanning.slice';

export default function* rootSaga() {
  yield all([
    watchIncrement(),
    fetchMembershipsSaga(),
    networkSaga(),
    assetSaga(),
    scanTokensSaga()
  ]);
}
