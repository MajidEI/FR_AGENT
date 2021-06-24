import { Component, OnInit, ViewChild } from '@angular/core';
import { Rdv } from '../../model/rdv';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RdvService } from '../../service/rdv.service';

@Component({
	selector: 'app-rdv',
	templateUrl: './rdv.component.html',
	styleUrls: ['./rdv.component.css'],
})
export class RdvComponent implements OnInit {
	rdvs: Rdv[] = [];
	d: any;
	dataSource = new MatTableDataSource<Rdv>(this.rdvs);
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	constructor(private rdvService: RdvService, public dialog: MatDialog) {}
	displayedColumns: string[] = [
		'id',
		'client',
		'date',
		'heure',
		'service',
		'statut',
	];
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	ngOnInit(): void {
		this.rdvService.findAll().subscribe(
			(data) => {
				this.rdvs = data;
				this.dataSource = new MatTableDataSource<Rdv>(this.rdvs);
				this.dataSource.paginator = this.paginator;
			},
			(error) => {
				console.error(error);
				this.dataSource = new MatTableDataSource<Rdv>(null);
			}
		);
	}
	checkDate(datederdv: any) {
		this.d = new Date().toISOString().split('T')[0];
		console.log(this.d);
		console.log(datederdv);
		if (datederdv.toISOString().split('-')[0] > this.d.toISOString().split('-')[0]) {
			return false;
		} else {
			return true;
		}
	}
}
