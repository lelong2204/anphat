import { PeriodElement } from './periodElement';

export class HumanNameElement {
  use: string;
  text: string;
  family: string;
  given: string[];
  prefix: string[];
  suffix: string[];
  period: PeriodElement;
}
