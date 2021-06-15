export class User {
  email: string | undefined;

  fName: string | undefined;

  sName: string | undefined;

  score: number | undefined;

  id: string | undefined;

  image: string | ArrayBuffer | null | undefined;

  constructor(
    email: string,
    fName: string,
    sName: string,
    score: number,
    id: string,
    image: string | ArrayBuffer | null | undefined,
  ) {
    this.email = email;
    this.fName = fName;
    this.sName = sName;
    this.score = score;
    this.id = email + fName + sName;
    this.image = image;
  }
}
