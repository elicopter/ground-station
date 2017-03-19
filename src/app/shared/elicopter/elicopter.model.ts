export class Elicopter {
  public name: string;
  public address: string;

  constructor(attributes?: any) {
    this.name    = attributes && attributes.name;
    this.address = attributes && attributes.address;
  }
}