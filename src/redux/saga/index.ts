import { take, put, call, race, all, fork, select } from "redux-saga/effects";
import { takeEvery, delay } from "redux-saga";

import {
  FLIP_CELL,
  hideCell,
  openCell,
  closeCell,
  winGame,
  failGame
} from "../actions";
import { getItemById } from "../selectors";
import { Item } from "../../types";
import { State } from "..";

export function* helloSaga() {
  console.log("Hello Sagas!");
}

export function* takeTwoSaga() {
  console.log("taketwosaga start");
  let score = 0;
  while (true) {
    let action1 = yield take(FLIP_CELL);
    let item1: Item = yield select<State>(getItemById(action1.id));
    console.log("first", item1);
    yield put(openCell(item1.id));

    let action2 = yield take(FLIP_CELL);
    let item2 = yield select(getItemById(action2.id));
    console.log("second", item2);
    const timeout = 500; //ms

    if (item1.id === item2.id) {
      console.log("same card");
      yield call(delay, timeout);
      yield put(closeCell(item2.id));
    } else if (item1.imageId === item2.imageId) {
      yield put(openCell(item2.id));
      console.log("pair found");
      yield call(delay, timeout);
      yield put(hideCell(item1.id));
      yield put(hideCell(item2.id));
      score++;
    } else {
      yield put(openCell(item2.id));
      console.log("diff");
      yield call(delay, timeout);
      yield put(closeCell(item1.id));
      yield put(closeCell(item2.id));
      //console.log("flip both done?");
    }
  } //while

  return score;
}

export function* rootSaga() {
  yield takeTwoSaga(); // game(getState); // all([game, fork(helloSaga)]);
}

function* game(getState) {
  let finished = false;
  while (!finished) {
    // has to finish in 60 seconds
    const { score, timeout } = yield race({
      score: call(takeTwoSaga, getState),
      timeout: call(delay, 60 * 1000)
    });

    if (!timeout) {
      finished = true;
      console.log("win", score);
      yield put(winGame());
    } else {
      console.log("fail", score);
      yield put(failGame());
    }
  }
}
