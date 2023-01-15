import { Component, Input, OnInit } from '@angular/core';
import dxDataGrid from 'devextreme/ui/data_grid';
import { FhirService } from '../services/fhir.service';
import { SearchParams } from '../_models/searchParams';
import { lastValueFrom } from "rxjs";

@Component({
	selector: 'app-location-detail',
	templateUrl: './location-detail.component.html',
	styleUrls: ['./location-detail.component.less']
})
export class LocationDetailComponent implements OnInit {
	@Input() key: any;
	@Input() type: string;
	@Input() hasChild: boolean = false;
	tasksDataSource: any;
	selectTextOnEditStart = true;
	startEditAction = 'click';

	constructor(private fhirService: FhirService) { }

	ngOnInit(): void {
	}

	ngAfterViewInit() {
		this.getData();
	}

	getData() {
		let __this = this;
		let searchParams: SearchParams[] = [
			{ key: "partof", value: this.key }
		]
		this.fhirService.get('Location', searchParams).subscribe({
			next(result) {
				__this.tasksDataSource = result.entry;
			},
		})
	}

	onSaving(e: any) {
		e.cancel = true;
		if (e.changes.length) {
			e.promise = this.processBatchRequest(e.changes, e.component);
		}
	}

	async processBatchRequest (changes: Array<{}>, component: dxDataGrid): Promise<any> {
		let insertData:any = changes.filter((x:any) => x.type === 'insert');
		let updateData:any = changes.filter((x:any) => x.type === 'update');
		let removeData:any = changes.filter((x:any) => x.type === 'remove');
		let __this = this;
		if (insertData && insertData.length) {
			for (const x of insertData) {
				let resource = x.data.resource;
				resource.resourceType = "Location"
				resource.partOf = {reference: __this.key}
				resource.physicalType = __this.type;
				await lastValueFrom(__this.fhirService.post(resource))
			}
		}
		if (updateData && updateData.length) {
			console.log(updateData)
			for (const x of updateData) {
				let resource = x.key.resource;
				Object.keys(x.data.resource).forEach(function(key, index) {
					resource[key] = x.data.resource[key];
				});
				
				resource.physicalType = __this.type;
				resource.resourceType = "Location"
				resource.partOf = {reference: __this.key}
				await lastValueFrom(__this.fhirService.put(resource))
			}
		}
		if (removeData && removeData.length) {
			for (const x of removeData) {
				let resource = x.key.resource;
				await lastValueFrom(__this.fhirService.delete(`location/${resource.id}`))
			}
		}
		component.cancelEditData();
		this.getData();
	}
}
