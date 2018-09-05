import * as CEK from '@line/clova-cek-sdk-nodejs';
import { ITestScenario } from './test-scenario';

export interface IRequestHistory {
  request: CEK.Clova.RequestBody;
  intentName: string;
  response: CEK.Clova.ResponseBody;
  tests: ITestScenario[];
}
