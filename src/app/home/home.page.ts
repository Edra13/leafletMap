import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;
  marker!: L.Marker;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.map = L.map('mapId').setView([51.505, -0.09], 10);

    // Basemap pertama (OpenStreetMap)
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Basemap kedua (CartoDB Positron)
    const positronLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd'
    });

    // Basemap ketiga (Esri World Imagery)
    const esriImageryLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Tambahkan layer kontrol
    const baseMaps = {
      "OpenStreetMap": osmLayer,
      "CartoDB Positron": positronLayer,
      "Esri World Imagery": esriImageryLayer
    };

    // Tambahkan layer pertama sebagai default
    osmLayer.addTo(this.map);

    // Kontrol layer
    L.control.layers(baseMaps).addTo(this.map);

    // Tambahkan marker
    this.marker = L.marker([51.505, -0.09]).addTo(this.map);
    this.marker.bindPopup('Informasi Pop-up: Saya ada di sini!').openPopup();
  }
}
