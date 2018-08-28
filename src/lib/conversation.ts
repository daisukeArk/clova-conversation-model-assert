import { IRequestCondition } from './request-condition';

export interface IConversation {
  launchRequest(): this;
  requestIntent(intentName: string, reqCondition?: IRequestCondition): this;
  sessionEndedRequest(): this;
  equal(expectedSpeech: string): this;
  end(): void;
}
