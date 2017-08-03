import { User } from './user';

export class IRB {
    _id: string;
    IRBNumber: string;
    IRBTitle: { type: string, required: true};
    PI: string;
    OtherUsers: string[];
    Date: Date;
}
