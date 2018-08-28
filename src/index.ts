import * as CEK from '@line/clova-cek-sdk-nodejs';
import * as Util from 'util';
import UUID from 'uuid';
import { IConversation } from './lib/conversation';
import { IConversationCondition } from './lib/conversation-condition';
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

    //#region buildRequest
    function buildRequest(
      intentName: string,
      previousResponse: CEK.Clova.ResponseBody,
      reqCondition?: IRequestCondition
    ): CEK.Clova.RequestBody {
      let request: CEK.Clova.Request;

      switch (intentName) {
        case 'LaunchRequest':
          request = {
            type: 'LaunchRequest'
          };
          break;
        case 'SessionEndedRequest':
          request = {
            type: 'SessionEndedRequest'
          };
          break;
        default:
          request = {
            type: 'IntentRequest',
            intent: {
              name: intentName,
              slots: reqCondition && reqCondition.intent.slots ? reqCondition.intent.slots : {}
            }
          };
          break;
      }

      return {
        version: '1.0',
        session: {
          new: false,
          sessionAttributes: previousResponse.sessionAttributes ? previousResponse.sessionAttributes : {},
          sessionId: UUID.v4(),
          user: {
            userId: appCondition.user ? appCondition.user.userId : UUID.v4()
          }
        },
        context: {
          System: {
            application: {
              applicationId: appCondition.extensionId ? appCondition.extensionId : ''
            },
            user: {
              userId: appCondition.user ? appCondition.user.userId : UUID.v4(),
              accessToken: appCondition.user && appCondition.user.accessToken ? appCondition.user.accessToken : ''
            },
            device: {
              deviceId: appCondition.device ? appCondition.device.deviceId : UUID.v4(),
              display: {
                size: 'none'
              }
            }
          }
        },
        request: request
      };
    }
    //#endregion

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
              const requestBody = buildRequest(requestHistories[currentIndex].intentName, previousResponse, reqCondition);
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
      equal(expectedSpeech: string): IConversation {
        requestHistories[requestCounter].tests.push({
          description: `equal SimpleSpeech: ${expectedSpeech}`,
          test: (history: IRequestHistory): void => {
            if ((<any>history.response.response.outputSpeech).type === 'SimpleSpeech') {
              expect((<any>history.response.response.outputSpeech).values.value).toBe(expectedSpeech);
            }
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
