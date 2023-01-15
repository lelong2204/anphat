import { BaseElement } from "./baseElement";
import { CodeableConceptElement } from "./codeableConcept";
import { QuantityElement } from "./QuantityElement";
import { RangeElement } from "./rangeElement";

export class TargetElement extends BaseElement{
    measure:CodeableConceptElement;
    detailQuantity:QuantityElement;
    detailRange:RangeElement;
    detailCodeableConcept:CodeableConceptElement;
}