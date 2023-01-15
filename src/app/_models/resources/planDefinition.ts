import { ActionElement } from "../elements/actionElement";
import { GoalElement } from "../elements/goalElement";
import { Resource } from "./resource";

export class PlanDefinition extends Resource{
name:string;
title:string;
description:string;
status:string;
date:Date;
goal:GoalElement[];
action:ActionElement[];
}