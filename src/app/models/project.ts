import { Permission } from './permission';
import { File } from './file';

// enum source {'File', 'TCGA', 'Geo'};

export class Project {
    _id: string;
    Name: string;
    Description: string;
    Annotations: [{key: string, value: string}];
    Private: boolean;
    PHI: boolean;
    Source: string;
    DataCompliance:  {HumanStudy: string, ProtocolNumber: string, Protocol: string};
    File: {filename: string, size: number, timestamp: Date};
    Date: Date;
    Author: string;
}
