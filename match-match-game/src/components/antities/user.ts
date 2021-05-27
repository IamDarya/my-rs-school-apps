import { BaseComponent } from '../base-component';

export class User {
  email: string | undefined;

  fName: string | undefined;

  sName: string | undefined;

  score: number | undefined;

  constructor(email: string, fName: string, sName: string, score: number) {
    this.email = email;
    this.fName = fName;
    this.sName = sName;
    this.score = score;
  }
}
