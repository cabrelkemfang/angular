import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from '../../clients.service';

@Component({
  selector: 'mifosx-add-family-members',
  templateUrl: './add-family-members.component.html',
  styleUrls: ['./add-family-members.component.scss']
})
export class AddFamilyMemberComponent implements OnInit {

  /** add family member entry form. */
  addFamilyMember: FormGroup;
  genderIdOptionsData: any;
  maritalStatusIdOptionsData: any;
  professionIdOptionsData: any;
  relationshipIdOptionsData: any;
  disableSelect = new FormControl(false);
  id: number = Number(this.route.snapshot.paramMap.get('id'));



  constructor(private formBuilder: FormBuilder,
    private clientService: ClientsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.createAddFamilyMemberForm();
    this.getTemplate();
  }

  getTemplate() {
    this.clientService.getClientTemplate(this.id).subscribe(
      (data: {
        genderIdOptions: any;
        maritalStatusIdOptions: any;
        professionIdOptions: any;
        relationshipIdOptions: any;
      }) => {
        this.genderIdOptionsData = data.genderIdOptions;
        this.maritalStatusIdOptionsData = data.maritalStatusIdOptions;
        this.professionIdOptionsData = data.professionIdOptions;
        this.relationshipIdOptionsData = data.relationshipIdOptions;
      });
  }



  /**
   * Creates the add family member form.
   */
  createAddFamilyMemberForm() {
    this.addFamilyMember = this.formBuilder.group({
      'clientId': [''],
      'firstName': [''],
      'middleName': [''],
      'lastName': [''],
      'qualification': [''],
      'mobileNumber': [''],
      'age': [''],
      'isDependent': [''],
      'relationshipId': [''],
      'maritalStatusId': [''],
      'genderId': [''],
      'professionId': [''],
      'dateOfBirth': ['']
    });
  }

  /**
   * Submits the add family member form and creates a family member,
   * if successful redirects to family member page.
   */
  submit() {
    const familyMember = this.addFamilyMember.value;
    familyMember.locale = 'en';
    familyMember.dateFormat = 'yyyy-MM-dd';
    if (familyMember.dateOfBirth instanceof Date) {
      let day = familyMember.dateOfBirth.getDate();
      let month = familyMember.dateOfBirth.getMonth() + 1;
      const year = familyMember.dateOfBirth.getFullYear();
      if (day < 10) {
        day = `0${day}`;
      }
      if (month < 10) {
        month = `0${month}`;
      }
      familyMember.dateOfBirth = `${year}-${month}-${day}`;
    }

    familyMember.isDependent = this.disableSelect.value;

    familyMember.clientId = this.id;
    this.clientService.createFamilyMember(familyMember, this.id).subscribe(response => {
      this.router.navigate(['/clients/view/' + this.id]);
    });
  }
}


