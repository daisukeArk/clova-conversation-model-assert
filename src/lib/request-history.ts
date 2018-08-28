import * as CEK from '@line/clova-cek-sdk-nodejs';

export interface IRequestHistory {
  request: CEK.Clova.RequestBody;
  intentName: string;
  response: CEK.Clova.ResponseBody;
  tests: {
    description: string,
    test: (history: IRequestHistory) => void
  }[];
}
