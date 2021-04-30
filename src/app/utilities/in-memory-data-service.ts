import { OwnerEntity } from './../models/car-owner.model';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryCarOwnersService implements InMemoryDbService {
  createDb() {
    const owners: OwnerEntity[] = [
      {
        id: 75708464897,
        lastName: 'Columbus',
        firstName: 'Christopher',
        middleName: 'Domenicovich',
        cars: [
          {
            id: 76698087,
            registrationNumber: 'AX1111HP',
            model: 'X5',
            producer: 'BMW',
            year: '2016',
          },
          {
            id: 757886087,
            registrationNumber: 'OP1451KJ',
            model: 'Q3',
            producer: 'Audi',
            year: '2021',
          },
        ],
      },
      {
        id: 100944478,
        lastName: 'Cook',
        firstName: 'James',
        middleName: 'Jamesovich',
        cars: [
          {
            id: 76698087,
            registrationNumber: 'BL6500YU',
            model: 'Corolla',
            producer: 'Toyota',
            year: '2011',
          },
          {
            id: 80038087,
            registrationNumber: 'MK6570DS',
            model: 'ASX',
            producer: 'Mitsubishi',
            year: '2011',
          },
        ],
      },
      {
        id: 8765432788,
        lastName: 'Magellan',
        firstName: 'Ferdinand',
        middleName: 'Pedrovich',
        cars: [
          {
            id: 76698087,
            registrationNumber: 'BG6533BN',
            model: 'Jazz',
            producer: 'Honda',
            year: '2009',
          },
        ],
      },
      {
        id: 1287456753,
        lastName: 'Bering',
        firstName: 'Vitus',
        middleName: 'Jonasovich',
        cars: [
          {
            id: 84456334,
            registrationNumber: 'BG6533BN',
            model: 'Auris',
            producer: 'Toyota',
            year: '2009',
          },
        ],
      },
    ];

    return { owners };
  }
}
