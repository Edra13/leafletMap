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

  // Data lokasi
  locations = [
    {
      "id": 1,
      "name": "Gili Trawangan",
      "image": "assets/icon/gili img/Gili Trawangan.jpg",
      "location": "Gili Indah, Pemenang, North Lombok Regency",
      "latitude": -8.349823,
      "longitude": 116.035885,
      "distance": "60,3 km to Bangsal Port",
      "populars": "Snorkeling, diving, sunset viewing",
      "spots": "Sunset Point, Ombak Sunset Beach"
    },
    {
      "id": 2,
      "name": "Gili Meno",
      "image": "assets/icon/gili img/Gili Meno.jpg",
      "location": "Gili Indah, Pemenang, North Lombok Regency",
      "latitude": -8.350095,
      "longitude": 116.057107,
      "distance": "60,3 km to Bangsal Port",
      "populars": "Snorkeling, turtle watching, beach relaxation",
      "spots": "Gili Meno Turtle Sanctuary, Nest Statue (underwater sculpture)"
    },
    {
      "id": 3,
      "name": "Gili Air",
      "image": "assets/icon/gili img/Gili Air.jpg",
      "location": "Gili Indah, Pemenang, North Lombok Regency",
      "latitude": -8.356983,
      "longitude": 116.081814,
      "distance": "60,3 km to Bangsal Port",
      "populars": "Snorkeling, yoga, paddleboarding",
      "spots": "Eastern Beach (sunrise) and Western Beach (sunset)"
    },
    {
      "id": 4,
      "name": "Gili Nanggu",
      "image": "assets/icon/gili img/Gili Nanggu.png",
      "location": "Sekotong Barat, Sekotong, West Lombok Regency",
      "latitude": -8.7177347,
      "longitude": 115.9876907,
      "distance": "50,5 km to Tanjung Kelor Boat Transport Penyeberangan Gili",
      "populars": "Snorkeling (colorful reefs), fishing, swimming",
      "spots": "White Sandy Beach"
    },
    {
      "id": 5,
      "name": "Gili Kedis",
      "image": "assets/icon/gili img/Gili Kedis.jpg",
      "location": "Sekotong Barat, Sekotong, West Lombok Regency",
      "latitude": -8.7306081,
      "longitude": 116.0254028,
      "distance": "50,5 km to Tanjung Kelor Boat Transport Penyeberangan Gili",
      "populars": "Snorkeling, sunbathing, picnics",
      "spots": "Walk around the entire island in 10 minutes!"
    },
    {
      "id": 6,
      "name": "Gili Asahan",
      "image": "assets/icon/gili img/Gili Asahan.jpg",
      "location": "Sekotong Tengah, West Lombok Regency",
      "latitude": -8.738535,
      "longitude": 115.887049,
      "distance": "75,8 km to Transat Port",
      "populars": "Snorkeling, diving, light trekking",
      "spots": "Secluded Beaches"
    },
    {
      "id": 7,
      "name": "Gili Pasir",
      "image": "assets/icon/gili img/Gili Pasir.jpeg",
      "location": "Labuhan Pandan, Sambelia, East Lombok Regency",
      "latitude": -8.44384,
      "longitude": 116.7483517,
      "distance": "41,0 km to Tanjung Luar Port",
      "populars": "Photography, light snorkeling",
      "spots": "Sandbar that appears only during low tide"
    }
    // Tambahkan data lainnya
  ];

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.map = L.map('mapId').setView([-8.587049, 116.380034], 10);

    // Basemap pertama (OpenStreetMap)
    const basemap1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Basemap kedua (CartoDB Positron)
    const basemap2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd'
    });

    const basemap3 = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, Earthstar Geographics'
    });
    
    // Tambahkan layer kontrol
    const baseMaps = {
      "OpenStreetMap": basemap1,
      "CartoDB Positron": basemap2,
      "World Imagery": basemap3,
    };

    // Tambahkan layer pertama sebagai default
    basemap1.addTo(this.map);

    // Kontrol layer
    L.control.layers(baseMaps).addTo(this.map);

    // Tambahkan lokasi dari data JSON
    this.addLocations();
  }

  addLocations() {
    const customIcon = L.icon({
      iconUrl: 'assets/icon/logomarker.png', // Path ke ikon kustom
      iconSize: [38, 38], // Ukuran ikon
      iconAnchor: [19, 38], // Anchor point di bawah ikon
      popupAnchor: [0, -38], // Posisi popup relatif terhadap ikon
    });
  
    this.locations.forEach(loc => {
      const marker = L.marker([loc.latitude, loc.longitude], { icon: customIcon }).addTo(this.map);
      const popupContent = `
      <div style="text-align: center; font-family: Arial, sans-serif;">
        <h3 style="margin-bottom: 5px; color: #0477bf; font-weight: bold; font-family: 'Georgia', serif">${loc.name}</h3>
        <img src="${loc.image}" alt="${loc.name}" width="150" style="border-radius: 8px;">
        <div style="text-align: left; margin-top: 10px;">
          <p style="margin: 2px 0;"><b>Location:</b> ${loc.location}</p>
          <p style="margin: 2px 0;"><b>Populars:</b> ${loc.populars}</p>
          <p style="margin: 2px 0;"><b>Spots:</b> ${loc.spots}</p>
        </div>
      </div>
    `;    
      marker.bindPopup(popupContent);
    });
  
  }
}
