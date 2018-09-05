import { IRequestHistory } from './request-history';

export interface ITestScenario {
  description: string;
  test: (history: IRequestHistory) => void;
}
