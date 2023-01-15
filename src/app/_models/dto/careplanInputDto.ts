import { Resource } from "../resources/resource";

export class CarePlanInputDto extends Resource{
    name:string;
    description:string;
    title:string;
    activity:CarePlanActivityDetailDto[];
    constructor(){
        super();
        this.resourceType="CarePlan";
        this.activity=[];

    }
}

export class CarePlanActivityDetailDto{
    kind:string;
    reasonCodes:string[];
    code:string;
    goals:string;
    locations:string;
    performer:string;
}