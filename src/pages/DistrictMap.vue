<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card raised>
          <v-card-text class="pa-0">
            <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 400px">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    <vl-layer-vector>
        <vl-source-vector :features.sync="features" :id.sync="features.NAME"></vl-source-vector>

        <vl-style-box>
          <vl-style-stroke color="#00BCD4" :width="1"></vl-style-stroke>
          <vl-style-fill color="rgba(255,255,255,0.7)"></vl-style-fill>
        </vl-style-box>
      </vl-layer-vector>

    </vl-map>


          </v-card-text>

          <v-card-text>
            <h1 class="body-2" v-if="loading">Loading...</h1>
            <h1 class="title" v-if="features.length > 0">Districts loaded: {{ features.length }}</h1>
          </v-card-text>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        zoom: 6,
        center: [ -89.99146020316753, 32.40219403948885 ],
        rotation: 0,
        geolocPosition: undefined,
        features: [],
        loading: false
      }
    },
    mounted () {
      this.loading = true
      axios
        .get('https://cdn.jsdelivr.net/gh/davidbkay/mississippi-education-geojson@v0.0.1/districts-mississippi.geojson')
        .then(response => (this.features = response.data.features))
        .then(features => {
          this.features = features.map(Object.freeze)
          this.loading = false
        })
    }
  }
</script>
