import { AddressElement } from "../elements/addressElement";
import { CodeableConceptElement } from "../elements/codeableConcept";
import { ContactPointElement } from "../elements/contactPointElement";
import { HumanNameElement } from "../elements/humanNameElement";
import { IdentifierElement } from "../elements/identifierElement";
import { Resource } from "./resource";

export class Patient extends Resource{
    name:HumanNameElement[];
    gender:string;
    birthDate:Date;
    identifier:IdentifierElement[];
    telecom:ContactPointElement[];
    address:AddressElement[];
    maritalStatus:CodeableConceptElement;
}