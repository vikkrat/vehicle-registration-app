export interface CarEntity {
    id?: number;
    registrationNumber: string;
    model: string;
    producer: string;
    year: string;
}

export interface Owner {
    lastName: string;
    firstName: string;
    middleName: string;
    cars: CarEntity[];
}

export interface OwnerEntity extends Owner {
    id: number;
}

export enum OwnerOptionsMode {
    Details = 'details',
    Update = 'update',
    Create = 'create'
}

export const OwnerOptionsModesTitles = new Map([
    [OwnerOptionsMode.Details, 'View Owner Details'],
    [OwnerOptionsMode.Update, 'Update Owner'],
    [OwnerOptionsMode.Create, 'Create New Owner'],
]) as Map<OwnerOptionsMode, string>;

export const OwnerOptionsModesButtonTitles = new Map([
    [OwnerOptionsMode.Details, ''],
    [OwnerOptionsMode.Update, 'Update'],
    [OwnerOptionsMode.Create, 'Submit'],
]) as Map<OwnerOptionsMode, string>;