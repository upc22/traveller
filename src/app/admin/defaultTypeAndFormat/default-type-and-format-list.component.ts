
// angular
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// api
import * as InterfaceProviders from './../services/api/models/interface-providers';

// components
import { BaseListComponent } from './../common/components/base-list.component';

// pipes
import { DisplayDataTransformPipe } from './../common/pipes/dataTransform.pipe';

// services
import { BusyIndicatorService } from './../common/services/busyIndicator.service';
import { LocalStorageService, RestoreService } from './../common/services/dataStorage.service';
import { SpinnerService } from './../../core/spinner/spinner.service';

import { DataContext } from './../services/api/rest/data-context.service';
import { DataContextLocal } from './../services/api/local/data-context-local.service';

import * as KendoDialog from '@progress/kendo-angular-dialog';

@Component({
  selector: 'defaultTypeAndFormatList',
  templateUrl: './default-type-and-format-list.component.html'
})

export class DefaultTypeAndFormatListComponent extends BaseListComponent<InterfaceProviders.DefaultTypeAndFormat>  {

  public keyName: string = 'id';
  public fieldFilterModel: any = null;
  public formMetaData: any = null;
  
  constructor(protected titleService: Title,
    protected spinnerService: SpinnerService,
    protected kendoDialog: KendoDialog.DialogService,
    private datacontextService: DataContextLocal,
    router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    super(titleService, spinnerService, kendoDialog, datacontextService.DefaultTypeAndFormatApi, router, activatedRoute);

    this.formMetaData = require('./default-type-and-format.metaData.json'); 
    this.componentName = 'DefaultTypeAndFormatListComponent';

    this.generateFilterModel();
  }

  public generateFilterModel() {
    let filterModel = [];
    if (this.formMetaData && this.formMetaData.properties) {
      for (let key in this.formMetaData.properties) {
        if (this.formMetaData.properties.hasOwnProperty(key)) {
          let element = this.formMetaData.properties[key];

          if (element.type && element['x-ncg']) {
            filterModel.push({
              display: element['x-ncg'].label,
              value: key
            });
          }
        }
      }
    }

    this.fieldFilterModel = filterModel;
  }

  protected customValidate() {
  }

  protected populateComponentDataAsync() {
  }
}