import { BaseElement } from "./baseElement";

export class ActionElement extends BaseElement {
    prefix:string;
    title:string;
    description:string;
    priority:string;
    definitionCanonical:string;
    definitionUri:string;
    goalId:string[]
}