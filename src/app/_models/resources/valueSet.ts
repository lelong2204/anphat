import { ComposeElement } from "../elements/composeElement";
import { ContactDetailElement } from "../elements/contactDetailElement";
import { IdentifierElement } from "../elements/identifierElement";
import { Resource } from "./resource";

export class ValueSet extends Resource {
    url:string;
    identifier:IdentifierElement[];
    version:string;
    name:string;
    title:string;
    status:string;
    experimental:boolean;
    date:Date;
    publisher:string;
    contact:ContactDetailElement[];
    description:string;
    immutable:boolean;
    purpose:string;
    copyright:string;
    compose:ComposeElement;
}
