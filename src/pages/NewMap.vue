<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs12>
      <h1 class="title">GeoJSON</h1>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title v-if="loading">Loading...</v-card-title>
        <v-card-text>
          <l-map
            :zoom="zoom"
            :center="center"
            style="height: 90%">
            <l-tile-layer
              :url="url"
              :attribution="attribution"/>
            <l-geo-json
              v-if="show"
              :geojson="geojson"
              :options="options"
              :optionsStyle="styleFunction"
              />
            <l-marker :lat-lng="marker"/>
          </l-map>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet'
import L from 'leaflet'
import axios from 'axios'
export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker
  },
  data () {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 6,
      center: [48, -1.219482],
      geojson: null,
      fillColor: '#e4ce7f',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482)
    }
  },
  computed: {
    options () {
      return {
        onEachFeature: this.onEachFeatureFunction
      }
    },
    styleFunction () {
      const fillColor = this.fillColor // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: '#ECEFF1',
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1
        }
      }
    },
    onEachFeatureFunction () {
      if (!this.enableTooltip) {
        return () => {}
      }
      return (feature, layer) => {
        layer.bindTooltip('<div>code:' + feature.properties.code + '</div><div>nom: ' + feature.properties.nom + '</div>', { permanent: false, sticky: true })
      }
    }
  },
  created () {
    this.loading = true
    axios.get('https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson').then(response => {
      this.geojson = response.data
      this.loading = false
    })
  }
}
</script>
