import { DesignationElement } from "./designationElement";

export class ConceptElement {
    code:string;
    display:string;
    definition:string;
    concept:ConceptElement[]
    /**
     *
     */
    constructor(code:string,display:string,definition:string) {
        this.code=code;
        this.display=display;
        this.definition=definition
    }
}
