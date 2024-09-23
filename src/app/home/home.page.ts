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
    this.map = L.map('mapId').setView([-7.816795, 110.365229], 13);

    // Basemap pertama (OpenStreetMap)
    const basemap1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Basemap kedua (CartoDB Positron)
    const basemap2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd'
    });

    // Basemap keempat (Stadia Alidade Smooth Dark)
    const basemap3 = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });

    // Basemap kelima (Stadia Alidade Smooth)
    const basemap4 = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Basemap keenam (Stadia Stamen Terrain Background)
    const basemap5 = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://www.stamen.com/">Stamen Design</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Tambahkan layer kontrol
    const baseMaps = {
      "OpenStreetMap": basemap1,
      "CartoDB Positron": basemap2,
      "Alidade Smooth Dark": basemap3,
      "Alidade Smooth": basemap4,
      "Stamen Terrain Background": basemap5
    };

    // Tambahkan layer pertama sebagai default
    basemap1.addTo(this.map);

    // Kontrol layer
    L.control.layers(baseMaps).addTo(this.map);

    // Marker custom dengan icon sendiri
    const customIcon = L.icon({
      iconUrl: 'assets/icon/Marker.png', // Path ke file icon
      iconSize: [38, 38], // Ukuran ikon
      iconAnchor: [19, 38], // Anchor point di bawah ikon
      popupAnchor: [0, -38], // Posisi popup relatif terhadap ikon
    });

    // Tambahkan marker dengan ikon custom
    this.marker = L.marker([-7.816795, 110.365229], { icon: customIcon }).addTo(this.map);
    this.marker.bindPopup('Hi, this is my home!').openPopup();
  }
}
