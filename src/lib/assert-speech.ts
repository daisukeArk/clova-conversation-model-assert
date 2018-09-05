import { AssertTypes } from './enums/assert-types';
import { SpeechTypes } from './enums/speech-types';
import { IRequestHistory } from './request-history';

export function assertSpeech(
  assertType: AssertTypes,
  speechType: SpeechTypes,
  history: IRequestHistory,
  expectedValues: string | string[]
) {
  switch ((<any>history.response.response.outputSpeech).type) {
    case 'SimpleSpeech':
      if (speechType !== SpeechTypes.SimpleSpeech) {
        throw new Error('SimpleSpeech Type Mismatch.');
      }
      break;
    case 'SpeechList':
      if (speechType !== SpeechTypes.SpeechList) {
        throw new Error('SpeechList Type Mismatch.');
      }
      break;
    case 'SpeechSet':
      if (
        speechType !== SpeechTypes.SpeechSetBrief &&
        speechType !== SpeechTypes.SpeechSetVerbose &&
        speechType !== SpeechTypes.SpeechSetVerboseList
      ) {
        throw new Error('SpeechSet Type Mismatch.');
      }
      break;
    default:
      throw new Error('Speech Type Mismatch.');
  }

  assertByType(assertType, speechType, history, expectedValues);
}

function assertByType(assertType: AssertTypes, speechType: SpeechTypes, history: IRequestHistory, expectedValues: string | string[]) {
  switch (assertType) {
    case AssertTypes.Equal:
      assertEqual(speechType, history, expectedValues);
      break;
    default:
      throw new Error('Assert Type Mismatch.');
  }
}

function assertEqual(speechType: SpeechTypes, history: IRequestHistory, expectedValues: string | string[]) {
  switch (speechType) {
    case SpeechTypes.SimpleSpeech:
      expect((<any>history.response.response.outputSpeech).values.value).toBe(expectedValues);
      break;
    case SpeechTypes.SpeechList:
      expect((<any>history.response.response.outputSpeech).values.map((speechInfo: { [key: string]: string }) => {
        return speechInfo.value;
      }))
        .toEqual(expectedValues);
      break;
    case SpeechTypes.SpeechSetBrief:
      expect((<any>history.response.response.outputSpeech).brief.value).toBe(expectedValues);
      break;
    case SpeechTypes.SpeechSetVerbose:
      expect((<any>history.response.response.outputSpeech).verbose.values.value).toBe(expectedValues);
      break;
    case SpeechTypes.SpeechSetVerboseList:
      expect((<any>history.response.response.outputSpeech).verbose.values.map((speechInfo: { [key: string]: string }) => {
        return speechInfo.value;
      }))
        .toEqual(expectedValues);
      break;
    default:
      throw new Error('Speech Type Mismatch.');
  }
}
