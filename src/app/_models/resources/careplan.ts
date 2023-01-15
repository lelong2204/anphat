import { ActivityElement } from "../elements/activityElement";
import { CodeableConceptElement } from "../elements/codeableConcept";
import { PeriodElement } from "../elements/periodElement";
import { ReferenceElement } from "../elements/referenceElement";
import { Resource } from "./resource";

export class CarePlan extends Resource{
    name:string;
    title:string;
    description:string;
    status:string;
    intent:string;
    created:Date;
    subject:ReferenceElement;
    encounter:ReferenceElement;
    author:ReferenceElement;
    period:PeriodElement;
    category:CodeableConceptElement[];
    activity:ActivityElement[];
    constructor(){
        super();
        this.resourceType="CarePlan";
        this.activity=[];
    }
}