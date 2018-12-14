/* eslint-disable no-undef */
import { addVoiceReducer } from '..';

describe('Test addVoiceReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      result: '',
      loading: false,
      error: null,
    };
  });

  it('ADD_VOICE_BEGIN case reducer for addVoice', () => {
    state = addVoiceReducer(state, {
      type: 'ADD_VOICE_BEGIN',
    });

    expect(state).toEqual({
      result: '',
      loading: true,
      error: null,
    });
  });

  it('ADD_VOICE_SUCCESS case reducer for addVoice', () => {
    state = addVoiceReducer(state, {
      type: 'ADD_VOICE_SUCCESS',
      result: 'Youpi !',
    });

    expect(state).toEqual({
      result: 'Youpi !',
      loading: false,
      error: null,
    });
  });

  it('ADD_VOICE_FAILURE case reducer for addVoice', () => {
    state = addVoiceReducer(state, {
      type: 'ADD_VOICE_FAILURE',
      error: 'message',
    });

    expect(state).toEqual({
      result: '',
      loading: false,
      error: 'message',
    });
  });

  it('default case reducer for addVoice', () => {
    state = addVoiceReducer(undefined, { type: 'DUMMY_ACTION' });
    expect(state).toEqual(state);
  });
});
