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

class FakeStyle {
  constructor() {
    this.values = {};
  }

  setProperty(name, value) {
    this.values[name] = value;
  }

  removeProperty(name) {
    delete this.values[name];
  }
}

class FakeElement {
  constructor(selector) {
    this.selector = selector;
    this.classList = new FakeClassList();
    this.dataset = {};
    this.style = new FakeStyle();
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

const tempoPresetButtons = ["50", "75", "100"].map((preset) => {
  const button = new FakeElement(`[data-tempo-preset="${preset}"]`);
  button.dataset.tempoPreset = preset;
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
      if (selector === "[data-tempo-preset]") {
        return tempoPresetButtons;
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
    setInterval() {
      return 1;
    },
    clearInterval() {},
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
  assert.equal(fingerColorFor(4), "#4d96ff");
  const warmupSong = buildWarmupSong(0);
  assert.equal(warmupSong.type, "warmup");
  assert.deepEqual(buildSequence(warmupSong, 1).map((step) => step.notes[0].finger), [1, 2, 3, 4, 5]);
  startFingerWarmup();
  assert.equal(state.selectedSongId, "warmup");
  assert.equal(getCurrentSong().type, "warmup");
  nextWarmupDrill();
  assert.equal(state.warmupDrillIndex, 1);
  assert.equal(getCurrentSong().warmupDrillId, "left-up");
  startFingerWarmup();
  assert.equal(state.selectedSongId, "twinkle");
  setTheme("rainbow");
  assert.equal(state.theme, "rainbow");
  setSoundStyle("bell");
  assert.equal(state.soundStyle, "bell");
  setSoundVolume(65);
  assert.equal(state.soundVolume, 0.65);
  setTempoPreset(50);
  assert.equal(state.tempo, 50);
  assert.equal(state.tempoPreset, 50);
  toggleWaitMode();
  assert.equal(state.waitMode, false);
  toggleColorNotes();
  assert.equal(state.colorNotes, false);
  toggleColorNotes();
  assert.equal(state.colorNotes, true);
  state.currentIndex = 2;
  setLoopBoundary("start");
  state.currentIndex = 4;
  setLoopBoundary("end");
  toggleLoop();
  assert.equal(state.loopEnabled, true);
  state.currentIndex = 4;
  nextStep();
  assert.equal(state.currentIndex, 2);
  clearLoopRange();
  assert.equal(state.loopEnabled, false);
  state.rhythmActive = true;
  state.rhythmStats = { perfect: 0, early: 0, late: 0, total: 0 };
  state.stepDueAt = 100000;
  state.stepTimingRecorded = false;
  recordTimingHit(100000);
  assert.equal(state.rhythmStats.perfect, 1);
  state.stepDueAt = 100000;
  state.stepTimingRecorded = false;
  recordTimingHit(99000);
  assert.equal(state.rhythmStats.early, 1);
  state.stepDueAt = 100000;
  state.stepTimingRecorded = false;
  recordTimingHit(101000);
  assert.equal(state.rhythmStats.late, 1);
  assert.equal(rhythmAccuracyPercent(), 33);
  state.rhythmActive = true;
  state.stepDueAt = 100000;
  stopMetronome();
  assert.equal(state.rhythmActive, false);
  assert.equal(state.stepDueAt, 0);
  state.rhythmActive = true;
  state.stepDueAt = 100000;
  clearCountIn({ keepRhythm: true });
  assert.equal(state.rhythmActive, true);
  assert.equal(state.stepDueAt, 100000);
  clearCountIn();
  assert.equal(state.rhythmActive, false);
  assert.equal(state.stepDueAt, 0);
  const scoreBeforeCountInPress = state.score;
  const indexBeforeCountInPress = state.currentIndex;
  state.countInActive = true;
  state.countInRemaining = 2;
  judgeNote(state.sequence[state.currentIndex].notes[0].note);
  assert.equal(state.score, scoreBeforeCountInPress);
  assert.equal(state.currentIndex, indexBeforeCountInPress);
  state.countInActive = false;
  state.currentIndex = 2;
  recordFingerMistakes(["G4"]);
  assert.equal(state.fingerMistakes[2], 1);
  renderParentReport();
  assert.ok(elements.parentReportList.innerHTML.includes("박자 정확도"));
  addPracticeSeconds(180);
  assert.equal(state.dailyPracticeSeconds, 180);
  assert.ok(state.stickers.some((sticker) => sticker.key.startsWith("daily-")));
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
