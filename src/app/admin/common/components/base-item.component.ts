// angular
import { Component, OnInit } from '@angular/core';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { FormGroup, ControlContainer, FormBuilder, NgForm, Validators } from '@angular/forms'
import { CanDeactivate, Router, Params, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// 3rd party
import * as moment from 'moment';
import * as changeCase from 'change-case';

// api
import { BaseApi } from '../services/api/BaseApi';

// services
import { BusyIndicatorService } from '../services/busyIndicator.service';
import { RestoreService } from '../services/dataStorage.service';
import { ValidationService } from '../services/validation.service';
import * as KendoDialog from '@progress/kendo-angular-dialog';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

export abstract class BaseItemComponent<T> implements OnInit {
  componentName: string = 'BaseItemComponent';
  viewName: string = 'All Data Type Item';

  isLoading: boolean;
  isSaving: boolean;
  myForm: FormGroup;
  guidKey: string;
  appName: string = 'AppName';

  changed: boolean = false;
  errorMessage: string;
  id: number = null;
  item: T = null;
  momentFunction: any;
  stateProvinceList: any = null;
  submitted: boolean = false;
  submitAttempted: boolean = false;
  isItemEdited: boolean;
  formErrors = {
  };
  customValidationMessages = {
  };
  formMetaData: any = {
  }

  constructor(protected title: Title,
    protected baseApi: BaseApi<T>,
    protected busyIndicator: BusyIndicatorService,
    protected kendoDialog: KendoDialog.DialogService,
    protected formBuilder: FormBuilder,
    protected location: Location,
    protected restoreService: RestoreService<T>,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected validationService: ValidationService
  ) {
    console.log(`${this.componentName} component base constructor`);
    this.momentFunction = moment;
  }

  abstract buildForm();
  protected abstract populateComponentDataAsync();

  ngOnInit() {
    console.log(`ngOnInit ${this.componentName} component`);

    this.setModelId();

    this.title.setTitle(`${this.appName} - ${this.viewName} - ${this.id}`);

    this.populateComponentDataAsync();

    if (this.id === null || this.id === undefined) {
      this.isItemEdited = false;
      this.populateDataForNewItem();
    } else {
      this.isItemEdited = true;
      this.getItem();
    }
  }

  protected customValidate() {
    console.log('customValidate');
  }

  getItem() {
    console.log(`getItem in ${this.componentName}`);
    console.log(this.baseApi);

    this.isLoading = true;

    this.baseApi.getById(this.id)
      .subscribe(
      item => {
        this.isLoading = false;
        this.hackDatesToWork(item);
        this.restoreService.set(item);
        this.item = this.restoreService.get();

        this.buildForm();
      },
      error => {
        this.isLoading = false;
        this.errorMessage = <any>error;
        console.log(this.errorMessage);
      }
      );
  }

  populateDataForNewItem() {
    this.item = <T>{};

    this.item[this.baseApi.keyName] = this.baseApi.getNewId();
    this.item[this.guidKey] = this.guid();

    this.buildForm();

    this.restoreService.set(this.item);
  }

  goBack() {
    this.location.back();
  }

  goToList() {
    console.log('goToList');
    this.router.navigate(['./'], { relativeTo: this.activatedRoute.parent });
  }

  onCancel() {
    this.item = this.restoreService.restoreItemLocal();
    this.goBack();
  }

  onReset() {
    this.item = this.restoreService.restoreItemLocal();
  }

  onDelete() {
    this.kendoDialog.open({
      title: 'Confirmation',
      content: 'Do you want to delete this item?',
      actions: [
        { text: 'No' },
        { text: 'Yes', primary: true }
      ]
    }).result.subscribe((res) => {
      if (!(res instanceof KendoDialog.DialogCloseResult)) {
        if (res['primary']) {
          this.isLoading = true;
          this.baseApi.delete(this.id).subscribe((result) => {
            this.isLoading = false;
            this.goToList();
          }, (error) => {
            this.isLoading = false;
            this.errorMessage = <any>error;
          });
        }
      }
    });
  }

  _errorKeyToValidationKeyMapping = {
    maxlength: 'maxLength',
    minlength: 'minLength'
  }

  onValueChanged(data?: any) {
    if (!this.myForm) { return; }
    const form = this.myForm;

    for (const fieldKey in this.formMetaData.properties) {
      const control = form.get(fieldKey);

      // clear previous error message (if any)
      this.formMetaData.properties[fieldKey]['x-ncg'].errors = [];//'';

      if (control && control.dirty && !control.valid) {
        for (const errorKey in control.errors) {
          const validationType = this._errorKeyToValidationKeyMapping[errorKey] ? this._errorKeyToValidationKeyMapping[errorKey] : errorKey;
          ValidationService.addFormError(this.formMetaData, fieldKey, validationType, this.customValidationMessages, this.formMetaData);
        }
      }
    }
  }

  normalizeFormMetaData() {
    for (const fieldKey in this.formMetaData.properties) {
      // create default label
      if (this.formMetaData.properties[fieldKey]['x-ncg'].label === undefined)
        this.formMetaData.properties[fieldKey]['x-ncg'].label = changeCase.titleCase(fieldKey);
      // create default placeholder
      if (this.formMetaData.properties[fieldKey]['x-ncg'].placeholder === undefined)
        this.formMetaData.properties[fieldKey]['x-ncg'].placeholder = changeCase.lowerCase(changeCase.titleCase(fieldKey), null);
    }
  }

  onSubmit() {
    this.submitAttempted = true;
    for (var i in this.myForm.controls) {
      this.myForm.controls[i].markAsDirty();
      this.myForm.controls[i].updateValueAndValidity();
    }

    // checkValidations
    this.customValidate();

    // if form valid, add.
    if (this.myForm.valid) {
      // show busy indicator
      this.busyIndicator.start();
      this.isSaving = true;
      this.baseApi.save(this.item, this.isItemEdited)
        .subscribe((item) => {
          console.log('saved');
          this.isSaving = false;
          this.submitted = true;
          this.busyIndicator.stop();
          this.goToList();
        }, (error) => {
          this.isSaving = false;
          this.errorMessage = <any>error;
          console.log(this.errorMessage);
        });
    }
  }

  setModelId() {
    this.id = this.activatedRoute.snapshot.params['id'] === 'new' ? null : + this.activatedRoute.snapshot.params['id'];
  }

  private hackDatesToWork(item) {
    for (let key in item) {
      if (key && item[key].constructor.name === 'String' && this.momentFunction(item[key]).isValid()) {
        item[key] = this.momentFunction(item[key]).format('YYYY-MM-DD');
      }
    }
  }

  private guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
