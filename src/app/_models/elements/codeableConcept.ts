import { BaseElement } from "./baseElement";
import { Coding } from "./coding";

export class CodeableConceptElement extends BaseElement{
    text:string;
    coding:Coding[]
}