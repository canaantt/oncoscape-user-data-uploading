enum categories {'clinical', 'molecular', 'metadata'};
enum datatypes {'diagnosis', 'drug', 'treatment', 'mut', 'RNASeq', 'cnv', 'protein'};

export class File {
    _id: string;
    Name: string;
    Category: categories;
    DataType: datatypes ;
    Project: string;
    Size: number;
    Date: Date;
}
