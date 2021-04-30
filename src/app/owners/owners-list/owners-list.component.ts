import { Component, OnInit } from '@angular/core';
import { OwnerEntity } from '../../models/car-owner.model';
import { CarOwnersService } from '../../services/car-owners-service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.scss'],
})
export class OwnersListComponent implements OnInit {
  owners: OwnerEntity[] = [];
  currentOwner: OwnerEntity | null = null;
  displayedColumns: string[] = [
    'lastName',
    'firstName',
    'middleName',
    'carsAmount',
    'options',
  ];

  constructor(
    private carOwnersService: CarOwnersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOwnersList();
  }

  getOwnersList(): void {
    this.carOwnersService
      .getOwners()
      .pipe(untilDestroyed(this))
      .subscribe((data) => (this.owners = data));
  }

  removeOwner(owner: OwnerEntity): void {
    const { id, lastName, firstName } = owner as OwnerEntity;
    if (
      confirm(
        `Do you wish to delete owner: ${lastName} ${firstName
          .slice(0, 1)
          .toUpperCase()}.`
      )
    ) {
      this.carOwnersService
        .deleteOwner(id)
        .pipe(untilDestroyed(this))
        .subscribe((data) => this.openDialog());
      this.getOwnersList();
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        content: 'Owner has been successfully removed!',
      },
    });
  }
}
