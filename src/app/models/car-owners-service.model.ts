import { Observable } from 'rxjs';
import { OwnerEntity, CarEntity } from './car-owner.model';

export interface ICarOwnersService {
    getOwners(): Observable<OwnerEntity[]>;
    getOwnerById(ownerId: number): Observable<OwnerEntity>;
    createOwner(
        firstName: string,
        lastName: string,
        middleName: string,
        cars: CarEntity[]
    ): Observable<OwnerEntity>;
    editOwner(owner: OwnerEntity): Observable<OwnerEntity>;
    deleteOwner(ownerId: number): Observable<OwnerEntity[]>;
}
