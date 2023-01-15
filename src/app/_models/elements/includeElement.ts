import { ConceptElement } from "./conceptElement";
import { ValueSetConceptElement } from "./valueSetConceptElement";

export class IncludeElement {
    system:string;
    version:string;
    concept:ValueSetConceptElement[]
}
