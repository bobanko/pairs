const imageCount = 12;

import $ from "jquery";

import { getRandomInt } from "../helpers/getRandomInt";
import { getLevelTimeout } from "../helpers/getLevelTimeout";
import { Timer } from "./timer/timer";
import { Item } from "../types";

function fail() {
  $(".timer").text("you failed 😰");
}

function win() {
  $(".timer").text("you won 👑 ✊");
}

function setTimer(data) {
  return new Promise(function(resolve, reject) {
    const pairCount = data.size.width * data.size.height;
    const timeout = getLevelTimeout(pairCount);

    const timer = new Timer(timeout);

    function getLastTwo(number) {
      return number < 10 ? "0" + number : number;
    }

    timer.addEventListener("tick", time => {
      const dateTime = new Date(time);
      $(".timer").text(
        `${getLastTwo(dateTime.getMinutes())} : ${getLastTwo(
          dateTime.getSeconds()
        )} `
      );

      if ($(".field item:not(.hidden)").length === 0) {
        resolve();
        timer.stop();
      }
    });

    timer.addEventListener("stop", time => {
      reject();
    });
  });
}

function drawField(data) {
  //let field = new Field(data.size);
  //field.draw(data.pairs);

  return data;
}

let selectedPairs = [];

function selectItem(event) {
  if (event.target.tagName === "ITEM") {
    let element = event.target;

    let elementIndex = selectedPairs.indexOf(element);
    if (elementIndex >= 0) {
      $(element).toggleClass("open", false);
      selectedPairs.splice(elementIndex, 1);
      return;
    }

    selectedPairs.push(element);
    $(element).toggleClass("open", true);

    //second item opened - check both and decide
    if (selectedPairs.length === 2) {
      let isSame = selectedPairs
        .map(element => $(element).data("id"))
        .reduce((a, b) => {
          return a === b;
        });

      if (isSame) {
        selectedPairs.forEach(cell =>
          setTimeout(() => $(cell).toggleClass("hidden"), 500)
        );
      } else {
        selectedPairs.forEach(cell =>
          setTimeout(() => $(cell).toggleClass("open", false), 500)
        );
      }
      //clear pairs arr
      selectedPairs.length = 0;
    }
  }
}

export function generateItems({ width, height }): Array<Item> {
  let pairCount = (width * height) / 2;

  let imageIds: Array<number> = [];
  for (let i = 0; i < pairCount; i++) {
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
