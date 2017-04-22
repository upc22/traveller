// angular
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CanDeactivate, Router, Params, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// pipes
import { DisplayDataTransformPipe } from '../pipes/dataTransform.pipe';

// api
import { BaseApi } from './../services/api/BaseApi';
import { IListWithCount } from './../services/api/IListWithCount';
import { IQuery } from './../services/api/IQuery';

//services
import { BusyIndicatorService } from '../services/busyIndicator.service';
import { SpinnerService } from './../../../core/spinner/spinner.service';

import * as KendoDialog from '@progress/kendo-angular-dialog';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'baseList',
  template: ''
})
export class BaseListComponent<T> implements OnInit {
  componentName;
  errorMessage: string;
  isLoading: boolean;
  keyName: string = 'id';
  listWithCount: IListWithCount<T>;
  searchValue: string = '';
  stateProvinceList: any;
  fieldFilterModel: Array<any> = [];
  filterType = [
    {
      display: '&',
      value: 'and',
      description: ''
    },
    {
      display: '|',
      value: 'or',
      description: ''
    },
    {
      display: '<',
      value: 'lt',
      description: 'Less than'
    },
    {
      display: '>',
      value: 'gt',
      description: 'Greater than'
    },
    {
      display: '>=',
      value: 'ge',
      description: 'Greater than or equal to'
    },
    {
      display: '<=',
      value: 'le',
      description: 'Less than or equal to'
    },
    {
      display: '<>',
      value: 'ne',
      description: 'Different from'
    },
    {
      display: '=',
      value: 'eq',
      description: 'Equal to'
    },
    {
      display: 'Ends With',
      value: 'endswith',
      description: 'Returns all value that end with'
    },
    {
      display: 'Starts With',
      value: 'startswith',
      description: 'Returns all value that start with'
    },
    {
      display: 'indexof',
      value: 'indexof',
      description: ''
    }];

  selectedFilterField: string = null;
  selectedFilterType: string = null;
  rows: Array<T> = [];
  paginationData = {
    currentPage: 1,
    isBoundaryLinks: true,
    isRotate: false,
    itemCount: 0,
    maxSize: 4,
  };

  query: IQuery =
  {
    count: true,
    expand: null,
    filter: null,
    keywords: null,
    orderBy: null,
    skip: 0,
    select: null,
    top: 5
  };

  private gridView: GridDataResult;

  constructor(protected title: Title,
    protected spinner: SpinnerService,
    protected kendoDialog: KendoDialog.DialogService,
    private baseApi: BaseApi<T>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  // lifecycle events
  ngOnInit() {
    this.populateComponentDataAsync();
    this.getList();
    console.log(`ngOnInit ${this.componentName} component`);
  }

  confirm(message?: string) {
    return new Promise<boolean>((resolve, reject) =>
      resolve(window.confirm(message || 'OK to continue?')));
  };

  kendoDelete(id: number) {
    this.isLoading = true;
    this.kendoDialog.open({
      title: 'Confirmation',
      content: 'Do you want to delete item \'' + id + '\'',
      actions: [
        { text: 'No' },
        { text: 'Yes', primary: true }
      ]
    }).result.subscribe((res) => {
      if (!(res instanceof KendoDialog.DialogCloseResult)) {
        if (res['primary']) {
          this.isLoading = true;
          this.baseApi.delete(id).subscribe((result) => {
            this.isLoading = false;
            this.getList();
          }, (error) => {
            this.isLoading = false;
            this.errorMessage = <any>error;
          });
        }
      }
    });
  }

  edit(item) {
    this.router.navigate([item.id], { relativeTo: this.activatedRoute });
  }

  getList() {
    this.isLoading = true;
    return this.baseApi.get(this.query.expand, this.query.filter, this.query.select, this.query.orderBy, this.query.top, this.query.skip, this.query.count, this.query.keywords, null)
      .subscribe(
      listWithCount => {
        this.isLoading = false;
        this.listWithCount = listWithCount;
        this.paginationData.itemCount = this.listWithCount.count;
        // for ngx-datatable
        this.rows = []; // [...this.rows]
        for (let i = 0; i < listWithCount.list.length; i++) {
          this.rows[this.query.skip + i] = listWithCount.list[i];
        }

        this.gridView = {
          data: listWithCount.list,
          total: this.listWithCount.count
        };
      },
      error => {
        this.isLoading = false;
        this.errorMessage = <any>error;
      });
  }

  protected populateComponentDataAsync() { };

  onColumnHeaderClicked(fieldName: string) {
    this.updateSort(fieldName);
  }

  updateSort(fieldName: string) {
    if (this.query.orderBy === fieldName) {
      this.query.orderBy = fieldName + ' desc';
    } else {
      this.query.orderBy = fieldName;
    }

    this.setPage(1);
  }

  updateFilter(value) {
    if (this.selectedFilterField !== null && this.selectedFilterType !== null && value !== null) {
      switch (this.selectedFilterType) {
        case 'endswith':
          this.query.filter = 'endswith(' + this.selectedFilterField + ',' + ' \'' + value + '\')';
          break;

        case 'startswith':
          this.query.filter = 'startswith(' + this.selectedFilterField + ',' + ' \'' + value + '\')';
          break;

        case 'indexof':
          this.query.filter = 'indexof(' + this.selectedFilterField + ',' + ' \'' + value + '\') eq 0';
          break;

        default:
          this.query.filter = this.selectedFilterField + ' ' + this.selectedFilterType + ' \'' + value + '\'';
          break;
      }
    } else {
      this.query.filter = '';
    }

    this.getList();
  }

  // private methods
  private setPage(pageNo: number): void {
    this.paginationData.currentPage = pageNo;
    this.query.skip = ((this.paginationData.currentPage - 1) * this.query.top);
    this.getList();
  }

  private gridPageChanged(event: PageChangeEvent): void {
    this.query.skip = event.skip;
    this.getList();
  }

  private pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    console.log(event);
    this.setPage(event.page);
  }

  private onPageChanged(event: any): void {
    console.log(event);
    this.setPage(event.offset + 1);
  }
}
