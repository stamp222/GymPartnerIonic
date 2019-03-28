import { exerciseModel } from "./exerciseModel";


export class planModel {
    constructor(public title: string, public difficulty: string,
        public exercises: exerciseModel[]  ) {}
  }