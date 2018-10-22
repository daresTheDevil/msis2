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


    <section class="primary lighten-2 my-0">
      <v-container class="my-0 py-0">
        <v-breadcrumbs divider="-">
          <v-breadcrumbs-item><v-icon>home</v-icon></v-breadcrumbs-item>
          <v-breadcrumbs-item to="/entity/0000-000">State</v-breadcrumbs-item>
          <v-breadcrumbs-item v-if="entity.EntityType == 'District'">{{ entity.ParentEntityName }}</v-breadcrumbs-item>
          <v-breadcrumbs-item v-else-if="entity.EntityType == 'School'">{{ entity.EntityDisplayName }}</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-container>
    </section>

    <v-divider />

    <section class="py-4">
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

    <v-divider />

    <section class="teal">
      <v-container>
        <v-layout>
          <v-flex xs12 sm8 class="white--text">
            <h1 class="display-2 font-weight-black">Proficiency</h1>
            <p class="headline">How well did students perform on state assessments?</p>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

        <section class="teal lighten-5">
      <v-container>
        <v-layout row wrap justify-center>
          <v-flex xs10>
            <v-card raised class="py-0">
              <v-btn
              color="pink"
              dark
              small
              absolute
              bottom
              right
              fab
              @click="show = !show"
            >
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
              <v-container fluid grid-list-xl>
                <v-layout row wrap align-center justify-space-between>
                  <v-flex shrink>
                    <v-avatar size="64">
                      <img src="@/assets/calculator.svg" />
                    </v-avatar>
                  </v-flex>
                  <v-flex xs5>
                    <h1 class="headline font-weight-bold">Math Proficiency</h1>
                    <h1 class="body-1">Percentage of students who scored proficient (levels 4 + 5) on the state math assessment</h1>
                  </v-flex>
                  <v-flex xs2>
                    <h1 class="display-3 font-weight-black">
                      98%
                    </h1>
                  </v-flex>
                  <v-flex xs3>
                    <v-layout row>
                    <v-flex shrink  class="py-0"><h1 class="caption">Mississippi</h1></v-flex><v-spacer /><v-flex shrink class="py-0"><h1 class="caption">65%</h1></v-flex>
                    </v-layout>
                    <v-progress-linear color="info" height="10" value="45" class="my-0"></v-progress-linear>
                    <v-layout row>
                    <v-flex shrink  class="py-0"><h1 class="caption">{{ entity.ParentEntityName }}</h1></v-flex><v-spacer /><v-flex shrink class="py-0"><h1 class="caption">65%</h1></v-flex>
                    </v-layout>
                    <v-progress-linear color="info" height="10" value="45" class="my-0"></v-progress-linear>
                    <v-layout row>
                    <v-flex shrink  class="py-0"><h1 class="caption">{{ entity.EntityDisplayName }}</h1></v-flex><v-spacer /><v-flex shrink class="py-0"><h1 class="caption">65%</h1></v-flex>
                    </v-layout>
                    <v-progress-linear color="info" height="10" value="45" class="my-0"></v-progress-linear>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>


<section>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card raised>
          <v-card-text>
            <v-container class="pa-0" fluid grid-list-xl>
              <v-layout row align-center justify-space-between>
                <v-flex>
                  <h1 class="title font-weight-bold">Math Proficiency</h1>
                  <h1 class="body-1">Percentage of students who scored proficient (levels 4 + 5) on the state math
                    assessment</h1>
                </v-flex>
                <v-spacer />
                <v-flex>
                  <h1 class="display-2 font-weight-bold">98%</h1>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-btn color="pink" dark small absolute bottom right fab @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            <v-layout row>

              <v-flex xs4>
                <v-layout column>
                  <v-flex>
                    <v-card tile class="primary" dark>
                  <v-card-title class="white--text">COMPARE:</v-card-title>
                  <v-card-text class="white--text">
                    <v-layout row>
                    <v-flex shrink  class="py-0"><h1 class="caption">Mississippi</h1></v-flex><v-spacer /><v-flex shrink class="py-0"><h1 class="caption">65%</h1></v-flex>
                    </v-layout>
                    <v-progress-linear color="white" height="10" value="45" class="my-0"></v-progress-linear>
                    <v-layout row>
                    <v-flex shrink  class="py-0"><h1 class="caption">District</h1></v-flex><v-spacer /><v-flex shrink class="py-0"><h1 class="caption">65%</h1></v-flex>
                    </v-layout>
                    <v-progress-linear color="white" height="10" value="45" class="my-0"></v-progress-linear>
                    <v-layout row>
                    <v-flex shrink  class="py-0"><h1 class="caption">School</h1></v-flex><v-spacer /><v-flex shrink class="py-0"><h1 class="caption">65%</h1></v-flex>
                    </v-layout>
                    <v-progress-linear color="white" height="10" value="45" class="my-0"></v-progress-linear>
                  </v-card-text>
                </v-card>
                  </v-flex>
                <v-flex>
                    <v-card tile class="primary darken-2">
                  bottom left side
                </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs8>
                <v-layout column>
                  <v-flex>
                    <v-card tile>
                      <v-toolbar flat dense color="white" class="px-0 mx-0">
                        <v-overflow-btn
                          :items="items"
                          label="Select size"
                          hide-details
                          class="pa-0"
                          overflow
                          full-width
                        ></v-overflow-btn>
                        <v-divider vertical></v-divider>
                        <v-icon large color="success" class="pr-0">keyboard_arrow_up</v-icon>
                        <h1 class="headline font-weight-bold">27%</h1>
                      </v-toolbar>
                    </v-card>
                  </v-flex>
                <v-flex>
                    <v-card tile>
                        <line-chart></line-chart>
                </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>

            </v-layout>
          </v-card-text>
        </v-slide-y-transition>
      </v-flex>
    </v-layout>
  </v-container>
</section>

    <section class="teal lighten-5">
      <v-container grid-list-sm>
        <v-layout row wrap align-center>
          <v-flex xs12 md4>
            <line-chart :width="100" :height="100"></line-chart>
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

    <section class="amber lighten-5">
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
import CardbarChart from '../components/charts/CardbarChart.vue'
import LineChart from '../components/charts/LineChart'

export default {
  components: {
    GaugeChart,
    CardbarChart,
    LineChart
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
      items: ['Foo', 'Bar', 'Fizz', 'Buzz']
    }
  },
  mounted () {
    this.entity = json.find(item => item.EntityId === this.$route.params.id)
  }
}
</script>
