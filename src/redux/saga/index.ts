import { take, put, call, race, all, fork, select } from "redux-saga/effects";
import { takeEvery, delay } from "redux-saga";

import {
  FLIP_CELL,
  hideCell,
  openCell,
  closeCell,
  winGame,
  failGame,
  setScore,
  setItems,
  timerTick,
  timerStop,
  timerStart,
  startGame
} from "../actions";
import {
  getItemById,
  getScore,
  getItemsCount,
  getHiddenItemsCount
} from "../selectors";
import { Item, State } from "../../types";

function* takeTwoSaga() {
  console.log("taketwosaga started");

  //pair count
  const itemsCount = yield select<State>(getItemsCount);
  let hiddenItemsCount;
  do {
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

      yield put(setScore((yield select<State>(getScore)) + 1));
    } else {
      yield put(openCell(item2.id));
      console.log("diff");
      yield call(delay, timeout);
      yield put(closeCell(item1.id));
      yield put(closeCell(item2.id));
      //console.log("flip both done?");
    }
    hiddenItemsCount = yield select<State>(getHiddenItemsCount);
    console.log(hiddenItemsCount);
  } while (hiddenItemsCount < itemsCount);

  return yield select<State>(getScore);
}

function* timerSaga(timeout: number) {
  yield put(timerStart(timeout));

  for (let timeLeft = timeout; timeLeft > 0; timeLeft--) {
    yield put(timerTick(timeLeft));
    yield call(delay, 1000);
  }
  yield put(timerTick(0));
  yield put(timerStop());
  return true;
}

function* playLevelSaga(level: number) {
  console.log(`level ${level} started`);
  const itemPairCount = level;
  let newItems = generateItems(itemPairCount);
  yield put(setItems(newItems));
  yield put(startGame());

  let finished = false;
  while (!finished) {
    // has to finish in 60 seconds
    const { score, timeout } = yield race({
      score: call(takeTwoSaga),
      timeout: call(timerSaga, itemPairCount * 5) //todo: somehow call tick
    });

    if (!timeout) {
      finished = true;
      console.log("win", score);
      yield put(winGame());
    } else {
      finished = true;
      console.log("fail", score);
      yield put(failGame());
    }
  }
  console.log(`level ${level} finished`);
}

function* gameLoopSaga() {
  console.log("game started");

  for (let level = 1; level < 10; level++) {
    yield playLevelSaga(level);
  }
}

export function* rootSaga() {
  yield gameLoopSaga();
  console.log("end root");
}

//=====================EXTRACT?=========================

const imageCount = 12;
export function generateItems(pairAmount): Array<Item> {
  let imageIds: Array<number> = [];
  for (let i = 0; i < pairAmount; i++) {
    imageIds.push(getRandomInt(1, imageCount));
  }

  imageIds = imageIds.concat(imageIds);
  imageIds.sort(() => getRandomInt(0, 1));

  return imageIds.map((imageId, id) => ({
    id,
    imageId,
    isOpen: false,
    isHidden: false
  }));
}

const getRandomInt = (min, max): number =>
  min + Math.floor(Math.random() * (max - min + 1));
