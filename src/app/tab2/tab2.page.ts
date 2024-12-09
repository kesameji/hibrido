import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSelect, IonSelectOption, IonTextarea, IonButton,
  IonList, IonItem, IonLabel,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
/* Importe el servicio */
import { ProviderService } from '../services/provider.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonSelect, IonSelectOption, IonTextarea, IonButton,
    IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
    ReactiveFormsModule,
  ]
})
export class Tab2Page {
  collectionName = 'reviews';
  dataList: any[] = [];
  constructor(private providerService: ProviderService) { }

  myForm: FormGroup = new FormGroup({
    score: new FormControl("", Validators.required),
    opinion: new FormControl("", Validators.required)
  });

  onSubmit() {
    this.providerService.createDocument(this.collectionName, this.myForm.value).then(() => {
      this.myForm.reset()
    });
  }
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.providerService.readCollection(this.collectionName).subscribe((data) => {
      this.dataList = data;
    });
  }
}
