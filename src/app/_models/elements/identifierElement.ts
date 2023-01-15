import { CodeableConceptElement } from "./codeableConcept";
import { PeriodElement } from "./periodElement";

export class IdentifierElement{
    use:string;
    type:CodeableConceptElement;
    system:string;
    value:string;
    period:PeriodElement;
}