import { BaseElement } from "./baseElement";

export class QuantityElement extends BaseElement{
    unit:string;
    value:number;
    comparator:string;
    system:string;
    code:string;
}