<template>
  <v-app>
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      temporary
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(link, i) in links"
          :key="i"
          :to="link.link"
        >
          <v-list-tile-action>
            <v-icon v-html="link.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="link.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

    <v-footer light height="auto" class="mt-5">
      <v-card flat tile class="flex">
        <v-card-title class="py-0 justify-center">
          <v-btn v-for="icon in icons" :key="icon" class="mx-3 primary--text" icon>
            <v-icon medium>{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap justify-space-between>
              <v-flex shrink>
                <h1 class="subheading font-weight-bold">Mississippi Department of Education</h1>
                <v-divider></v-divider>
                <h1 class="body-1">P.O. Box 771</h1>
                <h1 class="body-1">Jackson, MS 39205-0771</h1>
                <h1 class="body-1">Educator Licensure Related Information: 601-359-3483</h1>
                <h1 class="body-1">General MDE Related Information: 601-359-3513</h1>
              </v-flex>
              <v-flex shrink>
                <h1 class="subheading font-weight-bold">SUPPORT</h1>
                <v-divider></v-divider>
                <h1 class="body-1">User Guide</h1>
                <h1 class="body-1">Accessibility</h1>
                <h1 class="body-1">Disclaimer</h1>
                <h1 class="body-1">Non-Discrimination</h1>
              </v-flex>
              <v-flex xs2>
                <img src="@/assets/msGov.png" width="120px">
                <img src="@/assets/mde-logo-dark.svg" width="120px">
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-text class="py-0 text-xs-center">
          <v-divider class="mx-5"></v-divider>
          <h1 class="subheading font-weight-bold">LEARN MORE</h1>
        </v-card-text>

        <v-card-text class="py-0 text-xs-center">
          <v-chip text-color="dark" class="transparent">
            <v-avatar>
              <v-icon small>star</v-icon>
            </v-avatar>Mississippi Department of Education
          </v-chip>
          <v-chip text-color="dark" class="transparent">
            <v-avatar>
              <v-icon small>star</v-icon>
            </v-avatar>Office of Technology & Strategic Services
          </v-chip>
          <v-chip text-color="dark" class="transparent">
            <v-avatar>
              <v-icon small>star</v-icon>
            </v-avatar>Mississippi Succeeds Report Cards
          </v-chip>
        </v-card-text>
      </v-card>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-youtube',
        'fab fa-github'
      ],
      links: [
        { name: 'MSIS', icon: 'fab fa-fort-awesome', link: '/msis' },
        { name: 'MSRC', icon: 'fa fa-hands-helping', link: '/msrc' },
        { name: 'Advanced', icon: 'fa fa-search-location', link: '/data' },
        { name: 'Dashboards', icon: 'fa fa-chart-bar', link: '/dashboards' },
        { name: 'Maps', icon: 'fa fa-map', link: '/maps' },
        { name: 'New Map', icon: 'fa fa-marker', link: '/newmap' }
      ],
      title: 'MSIS'
    }
  },
  name: 'App'
}
</script>
