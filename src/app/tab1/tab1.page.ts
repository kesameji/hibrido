import { ViewChild, ElementRef, Component, signal, OnInit } from '@angular/core';
import {
  IonCardContent, IonButton, IonList, IonItem, IonLabel,
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonFab, IonFabButton, IonIcon, IonCard,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
/* Importe la función y el ícono */
import { addIcons } from 'ionicons';
import { cloudUploadOutline } from 'ionicons/icons';
import { TeachablemachineService } from '../services/teachablemachine.service';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    PercentPipe,
    IonCardContent, IonButton, IonList, IonItem, IonLabel,
    IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
    IonFab, IonFabButton, IonIcon, IonCard,
  ],
})
export class Tab1Page implements OnInit {

  @ViewChild('image', { static: false }) imageElement!: ElementRef<HTMLImageElement>;
  imageReady = signal(false)
  imageUrl = signal("")

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();

      // Convertir el archivo a una URL base64 para mostrarlo en el html
      reader.onload = () => {
        this.imageUrl.set(reader.result as string)
        this.imageReady.set(true)
      };

      reader.readAsDataURL(file); // Leer el archivo como base64
    }
  }

  modelLoaded = signal(false);
  classLabels: string[] = [];

  constructor(private teachablemachine: TeachablemachineService) {
    addIcons({ cloudUploadOutline });
  }

  /* Método ngOnInit para cargar el modelo y las clases */
  async ngOnInit() {
    await this.teachablemachine.loadModel()
    this.classLabels = this.teachablemachine.getClassLabels()
    this.modelLoaded.set(true)
  }
  /* Lista de predicciones */
  predictions: any[] = [];


  /* Método para obtener la predicción a partir de la imagen */
  async predict() {
    try {
      const image = this.imageElement.nativeElement;
      this.predictions = await this.teachablemachine.predict(image);
    } catch (error) {
      console.error(error);
      alert('Error al realizar la predicción.');
    }
  }

}
