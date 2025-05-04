export interface IValidationError extends Error {
  data: any;
  code: number;
}


export class ValidationError extends Error{
  data: any; 
  code: number;
  constructor(message : string,data: any,code : number){
    super(message);
    this.data = data;
    this.code = code;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}