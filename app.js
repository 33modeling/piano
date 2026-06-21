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
const SOLFEGE = {
  C: "도",
  "C#": "도#",
  Db: "레♭",
  D: "레",
  "D#": "레#",
  Eb: "미♭",
  E: "미",
  F: "파",
  "F#": "파#",
  Gb: "솔♭",
  G: "솔",
  "G#": "솔#",
  Ab: "라♭",
  A: "라",
  "A#": "라#",
  Bb: "시♭",
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
    range: "악보 입력",
    key: "C",
    description: "작사 조원경 · 작곡 김진성",
    needsScore: true,
    melody: [],
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
  midiAccess: null,
  midiActive: false,
  lastRecognized: { note: "", time: 0 },
  recognitionLockUntil: 0,
  stageMode: "teach",
  customSong: null,
  reviewSong: null,
  mistakes: {},
  focusMode: false,
};

const elements = {
  scoreCount: document.querySelector("#scoreCount"),
  streakCount: document.querySelector("#streakCount"),
  levelLabel: document.querySelector("#levelLabel"),
  currentSongTitle: document.querySelector("#currentSongTitle"),
  handBadge: document.querySelector("#handBadge"),
  fingerBadge: document.querySelector("#fingerBadge"),
  beatBadge: document.querySelector("#beatBadge"),
  targetNotes: document.querySelector("#targetNotes"),
  coachText: document.querySelector("#coachText"),
  progressFill: document.querySelector("#progressFill"),
  promptCard: document.querySelector("#promptCard"),
  nextSuggestion: document.querySelector("#nextSuggestion"),
  quickStartButton: document.querySelector("#quickStartButton"),
  focusModeButton: document.querySelector("#focusModeButton"),
  playGuideButton: document.querySelector("#playGuideButton"),
  repeatButton: document.querySelector("#repeatButton"),
  nextButton: document.querySelector("#nextButton"),
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

function solfegeFor(note) {
  const { pitch, octave } = splitNote(note);
  return `${SOLFEGE[pitch] || pitch}${octave}`;
}

function plainSolfege(note) {
  const { pitch } = splitNote(note);
  return SOLFEGE[pitch] || pitch;
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

function fingerText(note, hand) {
  const finger = fingerFor(note, hand);
  return `${finger}번 ${FINGER_NAMES[finger]}`;
}

function createPracticeNote(note, hand) {
  return {
    note,
    hand,
    finger: fingerFor(note, hand),
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

function getPlayableNotes() {
  const notes = [];
  for (let octave = 3; octave <= 6; octave += 1) {
    NOTE_NAMES.forEach((letter) => {
      const note = `${letter}${octave}`;
      if (getPitch(note) <= getPitch("C6")) notes.push(note);
    });
  }
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
  if (level === 1) {
    return song.melody.map((item) => ({
      ...item,
      notes: [createPracticeNote(item.note, "right")],
    }));
  }

  if (level === 2) {
    return song.melody.map((item) => ({
      ...item,
      notes: [createPracticeNote(transposeOctave(item.note, -1), "left")],
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
      notes.unshift(createPracticeNote(root, "left"), createPracticeNote(fifthFor(root), "left"));
    }
    return { ...item, notes };
  });
}

function setSequence(sequence, startIndex = 0) {
  state.sequence = sequence;
  state.currentIndex = Math.min(startIndex, Math.max(0, sequence.length - 1));
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
  elements.progressFill.style.width = `${progress}%`;
  elements.tempoValue.textContent = state.tempo;
  elements.tempoSlider.value = state.tempo;
  elements.micButton.classList.toggle("active-input", state.micActive);
  elements.midiButton.classList.toggle("active-input", state.midiActive);
  elements.focusModeButton.textContent = state.focusMode ? "전체 보기" : "큰 화면";
  applyFocusMode();

  if (!current) {
    elements.targetNotes.innerHTML = "";
    elements.coachText.textContent = "악보나 계이름을 입력하면 연습을 시작할 수 있습니다.";
    updateKeyHighlights();
    renderStageTrack();
    renderMissions();
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
  elements.beatBadge.textContent = `${current.duration}박`;
  elements.coachText.textContent = level.coach;

  elements.targetNotes.innerHTML = current.notes
    .map((item) => {
      const done = state.completedNotes.has(item.note) ? " done" : "";
      return `
        <div class="target-note${done}">
          <strong>${escapeHtml(plainSolfege(item.note))}</strong>
          <span>${escapeHtml(handText(item.hand))} ${item.finger}번 · ${escapeHtml(item.note)}</span>
        </div>
      `;
    })
    .join("");

  updateKeyHighlights();
  renderStageTrack();
  renderMissions();
  renderMistakes();
  renderSuggestion();
}

function renderSequencePreview() {
  elements.sequencePreview.innerHTML = state.sequence
    .slice(0, 32)
    .map((step, index) => {
      const current = index === state.currentIndex ? " current" : "";
      const label = step.notes.map((item) => plainSolfege(item.note)).join("+");
      return `<span class="note-chip${current}">${escapeHtml(label)}<small>${step.duration}박</small></span>`;
    })
    .join("");
}

function renderKeyboard() {
  const whiteNotes = [];
  for (let octave = 3; octave <= 6; octave += 1) {
    NOTE_NAMES.forEach((letter) => {
      const note = `${letter}${octave}`;
      if (getPitch(note) <= getPitch("C6")) whiteNotes.push(note);
    });
  }

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
          <button class="white-key" type="button" data-note="${note}">
            <span class="key-name">${plainSolfege(note)}</span>
            <span class="key-note">${note}</span>
          </button>
        `,
      )
      .join("")}
    ${blackNotes
      .map(
        ({ note, left }) => `
          <button class="black-key" type="button" data-note="${note}" style="left: calc(${left}% - 16px)">
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
      const notes = step.notes.map((item) => plainSolfege(item.note)).join("+");
      const hands = [...new Set(step.notes.map((item) => handText(item.hand)))].join("/");
      return `
        <div class="sheet-note${status}" data-stage-index="${index}">
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
    button.classList.toggle("active", button.dataset.stageMode === state.stageMode);
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

function recordMistake(expectedNotes) {
  [...new Set(expectedNotes)].forEach((note) => {
    state.mistakes[note] = (state.mistakes[note] || 0) + 1;
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
  saveProgress();
  renderMistakes();
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
    loadCurrentSong();
  } else {
    restartStep();
  }

  saveProgress();
  document.querySelector(".lesson-panel")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
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

function updateKeyHighlights() {
  const expected = new Set(state.pendingNotes);
  document.querySelectorAll("[data-note]").forEach((key) => {
    const note = key.dataset.note;
    key.classList.toggle("expected", expected.has(note));
  });
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

function playNote(note, duration = 0.4, when = 0) {
  const context = ensureAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime + when;
  const end = start + duration;

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequencyFor(note), start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.24, start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(end + 0.02);
}

function playCurrentStep() {
  const current = state.sequence[state.currentIndex];
  if (!current) return;
  const beatSeconds = 60 / state.tempo;
  current.notes.forEach((item) => {
    playNote(item.note, beatSeconds * Math.max(0.55, current.duration));
    flashKey(item.note);
  });
}

function playGuide() {
  const startIndex = state.currentIndex;
  const guide = state.sequence.slice(startIndex, Math.min(startIndex + 8, state.sequence.length));
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
  playNote(note);
  flashKey(note);
  judgeNote(note);
}

function judgeNote(note) {
  if (!state.sequence.length) return;

  const current = state.sequence[state.currentIndex];
  const expected = current.notes.map((item) => item.note);

  if (state.pendingNotes.has(note)) {
    state.pendingNotes.delete(note);
    state.completedNotes.add(note);
    resolveMistake(note);
    elements.promptCard.classList.remove("miss");
    elements.promptCard.classList.add("correct");
    window.setTimeout(() => elements.promptCard.classList.remove("correct"), 340);
    renderPractice();

    if (state.pendingNotes.size === 0) {
      state.score += 1;
      state.streak += 1;
      state.recognitionLockUntil = Date.now() + 600;
      saveProgress();
      window.setTimeout(nextStep, 420);
    }
    return;
  }

  if (!expected.includes(note)) {
    state.streak = 0;
    recordMistake(state.pendingNotes.size ? [...state.pendingNotes] : expected);
    elements.coachText.textContent = `이번에는 ${expected.map(plainSolfege).join(", ")}을 눌러볼까요?`;
    elements.promptCard.classList.remove("correct");
    elements.promptCard.classList.add("miss");
    window.setTimeout(() => elements.promptCard.classList.remove("miss"), 280);
    saveProgress();
    renderPractice();
  }
}

function handleDetectedNote(note) {
  const now = Date.now();
  if (now < state.recognitionLockUntil) return;
  if (state.lastRecognized.note === note && now - state.lastRecognized.time < 700) return;

  state.lastRecognized = { note, time: now };
  elements.detectedNote.textContent = plainSolfege(note);
  elements.listenStatus.textContent = `${note} 감지됨`;
  flashKey(note);
  judgeNote(note);
}

function nextStep() {
  if (!state.sequence.length) return;
  state.currentIndex = (state.currentIndex + 1) % state.sequence.length;
  resetPendingNotes();
  renderPractice();
  renderSequencePreview();
  saveProgress();
}

function restartStep() {
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
  const octaveMatch = token.match(/(\d)$/);
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

  if (!navigator.mediaDevices?.getUserMedia) {
    elements.listenStatus.textContent = "이 브라우저는 마이크 입력을 지원하지 않습니다.";
    return;
  }

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
  if (isPlayable(note)) handleDetectedNote(note);
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
    const duration = durationMatch ? Number(durationMatch[1]) : 1;
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
    .map((item) => `<span class="note-chip">${escapeHtml(plainSolfege(item.note))}<small>${escapeHtml(item.note)}</small></span>`)
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
    focusMode: state.focusMode,
  };
  localStorage.setItem("little-piano-progress", JSON.stringify(progress));
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
    state.customSong = progress.customSong || null;
    state.reviewSong = progress.reviewSong || null;
    state.mistakes = progress.mistakes || {};
    state.focusMode = Boolean(progress.focusMode);
  } catch {
    localStorage.removeItem("little-piano-progress");
  }
}

function resetProgress() {
  state.score = 0;
  state.streak = 0;
  state.currentIndex = 0;
  state.mistakes = {};
  resetPendingNotes();
  saveProgress();
  renderPractice();
  renderSequencePreview();
}

function bindEvents() {
  elements.songList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-song-id]");
    if (!button) return;
    state.selectedSongId = button.dataset.songId;
    state.currentIndex = 0;
    saveProgress();
    loadCurrentSong();
  });

  elements.levelList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-level]");
    if (!button) return;
    state.level = Number(button.dataset.level);
    state.currentIndex = 0;
    saveProgress();
    loadCurrentSong();
  });

  elements.keyboard.addEventListener("pointerdown", (event) => {
    const key = event.target.closest("[data-note]");
    if (!key) return;
    key.setPointerCapture?.(event.pointerId);
    handleNotePress(key.dataset.note);
  });

  elements.playGuideButton.addEventListener("click", playGuide);
  elements.repeatButton.addEventListener("click", restartStep);
  elements.nextButton.addEventListener("click", nextStep);
  elements.quickStartButton.addEventListener("click", quickStart);
  elements.focusModeButton.addEventListener("click", toggleFocusMode);
  elements.micButton.addEventListener("click", toggleMic);
  elements.midiButton.addEventListener("click", toggleMidi);
  elements.mistakePracticeButton.addEventListener("click", startMistakePractice);
  elements.clearMistakesButton.addEventListener("click", clearMistakes);
  elements.resetProgressButton.addEventListener("click", resetProgress);
  elements.generateButton.addEventListener("click", generateCustom);
  elements.loadExampleButton.addEventListener("click", loadExample);

  elements.tempoSlider.addEventListener("input", (event) => {
    state.tempo = Number(event.target.value);
    elements.tempoValue.textContent = state.tempo;
    saveProgress();
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

  window.addEventListener("keydown", (event) => {
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
    if (note) handleNotePress(note);
  });
}

function init() {
  loadProgress();
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
}

init();
