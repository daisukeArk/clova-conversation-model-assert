import * as CEK from '@line/clova-cek-sdk-nodejs';
import * as Util from 'util';
import { assertSpeech } from './lib/assert-speech';
import { IConversation } from './lib/conversation';
import { IConversationCondition } from './lib/conversation-condition';
import { AssertTypes } from './lib/enums/assert-types';
import { SpeechTypes } from './lib/enums/speech-types';
import { buildRequest } from './lib/request-builder';
import { IRequestCondition } from './lib/request-condition';
import { IRequestHistory } from './lib/request-history';

export class Conversation {
  private constructor() { }

  public static init(appCondition: IConversationCondition): IConversation {
    const requestHistories: IRequestHistory[] = [];
    let requestCounter = -1;
    let promises = Promise.resolve<CEK.Clova.ResponseBody>({
      version: '1.0',
      response: {
        card: {},
        directives: [],
        outputSpeech: {},
        shouldEndSession: false
      },
      sessionAttributes: {}
    });

    return {
      launchRequest(): IConversation {
        return this.requestIntent('LaunchRequest');
      },
      requestIntent(intentName: string, reqCondition?: IRequestCondition): IConversation {
        requestCounter++;
        requestHistories[requestCounter] = requestHistories[requestCounter] || { tests: [] };
        requestHistories[requestCounter].intentName = intentName;

        const task = (currentIndex: number) => {
          promises = promises
            .then(async (previousResponse: CEK.Clova.ResponseBody): Promise<CEK.Clova.ResponseBody> => {
              const requestBody = buildRequest(appCondition, requestHistories[currentIndex].intentName, previousResponse, reqCondition);
              let responseBody: any;

              await appCondition.handler({ body: requestBody }, { json: (value: CEK.Clova.ResponseBody) => { responseBody = value; } });
              Object.assign(requestHistories[currentIndex], { request: requestBody, response: responseBody });

              // console.log(`requestBody: ${Util.inspect(requestBody, { depth: null })}\n`);
              // console.log(`responseBody: ${Util.inspect(responseBody, { depth: null })}\n`);
              return responseBody;
            });
        };
        task(requestCounter);

        return this;
      },
      sessionEndedRequest(): IConversation {
        return this.requestIntent('SessionEndedRequest');
      },
      equal(expectedValue: string): IConversation {
        requestHistories[requestCounter].tests.push({
          description: `equal SimpleSpeech: ${expectedValue}`,
          test: (history: IRequestHistory): void => {
            assertSpeech(AssertTypes.Equal, SpeechTypes.SimpleSpeech, history, expectedValue);
          }
        });
        return this;
      },
      equalList(expectedValues: string[]): IConversation {
        requestHistories[requestCounter].tests.push({
          description: `equal SpeechList: ${Util.inspect(expectedValues, { depth: null })}`,
          test: (history: IRequestHistory): void => {
            assertSpeech(AssertTypes.Equal, SpeechTypes.SpeechList, history, expectedValues);
          }
        });
        return this;
      },
      equalSetBrief(expectedValue: string): IConversation {
        requestHistories[requestCounter].tests.push({
          description: `equal SpeechSet Brief: ${Util.inspect(expectedValue, { depth: null })}`,
          test: (history: IRequestHistory): void => {
            assertSpeech(AssertTypes.Equal, SpeechTypes.SpeechSetBrief, history, expectedValue);
          }
        });
        return this;
      },
      equalSetVerbose(expectedValue: string): IConversation {
        requestHistories[requestCounter].tests.push({
          description: `equal SpeechSet Verbose: ${Util.inspect(expectedValue, { depth: null })}`,
          test: (history: IRequestHistory): void => {
            assertSpeech(AssertTypes.Equal, SpeechTypes.SpeechSetVerbose, history, expectedValue);
          }
        });
        return this;
      },
      equalSetVerboseList(expectedValues: string[]): IConversation {
        requestHistories[requestCounter].tests.push({
          description: `equal SpeechSet VerboseList: ${Util.inspect(expectedValues, { depth: null })}`,
          test: (history: IRequestHistory): void => {
            assertSpeech(AssertTypes.Equal, SpeechTypes.SpeechSetVerboseList, history, expectedValues);
          }
        });
        return this;
      },
      async end(): Promise<void> {
        describe(appCondition.description, () => {
          beforeAll(async () => {
            await promises;
          });

          for (const history of requestHistories) {
            if (history.tests.length <= 0) {
              continue;
            }

            describe(history.intentName, () => {
              history.tests.forEach((test) => {
                it(`${test.description}`, () => {
                  test.test(history);
                });
              });
            });
          }
        });
      }
    };
  }
}

export {
  IConversationCondition,
  IRequestCondition
};
