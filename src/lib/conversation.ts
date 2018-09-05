import { IRequestCondition } from './request-condition';

export interface IConversation {
  launchRequest(): this;
  requestIntent(intentName: string, reqCondition?: IRequestCondition): this;
  sessionEndedRequest(): this;
  equal(expectedValue: string): this;
  equalList(expectedValues: string[]): this;
  equalSetBrief(epectedValue: string): this;
  equalSetVerbose(epectedValue: string): this;
  equalSetVerboseList(expectedValues: string[]): this;
  end(): void;
}
