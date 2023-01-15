import { BaseElement } from "./baseElement";
import { CodeableConceptElement } from "./codeableConcept";
import { TargetElement } from "./targetElement";

export class GoalElement extends BaseElement{
    category:CodeableConceptElement;
    description:CodeableConceptElement;
    priority:CodeableConceptElement;
    start:CodeableConceptElement;
    target:TargetElement[];
}