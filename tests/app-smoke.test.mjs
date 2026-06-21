import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

class FakeClassList {
  constructor() {
    this.items = new Set();
  }

  add(value) {
    this.items.add(value);
  }

  remove(value) {
    this.items.delete(value);
  }

  toggle(value, force) {
    if (force === undefined) {
      if (this.items.has(value)) {
        this.items.delete(value);
        return false;
      }
      this.items.add(value);
      return true;
    }

    if (force) {
      this.items.add(value);
    } else {
      this.items.delete(value);
    }
    return force;
  }
}

class FakeElement {
  constructor(selector) {
    this.selector = selector;
    this.classList = new FakeClassList();
    this.dataset = {};
    this.style = {};
    this.value = "";
    this.textContent = "";
    this.innerHTML = "";
    this.className = "";
    this.clientWidth = 0;
    this.offsetLeft = 0;
  }

  addEventListener() {}

  querySelector() {
    return null;
  }

  closest() {
    return null;
  }

  scrollTo() {}

  setPointerCapture() {}
}

const elementStore = new Map();
const getElement = (selector) => {
  if (!elementStore.has(selector)) {
    elementStore.set(selector, new FakeElement(selector));
  }
  return elementStore.get(selector);
};

const stageModeButtons = ["listen", "teach", "play"].map((mode) => {
  const button = new FakeElement(`[data-stage-mode="${mode}"]`);
  button.dataset.stageMode = mode;
  return button;
});

const context = {
  assert,
  console,
  Date,
  Float32Array,
  JSON,
  Math,
  Number,
  Set,
  String,
  document: {
    querySelector: getElement,
    querySelectorAll(selector) {
      if (selector === "[data-stage-mode]") {
        return stageModeButtons;
      }
      return [];
    },
  },
  localStorage: {
    getItem() {
      return null;
    },
    setItem() {},
    removeItem() {},
  },
  navigator: {},
  requestAnimationFrame() {
    return 1;
  },
  cancelAnimationFrame() {},
  window: {
    addEventListener() {},
    setTimeout(callback) {
      return setTimeout(callback, 0);
    },
  },
};

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const testSource = `${source}
globalThis.__pianoSmoke = (() => {
  assert.equal(parseNoteToken("B3").note, "B3");
  assert.equal(parseNoteToken("b3").note, "B3");
  assert.equal(parseNoteToken("Bb3").note, "A#3");
  assert.equal(parseNoteToken("시").note, "B4");
  assert.equal(parseScore("B3 C4").map((item) => item.note).join(","), "B3,C4");

  const oldMacdonald = songs.find((song) => song.id === "old-macdonald");
  assert.ok(oldMacdonald.melody.some((item) => item.note === "B3"));
  assert.ok(songs.filter((song) => !song.needsScore).every((song) => song.melody.length > 0));
  assert.equal(buildSequence(songs[0], 1).length, songs[0].melody.length);
  assert.ok(buildSequence(songs[0], 5).some((step) => step.notes.length > 1));
  recordMistake(["D4", "D4"]);
  recordMistake(["F4"]);
  assert.equal(state.mistakes.D4, 1);
  assert.equal(state.mistakes.F4, 1);
  resolveMistake("D4");
  assert.equal(state.mistakes.D4, undefined);
  recordMistake(["D4"]);
  startMistakePractice();
  assert.equal(state.selectedSongId, "review");
  assert.ok(state.reviewSong.melody.some((item) => item.note === "D4"));
  clearMistakes();
  assert.equal(Object.keys(state.mistakes).length, 0);

  elements.customTitle.value = "<img src=x onerror=alert(1)>";
  elements.customScore.value = "도 레 미";
  generateCustom();
  assert.ok(!elements.songList.innerHTML.includes("<img"));
  assert.ok(elements.songList.innerHTML.includes("&lt;img"));

  return {
    songs: songs.length,
    oldMacdonaldNotes: oldMacdonald.melody.length,
  };
})();`;

vm.runInNewContext(testSource, context, { filename: "app.js" });

assert.ok(context.__pianoSmoke.songs >= 10);
assert.ok(context.__pianoSmoke.oldMacdonaldNotes > 0);
console.log("app smoke tests passed");
