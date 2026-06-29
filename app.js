const NOTE_NAMES = ["C", "D", "E", "F", "G", "A", "B"];
const CHROMATIC = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
// 모든 음은 생성 전에 flatToSharp 로 올림표(sharp)로 정규화되므로
// 내림표(flat) 음이름은 조회되지 않는다. 따라서 자연음/올림음만 둔다.
const SOLFEGE = {
  C: "도",
  "C#": "도#",
  D: "레",
  "D#": "레#",
  E: "미",
  F: "파",
  "F#": "파#",
  G: "솔",
  "G#": "솔#",
  A: "라",
  "A#": "라#",
  B: "시",
};
const HANGUL_TO_NOTE = {
  도: "C",
  레: "D",
  미: "E",
  파: "F",
  솔: "G",
  소: "G",
  라: "A",
  시: "B",
};
const SOLFEGE_TO_NOTE = {
  do: "C",
  re: "D",
  mi: "E",
  fa: "F",
  sol: "G",
  so: "G",
  la: "A",
  si: "B",
  ti: "B",
};
const NUMBER_TO_NOTE = {
  1: "C",
  2: "D",
  3: "E",
  4: "F",
  5: "G",
  6: "A",
  7: "B",
};
const FINGER_NAMES = {
  1: "엄지",
  2: "검지",
  3: "중지",
  4: "약지",
  5: "새끼",
};
const FINGER_COLORS = {
  1: "#ff5f7e",
  2: "#ffca3a",
  3: "#6bd66f",
  4: "#4d96ff",
  5: "#b967ff",
};
const NOTE_COLORS = {
  C: "#ff5f7e",
  "C#": "#ff7f50",
  D: "#ffb703",
  "D#": "#ffd166",
  E: "#7bd88f",
  F: "#2ec4b6",
  "F#": "#00a6fb",
  G: "#4d96ff",
  "G#": "#6c63ff",
  A: "#b967ff",
  "A#": "#ff6ec7",
  B: "#ff8fab",
};
const BASE_TEMPO = 100;
const TEMPO_PRESETS = [50, 75, 100];
const DAILY_TARGET_SECONDS = 180;
const COUNT_IN_BEATS = 4;
const WARMUP_DRILLS = [
  {
    id: "right-up",
    title: "오른손 1-2-3-4-5",
    summary: "오른손 차례가기",
    hand: "right",
    notes: ["C4", "D4", "E4", "F4", "G4"],
    fingers: [1, 2, 3, 4, 5],
  },
  {
    id: "left-up",
    title: "왼손 5-4-3-2-1",
    summary: "왼손 차례가기",
    hand: "left",
    notes: ["C3", "D3", "E3", "F3", "G3"],
    fingers: [5, 4, 3, 2, 1],
  },
  {
    id: "weak-34",
    title: "3-4 손가락 힘주기",
    summary: "약한 손가락 반복",
    hand: "right",
    notes: ["E4", "F4", "E4", "F4", "G4", "F4", "E4"],
    fingers: [3, 4, 3, 4, 5, 4, 3],
  },
];
const RIGHT_FINGERS = {
  C: 1,
  D: 2,
  E: 3,
  F: 1,
  G: 2,
  A: 3,
  B: 4,
};
const LEFT_FINGERS = {
  C: 5,
  D: 4,
  E: 3,
  F: 2,
  G: 1,
  A: 3,
  B: 2,
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const songs = [
  {
    id: "twinkle",
    title: "작은 별",
    mark: "별",
    range: "도-라",
    key: "C",
    description: "같은 음을 두 번씩 눌러 안정적으로 시작해요.",
    melody: melody(
      "C4 C4 G4 G4 A4 A4 G4:2 | F4 F4 E4 E4 D4 D4 C4:2 | G4 G4 F4 F4 E4 E4 D4:2 | G4 G4 F4 F4 E4 E4 D4:2 | C4 C4 G4 G4 A4 A4 G4:2 | F4 F4 E4 E4 D4 D4 C4:2",
    ),
  },
  {
    id: "butterfly",
    title: "나비야",
    mark: "나",
    range: "도-솔",
    key: "C",
    description: "도레미파솔을 차례대로 익히기 좋아요.",
    melody: melody(
      "G4 E4 E4 F4 D4 D4 C4 D4 E4 F4 G4 G4 G4:2 | G4 E4 E4 E4 F4 D4 D4 D4 C4 E4 G4 G4 E4 E4 C4:2",
    ),
  },
  {
    id: "school",
    title: "학교 종",
    mark: "종",
    range: "도-라",
    key: "C",
    description: "짧은 마디를 반복하며 손가락 이동을 배워요.",
    melody: melody(
      "G4 G4 A4 A4 G4 G4 E4:2 | G4 G4 E4 E4 D4:2 | G4 G4 A4 A4 G4 G4 E4:2 | G4 E4 D4 E4 C4:2",
    ),
  },
  {
    id: "mary",
    title: "비행기",
    mark: "비",
    range: "도-솔",
    key: "C",
    description: "레와 미를 오가며 손가락 번호를 확인해요.",
    melody: melody(
      "E4 D4 C4 D4 E4 E4 E4:2 | D4 D4 D4:2 E4 G4 G4:2 | E4 D4 C4 D4 E4 E4 E4 E4 D4 D4 E4 D4 C4:2",
    ),
  },
  {
    id: "row",
    title: "리듬 노 젓기",
    mark: "노",
    range: "도-솔",
    key: "C",
    description: "중급 단계에서 양손 박자를 맞추기 쉬운 곡이에요.",
    melody: melody(
      "C4 C4 C4 D4 E4:2 | E4 D4 E4 F4 G4:2 | C5 C5 C5 G4 G4 G4 E4 E4 E4 C4 C4 C4 | G4 F4 E4 D4 C4:2",
    ),
  },
  {
    id: "london-bridge",
    title: "런던 다리",
    mark: "런",
    range: "도-라",
    key: "C",
    description: "짧은 내려가기와 올라가기를 반복해요.",
    melody: melody(
      "G4 A4 G4 F4 E4 F4 G4:2 | D4 E4 F4:2 E4 F4 G4:2 | G4 A4 G4 F4 E4 F4 G4:2 | D4 G4 E4 C4:2",
    ),
  },
  {
    id: "frere-jacques",
    title: "브라더 존",
    mark: "존",
    range: "도-라",
    key: "C",
    description: "같은 문장을 반복해서 외우기 쉬워요.",
    melody: melody(
      "C4 D4 E4 C4 | C4 D4 E4 C4 | E4 F4 G4:2 | E4 F4 G4:2 | G4 A4 G4 F4 E4 C4 | G4 A4 G4 F4 E4 C4 | C4 G3 C4:2 | C4 G3 C4:2",
    ),
  },
  {
    id: "ode-to-joy",
    title: "기쁨의 노래",
    mark: "기",
    range: "도-솔",
    key: "C",
    description: "중급으로 넘어가기 전 리듬감을 익혀요.",
    melody: melody(
      "E4 E4 F4 G4 G4 F4 E4 D4 | C4 C4 D4 E4 E4 D4 D4:2 | E4 E4 F4 G4 G4 F4 E4 D4 | C4 C4 D4 E4 D4 C4 C4:2",
    ),
  },
  {
    id: "jingle-bells",
    title: "징글벨",
    mark: "징",
    range: "도-라",
    key: "C",
    description: "반복 음으로 박자와 속도를 맞춰요.",
    melody: melody(
      "E4 E4 E4:2 | E4 E4 E4:2 | E4 G4 C4 D4 E4:2 | F4 F4 F4 F4 F4 E4 E4 E4 E4 D4 D4 E4 D4:2 G4:2",
    ),
  },
  {
    id: "old-macdonald",
    title: "올드 맥도널드",
    mark: "맥",
    range: "도-솔",
    key: "C",
    description: "짧은 구간을 반복하며 손 모양을 익혀요.",
    melody: melody(
      "G4 G4 G4 D4 E4 E4 D4:2 | B3 B3 A3 A3 G3:2 | D4 G4 G4 G4 D4 E4 E4 D4:2 | B3 B3 A3 A3 G3:2",
    ),
  },
  {
    id: "snail-day",
    title: "달팽이의 하루",
    mark: "달",
    range: "낮은 라~솔",
    key: "C",
    description: "작사 조원경 · 작곡 김진성",
    // 라/시는 모두 가운데 도 아래의 낮은음(A3·B3). M2의 (아래)라 (아래)시와
    // 동일한 악구가 M10에서 무표기로 반복되어 곡 전체에서 낮은음으로 통일된다.
    // 박자는 임시 4/4 기본값(각 음 1박, 각 프레이즈 끝음 2박) — 실제 악보로 교정 예정.
    melody: melody(
      "E4 F4 G4 G4 F4 E4 D4 C4:2 | A3 B3 C4 C4 F4 G4 C4 E4 D4:2 | E4 F4 G4 G4 F4 E4 D4 C4:2 | A3 F4 E4 D4 B3 C4:2 | E4 G4 D4 G4 G4 F4 E4 D4 C4:2 | A3 C4 D4 C4 F4 E4 F4 D4:2 | E4 E4 G4 D4 D4 G4 G4 F4 E4 D4 C4:2 | A3 B3 C4 F4 E4 D4 C4 B3 D4 C4:2 | E4 F4 G4 G4 F4 E4 D4 C4:2 | A3 B3 C4 C4 F4 G4 C4 E4 D4:2 | E4 F4 G4 G4 F4 E4 D4 C4:2 | A3 F4 E4 D4 B3 C4:2 | A3 F4 E4 D4 B3 C4:2",
    ),
  },
];

const levels = [
  {
    id: 1,
    title: "오른손 멜로디",
    summary: "오른손 한 음씩",
    coach: "오른손 손가락 번호를 보며 한 음씩 눌러요.",
  },
  {
    id: 2,
    title: "왼손 낮은음",
    summary: "한 옥타브 아래",
    coach: "같은 계이름을 왼손으로 낮게 연습해요.",
  },
  {
    id: 3,
    title: "양손 시작",
    summary: "왼손 기준음 + 오른손",
    coach: "마디 첫 박에 왼손을 더하고 오른손 멜로디를 이어가요.",
  },
  {
    id: 4,
    title: "리듬 따라치기",
    summary: "박자와 빠르기",
    coach: "듣기를 먼저 누르고 표시된 박자 길이를 따라가요.",
  },
  {
    id: 5,
    title: "중급 양손",
    summary: "왼손 5도 + 오른손",
    coach: "왼손 두 음과 오른손 멜로디를 한 단계씩 완성해요.",
  },
];

const SOUND_STYLES = {
  click: {
    type: "square",
    gain: 0.2,
    attack: 0.002,
    release: 0.03,
    sustain: 0.4,
    harmonics: [{ ratio: 1, gain: 1 }],
  },
  soft: {
    type: "triangle",
    gain: 0.24,
    attack: 0.025,
    release: 0.18,
    sustain: 0.82,
    harmonics: [{ ratio: 1, gain: 1 }],
  },
  bright: {
    type: "sawtooth",
    gain: 0.16,
    attack: 0.012,
    release: 0.1,
    sustain: 0.62,
    harmonics: [
      { ratio: 1, gain: 1 },
      { ratio: 2, gain: 0.18 },
    ],
  },
  bell: {
    type: "sine",
    gain: 0.22,
    attack: 0.008,
    release: 0.42,
    sustain: 0.36,
    harmonics: [
      { ratio: 1, gain: 1 },
      { ratio: 2.01, gain: 0.32 },
      { ratio: 3.01, gain: 0.12 },
    ],
  },
  synth: {
    type: "square",
    gain: 0.13,
    attack: 0.018,
    release: 0.22,
    sustain: 0.72,
    harmonics: [
      { ratio: 1, gain: 1 },
      { ratio: 0.5, gain: 0.22 },
    ],
  },
};
const THEME_IDS = ["clear", "pop", "rainbow", "night"];

const state = {
  selectedSongId: "twinkle",
  level: 1,
  sequence: [],
  currentIndex: 0,
  pendingNotes: new Set(),
  completedNotes: new Set(),
  score: 0,
  streak: 0,
  tempo: 88,
  audioContext: null,
  micStream: null,
  micAnalyser: null,
  micFrameId: null,
  micActive: false,
  micStarting: false,
  midiAccess: null,
  midiActive: false,
  lastRecognized: { note: "", time: 0 },
  recognitionLockUntil: 0,
  stageMode: "teach",
  customSong: null,
  reviewSong: null,
  mistakes: {},
  fingerMistakes: {},
  view: "home",
  focusMode: false,
  theme: "pop",
  soundStyle: "soft",
  soundVolume: 0.8,
  waitMode: true,
  colorNotes: true,
  tempoPreset: "custom",
  loopStart: 0,
  loopEnd: null,
  loopEnabled: false,
  feedbackText: "",
  dailyPracticeDate: todayKey(),
  dailyPracticeSeconds: 0,
  dailyPracticeActive: false,
  dailyRewardedDate: "",
  stickers: [],
  rhythmActive: false,
  rhythmStats: { perfect: 0, early: 0, late: 0, total: 0 },
  stepDueAt: 0,
  stepTimingRecorded: false,
  timingFeedback: {
    kind: "ready",
    label: "박자 준비",
    detail: "카운트 시작을 누르면 박자 점수를 기록합니다.",
  },
  countInActive: false,
  countInRemaining: 0,
  countInTimerId: null,
  metronomeActive: false,
  metronomeTimerId: null,
  metronomeBeat: 0,
  nextTickAt: 0,
  warmupSong: null,
  warmupDrillIndex: 0,
  warmupReturn: null,
  timerId: null,
};

const elements = {
  scoreCount: document.querySelector("#scoreCount"),
  streakCount: document.querySelector("#streakCount"),
  levelLabel: document.querySelector("#levelLabel"),
  currentSongTitle: document.querySelector("#currentSongTitle"),
  homeSongLabel: document.querySelector("#homeSongLabel"),
  handBadge: document.querySelector("#handBadge"),
  fingerBadge: document.querySelector("#fingerBadge"),
  beatBadge: document.querySelector("#beatBadge"),
  targetNotes: document.querySelector("#targetNotes"),
  handVisualizer: document.querySelector("#handVisualizer"),
  timingFeedback: document.querySelector("#timingFeedback"),
  timingDetail: document.querySelector("#timingDetail"),
  perfectTimingCount: document.querySelector("#perfectTimingCount"),
  earlyTimingCount: document.querySelector("#earlyTimingCount"),
  lateTimingCount: document.querySelector("#lateTimingCount"),
  coachText: document.querySelector("#coachText"),
  progressFill: document.querySelector("#progressFill"),
  promptCard: document.querySelector("#promptCard"),
  nextSuggestion: document.querySelector("#nextSuggestion"),
  quickStartButton: document.querySelector("#quickStartButton"),
  focusModeButton: document.querySelector("#focusModeButton"),
  volumeSlider: document.querySelector("#volumeSlider"),
  volumeValue: document.querySelector("#volumeValue"),
  soundPreviewButton: document.querySelector("#soundPreviewButton"),
  waitModeButton: document.querySelector("#waitModeButton"),
  colorNotesButton: document.querySelector("#colorNotesButton"),
  loopRangeLabel: document.querySelector("#loopRangeLabel"),
  loopStartButton: document.querySelector("#loopStartButton"),
  loopEndButton: document.querySelector("#loopEndButton"),
  loopToggleButton: document.querySelector("#loopToggleButton"),
  loopClearButton: document.querySelector("#loopClearButton"),
  playGuideButton: document.querySelector("#playGuideButton"),
  repeatButton: document.querySelector("#repeatButton"),
  nextButton: document.querySelector("#nextButton"),
  countInButton: document.querySelector("#countInButton"),
  metronomeButton: document.querySelector("#metronomeButton"),
  warmupButton: document.querySelector("#warmupButton"),
  warmupNextButton: document.querySelector("#warmupNextButton"),
  micButton: document.querySelector("#micButton"),
  midiButton: document.querySelector("#midiButton"),
  listenStatus: document.querySelector("#listenStatus"),
  detectedNote: document.querySelector("#detectedNote"),
  resetProgressButton: document.querySelector("#resetProgressButton"),
  songList: document.querySelector("#songList"),
  keyboard: document.querySelector("#keyboard"),
  tempoSlider: document.querySelector("#tempoSlider"),
  tempoValue: document.querySelector("#tempoValue"),
  levelList: document.querySelector("#levelList"),
  sequencePreview: document.querySelector("#sequencePreview"),
  sheetTrack: document.querySelector("#sheetTrack"),
  missionList: document.querySelector("#missionList"),
  parentReportList: document.querySelector("#parentReportList"),
  dailyPracticeText: document.querySelector("#dailyPracticeText"),
  dailyPracticeButton: document.querySelector("#dailyPracticeButton"),
  dailyPracticeFill: document.querySelector("#dailyPracticeFill"),
  stickerShelf: document.querySelector("#stickerShelf"),
  mistakeList: document.querySelector("#mistakeList"),
  mistakePracticeButton: document.querySelector("#mistakePracticeButton"),
  clearMistakesButton: document.querySelector("#clearMistakesButton"),
  customTitle: document.querySelector("#customTitle"),
  customScore: document.querySelector("#customScore"),
  generateButton: document.querySelector("#generateButton"),
  loadExampleButton: document.querySelector("#loadExampleButton"),
  generatedNotes: document.querySelector("#generatedNotes"),
  customHint: document.querySelector("#customHint"),
};

function melody(source) {
  let measure = 1;
  let beat = 1;

  return source.split(/\s+/).flatMap((rawToken) => {
    const token = rawToken.trim();
    if (!token) return [];
    if (token === "|") {
      measure += 1;
      beat = 1;
      return [];
    }

    const [note, durationValue] = token.split(":");
    const parsed = parseNoteToken(note, 4);
    if (!parsed) return [];

    const step = {
      note: parsed.note,
      duration: Number(durationValue) || 1,
      measure,
      beat,
    };
    beat += step.duration;
    return [step];
  });
}

function getCurrentSong() {
  if (state.selectedSongId === "custom" && state.customSong) {
    return state.customSong;
  }
  if (state.selectedSongId === "review" && state.reviewSong) {
    return state.reviewSong;
  }
  if (state.selectedSongId === "warmup" && state.warmupSong) {
    return state.warmupSong;
  }
  return songs.find((song) => song.id === state.selectedSongId) || songs[0];
}

function getPitch(note) {
  const parsed = /^([A-G])(#?)(\d)$/.exec(note);
  if (!parsed) return 0;
  const [, letter, sharp, octaveText] = parsed;
  const pitchName = `${letter}${sharp}`;
  return Number(octaveText) * 12 + CHROMATIC.indexOf(pitchName);
}

function frequencyFor(note) {
  return 440 * 2 ** ((getPitch(note) - getPitch("A4")) / 12);
}

function splitNote(note) {
  const parsed = /^([A-G])(#?)(\d)$/.exec(note);
  if (!parsed) return { pitch: note, letter: note, accidental: "", octave: "" };
  const [, letter, accidental, octave] = parsed;
  return { pitch: `${letter}${accidental}`, letter, accidental, octave };
}

function plainSolfege(note) {
  const { pitch } = splitNote(note);
  return SOLFEGE[pitch] || pitch;
}

function noteColorFor(note) {
  const { pitch, letter } = splitNote(note);
  return NOTE_COLORS[pitch] || NOTE_COLORS[letter] || "#4d96ff";
}

function noteColorStyle(note) {
  return `--note-color: ${noteColorFor(note)}`;
}

function fingerColorFor(finger) {
  return FINGER_COLORS[finger] || FINGER_COLORS[1];
}

function fingerColorStyle(finger) {
  return `--finger-color: ${fingerColorFor(finger)}`;
}

function handText(hand) {
  if (hand === "left") return "왼손";
  if (hand === "both") return "양손";
  return "오른손";
}

function fingerFor(note, hand) {
  const { letter } = splitNote(note);
  const map = hand === "left" ? LEFT_FINGERS : RIGHT_FINGERS;
  return map[letter] || 1;
}

function createPracticeNote(note, hand, finger = fingerFor(note, hand)) {
  return {
    note,
    hand,
    finger,
  };
}

function transposeOctave(note, amount) {
  const { pitch, octave } = splitNote(note);
  const nextOctave = Number(octave) + amount;
  const next = `${pitch}${nextOctave}`;
  return isPlayable(next) ? next : note;
}

function isPlayable(note) {
  return getPlayableNotes().includes(note);
}

function harmonicRoot(note) {
  const { letter } = splitNote(note);
  if (["F", "A"].includes(letter)) return "F3";
  if (["D", "G", "B"].includes(letter)) return "G3";
  return "C3";
}

function fifthFor(root) {
  const fifths = {
    C3: "G3",
    F3: "C4",
    G3: "D4",
  };
  return fifths[root] || "G3";
}

function getWhiteNotes() {
  const notes = [];
  for (let octave = 3; octave <= 6; octave += 1) {
    NOTE_NAMES.forEach((letter) => {
      const note = `${letter}${octave}`;
      if (getPitch(note) <= getPitch("C6")) notes.push(note);
    });
  }
  return notes;
}

function getPlayableNotes() {
  const notes = [...getWhiteNotes()];
  CHROMATIC.forEach((pitch) => {
    for (let octave = 3; octave <= 5; octave += 1) {
      const note = `${pitch}${octave}`;
      if (pitch.includes("#") && getPitch(note) < getPitch("C6")) {
        notes.push(note);
      }
    }
  });
  return [...new Set(notes)];
}

function buildSequence(song, level) {
  if (!song || !Array.isArray(song.melody)) return [];
  if (song.type === "warmup") {
    return song.melody.map((item) => ({
      ...item,
      notes: [createPracticeNote(item.note, item.hand || "right", item.finger)],
      warmup: true,
    }));
  }

  if (level === 1) {
    return song.melody.map((item) => ({
      ...item,
      notes: [createPracticeNote(item.note, "right")],
    }));
  }

  if (level === 2) {
    // 멜로디의 모든 음을 한 옥타브 내릴 수 있을 때만 균일하게 내린다.
    // 옥타브3 음(예: G3)은 더 내려갈 수 없어 그대로 남으면 음정 구조가
    // 깨지므로, 그런 곡은 옥타브를 유지해 멜로디 윤곽을 보존한다.
    const canShiftAll = song.melody.every(
      (item) => transposeOctave(item.note, -1) !== item.note,
    );
    return song.melody.map((item) => ({
      ...item,
      notes: [
        createPracticeNote(canShiftAll ? transposeOctave(item.note, -1) : item.note, "left"),
      ],
    }));
  }

  if (level === 3) {
    return song.melody.map((item) => {
      const notes = [createPracticeNote(item.note, "right")];
      if (item.beat === 1) {
        notes.unshift(createPracticeNote(harmonicRoot(item.note), "left"));
      }
      return { ...item, notes };
    });
  }

  if (level === 4) {
    return song.melody.map((item) => ({
      ...item,
      notes: [createPracticeNote(item.note, "right")],
      rhythm: true,
    }));
  }

  return song.melody.map((item) => {
    const root = harmonicRoot(item.note);
    const notes = [createPracticeNote(item.note, "right")];
    if (item.beat === 1 || item.beat === 3) {
      // 멜로디 음과 겹치는 왼손 음(예: 멜로디 D4 위의 5도 D4)은 빼서
      // 화면 표시(타일/손가락)와 pendingNotes Set 개수를 일치시킨다.
      const have = new Set(notes.map((noteItem) => noteItem.note));
      const leftNotes = [];
      [root, fifthFor(root)].forEach((leftNote) => {
        if (!have.has(leftNote)) {
          leftNotes.push(createPracticeNote(leftNote, "left"));
          have.add(leftNote);
        }
      });
      notes.unshift(...leftNotes);
    }
    return { ...item, notes };
  });
}

function setSequence(sequence, startIndex = 0) {
  state.sequence = sequence;
  state.currentIndex = Math.min(startIndex, Math.max(0, sequence.length - 1));
  normalizeLoopRange();
  resetPendingNotes();
  renderPractice();
  renderSequencePreview();
  renderStageTrack();
  renderMissions();
}

function resetPendingNotes() {
  const current = state.sequence[state.currentIndex];
  const notes = current ? current.notes.map((item) => item.note) : [];
  state.pendingNotes = new Set(notes);
  state.completedNotes = new Set();
  state.stepTimingRecorded = false;
  if (state.rhythmActive && !state.countInActive) {
    armRhythmStep();
  }
}

function loadCurrentSong(startIndex = 0) {
  const song = getCurrentSong();
  elements.currentSongTitle.textContent = song.title;
  setSequence(buildSequence(song, state.level), startIndex);
  if (song.needsScore) {
    elements.customTitle.value = song.title;
    elements.customHint.textContent = `${song.title} 악보나 계이름을 입력하면 바로 연습곡으로 만들 수 있습니다.`;
    elements.generatedNotes.innerHTML = "";
  }
  renderSongs();
  renderLevels();
}

function renderSongs() {
  const songItems = [...songs];
  if (state.customSong) songItems.push(state.customSong);
  if (state.reviewSong) songItems.push(state.reviewSong);
  if (state.warmupSong) songItems.push(state.warmupSong);
  elements.songList.innerHTML = songItems
    .map((song) => {
      const active = song.id === state.selectedSongId ? " active" : "";
      return `
        <button class="song-button${active}" type="button" data-song-id="${escapeHtml(song.id)}">
          <span class="song-mark">${escapeHtml(song.mark)}</span>
          <span>
            <strong>${escapeHtml(song.title)}</strong>
            <span>${escapeHtml(song.description)}</span>
          </span>
          <span class="song-range">${escapeHtml(song.range)}</span>
        </button>
      `;
    })
    .join("");
}

function renderLevels() {
  elements.levelList.innerHTML = levels
    .map((level) => {
      const active = level.id === state.level ? " active" : "";
      return `
        <button class="level-button${active}" type="button" data-level="${level.id}">
          <span class="level-number">${level.id}</span>
          <span>
            <strong>${escapeHtml(level.title)}</strong>
            <span>${escapeHtml(level.summary)}</span>
          </span>
          <span class="song-range">Lv.${level.id}</span>
        </button>
      `;
    })
    .join("");
}

function renderPractice() {
  const current = state.sequence[state.currentIndex];
  const total = state.sequence.length || 1;
  const progress = Math.round((state.currentIndex / total) * 100);
  const level = levels.find((item) => item.id === state.level) || levels[0];

  elements.scoreCount.textContent = state.score;
  elements.streakCount.textContent = state.streak;
  elements.levelLabel.textContent = state.level;
  if (elements.homeSongLabel) {
    const homeSong = getCurrentSong();
    elements.homeSongLabel.textContent = `${homeSong?.title || "연습"} · ${level.title}`;
  }
  elements.progressFill.style.width = `${progress}%`;
  elements.tempoValue.textContent = state.tempo;
  elements.tempoSlider.value = state.tempo;
  elements.micButton.classList.toggle("active-input", state.micActive);
  elements.midiButton.classList.toggle("active-input", state.midiActive);
  elements.focusModeButton.textContent = state.focusMode ? "전체 보기" : "큰 화면";
  applyFocusMode();
  applyColorNotes();
  renderSettings();
  renderPracticeOptions();
  renderRhythmPanel();

  if (!current) {
    elements.targetNotes.innerHTML = "";
    elements.handVisualizer.innerHTML = "";
    elements.coachText.textContent = "악보나 계이름을 입력하면 연습을 시작할 수 있습니다.";
    updateKeyHighlights();
    renderStageTrack();
    renderMissions();
    renderParentReport();
    renderMistakes();
    renderSuggestion();
    return;
  }

  const hands = new Set(current.notes.map((item) => item.hand));
  const hand = hands.size > 1 ? "both" : current.notes[0].hand;
  elements.handBadge.textContent = handText(hand);
  elements.handBadge.className = `badge ${hand}`;
  elements.fingerBadge.textContent =
    current.notes.length > 1
      ? "차례대로 누르기"
      : `${current.notes[0].finger}번 ${FINGER_NAMES[current.notes[0].finger]}`;
  elements.fingerBadge.style.setProperty("--finger-color", fingerColorFor(current.notes[0].finger));
  elements.beatBadge.textContent = `${current.duration}박`;
  elements.coachText.textContent =
    state.feedbackText || (current.warmup ? "색깔 손가락을 보고 손 모양 그대로 눌러요." : level.coach);

  elements.targetNotes.innerHTML = current.notes
    .map((item) => {
      const done = state.completedNotes.has(item.note) ? " done" : "";
      return `
        <div class="target-note${done}" style="${noteColorStyle(item.note)}; ${fingerColorStyle(item.finger)}">
          <span class="finger-dot">${item.finger}</span>
          <strong>${escapeHtml(plainSolfege(item.note))}</strong>
          <span>${escapeHtml(handText(item.hand))} ${item.finger}번 · ${escapeHtml(item.note)}</span>
        </div>
      `;
    })
    .join("");

  renderHandVisualizer(current);
  updateKeyHighlights();
  renderStageTrack();
  renderMissions();
  renderParentReport();
  renderMistakes();
  renderSuggestion();
}

function renderSequencePreview() {
  elements.sequencePreview.innerHTML = state.sequence
    .slice(0, 32)
    .map((step, index) => {
      const current = index === state.currentIndex ? " current" : "";
      const label = step.notes.map((item) => plainSolfege(item.note)).join("+");
      const color = step.notes[0] ? noteColorStyle(step.notes[0].note) : "";
      return `<span class="note-chip${current}" style="${color}">${escapeHtml(label)}<small>${step.duration}박</small></span>`;
    })
    .join("");
}

function renderHandVisualizer(step) {
  if (!elements.handVisualizer) return;

  const activeByHand = step.notes.reduce(
    (groups, item) => {
      groups[item.hand].add(item.finger);
      return groups;
    },
    { left: new Set(), right: new Set() },
  );
  const handOrder = activeByHand.left.size && activeByHand.right.size ? ["left", "right"] : [step.notes[0].hand];

  elements.handVisualizer.innerHTML = handOrder
    .map((hand) => {
      const order = hand === "left" ? [5, 4, 3, 2, 1] : [1, 2, 3, 4, 5];
      const active = activeByHand[hand];
      const activeLabel = order
        .filter((finger) => active.has(finger))
        .map((finger) => `${finger}번`)
        .join(" + ");

      return `
        <div class="hand-card ${hand}">
          <div class="hand-title">
            <strong>${escapeHtml(handText(hand))}</strong>
            <span>${escapeHtml(activeLabel || "준비")}</span>
          </div>
          <div class="hand-shape" aria-hidden="true">
            ${order
              .map((finger) => {
                const activeClass = active.has(finger) ? " active" : "";
                return `
                  <span class="hand-finger finger-${finger}${activeClass}" style="${fingerColorStyle(finger)}">
                    <b>${finger}</b>
                    <small>${escapeHtml(FINGER_NAMES[finger])}</small>
                  </span>
                `;
              })
              .join("")}
            <span class="hand-palm"></span>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderKeyboard() {
  const whiteNotes = getWhiteNotes();

  const blackNotes = [];
  whiteNotes.forEach((note, index) => {
    const { letter, octave } = splitNote(note);
    if (["C", "D", "F", "G", "A"].includes(letter)) {
      const blackNote = `${letter}#${octave}`;
      if (getPitch(blackNote) < getPitch("C6")) {
        blackNotes.push({
          note: blackNote,
          left: ((index + 0.68) / whiteNotes.length) * 100,
        });
      }
    }
  });

  elements.keyboard.innerHTML = `
    ${whiteNotes
      .map(
        (note) => `
          <button class="white-key" type="button" data-note="${note}" style="${noteColorStyle(note)}; --key-finger-color: ${fingerColorFor(fingerFor(note, "right"))}">
            <span class="key-finger" aria-hidden="true">${fingerFor(note, "right")}</span>
            <span class="key-color" aria-hidden="true"></span>
            <span class="key-name">${plainSolfege(note)}</span>
            <span class="key-note">${note}</span>
          </button>
        `,
      )
      .join("")}
    ${blackNotes
      .map(
        ({ note, left }) => `
          <button class="black-key" type="button" data-note="${note}" style="left: calc(${left}% - 16px); ${noteColorStyle(note)}">
            <span class="key-color" aria-hidden="true"></span>
            <span class="key-name">${plainSolfege(note)}</span>
            <span class="key-note">${note}</span>
          </button>
        `,
      )
      .join("")}
  `;
}

function renderStageTrack() {
  if (!elements.sheetTrack) return;

  elements.sheetTrack.innerHTML = state.sequence
    .map((step, index) => {
      const status = index < state.currentIndex ? " done" : index === state.currentIndex ? " current" : "";
      const looped = state.loopEnabled && index >= state.loopStart && index <= getLoopEnd() ? " looped" : "";
      const notes = step.notes.map((item) => plainSolfege(item.note)).join("+");
      const hands = [...new Set(step.notes.map((item) => handText(item.hand)))].join("/");
      const color = step.notes[0] ? noteColorStyle(step.notes[0].note) : "";
      return `
        <div class="sheet-note${status}${looped}" data-stage-index="${index}" style="${color}">
          <strong>${escapeHtml(notes)}</strong>
          <small>${escapeHtml(hands)}</small>
        </div>
      `;
    })
    .join("");

  const active = elements.sheetTrack.querySelector(".sheet-note.current");
  const sheetWindow = active?.closest(".sheet-window");
  if (active && sheetWindow) {
    const left = active.offsetLeft - sheetWindow.clientWidth / 2 + active.clientWidth / 2;
    sheetWindow.scrollTo({ left, behavior: "smooth" });
  }

  document.querySelectorAll("[data-stage-mode]").forEach((button) => {
    const selected = button.dataset.stageMode === state.stageMode;
    button.classList.toggle("active", selected);
    button.setAttribute?.("aria-selected", String(selected));
  });
}

function renderMissions() {
  if (!elements.missionList) return;

  const halfSongTarget = Math.max(1, Math.ceil(state.sequence.length / 2));
  const missions = [
    {
      title: "첫 5음 성공",
      detail: `${Math.min(state.score, 5)} / 5`,
      current: Math.min(state.score, 5),
      target: 5,
    },
    {
      title: "동요 절반 가기",
      detail: `${Math.min(state.currentIndex, halfSongTarget)} / ${halfSongTarget}`,
      current: Math.min(state.currentIndex, halfSongTarget),
      target: halfSongTarget,
    },
    {
      title: "양손 단계 열기",
      detail: state.level >= 3 ? "완료" : `Lv.${state.level} / Lv.3`,
      current: Math.min(state.level, 3),
      target: 3,
    },
  ];

  elements.missionList.innerHTML = missions
    .map((mission) => {
      const width = Math.round((mission.current / mission.target) * 100);
      return `
        <div class="mission-card">
          <strong>${escapeHtml(mission.title)}</strong>
          <span>${escapeHtml(mission.detail)}</span>
          <div class="mission-bar"><div style="width: ${width}%"></div></div>
        </div>
      `;
    })
    .join("");
  renderDailyPractice();
}

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function ensureDailyPracticeDate() {
  const today = todayKey();
  if (state.dailyPracticeDate === today) return;
  // 자정을 넘기면 오늘 목표는 0으로 리셋하되, 진행 중인 세션은
  // 강제로 끄지 않고 새 날의 목표를 향해 계속 카운트되게 둔다.
  state.dailyPracticeDate = today;
  state.dailyPracticeSeconds = 0;
}

function formatPracticeTime(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const rest = String(safeSeconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

function renderDailyPractice() {
  ensureDailyPracticeDate();
  const seconds = Math.min(state.dailyPracticeSeconds, DAILY_TARGET_SECONDS);
  const progress = Math.round((seconds / DAILY_TARGET_SECONDS) * 100);
  const completed = seconds >= DAILY_TARGET_SECONDS;
  elements.dailyPracticeText.textContent = `${formatPracticeTime(seconds)} / 3:00`;
  elements.dailyPracticeFill.style.width = `${progress}%`;
  elements.dailyPracticeButton.textContent = completed ? "완료" : state.dailyPracticeActive ? "잠시 멈춤" : "3분 시작";
  elements.dailyPracticeButton.disabled = completed;
  elements.dailyPracticeButton.classList.toggle("active-input", state.dailyPracticeActive && !completed);

  if (!state.stickers.length) {
    elements.stickerShelf.innerHTML = '<span class="empty-state">스티커를 모아봐요.</span>';
    return;
  }

  elements.stickerShelf.innerHTML = state.stickers
    .slice(0, 6)
    .map(
      (sticker) => `
        <span class="sticker-chip">
          <strong>${escapeHtml(sticker.label)}</strong>
          <small>${escapeHtml(sticker.detail)}</small>
        </span>
      `,
    )
    .join("");
}

function addSticker(key, label, detail) {
  if (state.stickers.some((sticker) => sticker.key === key)) return false;
  state.stickers.unshift({
    key,
    label,
    detail,
    date: todayKey(),
  });
  state.stickers = state.stickers.slice(0, 24);
  return true;
}

function awardDailyStickerIfReady() {
  const today = todayKey();
  if (state.dailyPracticeSeconds < DAILY_TARGET_SECONDS || state.dailyRewardedDate === today) return;
  state.dailyRewardedDate = today;
  state.dailyPracticeActive = false;
  addSticker(`daily-${today}`, "3분", "오늘 완성");
  state.feedbackText = "오늘 3분 연습을 완성했어요. 칭찬 스티커를 받았습니다.";
}

function maybeAwardStreakSticker() {
  const today = todayKey();
  if (state.streak >= 5) {
    addSticker(`streak-5-${today}`, "연속", "5번 성공");
  }
  if (state.streak >= 10) {
    addSticker(`streak-10-${today}`, "집중", "10번 성공");
  }
}

function maybeAwardLoopSticker() {
  if (!state.loopEnabled) return;
  addSticker(`loop-${todayKey()}`, "반복", "구간 완주");
}

function addPracticeSeconds(seconds) {
  ensureDailyPracticeDate();
  state.dailyPracticeSeconds = Math.min(DAILY_TARGET_SECONDS, state.dailyPracticeSeconds + seconds);
  awardDailyStickerIfReady();
  renderDailyPractice();
  renderParentReport();
  saveProgress();
}

function markPracticeActivity() {
  ensureDailyPracticeDate();
  if (state.dailyPracticeSeconds < DAILY_TARGET_SECONDS) {
    state.dailyPracticeActive = true;
  }
}

function toggleDailyPractice() {
  ensureDailyPracticeDate();
  if (state.dailyPracticeSeconds >= DAILY_TARGET_SECONDS) return;
  state.dailyPracticeActive = !state.dailyPracticeActive;
  renderDailyPractice();
  saveProgress();
}

function startDailyTicker() {
  if (state.timerId || !window.setInterval) return;
  state.timerId = window.setInterval(() => {
    ensureDailyPracticeDate();
    if (!state.dailyPracticeActive) return;
    if (document.visibilityState === "hidden") return;
    addPracticeSeconds(1);
  }, 1000);
}

function getMistakeEntries() {
  return Object.entries(state.mistakes)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([note, count]) => ({ note, count }));
}

function renderMistakes() {
  const entries = getMistakeEntries().slice(0, 6);
  if (!entries.length) {
    elements.mistakeList.innerHTML = '<span class="empty-state">아직 어려운 음이 없어요.</span>';
  } else {
    elements.mistakeList.innerHTML = entries
      .map(
        ({ note, count }) => `
          <span class="review-chip">${escapeHtml(plainSolfege(note))}<small>${count}</small></span>
        `,
      )
      .join("");
  }

  elements.mistakePracticeButton.disabled = entries.length === 0;
  elements.clearMistakesButton.disabled = entries.length === 0;
}

function renderSuggestion() {
  const entries = getMistakeEntries();
  const song = getCurrentSong();
  const nextLevel = levels.find((item) => item.id === state.level + 1);

  if (song.needsScore) {
    elements.nextSuggestion.textContent = `${song.title} 악보를 넣으면 바로 연습할 수 있어요.`;
    return;
  }

  if (entries.length) {
    elements.nextSuggestion.textContent = `어려운 음 ${plainSolfege(entries[0].note)}부터 복습해요.`;
    return;
  }

  if (state.streak >= 5 && nextLevel) {
    elements.nextSuggestion.textContent = `${nextLevel.title} 단계로 넘어갈 준비가 됐어요.`;
    return;
  }

  elements.nextSuggestion.textContent = `${song.title} ${state.level}단계를 이어서 연습해요.`;
}

function renderPracticeOptions() {
  const total = state.sequence.length;
  const loopEnd = getLoopEnd();
  const loopStartLabel = total ? state.loopStart + 1 : 0;
  const loopEndLabel = total ? loopEnd + 1 : 0;
  const loopPrefix = state.loopEnabled ? "반복 중" : "구간";
  const warmingUp = state.selectedSongId === "warmup";

  elements.waitModeButton.textContent = state.waitMode ? "기다려줘 켬" : "엄격 판정";
  elements.waitModeButton.classList.toggle("active", state.waitMode);
  elements.colorNotesButton.textContent = state.colorNotes ? "색깔 계이름 켬" : "색깔 계이름 끔";
  elements.colorNotesButton.classList.toggle("active", state.colorNotes);
  elements.warmupButton.textContent = warmingUp ? "곡으로 돌아가기" : "손가락 워밍업";
  elements.warmupButton.classList.toggle("active-input", warmingUp);
  elements.warmupNextButton.disabled = !warmingUp;
  elements.countInButton.textContent = state.countInActive ? `${state.countInRemaining || "시작"}...` : "카운트 시작";
  elements.countInButton.disabled = state.countInActive;
  elements.metronomeButton.textContent = state.metronomeActive ? "메트로놈 끄기" : "메트로놈";
  elements.metronomeButton.classList.toggle("active-input", state.metronomeActive);
  elements.loopRangeLabel.textContent = total
    ? `${loopPrefix} ${loopStartLabel}-${loopEndLabel} / ${total}`
    : "전체 구간";
  elements.loopToggleButton.textContent = state.loopEnabled ? "반복 끄기" : "반복 켜기";
  elements.loopToggleButton.classList.toggle("active", state.loopEnabled);
  elements.loopClearButton.disabled =
    !state.loopEnabled && state.loopStart === 0 && (state.loopEnd === null || state.loopEnd === total - 1);

  document.querySelectorAll("[data-tempo-preset]").forEach((button) => {
    button.classList.toggle("active", String(state.tempoPreset) === button.dataset.tempoPreset);
  });
}

function renderRhythmPanel() {
  const stats = normalizeRhythmStats(state.rhythmStats);
  elements.timingFeedback.textContent = state.timingFeedback.label;
  elements.timingFeedback.className = `timing-${state.timingFeedback.kind}`;
  elements.timingDetail.textContent = state.timingFeedback.detail;
  elements.perfectTimingCount.textContent = stats.perfect;
  elements.earlyTimingCount.textContent = stats.early;
  elements.lateTimingCount.textContent = stats.late;
}

function topFingerMistake() {
  return Object.entries(state.fingerMistakes)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([finger, count]) => ({ finger: Number(finger), count }))[0];
}

function rhythmAccuracyPercent() {
  const stats = normalizeRhythmStats(state.rhythmStats);
  return stats.total ? Math.round((stats.perfect / stats.total) * 100) : 0;
}

function renderParentReport() {
  if (!elements.parentReportList) return;
  ensureDailyPracticeDate();
  const topMistake = getMistakeEntries()[0];
  const topFinger = topFingerMistake();
  const rhythmPercent = rhythmAccuracyPercent();
  const reportItems = [
    {
      title: "오늘 시간",
      value: formatPracticeTime(state.dailyPracticeSeconds),
      detail: `${Math.min(100, Math.round((state.dailyPracticeSeconds / DAILY_TARGET_SECONDS) * 100))}% 완료`,
    },
    {
      title: "성공/연속",
      value: `${state.score} / ${state.streak}`,
      detail: state.streak >= 5 ? "다음 단계 가능" : "짧게 반복 추천",
    },
    {
      title: "박자 정확도",
      value: `${rhythmPercent}%`,
      detail: normalizeRhythmStats(state.rhythmStats).total ? "딱 맞음 기준" : "카운트 시작 필요",
    },
    {
      title: "어려운 음",
      value: topMistake ? plainSolfege(topMistake.note) : "-",
      detail: topMistake ? `${topMistake.count}번 복습` : "아직 없음",
    },
    {
      title: "어려운 손가락",
      value: topFinger ? `${topFinger.finger}번` : "-",
      detail: topFinger ? `${FINGER_NAMES[topFinger.finger]} ${topFinger.count}번` : "아직 없음",
    },
  ];

  elements.parentReportList.innerHTML = reportItems
    .map(
      (item) => `
        <div class="parent-report-card">
          <span>${escapeHtml(item.title)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          <small>${escapeHtml(item.detail)}</small>
        </div>
      `,
    )
    .join("");
}

function recordMistake(expectedNotes) {
  [...new Set(expectedNotes)].forEach((note) => {
    state.mistakes[note] = (state.mistakes[note] || 0) + 1;
  });
}

function recordFingerMistakes(expectedNotes) {
  const current = state.sequence[state.currentIndex];
  if (!current) return;
  const expected = new Set(expectedNotes);
  current.notes
    .filter((item) => expected.has(item.note))
    .forEach((item) => {
      state.fingerMistakes[item.finger] = (state.fingerMistakes[item.finger] || 0) + 1;
    });
}

function resolveMistake(note) {
  if (!state.mistakes[note]) return;
  state.mistakes[note] -= 1;
  if (state.mistakes[note] <= 0) {
    delete state.mistakes[note];
  }
}

function clearMistakes() {
  state.mistakes = {};
  state.fingerMistakes = {};
  saveProgress();
  renderMistakes();
  renderParentReport();
  renderSuggestion();
}

function buildReviewSong() {
  const entries = getMistakeEntries().slice(0, 6);
  if (!entries.length) return null;

  const melodyItems = entries.flatMap(({ note }, entryIndex) =>
    [0, 1].map((repeatIndex) => {
      const index = entryIndex * 2 + repeatIndex;
      return {
        note,
        duration: 1,
        measure: Math.floor(index / 4) + 1,
        beat: (index % 4) + 1,
      };
    }),
  );

  return {
    id: "review",
    title: "어려운 음 연습",
    mark: "복",
    range: buildRangeLabel(melodyItems),
    key: "C",
    description: "틀렸던 음만 모아 다시 연습해요.",
    melody: melodyItems,
  };
}

function startMistakePractice() {
  const reviewSong = buildReviewSong();
  if (!reviewSong) return;

  state.reviewSong = reviewSong;
  state.selectedSongId = "review";
  state.currentIndex = 0;
  state.stageMode = "teach";
  resetLoopRange();
  loadCurrentSong();
  saveProgress();
  document.querySelector(".lesson-panel")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
}

function quickStart() {
  if (getMistakeEntries().length) {
    startMistakePractice();
    return;
  }

  if (state.streak >= 5 && state.level < levels.length) {
    state.level += 1;
    state.currentIndex = 0;
    resetLoopRange();
    loadCurrentSong();
  } else {
    restartStep();
  }

  saveProgress();
  document.querySelector(".lesson-panel")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
}

function buildWarmupSong(drillIndex = state.warmupDrillIndex) {
  const index = ((Number(drillIndex) || 0) + WARMUP_DRILLS.length) % WARMUP_DRILLS.length;
  const drill = WARMUP_DRILLS[index];
  const melodyItems = drill.notes.map((note, itemIndex) => ({
    note,
    hand: drill.hand,
    finger: drill.fingers[itemIndex] || 1,
    duration: itemIndex === drill.notes.length - 1 ? 2 : 1,
    measure: Math.floor(itemIndex / 4) + 1,
    beat: (itemIndex % 4) + 1,
  }));

  return {
    id: "warmup",
    title: `손가락 워밍업`,
    mark: "손",
    range: drill.title,
    key: "C",
    type: "warmup",
    warmupDrillId: drill.id,
    description: drill.summary,
    melody: melodyItems,
  };
}

function startFingerWarmup() {
  if (state.selectedSongId === "warmup") {
    returnFromWarmup();
    return;
  }

  state.warmupReturn = {
    selectedSongId: state.selectedSongId,
    level: state.level,
    currentIndex: state.currentIndex,
  };
  state.warmupSong = buildWarmupSong();
  state.selectedSongId = "warmup";
  state.currentIndex = 0;
  state.stageMode = "teach";
  state.feedbackText = "손가락 색깔과 번호를 먼저 맞춰보고 곡으로 들어가요.";
  resetLoopRange();
  loadCurrentSong();
  saveProgress();
  document.querySelector(".lesson-panel")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
}

function nextWarmupDrill() {
  state.warmupDrillIndex = (state.warmupDrillIndex + 1) % WARMUP_DRILLS.length;
  state.warmupSong = buildWarmupSong();
  state.currentIndex = 0;
  state.stageMode = "teach";
  state.feedbackText = `${WARMUP_DRILLS[state.warmupDrillIndex].title} 드릴로 바꿨어요.`;
  if (state.selectedSongId !== "warmup") {
    state.selectedSongId = "warmup";
  }
  resetLoopRange();
  loadCurrentSong();
  saveProgress();
}

function returnFromWarmup() {
  const target = state.warmupReturn || { selectedSongId: "twinkle", level: state.level, currentIndex: 0 };
  state.selectedSongId = target.selectedSongId || "twinkle";
  state.level = target.level || state.level;
  state.currentIndex = target.currentIndex || 0;
  state.warmupReturn = null;
  state.feedbackText = "워밍업을 마치고 곡 연습으로 돌아왔어요.";
  resetLoopRange();
  loadCurrentSong(state.currentIndex);
  saveProgress();
}

function applyFocusMode() {
  document.body?.classList.toggle("focus-mode", state.focusMode);
}

function toggleFocusMode() {
  state.focusMode = !state.focusMode;
  applyFocusMode();
  renderPractice();
  saveProgress();
}

function applyTheme() {
  document.body?.setAttribute("data-theme", state.theme);
}

function applyColorNotes() {
  document.body?.classList.toggle("color-notes", state.colorNotes);
}

function renderSettings() {
  applyTheme();
  document.querySelectorAll("[data-theme-option]").forEach((button) => {
    button.classList.toggle("active", button.dataset.themeOption === state.theme);
  });
  document.querySelectorAll("[data-sound-style]").forEach((button) => {
    button.classList.toggle("active", button.dataset.soundStyle === state.soundStyle);
  });
  elements.volumeSlider.value = Math.round(state.soundVolume * 100);
  elements.volumeValue.textContent = Math.round(state.soundVolume * 100);
}

function setTheme(theme) {
  state.theme = THEME_IDS.includes(theme) ? theme : "pop";
  renderSettings();
  saveProgress();
}

function setSoundStyle(style) {
  state.soundStyle = SOUND_STYLES[style] ? style : "soft";
  renderSettings();
  saveProgress();
}

function setSoundVolume(value) {
  state.soundVolume = Math.min(1, Math.max(0.3, Number(value) / 100));
  renderSettings();
  saveProgress();
}

function setTempo(value, preset = "custom") {
  state.tempo = Math.min(132, Math.max(50, Number(value) || BASE_TEMPO));
  state.tempoPreset = preset;
  if (state.metronomeActive) {
    if (state.metronomeTimerId && window.clearInterval) {
      window.clearInterval(state.metronomeTimerId);
    }
    state.metronomeTimerId = null;
    startMetronome();
  }
  renderPractice();
  saveProgress();
}

function setTempoPreset(percent) {
  const preset = Number(percent);
  if (!TEMPO_PRESETS.includes(preset)) return;
  setTempo(Math.round((BASE_TEMPO * preset) / 100), preset);
}

function toggleWaitMode() {
  state.waitMode = !state.waitMode;
  state.feedbackText = state.waitMode
    ? "기다려줘 모드가 켜졌어요. 틀려도 천천히 다시 누르면 됩니다."
    : "엄격 판정으로 바꿨어요. 틀린 음은 오답으로 기록됩니다.";
  renderPractice();
  saveProgress();
}

function toggleColorNotes() {
  state.colorNotes = !state.colorNotes;
  applyColorNotes();
  renderPractice();
  saveProgress();
}

function getLoopEnd() {
  if (!state.sequence.length) return 0;
  return state.loopEnd === null ? state.sequence.length - 1 : state.loopEnd;
}

function normalizeLoopRange() {
  const total = state.sequence.length;
  if (!total) {
    state.loopStart = 0;
    state.loopEnd = null;
    state.loopEnabled = false;
    return;
  }

  const last = total - 1;
  state.loopStart = Math.min(last, Math.max(0, Number(state.loopStart) || 0));
  state.loopEnd = state.loopEnd === null ? null : Math.min(last, Math.max(0, Number(state.loopEnd) || 0));

  if (state.loopEnd !== null && state.loopStart > state.loopEnd) {
    const nextStart = state.loopEnd;
    state.loopEnd = state.loopStart;
    state.loopStart = nextStart;
  }

  if (state.currentIndex < 0 || state.currentIndex > last) {
    state.currentIndex = 0;
  }
}

function resetLoopRange() {
  state.loopStart = 0;
  state.loopEnd = null;
  state.loopEnabled = false;
}

function setLoopBoundary(boundary) {
  if (!state.sequence.length) return;
  if (boundary === "start") {
    state.loopStart = state.currentIndex;
  } else {
    state.loopEnd = state.currentIndex;
  }
  normalizeLoopRange();
  state.feedbackText = `구간 ${state.loopStart + 1}-${getLoopEnd() + 1}을 지정했어요.`;
  renderPractice();
  renderStageTrack();
  saveProgress();
}

function toggleLoop() {
  if (!state.sequence.length) return;
  normalizeLoopRange();
  state.loopEnabled = !state.loopEnabled;
  if (state.loopEnabled && (state.currentIndex < state.loopStart || state.currentIndex > getLoopEnd())) {
    state.currentIndex = state.loopStart;
    resetPendingNotes();
  }
  state.feedbackText = state.loopEnabled ? "구간 반복을 시작했어요." : "구간 반복을 멈췄어요.";
  renderPractice();
  renderSequencePreview();
  renderStageTrack();
  saveProgress();
}

function clearLoopRange() {
  resetLoopRange();
  state.feedbackText = "전체 구간 연습으로 돌아왔어요.";
  renderPractice();
  renderStageTrack();
  saveProgress();
}

function normalizeRhythmStats(stats) {
  return {
    perfect: Number(stats?.perfect) || 0,
    early: Number(stats?.early) || 0,
    late: Number(stats?.late) || 0,
    total: Number(stats?.total) || 0,
  };
}

function beatMs() {
  return 60000 / Math.max(40, state.tempo);
}

function outputLatencyMs() {
  const ctx = state.audioContext;
  if (!ctx) return 0;
  return (ctx.outputLatency || ctx.baseLatency || 0) * 1000;
}

function setTimingFeedback(kind, label, detail) {
  state.timingFeedback = { kind, label, detail };
  renderRhythmPanel();
}

function armRhythmStep(delayMs = beatMs()) {
  state.rhythmActive = true;
  const latency = outputLatencyMs();
  if (state.metronomeActive && state.nextTickAt) {
    // 메트로놈이 켜져 있으면 다음 실제 클릭 시각에 목표를 스냅한다.
    // 그래야 "딱 맞음"이 아이가 듣는 박자에 맞췄다는 뜻이 된다.
    let due = state.nextTickAt;
    const now = Date.now();
    while (due <= now + 1) due += beatMs();
    state.stepDueAt = due + latency;
  } else {
    state.stepDueAt = Date.now() + delayMs + latency;
  }
  state.stepTimingRecorded = false;
  setTimingFeedback("ready", "박자 준비", "다음 박자에 맞춰 눌러보세요.");
}

function classifyTiming(now = Date.now()) {
  if (!state.rhythmActive || !state.stepDueAt) return null;
  const delta = now - state.stepDueAt;
  const threshold = Math.max(150, Math.min(280, beatMs() * 0.28));
  if (Math.abs(delta) <= threshold) {
    return { kind: "perfect", label: "딱 맞음", detail: "좋아요. 박자 안에 들어왔어요." };
  }
  if (delta < 0) {
    return { kind: "early", label: "조금 빨라요", detail: "다음에는 박자 소리를 조금 더 기다려요." };
  }
  return { kind: "late", label: "조금 늦어요", detail: "다음에는 손가락을 미리 준비해요." };
}

function recordTimingHit(now = Date.now()) {
  if (state.stepTimingRecorded) return;
  const result = classifyTiming(now);
  if (!result) return;
  const stats = normalizeRhythmStats(state.rhythmStats);
  stats[result.kind] += 1;
  stats.total += 1;
  state.rhythmStats = stats;
  state.stepTimingRecorded = true;
  setTimingFeedback(result.kind, result.label, result.detail);
  maybeAwardRhythmSticker();
}

function maybeAwardRhythmSticker() {
  const stats = normalizeRhythmStats(state.rhythmStats);
  if (stats.perfect >= 5) {
    addSticker(`rhythm-5-${todayKey()}`, "박자", "딱 맞음 5번");
  }
}

function playMetronomeClick(accent = false) {
  const note = accent ? "C6" : "G5";
  // 선택한 악기 음색(긴 릴리즈) 대신 짧고 또렷한 전용 클릭음을 쓴다.
  playNote(note, accent ? 0.05 : 0.04, 0, "click");
}

function flashMetronome() {
  document.body?.classList.add("metronome-flash");
  window.setTimeout(() => document.body?.classList.remove("metronome-flash"), 120);
}

function metronomeTick() {
  state.metronomeBeat = (state.metronomeBeat % 4) + 1;
  playMetronomeClick(state.metronomeBeat === 1);
  flashMetronome();
}

function scheduleMetronomeTick() {
  if (!window.setTimeout) return;
  const delay = Math.max(0, state.nextTickAt - Date.now());
  state.metronomeTimerId = window.setTimeout(() => {
    if (!state.metronomeActive) return; // 정지 직후 대기 중이던 콜백이 메트로놈을 되살리지 않게
    metronomeTick();
    state.nextTickAt += beatMs();
    scheduleMetronomeTick();
  }, delay);
}

function startMetronome() {
  if (state.metronomeTimerId || !window.setTimeout) return;
  clearCountIn({ keepRhythm: false });
  state.metronomeActive = true;
  state.rhythmActive = true;
  state.metronomeBeat = 0;
  // 자가 보정 스케줄러: 각 틱을 절대 시각 기준으로 다시 잡아 누적 드리프트를 막는다.
  state.nextTickAt = Date.now();
  metronomeTick();
  state.nextTickAt += beatMs();
  scheduleMetronomeTick();
  armRhythmStep();
  renderPractice();
  saveProgress();
}

function stopMetronome({ keepRhythm = false } = {}) {
  state.metronomeActive = false;
  if (state.metronomeTimerId) {
    window.clearTimeout?.(state.metronomeTimerId);
    window.clearInterval?.(state.metronomeTimerId);
  }
  state.metronomeTimerId = null;
  state.metronomeBeat = 0;
  state.nextTickAt = 0;
  if (!keepRhythm) {
    state.rhythmActive = false;
    state.stepDueAt = 0;
    state.stepTimingRecorded = false;
  }
  setTimingFeedback("ready", "박자 준비", keepRhythm ? "카운트가 끝나면 첫 음을 눌러요." : "메트로놈이 꺼졌습니다.");
  renderPractice();
  saveProgress();
}

function toggleMetronome() {
  if (state.metronomeActive) {
    stopMetronome();
  } else {
    startMetronome();
  }
}

function clearCountIn({ keepRhythm = false } = {}) {
  if (state.countInTimerId && window.clearInterval) {
    window.clearInterval(state.countInTimerId);
  }
  state.countInTimerId = null;
  state.countInActive = false;
  state.countInRemaining = 0;
  if (!keepRhythm) {
    state.rhythmActive = false;
    state.stepDueAt = 0;
    state.stepTimingRecorded = false;
  }
}

function startCountIn() {
  if (state.countInActive) return;
  if (state.metronomeActive) {
    stopMetronome({ keepRhythm: true });
  }
  clearCountIn({ keepRhythm: false });
  state.countInActive = true;
  state.countInRemaining = COUNT_IN_BEATS;
  state.rhythmActive = true;
  setTimingFeedback("ready", `${state.countInRemaining}`, "카운트가 끝나면 첫 음을 눌러요.");
  playMetronomeClick(true);
  flashMetronome();
  renderPractice();

  state.countInTimerId = window.setInterval(() => {
    state.countInRemaining -= 1;
    if (state.countInRemaining > 0) {
      setTimingFeedback("ready", `${state.countInRemaining}`, "카운트가 끝나면 첫 음을 눌러요.");
      playMetronomeClick(state.countInRemaining === COUNT_IN_BEATS);
      flashMetronome();
      renderPracticeOptions();
      return;
    }

    clearCountIn({ keepRhythm: true });
    armRhythmStep(0);
    setTimingFeedback("ready", "시작", "지금 첫 음을 눌러보세요.");
    renderPractice();
    saveProgress();
  }, beatMs());
}

function previewSound() {
  const current = state.sequence[state.currentIndex];
  const note = current?.notes?.[0]?.note || "C4";
  playNote(note, 0.55);
}

function updateKeyHighlights() {
  const expected = new Set(state.pendingNotes);
  const current = state.sequence[state.currentIndex];
  const currentNotes = current?.notes || [];
  document.querySelectorAll("[data-note]").forEach((key) => {
    const note = key.dataset.note;
    const target = currentNotes.find((item) => item.note === note && expected.has(note));
    key.classList.toggle("expected", Boolean(target));
    key.classList.toggle("finger-target", Boolean(target));
    if (target) {
      key.dataset.finger = `${target.finger}번`;
      key.style?.setProperty?.("--finger-color", fingerColorFor(target.finger));
    } else {
      delete key.dataset.finger;
      key.style?.removeProperty?.("--finger-color");
    }
  });
  scrollCurrentKeyIntoView();
}

// 현재 칠 음의 건반이 가로 스크롤 영역 밖이면 가운데로 끌어온다.
// (가로 모드에서 건반이 화면보다 넓어 현재 음이 안 보일 수 있어 특히 필요)
function scrollCurrentKeyIntoView() {
  const scroller = elements.keyboard?.closest?.(".keyboard-scroll");
  if (!scroller || typeof scroller.scrollTo !== "function") return;
  const note = state.sequence[state.currentIndex]?.notes?.[0]?.note;
  if (!note) return;
  const key = elements.keyboard.querySelector?.(`[data-note="${note}"]`);
  if (!key || typeof key.offsetLeft !== "number") return;
  // 레이아웃이 확정된 다음 프레임에서 위치를 읽어 정확히 가운데로 맞춘다.
  const align = () => {
    const keyLeft = key.offsetLeft;
    const keyWidth = key.clientWidth || 0;
    const viewLeft = scroller.scrollLeft || 0;
    const viewWidth = scroller.clientWidth || 0;
    if (keyLeft < viewLeft + 24 || keyLeft + keyWidth > viewLeft + viewWidth - 24) {
      const left = Math.max(0, keyLeft - viewWidth / 2 + keyWidth / 2);
      scroller.scrollTo({ left, behavior: "smooth" });
    }
  };
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(align);
  } else {
    align();
  }
}

function ensureAudioContext() {
  if (!state.audioContext) {
    const AudioEngine = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioEngine();
  }
  if (state.audioContext.state === "suspended") {
    state.audioContext.resume();
  }
  return state.audioContext;
}

function playNote(note, duration = 0.4, when = 0, styleName = state.soundStyle) {
  const context = ensureAudioContext();
  const style = SOUND_STYLES[styleName] || SOUND_STYLES.soft;
  const start = context.currentTime + when;
  const end = start + duration;
  const baseFrequency = frequencyFor(note);
  const masterGain = context.createGain();
  const peakGain = style.gain * state.soundVolume;
  const releaseStart = Math.max(start + style.attack + 0.02, end - style.release);

  masterGain.gain.setValueAtTime(0.0001, start);
  masterGain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peakGain), start + style.attack);
  masterGain.gain.linearRampToValueAtTime(Math.max(0.0002, peakGain * style.sustain), releaseStart);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, end + style.release);
  masterGain.connect(context.destination);

  style.harmonics.forEach((harmonic) => {
    const oscillator = context.createOscillator();
    const harmonicGain = context.createGain();
    oscillator.type = style.type;
    oscillator.frequency.setValueAtTime(baseFrequency * harmonic.ratio, start);
    harmonicGain.gain.setValueAtTime(harmonic.gain, start);
    oscillator.connect(harmonicGain);
    harmonicGain.connect(masterGain);
    oscillator.start(start);
    oscillator.stop(end + style.release + 0.03);
  });
}

function playCurrentStep() {
  const current = state.sequence[state.currentIndex];
  if (!current) return;
  markPracticeActivity();
  const beatSeconds = 60 / state.tempo;
  current.notes.forEach((item) => {
    playNote(item.note, beatSeconds * Math.max(0.55, current.duration));
    flashKey(item.note);
  });
}

function playGuide() {
  markPracticeActivity();
  const startIndex = state.currentIndex;
  const guideEnd = state.loopEnabled ? Math.min(getLoopEnd() + 1, state.sequence.length) : Math.min(startIndex + 8, state.sequence.length);
  const guide = state.waitMode
    ? state.sequence.slice(startIndex, Math.min(startIndex + 1, state.sequence.length))
    : state.sequence.slice(startIndex, guideEnd);
  let offset = 0;
  const beatSeconds = 60 / state.tempo;

  guide.forEach((step) => {
    step.notes.forEach((item) => playNote(item.note, beatSeconds * Math.max(0.45, step.duration), offset));
    offset += beatSeconds * step.duration;
  });
}

function flashKey(note) {
  const key = document.querySelector(`[data-note="${note}"]`);
  if (!key) return;
  key.classList.add("pressed");
  window.setTimeout(() => key.classList.remove("pressed"), 160);
}

function handleNotePress(note) {
  markPracticeActivity();
  playNote(note);
  flashKey(note);
  judgeNote(note);
}

function judgeNote(note) {
  if (!state.sequence.length) return;
  // 한 스텝을 막 끝낸 직후(다음 스텝으로 넘어가기 전 420ms) 들어온 입력은
  // 무시한다. 그러지 않으면 빠르게 치는 아이가 직전 스텝에 대해
  // 거짓 실수가 기록되고 연속(streak)이 초기화된다.
  if (Date.now() < state.recognitionLockUntil) return;

  const current = state.sequence[state.currentIndex];
  const expected = current.notes.map((item) => item.note);

  if (state.countInActive) {
    state.feedbackText = "카운트가 끝난 뒤 첫 음을 눌러요.";
    setTimingFeedback("ready", `${state.countInRemaining}`, "아직 시작 전입니다.");
    renderPractice();
    return;
  }

  if (state.pendingNotes.has(note)) {
    recordTimingHit();
    state.pendingNotes.delete(note);
    state.completedNotes.add(note);
    resolveMistake(note);
    state.feedbackText = "";
    elements.promptCard.classList.remove("miss");
    elements.promptCard.classList.add("correct");
    window.setTimeout(() => elements.promptCard.classList.remove("correct"), 340);
    renderPractice();

    if (state.pendingNotes.size === 0) {
      state.score += 1;
      state.streak += 1;
      maybeAwardStreakSticker();
      state.recognitionLockUntil = Date.now() + 600;
      saveProgress();
      window.setTimeout(nextStep, 420);
    }
    return;
  }

  if (!expected.includes(note)) {
    if (!state.waitMode) {
      state.streak = 0;
    }
    recordMistake(state.pendingNotes.size ? [...state.pendingNotes] : expected);
    recordFingerMistakes(state.pendingNotes.size ? [...state.pendingNotes] : expected);
    state.feedbackText = state.waitMode
      ? `${expected.map(plainSolfege).join(", ")}을 기다리고 있어요. 천천히 다시 눌러보세요.`
      : `이번에는 ${expected.map(plainSolfege).join(", ")}을 눌러볼까요?`;
    elements.promptCard.classList.remove("correct");
    elements.promptCard.classList.add("miss");
    window.setTimeout(() => elements.promptCard.classList.remove("miss"), 280);
    saveProgress();
    renderPractice();
  }
}

function handleDetectedNote(note, source = "mic") {
  const now = Date.now();
  if (now < state.recognitionLockUntil) return;
  // 마이크는 한 음을 매 프레임 다시 감지하므로 같은 음 디바운스가 필요하지만,
  // MIDI note-on은 이미 개별 이벤트라 디바운스하면 같은 음 반복('도 도')이 막힌다.
  if (source !== "midi" && state.lastRecognized.note === note && now - state.lastRecognized.time < 700) return;

  markPracticeActivity();
  state.lastRecognized = { note, time: now };
  elements.detectedNote.textContent = plainSolfege(note);
  elements.listenStatus.textContent = `${note} 감지됨`;
  flashKey(note);
  judgeNote(note);
}

function nextStep() {
  if (!state.sequence.length) return;
  const loopEnd = getLoopEnd();
  const shouldWrapLoop = state.loopEnabled && state.currentIndex >= loopEnd;
  state.currentIndex = shouldWrapLoop ? state.loopStart : (state.currentIndex + 1) % state.sequence.length;
  if (shouldWrapLoop) {
    maybeAwardLoopSticker();
  }
  state.feedbackText = "";
  resetPendingNotes();
  renderPractice();
  renderSequencePreview();
  saveProgress();
}

function restartStep() {
  state.feedbackText = "";
  resetPendingNotes();
  renderPractice();
  playCurrentStep();
}

function parseNoteToken(rawToken, defaultOctave = 4) {
  const cleaned = rawToken
    .trim()
    .replace(/[(){}\[\],]/g, "")
    .replace("♯", "#")
    .replace("＃", "#")
    .replace("♭", "b");
  if (!cleaned || cleaned === "-" || cleaned.toLowerCase() === "rest") return null;

  const token = cleaned.replace(/\/\d+$/, "");
  // 끝자리 숫자는 옥타브로 떼어낸다 — 단, 한 글자(예: "1")뿐인 토큰은
  // 숫자보 계이름(1~7)이므로 옥타브로 보지 않는다.
  const octaveMatch = token.length > 1 ? token.match(/(\d)$/) : null;
  const octave = octaveMatch ? Number(octaveMatch[1]) : defaultOctave;
  let body = octaveMatch ? token.slice(0, -1) : token;
  let accidental = "";
  if (body.endsWith("#")) {
    accidental = "#";
    body = body.slice(0, -1);
  } else if (body.endsWith("b") && body.length > 1) {
    accidental = "b";
    body = body.slice(0, -1);
  }
  const base = body;

  let letter = null;
  const upper = base.toUpperCase();
  const lower = base.toLowerCase();

  if (/^[A-G]$/.test(upper)) {
    letter = upper;
  } else if (HANGUL_TO_NOTE[base]) {
    letter = HANGUL_TO_NOTE[base];
  } else if (SOLFEGE_TO_NOTE[lower]) {
    letter = SOLFEGE_TO_NOTE[lower];
  } else if (NUMBER_TO_NOTE[base]) {
    letter = NUMBER_TO_NOTE[base];
  }

  if (!letter) return null;

  let pitch = `${letter}${accidental}`;
  if (accidental === "b") {
    // Cb(=B), Fb(=E)는 옥타브까지 내려가야 정확해서 범위 밖으로 보고 거부한다.
    if (letter === "C" || letter === "F") return null;
    pitch = flatToSharp(letter);
  }

  const note = `${pitch}${octave}`;
  if (!isPlayable(note)) return null;
  return { note };
}

function flatToSharp(letter) {
  const flats = {
    D: "C#",
    E: "D#",
    G: "F#",
    A: "G#",
    B: "A#",
  };
  return flats[letter] || letter;
}

function noteFromFrequency(frequency) {
  const midi = Math.round(12 * Math.log2(frequency / 440) + 69);
  const pitch = CHROMATIC[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  const note = `${pitch}${octave}`;
  return isPlayable(note) ? note : null;
}

function detectPitch(buffer, sampleRate) {
  let rms = 0;
  for (let i = 0; i < buffer.length; i += 1) {
    rms += buffer[i] * buffer[i];
  }
  rms = Math.sqrt(rms / buffer.length);
  if (rms < 0.012) return null;

  let bestOffset = -1;
  let bestCorrelation = 0;
  const minOffset = Math.floor(sampleRate / 1200);
  const maxOffset = Math.floor(sampleRate / 60);

  for (let offset = minOffset; offset <= maxOffset; offset += 1) {
    let correlation = 0;
    for (let i = 0; i < buffer.length - offset; i += 1) {
      correlation += 1 - Math.abs(buffer[i] - buffer[i + offset]);
    }
    correlation /= buffer.length - offset;

    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
  }

  if (bestCorrelation < 0.86 || bestOffset <= 0) return null;
  return sampleRate / bestOffset;
}

async function toggleMic() {
  if (state.micActive) {
    stopMic();
    return;
  }
  if (state.micStarting) return; // 빠른 더블탭으로 getUserMedia 가 두 번 떠 스트림이 새는 것을 막는다

  if (!navigator.mediaDevices?.getUserMedia) {
    elements.listenStatus.textContent = "이 브라우저는 마이크 입력을 지원하지 않습니다.";
    return;
  }

  state.micStarting = true;
  try {
    const context = ensureAudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });
    const analyser = context.createAnalyser();
    analyser.fftSize = 2048;
    context.createMediaStreamSource(stream).connect(analyser);

    state.micStream = stream;
    state.micAnalyser = analyser;
    state.micActive = true;
    elements.listenStatus.textContent = "마이크가 켜졌습니다. 실제 피아노를 쳐보세요.";
    listenToMic();
    renderPractice();
  } catch {
    elements.listenStatus.textContent = "마이크 권한을 받을 수 없습니다. 브라우저 설정을 확인해 주세요.";
  } finally {
    state.micStarting = false;
  }
}

function stopMic() {
  state.micActive = false;
  if (state.micFrameId) cancelAnimationFrame(state.micFrameId);
  state.micFrameId = null;
  state.micStream?.getTracks().forEach((track) => track.stop());
  state.micStream = null;
  state.micAnalyser = null;
  elements.listenStatus.textContent = "마이크가 꺼졌습니다.";
  elements.detectedNote.textContent = "--";
  renderPractice();
}

function listenToMic() {
  if (!state.micActive || !state.micAnalyser || !state.audioContext) return;
  const buffer = new Float32Array(state.micAnalyser.fftSize);
  state.micAnalyser.getFloatTimeDomainData(buffer);

  const frequency = detectPitch(buffer, state.audioContext.sampleRate);
  const note = frequency ? noteFromFrequency(frequency) : null;
  if (note) handleDetectedNote(note);

  state.micFrameId = requestAnimationFrame(listenToMic);
}

async function toggleMidi() {
  if (state.midiActive) {
    setMidiActive(false);
    elements.listenStatus.textContent = "MIDI 입력이 꺼졌습니다.";
    return;
  }

  if (!navigator.requestMIDIAccess) {
    elements.listenStatus.textContent = "이 브라우저는 Web MIDI를 지원하지 않습니다.";
    return;
  }

  try {
    state.midiAccess = await navigator.requestMIDIAccess();
    // 권한 허용 후 키보드를 꽂는 흐름을 위해, 포트가 바뀌면 입력을 다시 배선한다.
    state.midiAccess.onstatechange = () => {
      if (state.midiActive) setMidiActive(true);
    };
    setMidiActive(true);
    elements.listenStatus.textContent = "MIDI 키보드가 연결되었습니다.";
  } catch {
    elements.listenStatus.textContent = "MIDI 권한을 받을 수 없습니다.";
  }
}

function setMidiActive(active) {
  state.midiActive = active;
  if (!state.midiAccess) return;
  state.midiAccess.inputs.forEach((input) => {
    input.onmidimessage = active ? handleMidiMessage : null;
  });
  renderPractice();
}

function handleMidiMessage(message) {
  const [command, midiNote, velocity] = message.data;
  const isNoteOn = (command & 0xf0) === 0x90 && velocity > 0;
  if (!isNoteOn) return;

  const pitch = CHROMATIC[midiNote % 12];
  const octave = Math.floor(midiNote / 12) - 1;
  const note = `${pitch}${octave}`;
  if (isPlayable(note)) handleDetectedNote(note, "midi");
}

function parseScore(scoreText) {
  let measure = 1;
  let beat = 1;
  const tokens = scoreText
    .replace(/\n/g, " ")
    .replace(/\|/g, " | ")
    .split(/\s+/)
    .filter(Boolean);

  return tokens.flatMap((token) => {
    if (token === "|") {
      measure += 1;
      beat = 1;
      return [];
    }

    const durationMatch = token.match(/[:/](\d+(?:\.\d+)?)$/);
    const duration = durationMatch ? Math.min(8, Number(durationMatch[1]) || 1) : 1;
    const noteToken = durationMatch ? token.slice(0, durationMatch.index) : token;
    const parsed = parseNoteToken(noteToken, 4);
    if (!parsed) return [];

    const item = {
      note: parsed.note,
      duration,
      measure,
      beat,
    };
    beat += duration;
    return [item];
  });
}

function normalizeSearchText(value) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function findSongByInput(value) {
  const query = normalizeSearchText(value);
  if (!query) return null;
  return songs.find((song) => normalizeSearchText(song.title).includes(query) || query.includes(normalizeSearchText(song.title)));
}

function generateCustom() {
  const titleInput = elements.customTitle.value.trim();
  const scoreInput = elements.customScore.value.trim();
  const namedSong = findSongByInput(titleInput) || findSongByInput(scoreInput);

  if (namedSong && !scoreInput) {
    state.selectedSongId = namedSong.id;
    state.currentIndex = 0;
    resetLoopRange();
    loadCurrentSong();
    renderGeneratedNotes(namedSong.melody);
    elements.customHint.textContent = namedSong.needsScore
      ? `${namedSong.title} 악보나 계이름을 입력해 주세요.`
      : `${namedSong.title} 동요를 불러왔습니다.`;
    return;
  }

  const source = scoreInput || titleInput;
  const parsed = parseScore(source);

  if (parsed.length === 0) {
    elements.customHint.textContent = "읽을 수 있는 계이름이 없습니다. 도 레 미 또는 C D E처럼 입력해 주세요.";
    elements.generatedNotes.innerHTML = "";
    return;
  }

  state.customSong = {
    id: "custom",
    title: titleInput || "내가 만든 동요",
    mark: titleInput ? [...titleInput][0] : "내",
    range: buildRangeLabel(parsed),
    key: "C",
    description: namedSong ? namedSong.description : "입력한 악보로 만든 연습곡",
    melody: parsed,
  };
  state.selectedSongId = "custom";
  state.currentIndex = 0;
  resetLoopRange();
  elements.customHint.textContent = `${parsed.length}개의 계이름을 만들었습니다.`;
  renderGeneratedNotes(parsed);
  loadCurrentSong();
}

function buildRangeLabel(items) {
  const pitches = items.map((item) => getPitch(item.note));
  const low = items.find((item) => getPitch(item.note) === Math.min(...pitches));
  const high = items.find((item) => getPitch(item.note) === Math.max(...pitches));
  return `${plainSolfege(low.note)}-${plainSolfege(high.note)}`;
}

function renderGeneratedNotes(items) {
  elements.generatedNotes.innerHTML = items
    .map(
      (item) =>
        `<span class="note-chip" style="${noteColorStyle(item.note)}">${escapeHtml(plainSolfege(item.note))}<small>${escapeHtml(item.note)}</small></span>`,
    )
    .join("");
}

function loadExample() {
  elements.customTitle.value = "새 연습곡";
  elements.customScore.value = "도 도 솔 솔 라 라 솔:2 | 파 파 미 미 레 레 도:2";
  generateCustom();
}

function saveProgress() {
  const progress = {
    selectedSongId: state.selectedSongId,
    level: state.level,
    currentIndex: state.currentIndex,
    score: state.score,
    streak: state.streak,
    tempo: state.tempo,
    stageMode: state.stageMode,
    customSong: state.customSong,
    reviewSong: state.reviewSong,
    mistakes: state.mistakes,
    fingerMistakes: state.fingerMistakes,
    focusMode: state.focusMode,
    theme: state.theme,
    soundStyle: state.soundStyle,
    soundVolume: state.soundVolume,
    waitMode: state.waitMode,
    colorNotes: state.colorNotes,
    tempoPreset: state.tempoPreset,
    loopStart: state.loopStart,
    loopEnd: state.loopEnd,
    loopEnabled: state.loopEnabled,
    dailyPracticeDate: state.dailyPracticeDate,
    dailyPracticeSeconds: state.dailyPracticeSeconds,
    dailyRewardedDate: state.dailyRewardedDate,
    stickers: state.stickers,
    rhythmStats: state.rhythmStats,
    warmupSong: state.warmupSong,
    warmupDrillIndex: state.warmupDrillIndex,
    warmupReturn: state.warmupReturn,
  };
  try {
    localStorage.setItem("little-piano-progress", JSON.stringify(progress));
  } catch {
    // 저장 공간 초과/비활성(사파리 비공개 모드 등) — 진행 흐름은 막지 않는다.
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem("little-piano-progress");
    if (!raw) return;
    const progress = JSON.parse(raw);
    state.selectedSongId = progress.selectedSongId || state.selectedSongId;
    state.level = progress.level || state.level;
    state.currentIndex = progress.currentIndex || 0;
    state.score = progress.score || 0;
    state.streak = progress.streak || 0;
    state.tempo = progress.tempo || 88;
    state.stageMode = progress.stageMode || "teach";
    // 구버전/손상된 곡 객체(melody 배열 없음)가 복원돼 init()이 크래시하지 않도록 검증.
    const validSong = (s) => (s && Array.isArray(s.melody) ? s : null);
    state.customSong = validSong(progress.customSong);
    state.reviewSong = validSong(progress.reviewSong);
    state.mistakes = progress.mistakes || {};
    state.fingerMistakes = progress.fingerMistakes || {};
    state.focusMode = Boolean(progress.focusMode);
    state.theme = THEME_IDS.includes(progress.theme) ? progress.theme : "pop";
    state.soundStyle = SOUND_STYLES[progress.soundStyle] ? progress.soundStyle : "soft";
    state.soundVolume = Number(progress.soundVolume) || 0.8;
    state.waitMode = progress.waitMode !== false;
    state.colorNotes = progress.colorNotes !== false;
    state.tempoPreset = TEMPO_PRESETS.includes(Number(progress.tempoPreset)) ? Number(progress.tempoPreset) : "custom";
    state.loopStart = Number(progress.loopStart) || 0;
    state.loopEnd = progress.loopEnd === null || progress.loopEnd === undefined ? null : Number(progress.loopEnd) || 0;
    state.loopEnabled = Boolean(progress.loopEnabled);
    state.dailyPracticeDate = progress.dailyPracticeDate || todayKey();
    state.dailyPracticeSeconds = Math.min(DAILY_TARGET_SECONDS, Number(progress.dailyPracticeSeconds) || 0);
    state.dailyPracticeActive = false;
    state.dailyRewardedDate = progress.dailyRewardedDate || "";
    state.stickers = Array.isArray(progress.stickers) ? progress.stickers.slice(0, 24) : [];
    state.rhythmStats = normalizeRhythmStats(progress.rhythmStats);
    state.rhythmActive = false;
    state.countInActive = false;
    state.metronomeActive = false;
    state.warmupSong = validSong(progress.warmupSong);
    state.warmupDrillIndex = Number(progress.warmupDrillIndex) || 0;
    state.warmupReturn = progress.warmupReturn || null;
    if (state.selectedSongId === "warmup" && !state.warmupSong) {
      state.warmupSong = buildWarmupSong();
    }
    ensureDailyPracticeDate();
  } catch {
    localStorage.removeItem("little-piano-progress");
  }
}

function resetProgress() {
  state.score = 0;
  state.streak = 0;
  state.currentIndex = 0;
  state.mistakes = {};
  state.fingerMistakes = {};
  state.feedbackText = "";
  state.rhythmActive = false;
  state.rhythmStats = { perfect: 0, early: 0, late: 0, total: 0 };
  state.stepDueAt = 0;
  state.stepTimingRecorded = false;
  clearCountIn();
  stopMetronome();
  state.timingFeedback = {
    kind: "ready",
    label: "박자 준비",
    detail: "카운트 시작을 누르면 박자 점수를 기록합니다.",
  };
  state.dailyPracticeSeconds = 0;
  state.dailyPracticeActive = false;
  state.dailyRewardedDate = "";
  resetPendingNotes();
  saveProgress();
  renderPractice();
  renderSequencePreview();
}

function showView(name) {
  state.view = name;
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.dataset.view === name);
  });
  if (document.body) {
    document.body.dataset.view = name;
  }
  window.scrollTo?.({ top: 0, behavior: "smooth" });
  if (name === "play") {
    renderPractice();
    renderStageTrack();
    updateKeyHighlights();
  } else if (name === "songs") {
    renderSequencePreview();
  } else if (name === "mission") {
    renderMissions();
    renderMistakes();
    renderSuggestion();
    renderDailyPractice();
  } else if (name === "report") {
    renderParentReport();
  }
}

function bindEvents() {
  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.go));
  });

  elements.songList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-song-id]");
    if (!button) return;
    state.selectedSongId = button.dataset.songId;
    state.currentIndex = 0;
    state.feedbackText = "";
    resetLoopRange();
    saveProgress();
    loadCurrentSong();
  });

  elements.levelList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-level]");
    if (!button) return;
    state.level = Number(button.dataset.level);
    state.currentIndex = 0;
    state.feedbackText = "";
    resetLoopRange();
    saveProgress();
    loadCurrentSong();
  });

  elements.keyboard.addEventListener("pointerdown", (event) => {
    const key = event.target.closest("[data-note]");
    if (!key) return;
    key.setPointerCapture?.(event.pointerId);
    handleNotePress(key.dataset.note);
  });

  // 키보드 사용자: 건반에 Tab으로 이동 후 Enter/Space로 연주.
  elements.keyboard.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const key = event.target.closest?.("[data-note]");
    if (!key) return;
    event.preventDefault();
    handleNotePress(key.dataset.note);
  });

  elements.playGuideButton.addEventListener("click", playGuide);
  elements.repeatButton.addEventListener("click", restartStep);
  elements.nextButton.addEventListener("click", nextStep);
  elements.countInButton.addEventListener("click", startCountIn);
  elements.metronomeButton.addEventListener("click", toggleMetronome);
  elements.quickStartButton.addEventListener("click", quickStart);
  elements.focusModeButton.addEventListener("click", toggleFocusMode);
  elements.warmupButton.addEventListener("click", startFingerWarmup);
  elements.warmupNextButton.addEventListener("click", nextWarmupDrill);
  elements.waitModeButton.addEventListener("click", toggleWaitMode);
  elements.colorNotesButton.addEventListener("click", toggleColorNotes);
  elements.loopStartButton.addEventListener("click", () => setLoopBoundary("start"));
  elements.loopEndButton.addEventListener("click", () => setLoopBoundary("end"));
  elements.loopToggleButton.addEventListener("click", toggleLoop);
  elements.loopClearButton.addEventListener("click", clearLoopRange);
  elements.dailyPracticeButton.addEventListener("click", toggleDailyPractice);
  elements.micButton.addEventListener("click", toggleMic);
  elements.midiButton.addEventListener("click", toggleMidi);
  elements.mistakePracticeButton.addEventListener("click", startMistakePractice);
  elements.clearMistakesButton.addEventListener("click", clearMistakes);
  elements.resetProgressButton.addEventListener("click", resetProgress);
  elements.generateButton.addEventListener("click", generateCustom);
  elements.loadExampleButton.addEventListener("click", loadExample);
  elements.soundPreviewButton.addEventListener("click", previewSound);

  document.querySelectorAll("[data-theme-option]").forEach((button) => {
    button.addEventListener("click", () => setTheme(button.dataset.themeOption));
  });

  document.querySelectorAll("[data-sound-style]").forEach((button) => {
    button.addEventListener("click", () => {
      setSoundStyle(button.dataset.soundStyle);
      previewSound();
    });
  });

  elements.tempoSlider.addEventListener("input", (event) => {
    setTempo(event.target.value);
  });

  elements.volumeSlider.addEventListener("input", (event) => {
    setSoundVolume(event.target.value);
  });

  document.querySelectorAll("[data-stage-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.stageMode = button.dataset.stageMode;
      if (state.stageMode === "listen") playGuide();
      if (state.stageMode === "teach") restartStep();
      if (state.stageMode === "play") {
        elements.coachText.textContent = "움직이는 악보를 보며 끝까지 연주해요.";
      }
      renderStageTrack();
      saveProgress();
    });
  });

  document.querySelectorAll("[data-tempo-preset]").forEach((button) => {
    button.addEventListener("click", () => setTempoPreset(button.dataset.tempoPreset));
  });

  window.addEventListener("keydown", (event) => {
    if (state.view !== "play") return;
    if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
    const target = event.target;
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
      return;
    }
    const desktopMap = {
      a: "C4",
      s: "D4",
      d: "E4",
      f: "F4",
      g: "G4",
      h: "A4",
      j: "B4",
      k: "C5",
      w: "C#4",
      e: "D#4",
      t: "F#4",
      y: "G#4",
      u: "A#4",
    };
    const note = desktopMap[event.key.toLowerCase()];
    if (note) {
      event.preventDefault();
      handleNotePress(note);
    }
  });
}

function init() {
  loadProgress();
  applyTheme();
  applyColorNotes();
  const savedIndex = state.currentIndex;
  renderKeyboard();
  renderSongs();
  renderLevels();
  bindEvents();
  loadCurrentSong(savedIndex);
  if (state.currentIndex >= state.sequence.length) {
    state.currentIndex = 0;
  }
  resetPendingNotes();
  renderPractice();
  renderSequencePreview();
  startDailyTicker();
  showView("home");
}

init();
