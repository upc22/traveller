// angular
import { ChangeDetectorRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer, FormBuilder, FormGroup, FormsModule, NgForm,
  ReactiveFormsModule, Validator
} from '@angular/forms';
import { CanDeactivate, Router, Params } from '@angular/router';

// 3rd party
import { MdCardModule, MdCheckboxModule, MdIconModule, MdInputModule, MdRadioModule, MdProgressBarModule, MdSelectModule, MdToolbarModule } from "@angular/material";

// Import the kendoUI modules
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule, MaskedTextBoxModule, NumericTextBoxModule, SwitchModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';

// providers/services
import { BusyIndicatorService } from './common/services/busyIndicator.service';
import { DialogService } from './common/services/dialog.service';
import { LocalQueryHelper } from './common/services/api/LocalQueryHelper';
import { LocalStorageService, RestoreService } from './common/services/dataStorage.service';
import { ValidationService } from './common/services/validation.service';

import { DataContext } from './services/api/rest/data-context.service';
import { DataContextLocal } from './services/api/local/data-context-local.service';
import {
   DefaultTypeAndFormatApiLocal,
   DefaultValidationApiLocal,
   NcgOtherApiLocal,
   NcgTypeAndFormatApiLocal,
   NcgValidationApiLocal,
   SomeItemApiLocal,
   TenantApiLocal,
   TypeOfTypeApiLocal,
   UserApiLocal,
   ValidationApiLocal,
} from './services/api/local';

// pipes
import { DisplayDataTransformPipe } from './common/pipes/dataTransform.pipe';
import { OrderBy } from './common/pipes/orderBy.pipe';

// routing
import { AdminRoutingModule, routedComponents } from './admin.routing';

@NgModule({
  declarations: [
    routedComponents,
    DisplayDataTransformPipe, 
    OrderBy
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AdminRoutingModule,
    MdCardModule, MdCheckboxModule, MdIconModule, 
    MdInputModule, MdRadioModule, MdProgressBarModule, MdSelectModule, MdToolbarModule,
    ButtonsModule, DialogModule, InputsModule, MaskedTextBoxModule, NumericTextBoxModule, SwitchModule, GridModule],
  entryComponents: [routedComponents],
  providers: [
    DataContext, 
    DataContextLocal,
    DefaultTypeAndFormatApiLocal,
    DefaultValidationApiLocal,
    NcgOtherApiLocal,
    NcgTypeAndFormatApiLocal,
    NcgValidationApiLocal,
    SomeItemApiLocal,
    TenantApiLocal,
    TypeOfTypeApiLocal,
    UserApiLocal,
    ValidationApiLocal,
    LocalQueryHelper,
    BusyIndicatorService, DialogService,
    FormBuilder, LocalStorageService, RestoreService, ValidationService
  ]
})
export class AdminModule { }
