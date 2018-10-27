import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  /**Is Dependent data */
  dependentValues = ['True', 'False'];
  /** Marital Status data */
  maritalStatusData = ['Married', 'Single', 'Divorsed', 'Widowed'];
  /** Gender data */
  genderData = ['Male', 'Female', 'Mujer', 'Unspecified', 'Irlandes'];
  
  
  
  constructor(private formBuilder: FormBuilder,
              private clientService: ClientsService, 
              private route: ActivatedRoute, 
              private router: Router
              

  ) { }

  ngOnInit() {
   this.createAddFamilyMemberForm();
  }

  /**
   * Creates the add family member form.
   */
  createAddFamilyMemberForm() {
    this.addFamilyMember = this.formBuilder.group({
      'firstname': [''],
      'middlename': [''],
      'lastname': [''],
      'qualification': [''],
      'mobilenumber': [''],
      'age': [''],
      'dependent': [''],
      'relationship': [''],
      'maritalStatus': [''],
      'Gender': [''],
      'profession': [''],
      'dob': ['']
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
      const id = this.route.snapshot.paramMap.get('id');
      console.log(familyMember);

      this.clientService.createFamilyMember(familyMember, id);//.subscribe(response => {
       // this.router.navigate(['../../family-members', response.clientId], { relativeTo: this.route }); 
     // });
   
    }
      
}
 

