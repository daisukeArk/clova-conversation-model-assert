import { assertSpeech } from '../src/lib/assert-speech';
import { AssertTypes } from '../src/lib/enums/assert-types';
import { SpeechTypes } from '../src/lib/enums/speech-types';

describe('assertSpeech function', () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('should receive "SimpleSpeech" mismatch error from assert', () => {
    let err: Error;

    try {
      assertSpeech(
        AssertTypes.None,
        SpeechTypes.None,
        {
          request: <any>{},
          intentName: '',
          response: <any>{ response: { outputSpeech: { type: 'SimpleSpeech' } } },
          tests: []
        },
        'value'
      );
    } catch (error) {
      err = error;
    }

    expect(err.message).toBe('SimpleSpeech Type Mismatch.');
  });

  it('should receive "SpeechList" mismatch error from assert', () => {
    let err: Error;

    try {
      assertSpeech(
        AssertTypes.None,
        SpeechTypes.None,
        {
          request: <any>{},
          intentName: '',
          response: <any>{ response: { outputSpeech: { type: 'SpeechList' } } },
          tests: []
        },
        'value'
      );
    } catch (error) {
      err = error;
    }

    expect(err.message).toBe('SpeechList Type Mismatch.');
  });

  it('should receive "SpeechSet" mismatch error from assert', () => {
    let err: Error;

    try {
      assertSpeech(
        AssertTypes.None,
        SpeechTypes.None,
        {
          request: <any>{},
          intentName: '',
          response: <any>{ response: { outputSpeech: { type: 'SpeechSet' } } },
          tests: []
        },
        'value'
      );
    } catch (error) {
      err = error;
    }

    expect(err.message).toBe('SpeechSet Type Mismatch.');
  });

  it('should receive mismatch error from assert', () => {
    let err: Error;

    try {
      assertSpeech(
        AssertTypes.None,
        SpeechTypes.None,
        {
          request: <any>{},
          intentName: '',
          response: <any>{ response: { outputSpeech: { type: 'None' } } },
          tests: []
        },
        'value'
      );
    } catch (error) {
      err = error;
    }

    expect(err.message).toBe('Speech Type Mismatch.');
  });

  it('should receive "AssertType.Equal" mismatch error from assert', () => {
    let err: Error;

    try {
      assertSpeech(
        AssertTypes.None,
        SpeechTypes.SimpleSpeech,
        {
          request: <any>{},
          intentName: '',
          response: <any>{ response: { outputSpeech: { type: 'SimpleSpeech' } } },
          tests: []
        },
        'value'
      );
    } catch (error) {
      err = error;
    }

    expect(err.message).toBe('Assert Type Mismatch.');
  });
});
