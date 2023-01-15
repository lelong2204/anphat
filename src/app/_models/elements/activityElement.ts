import { CodeableConceptElement } from "./codeableConcept";
import { ReferenceElement } from "./referenceElement";

export class ActivityElement{
    outcomeCodeableConcept:CodeableConceptElement[] |null;
    reference:ReferenceElement|null;
    detail:ActivityDetailElement|null;
    constructor() {
        this.outcomeCodeableConcept=[];
        this.reference=new ReferenceElement();
        this.detail=new ActivityDetailElement();
    }
}

export class ActivityDetailElement{
    kind:string;
    code:CodeableConceptElement;
    reasonCode:CodeableConceptElement[];
    instantiatesUri:string[];
    goal:ReferenceElement[];
    location:ReferenceElement;
    performer:ReferenceElement[];
    status:string;
}