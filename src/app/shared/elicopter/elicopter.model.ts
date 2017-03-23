export class Elicopter {
  public name: string;
  public address: string;
  public port: string;

  constructor(attributes?: any) {
    this.name    = attributes && attributes.name;
    this.address = attributes && attributes.address;
    this.port    = attributes && attributes.port;
  }
}
