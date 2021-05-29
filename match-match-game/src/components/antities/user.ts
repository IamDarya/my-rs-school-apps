export class User {
  email: string | undefined;

  fName: string | undefined;

  sName: string | undefined;

  score: number | undefined;

  image: string | ArrayBuffer | null | undefined;

  constructor(
    email: string,
    fName: string,
    sName: string,
    score: number,
    image: string | ArrayBuffer | null | undefined,
  ) {
    this.email = email;
    this.fName = fName;
    this.sName = sName;
    this.score = score;
    this.image = image;
  }
}
