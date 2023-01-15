import { Component, OnInit, ViewChild } from '@angular/core';
import { DxTreeViewComponent } from 'devextreme-angular';
import { FhirService } from '../services/fhir.service';
import { SharedService } from '../services/shared.service';
import { confirm } from 'devextreme/ui/dialog';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.less']
})
export class OrganizationComponent implements OnInit {
	@ViewChild(DxTreeViewComponent, { static: false }) treeView: any;

	dataSource: any;
	rootData: any;
	popupVisible = false;
	buttonOptions: any = {
		text: 'Submit',
		type: 'success',
		useSubmitBehavior: true,
	};
	searchButtonOptions: any = {
		icon: "search",
		useSubmitBehavior: true
	};
	addContactBtnOption: any = {
		icon: 'plus',
		onClick: () => {
			this.formData.telecom.push({})
		}
	};
	defaultFormData: any = { telecom: [{}], address: [{ country: "Việt Nam", line: [""] }], identifier: [{}] };
	formData: any;
	dataSearch:any = {};
	organizationTypes: any[] = [];
	organizationTypeValue: string[] = [];
	contactTypes: any[] = [];
	contactUsingFor: any[] = [];
	addressUses: any[] = [];
	addressTypes: any[] = [];

    constructor(private fhirService: FhirService,
        private sharedService: SharedService
    ) {
        var __this = this;
        this.sharedService.emitChange("Organization");

        this.getOrganizationData();
        this.editRow = this.editRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

	getOrganizationData() {
		this.fhirService.get("organization")
			.subscribe((data: any) => {
				this.rootData = data.entry;
				this.dataSource = [...this.rootData];
			})
	}

    ngOnInit(): void {
		this.formData = {...this.defaultFormData};
		this.getOrganizationData();
		this.fhirService.read("ValueSet", "organization-type")
			.subscribe((data: any) => {
				data.compose?.include?.forEach((value:any) => {
					this.organizationTypes.push(...value?.concept);
				})
			})

		this.fhirService.read("ValueSet", "contact-point-system")
			.subscribe((data: any) => {
				data.compose?.include?.forEach((value:any) => {
					this.contactTypes.push(...value?.concept);
				})
			})
	
		this.fhirService.read("ValueSet", "contact-point-use")
			.subscribe((data: any) => {
				data.compose?.include?.forEach((value:any) => {
					this.contactUsingFor.push(...value?.concept);
				})
			})
		
		this.fhirService.read("ValueSet", "address-use")
			.subscribe((data: any) => {
				data.compose?.include?.forEach((value:any) => {
					this.addressUses.push(...value?.concept);
				})
			})
			
		this.fhirService.read("ValueSet", "address-type")
			.subscribe((data: any) => {
				data.compose?.include?.forEach((value:any) => {
					this.addressTypes.push(...value?.concept);
				})
			})
	}

	onToolbarPreparing(e: any) {
		let toolbarItems = e.toolbarOptions.items;
		let _this = this;

		toolbarItems.push({
			widget: 'dxButton',
			options: {
				text: 'Thêm mới',
				stylingMode: 'contained',
				type: 'success',
				onClick: function () {
					_this.formData = {..._this.defaultFormData};
					_this.popupVisible = !_this.popupVisible
				}
			},
			location: 'before'
		})
	}

	onResourceTypeChanged(e: any) {
		this.updateSelection(this.treeView && this.treeView.instance);
	}

	updateSelection(treeView: any) {
		if (!treeView) return;

		if (!this.organizationTypeValue) {
			treeView.unselectAll();
		}

		if (this.organizationTypeValue) {
			this.organizationTypeValue.forEach(((value: any) => {
				treeView.selectItem(value);
			}));
		}
	}

	onTreeViewReady(e: any) {
		this.updateSelection(e.component);
	}

	onTreeViewSelectionChanged(e: any) {
		this.organizationTypeValue = e.component.getSelectedNodeKeys();
	}

	onFormSubmit(e: any) {
		if (this.organizationTypeValue.length) {
			let types = this.organizationTypes?.filter((ot: any) => {
				return this.organizationTypeValue.includes(ot.code as string);
			})

			this.formData.type = types.map((t:any) => {return {coding: [{system: "organization-type", code: t.code, diplay: t.display}]}})
		}

		if (this.formData.partOf?.reference) {
			this.formData.partOf.display = this.dataSource.filter((x:any) => x.fullUrl === this.formData.partOf?.reference)[0].name
		}
		this.formData.resourceType = "Organization";
		let ward = this.formData.address[0].ward;
		if (ward !== undefined && ward && ward.length) {
			this.formData.address[0].line[0] = `${this.formData.address[0].line[0]}, ${ward}`;
			delete this.formData.address[0].ward;
		}

		if (this.formData.id !== undefined && this.formData.id) {
			this.fhirService.put(this.formData).subscribe((data: any) => {
				this.getOrganizationData();
				this.popupVisible = !this.popupVisible;
			})
		} else {
			this.fhirService.post(this.formData).subscribe((data: any) => {
				this.getOrganizationData();
				this.popupVisible = !this.popupVisible;
			})
		}
		e.preventDefault();
	}

	onSearchFormSubmit (e:any) {
		var isSearch = false;
		let data = [...this.rootData];
		if (this.dataSearch.name !== undefined && this.dataSearch.name)  {
			data = data?.filter((i: any)=> i.resource.name?.includes(this.dataSearch.name))
			isSearch = true;
		}
		if (this.dataSearch.code !== undefined && this.dataSearch.code)  {
			data = data?.filter((i: any)=> {
				let identifier = i.resource.identifier;
				if (identifier !== undefined && identifier && identifier.length) {
					return identifier[0].value.includes(this.dataSearch.code);
				}
				return false;
			})
			isSearch = true;
		}
		if (this.dataSearch.type !== undefined && this.dataSearch.type)  {
			data = data?.filter((i: any)=> {
				return i.resource.type?.filter((t:any) => {
					return t.coding[0].code === this.dataSearch.type
				})?.length > 0;
			})
			isSearch = true;
		}
		this.dataSource = JSON.parse(JSON.stringify(data))
		this.dataSource.forEach((d: any) => {
			if (d.resource.partOf?.reference) {
				if (!this.dataSource.filter((x:any) => x.fullUrl === d.resource.partOf?.reference).length) {
					delete d.resource.partOf
				}
			} 
		})

		if (!isSearch) {
			this.dataSource = [...this.rootData]
		}

		e.preventDefault();
	}

	deleteRow (e:any) {
		let result = confirm("<p>Are you sure to delete this organization?</p>", "Confirm Delete");
		var _this = this;
		result.then((result) => {
			if (result) {
				_this.fhirService.delete("organization/"+e.row.data.resource.id).subscribe((data:any) => {
					_this.getOrganizationData();
				});
			}
		})
    }

	editRow (e:any) {
		this.organizationTypeValue = e.row.data.resource.type?.map((x:any) => x.coding[0].code);
		this.formData = {...this.rootData.find((x:any)=> x.resource.id === e.row.data.resource.id)?.resource};
		this.popupVisible = true;
    }
}
