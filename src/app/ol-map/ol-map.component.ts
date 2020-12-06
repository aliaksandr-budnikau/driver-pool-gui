import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output} from '@angular/core';
import {Map, View} from 'ol';
import {Coordinate} from 'ol/coordinate';
import {defaults as DefaultControls, ScaleLine} from 'ol/control';
import Projection from 'ol/proj/Projection';
import {transform} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements AfterViewInit {

  @Input() zoom: number;
  @Input() center: Coordinate;
  view: View;
  projection: Projection;
  map: Map;
  @Output() mapReady = new EventEmitter<Map>();

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    setTimeout(() => this.mapReady.emit(this.map));
  }

  private initMap(): void {
    this.view = new View({
      center: transform([this.center[1], this.center[0]], 'EPSG:4326', new OSM().getProjection()),
      zoom: this.zoom,
      projection: this.projection,
    });
    this.map = new Map({
      layers: [new TileLayer({
        source: new OSM({})
      })],
      target: 'map',
      view: this.view,
      controls: DefaultControls({attribution: false}).extend([
        new ScaleLine({}),
      ]),
    });
  }
}
