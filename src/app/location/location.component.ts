import { Component, OnInit } from '@angular/core';
import { FhirService } from '../services/fhir.service';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { confirm } from 'devextreme/ui/dialog';
import { SearchParams } from '../_models/searchParams';

@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: ['./location.component.less']
})

export class LocationComponent implements OnInit {
	dataSource: any;
	rootData: any;
	city: any;
	district: any;
	wards: any;
	organizations: any;
	showOptions: boolean = true;
	type: string;
	code: string;
	name: string;
	popupVisible = false;
	isLocal: boolean;
	buttonOptions: any = {
		text: 'Submit',
		type: 'success',
		useSubmitBehavior: true,
	};
	searchButtonOptions: any = {
		icon: "search",
		useSubmitBehavior: true
	};
	defaultFormData: any = { identifier: [{}] };
	formData: any;
	dataSearch:any = {};

	constructor(private fhirService: FhirService,
		private sharedService: SharedService,
		private route: ActivatedRoute
	) {
		this.sharedService.emitChange("Location");
		this.editRow = this.editRow.bind(this);
		this.deleteRow = this.deleteRow.bind(this);
		this.onCityChange = this.onCityChange.bind(this);
		this.onDistrictChange = this.onDistrictChange.bind(this);
	}

	ngOnInit(): void {
		this.route.queryParams
			.subscribe(params => {
				let type = params.type?.toLowerCase(); 
				this.code = params.code; 
				this.name = params.name; 
				if (type === undefined || type == null) {
					this.showOptions = true
				} else {
					this.isLocal = type === "jdn";
					if (type === "jdn" || type === "site") {
						this.showOptions = false;
						this.type = params.type
					}
				}
			}
		);

		if (!this.showOptions) {
			let __this = this;
			this.fhirService.get('Organization').subscribe({
				next(result) {
					__this.organizations = result.entry;
				},
			})

			if(!this.isLocal) {
				this.defaultFormData.address = {line:['']}
				this.formData = {...this.defaultFormData}
			}
		}

		this.getLocationData();
	}

	onSearch(e:any) {
		const {code, name} = this.dataSearch;
		this.dataSource = this.rootData?.filter((x: any) => x.resource.partOf === undefined || !x.resource.partOf);
		if (code !== undefined && code) {
			this.dataSource = this.dataSource?.filter((x:any) => x.resource.identifier[0]?.value === code)
		}

		if (name !== undefined && name) {
			this.dataSource = this.dataSource?.filter((x:any) => x.resource.name?.includes(name))
		}

		e.preventDefault();
	}

	getLocationData() {
		if (!this.showOptions) {
			var __this = this;
			let searchParams: SearchParams[] = [
				{ key: "physicalType", value: this.type }
			]

			if (this.code !== undefined && this.code) {
				searchParams.push({
					key: "identifier",
					value: this.code
				})
			}

			if (this.name !== undefined && this.name) {
				searchParams.push({
					key: "name",
					value: this.name
				})
			}

			this.fhirService.get('Location', searchParams).subscribe({
				next(result) {
					__this.rootData = result.entry;
					__this.dataSource = __this.rootData?.filter((x: any) => x.resource.partOf === undefined || !x.resource.partOf);
					__this.city = [...__this.dataSource];
				},
			})
		}
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

	onFormSubmit(e: any) {
		this.formData.resourceType = "Location";
		this.formData.physicalType = {
			coding: [{
				code: this.type
			}]
		};

		if (!this.isLocal) {
			const {address} = this.formData;
			if (address !== undefined && address) {
				const {wards} = address;
				if (wards !== undefined && wards) {
					address.line = [wards]
				}
			}
		}

		let managingOrganization = this.formData.managingOrganization
		if (managingOrganization !== undefined && managingOrganization) {
			managingOrganization.display = this.organizations.find((x: any) => x.fullUrl === managingOrganization.reference)?.resource.name;
		}
		if (this.formData.id !== undefined && this.formData.id) {
			this.fhirService.put(this.formData).subscribe((data: any) => {
				this.getLocationData();
				this.popupVisible = !this.popupVisible;
			})
		} else {
			this.fhirService.post(this.formData).subscribe((data: any) => {
				this.getLocationData();
				this.popupVisible = !this.popupVisible;
			})
		}
		e.preventDefault();
	}

	deleteRow (e:any) {
		let result = confirm("<p>Are you sure to delete this organization?</p>", "Confirm Delete");
		var _this = this;
		result.then((result) => {
			if (result) {
				_this.fhirService.delete("location/"+e.row.data.resource.id).subscribe((data:any) => {
					_this.getLocationData();
				});
			}
		})
    }

	editRow (e:any) {
		this.formData = {...this.dataSource.find((x:any)=> x.resource.id === e.row.data.resource.id)?.resource};
		if (!this.isLocal) {
			const {address} = this.formData
			if (address.line !== undefined && address.line && address.line.length) {
				address.wards = address.line[0];
			}
		}
		this.popupVisible = true;
    }

	onCityChange(e:any) {
		this.district = this.rootData?.filter((x:any) => x.resource.partOf?.reference === e.value);
	}

	onDistrictChange(e:any) {
		this.wards = this.rootData?.filter((x:any) => x.resource.partOf?.reference === e.value);
	}
}
