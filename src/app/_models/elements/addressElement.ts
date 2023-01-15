import { PeriodElement } from "./periodElement";

export class AddressElement{
    use:string;
    type:string;
    text:string;
    line:string[];
    city:string;
    district:string;
    state:string;
    postalCode:string;
    country:string;
    period:PeriodElement;
}