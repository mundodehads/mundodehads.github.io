const TYPEWRITER_PHRASES = ['Henrique Silva', 'mundodehads'] as const;
const TYPING_DELAY_IN_MILLISECONDS = 140;
const DELETING_DELAY_IN_MILLISECONDS = 70;
const HOLD_DELAY_IN_MILLISECONDS = 1800;
const LAST_PHRASE_INDEX = TYPEWRITER_PHRASES.length - 1;

export interface TypewriterState {
  readonly phraseIndex: number;
  readonly characterCount: number;
  readonly isDeleting: boolean;
}

export interface TypewriterStep {
  readonly state: TypewriterState;
  readonly delayInMilliseconds: number;
}

export const INITIAL_TYPEWRITER_STEP: TypewriterStep = {
  state: {
    phraseIndex: LAST_PHRASE_INDEX,
    characterCount: TYPEWRITER_PHRASES[LAST_PHRASE_INDEX].length,
    isDeleting: false,
  },
  delayInMilliseconds: HOLD_DELAY_IN_MILLISECONDS,
};

function phraseOf(state: TypewriterState): string {
  return TYPEWRITER_PHRASES[state.phraseIndex];
}

function typingStep(state: TypewriterState): TypewriterStep {
  if (state.characterCount < phraseOf(state).length) {
    return {
      state: { ...state, characterCount: state.characterCount + 1 },
      delayInMilliseconds: TYPING_DELAY_IN_MILLISECONDS,
    };
  }
  return { state: { ...state, isDeleting: true }, delayInMilliseconds: HOLD_DELAY_IN_MILLISECONDS };
}

function deletingStep(state: TypewriterState): TypewriterStep {
  if (state.characterCount > 0) {
    return {
      state: { ...state, characterCount: state.characterCount - 1 },
      delayInMilliseconds: DELETING_DELAY_IN_MILLISECONDS,
    };
  }
  const nextPhraseIndex = (state.phraseIndex + 1) % TYPEWRITER_PHRASES.length;
  return {
    state: { phraseIndex: nextPhraseIndex, characterCount: 0, isDeleting: false },
    delayInMilliseconds: TYPING_DELAY_IN_MILLISECONDS,
  };
}

export function nextTypewriterStep(state: TypewriterState): TypewriterStep {
  return state.isDeleting ? deletingStep(state) : typingStep(state);
}

export function visibleTextOf(state: TypewriterState): string {
  return phraseOf(state).slice(0, state.characterCount);
}
