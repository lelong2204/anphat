import { ConceptElement } from "../elements/conceptElement";
import { Resource } from "./resource";

export class CodeSystem extends Resource{
    status:string;
    concept:ConceptElement[];
    constructor(){
        super();
        this.resourceType="CodeSystem";
        this.concept=[];
    }
}