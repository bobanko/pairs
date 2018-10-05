import { delay } from "redux-saga";
import { take, put, call, race, select } from "redux-saga/effects";

import {
  FLIP_CELL,
  START_GAME,
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
  startGame,
  setLevel,
  endGame
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

  do {
    let flip1 = yield take(FLIP_CELL);
    let item1: Item = yield select<State>(getItemById(flip1.id));
    console.log("first", item1);
    yield put(openCell(item1.id));

    let flip2 = yield take(FLIP_CELL);
    let item2 = yield select(getItemById(flip2.id));
    console.log("second", item2);
    const timeout = 500; //ms

    if (item1.id === item2.id) {
      //same card
      yield put(closeCell(item2.id));
    } else if (item1.imageId === item2.imageId) {
      //pair found
      yield put(openCell(item2.id));
      yield call(delay, timeout);
      yield put(hideCell(item1.id));
      yield put(hideCell(item2.id));

      yield put(setScore((yield select<State>(getScore)) + 1));
    } else {
      //diff
      yield put(openCell(item2.id));
      yield call(delay, timeout);
      yield put(closeCell(item1.id));
      yield put(closeCell(item2.id));
    }
  } while ((yield select<State>(getHiddenItemsCount)) < itemsCount);

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

const getLevelTimeout = value => value * 5;

function* playLevelSaga(level: number) {
  const itemPairCount = level; //pair count based on level num
  let newItems = generateItems(itemPairCount);
  yield put(setItems(newItems));
  yield put(setLevel(level));
  yield put(startGame());

  const { score, timeout } = yield race({
    score: call(takeTwoSaga),
    timeout: call(timerSaga, getLevelTimeout(itemPairCount))
  });

  let isVictory = !timeout;

  if (isVictory) {
    yield put(winGame(score));
  } else {
    yield put(failGame(score));
  }
  console.log(`level ${level} finished`);
  return isVictory;
}

function* gameLoopSaga() {
  console.log("game started");

  for (
    let level = 1, isWin = false;
    level <= 10;
    level = isWin ? level + 1 : level
  ) {
    yield take(START_GAME);
    isWin = yield playLevelSaga(level);
  }
}

export function* rootSaga() {
  yield gameLoopSaga();
  yield put(endGame());
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
