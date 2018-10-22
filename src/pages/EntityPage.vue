<template>
  <v-app>
    <section class="light-blue lighten-5">
      <v-container grid-list-md>
        <v-layout row wrap align-center>
          <v-flex xs1>
            <v-avatar color="teal" size="72">
              <span class="white--text display-3 font-weight-bold">{{ entity.EntityGrade }}</span>
            </v-avatar>
          </v-flex>

          <v-flex xs11>
            <h1 class="display-2 font-weight-bold">
              {{ entity.EntityDisplayName }}
            </h1>
            <h1 class="headline font-weight-light" v-if="entity.EntityType == 'School'">
              {{ entity.ParentEntityName }}
            </h1>
          </v-flex>
          <v-flex xs12 sm4>
            <v-card raised>
              <v-card-text class="pa-0">
                <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326"
                  style="height: 243px">
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
                    <vl-source-vector :features.sync="features"></vl-source-vector>
                  </vl-layer-vector>
                </vl-map>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4>
            <v-card raised>
              <v-card-text class="pa-0">
                <v-list two-line dense class="py-0">
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-icon large>fa fa-user</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-sub-title>
                        Superintendent:
                      </v-list-tile-sub-title>
                      <v-list-tile-title>
                        {{ entity.EntityContactName }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-icon large>fa fa-map</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-sub-title>
                        Address:
                      </v-list-tile-sub-title>
                      <v-list-tile-title>
                        {{ entity.EntityAddress }}
                      </v-list-tile-title>
                      <v-list-tile-title>
                        {{ entity.EntityCity }}, MS {{ entity.EntityZip}}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-icon large>fa fa-at</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-sub-title>
                        Contact:
                      </v-list-tile-sub-title>
                      <v-list-tile-title>
                        {{ entity.EntityContactEmail }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile class="deep-orange lighten-5">
                    <v-list-tile-avatar>
                      <v-icon large>fa fa-file-pdf</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        Download the PDF Summary
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                </v-list>
              </v-card-text>
            </v-card>

          </v-flex>
        </v-layout>
        <template v-if="entity.EntityTSICSI">
          <v-layout row wrap>
            <v-flex>
              <v-chip v-if="entity.EntityTSICSI == 'TSI'" color="warning" class="dark--text">Identified for Targeted
                Support and Improvement</v-chip>
              <v-chip v-else-if="entity.EntityTSICSI == 'ATSI'" color="warning" class="dark--text">Identified for
                Additional Targeted Support and Improvement</v-chip>
              <v-chip v-else-if="entity.EntityTSICSI == 'CSI'" color="red darken-2" class="white--text">Identified for
                Comprehensive Support and Improvement</v-chip>
            </v-flex>
          </v-layout>
        </template>
      </v-container>
    </section>

    <section class="primary">
      <v-container grid-list-md>
        <v-layout row wrap align-center>
          <v-flex shrink>
            <v-avatar color="white" size="72">
              <span class="success--text display-3 font-weight-bold">{{ entity.EntityGrade }}</span>
            </v-avatar>
          </v-flex>

          <v-flex xs8>
            <h1 class="display-2 font-weight-bold white--text">
              {{ entity.EntityDisplayName }}
            </h1>
            <h1 class="headline font-weight-light white--text" v-if="entity.EntityType == 'School'">
              {{ entity.ParentEntityName }}
            </h1>
          </v-flex>
          <v-flex xs12 sm4>
            <v-card raised>
              <v-card-text class="pa-0">
                <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326"
                  style="height: 243px">
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
                    <vl-source-vector :features.sync="features"></vl-source-vector>
                  </vl-layer-vector>
                </vl-map>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4>
            <v-card raised>
              <v-card-text class="pa-0">
                <v-list two-line dense class="primary lighten-1 py-0" dark>
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-icon large>fa fa-user</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-sub-title>
                        Superintendent:
                      </v-list-tile-sub-title>
                      <v-list-tile-title>
                        {{ entity.EntityContactName }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-icon large>fa fa-map</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-sub-title>
                        Address:
                      </v-list-tile-sub-title>
                      <v-list-tile-title>
                        {{ entity.EntityAddress }}
                      </v-list-tile-title>
                      <v-list-tile-title>
                        {{ entity.EntityCity }}, MS {{ entity.EntityZip}}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-icon large>fa fa-at</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-sub-title>
                        Contact:
                      </v-list-tile-sub-title>
                      <v-list-tile-title>
                        {{ entity.EntityContactEmail }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile class="primary darken-">
                    <v-list-tile-avatar>
                      <v-icon large>fa fa-file-pdf</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        Download the PDF Summary
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                </v-list>
              </v-card-text>
            </v-card>

          </v-flex>
        </v-layout>
        <template v-if="entity.EntityTSICSI">
          <v-layout row wrap>
            <v-flex>
              <v-chip v-if="entity.EntityTSICSI == 'TSI'" color="warning" class="dark--text">Identified for Targeted
                Support and Improvement</v-chip>
              <v-chip v-else-if="entity.EntityTSICSI == 'ATSI'" color="warning" class="dark--text">Identified for
                Additional Targeted Support and Improvement</v-chip>
              <v-chip v-else-if="entity.EntityTSICSI == 'CSI'" color="red darken-2" class="white--text">Identified for
                Comprehensive Support and Improvement</v-chip>
            </v-flex>
          </v-layout>
        </template>
      </v-container>
    </section>


    <section class="primary lighten-2 my-0">
      <v-container class="my-0 py-0">
        <v-breadcrumbs large mb-0 dark>
          <v-breadcrums-item>
            <v-icon>home</v-icon>
          </v-breadcrums-item>
          <v-breadcrumbs-item class="white--text" to="/entity/0000-000">State</v-breadcrumbs-item>
          <v-breadcrumbs-item v-if="entity.EntityType == 'District'" to="/entity/entity.ParentEntityId">{{
            entity.EntityDisplayName }}</v-breadcrumbs-item>
          <v-breadcrumbs-item v-else-if="entity.EntityType == 'School'">{{ entity.ParentEntityName }}</v-breadcrumbs-item>
          <v-breadcrumbs-item v-if="entity.EntityType == 'School'">{{ entity.EntityDisplayName }}</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-container>
    </section>

    <v-divider />

    <section class="py-4 grey lighten-4">
      <v-container>
        <v-layout>
          <v-flex xs12 sm8>
            <h1 class="display-2 font-weight-black">Accountability Components</h1>
            <p class="subheading">The Mississippi Statewide Accountability System is a single "A" through "F" school
              and district accountability system. Click any chart to get detailed information on the measure.</p>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <section class="white">
      <v-container grid-list-sm>
        <v-layout row wrap align-center>
          <v-flex xs12 md4>
            <h1 class="headline font-weight-bold">Math Components</h1>
            <h1 class="subheading">Measurements of student performance on the statewide math assessment.</h1>
          </v-flex>
          <v-flex xs12 md8>
            <v-layout row wrap>
              <v-flex xs4>
                <gauge-chart :height="130" />
                <h1 class="title pt-3 text-xs-center">Math Performance</h1>
              </v-flex>
              <v-flex xs4>
                <gauge-chart :height="130" />
                <h1 class="title pt-3 text-xs-center">Math Proficiency</h1>
              </v-flex>
              <v-flex xs4>
                <gauge-chart :height="130" />
                <h1 class="title pt-3 text-xs-center">Math Growth, L25%</h1>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <section class="white">
      <v-container grid-list-sm>
        <v-layout row wrap align-center>
          <v-flex xs12 md4>
            <h1 class="headline font-weight-bold">English Language</h1>
            <h1 class="subheading">Measurements of student performance on the statewide math assessment.</h1>
          </v-flex>
          <v-flex xs12 md8>
            <v-layout row wrap>
              <v-flex xs4>
                <gauge-chart :height="130" />
                <h1 class="title pt-3 text-xs-center">English Performance</h1>
              </v-flex>
              <v-flex xs4>
                <gauge-chart :height="130" />
                <h1 class="title pt-3 text-xs-center">English Proficiency</h1>
              </v-flex>
              <v-flex xs4>
                <gauge-chart :height="130" />
                <h1 class="title pt-3 text-xs-center">English Growth, L25%</h1>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </v-app>
</template>

<script>
import json from '../data/entities.json'
import GaugeChart from '../components/charts/GaugeChart.vue'

export default {
  components: {
    GaugeChart
  },
  data () {
    return {
      zoom: 5,
      center: [ -89.21997070312494, 32.6393748736067 ],
      rotation: 0,
      geolocPosition: undefined,
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
      showNav: false,
      dialog: false,
      loading: false,
      show: false,
      entity: [],
      mathComponents: []
    }
  },
  mounted () {
    this.entity = json.find(item => item.EntityId === this.$route.params.id)
  }
}
</script>
