import { BaseElement } from "./baseElement";
import { QuantityElement } from "./QuantityElement";

export class RangeElement  extends BaseElement {
    low:QuantityElement;
    high:QuantityElement
}