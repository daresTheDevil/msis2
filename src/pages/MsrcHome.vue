<template>
<v-app>

  <section>
      <v-container grid-list-xl class="my-5">
        <v-layout row wrap>
          <v-flex>
            <h1 class="display-2 font-weight-bold">Search, learn and compare data for
              <br />districts and schools in Mississippi.</h1>
          </v-flex>
        </v-layout>
        <v-layout align-center row wrap>
          <v-flex xs12 sm6>
            <v-card color="grey lighten-5 elevation-15">
              <v-card-text class="pa-0">
                <v-autocomplete
                  v-model="select"
                  :loading="loading"
                  v-on:change="navigate"
                  :items="leas"
                  item-text="EntityDisplayName"
                  item-value="EntityId"
                  :search-input.sync="search"
                  clearable
                  hide-no-data
                  hide-details
                  label="Search for school or district..."
                  solo
                  flat
                  x-large
                  autofocus
                  light
                  >
                  <template
              slot="item"
              slot-scope="{ item, tile }"
            >
              <v-list-tile-avatar
                color="indigo"
                class="headline font-weight-bold white--text"
              >
                {{ item.EntityGrade }}
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.EntityDisplayName" />
                <v-list-tile-sub-title v-text="item.EntityCity" />
              </v-list-tile-content>
              <v-list-tile-action>
                <v-chip v-if="item.EntityType == 'State'" color="primary" class="white--text">{{ item.EntityType }}</v-chip>
                <v-chip v-else-if="item.EntityType == 'District'" color="warning">{{ item.EntityType }}</v-chip>
                <v-chip v-else-if="item.EntityType == 'School'" color="error">{{ item.EntityType }}</v-chip>
            </v-list-tile-action>
            </template>
                </v-autocomplete>
              </v-card-text>
            </v-card>
                </v-flex>
                <v-flex shrink>
                  <v-btn
                    large
                    color="amber darken-1"
                    raised
                    class="font-weight-bold subheading"
                    to="/map">
                  advanced search
                  <v-icon right dark>fa fa-arrow-right</v-icon>
                  </v-btn>
                </v-flex>
                </v-layout>
      </v-container>
    </section>
<v-divider />
  <section class="mt-5">
      <v-container grid-list-lg>
        <v-layout row align-center justify-space-around>
          <v-flex xs3>
            <img src="@/assets/success.svg">
          </v-flex>
          <v-flex xs7>
            <h1 class="display-2">Success through teamwork</h1>
            <p>When The MDE, districts, schools, parents & students work together, we can improve the education outcomes for
              Mississippi’s students. A key component to this accountability is transparent access to data related to student
              performance, teacher preparedness, school environment, and safety. Click below to see state data.
            </p>
            <v-btn large color="primary">STATE RESULTS</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
<v-divider />
    <section class="grey lighten-3">
      <v-container grid-list-lg>
        <v-layout row align-center justify-space-around>
          <v-flex xs3>
            <img src="@/assets/science.svg">
          </v-flex>
          <v-flex xs7>
            <h1 class="display-2">The Accountability process</h1>
            <p>The Mississippi Statewide Accountability System is a single “A” through “F” school and district accountability
              system. Grades are based on student achievement, student growth, student participation in testing, and other
              academic measures.
            </p>
            <v-btn large color="success">LEARN MORE</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
<v-divider />
    <section>
      <v-container grid-list-lg>
        <v-layout row align-center justify-space-around>
          <v-flex xs3>
            <img src="@/assets/data.svg">
          </v-flex>
          <v-flex xs7>
            <h1 class="display-2">Accountability with transparency</h1>
            <p>When The MDE, districts, schools, parents & students work together, we can improve the education outcomes for
              Mississippi’s students. A key component to this accountability is transparent access to data related to student
              performance, teacher preparedness, school environment, and safety.
            </p>
            <v-btn large color="warning">DOWNLOAD THE DATA</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
</v-app>
</template>

<script>
  import leas from '../data/entities.json'
  // import _ from 'lodash'

  export default {
    data () {
      return {
        loading: false,
        items: [],
        leas,
        search: null,
        select: null
      }
    },
    methods: {
      navigate () {
        this.$router.push({ name: 'entity', params: { id: this.select } })
      }
    }
  }
</script>
