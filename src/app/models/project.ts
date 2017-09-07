import { Permission } from './permission';
import { File } from './file';

export class Project {
    _id: string;
    Name: string;
    Description: string;
    Annotations: [{key: string, value: string}];
    Private: boolean;
    PHI: boolean;
    DataCompliance:  {HumanStudy: string, IRBNumber: string, IECNumber: string, Waiver: string, ComplianceOption: string};
    File: {filename: string, size: number, timestamp: Date};
    Permissions: Permission[];
    Date: Date;
    Author: string;
}
