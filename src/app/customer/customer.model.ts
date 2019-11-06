export class Customer {

  constructor(
    public name: string,
    public birth: string,
    public registerAge: string,
    public currentAge: string,
    public sponsor: string,
    public sponsorId: number,
    public relationship: string,
    public address: string,
    public addressNumber: string,
    public addressBlock: string,
    public zipCode: number,
    public mainContact: number,
    public extraContact: number,
    public paymentType: string,
    public paymentAmount: number,
    public covenant: boolean,
    public notes: string,
  ) { }
}
