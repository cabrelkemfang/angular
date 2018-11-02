import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientsService } from '../clients.service';


@Component({
  selector: 'mifosx-list-standing-instructions',
  templateUrl: './list-standing-instructions.component.html',
  styleUrls: ['./list-standing-instructions.component.scss']
})
export class ListStandingInstructionsComponent implements OnInit {

  /**add standing list entry search */
  searchStandingInstructions: FormGroup;
  paramsSubscription: Subscription;
  typeIdOptionData = ['Account Transfer', 'Loan Repayment']
  id: number = Number(this.route.snapshot.paramMap.get('id'));
  clientName: number = Number(this.route.snapshot.paramMap.get('clientName'));
  displayName: any;
  client: any;
  displayedStandingInstructionsColumns = ['clientName', 'fromAccount', 'beneficiary', 'toAccount', 'amount', 'validity'];
  standingInstructionData: any;

  dataSource = new MatTableDataSource();
  @ViewChild('f') noteForm: NgForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder,
    private clientService: ClientsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        }
      );

    this.queryListStandingInstructionsForm();
    this.getTemplate();
    this.getStandingInstruction(this.id,this.displayName)
    this.getClientId();
  }

  getTemplate() {
    this.clientService.getStandingInstructionTemplate(this.id).subscribe(
      (data: {
        typeIdOptions: any;
      }) => {
        //this.typeIdOptionsCreatData = data.typeIdOptions;

      });
  }

  queryListStandingInstructionsForm() {

  }

  getStandingInstruction(id: number, clientName: any) {
    this.clientService.getStandingInstruction(id, clientName).subscribe(
      (data: {
        pageItems: any;
      }) => {
        this.dataSource = new MatTableDataSource(data.pageItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
    });
  }
  getClientId(){
    this.clientService.getClientId(this.id).subscribe(
      (data => {
      console.log(this.dataSource);
      this.client = data;
      this.displayName  = this .client.displayName
      console.log(this.client.displayName);
    })
    );
  }
}
export class IconOverviewExample { }
