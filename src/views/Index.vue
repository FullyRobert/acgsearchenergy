<template>
  <v-app>
    <v-container
      class="fill-height align justify"
      fluid
      :style="{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover', margin: '0', width: '100%', maxWidth:'100%' }"
    >
      <v-row>
        <v-col>
          <v-row
            class="lighten-5"
            style="maxWidth: 40%;
               margin: 0 auto;"
          >
            <v-text-field
              id="search"
              v-model="input"
              dark
              filled
              shaped
              clearable
              label="搜索你喜爱的番剧"
              hide-details="auto"
              style="font-size:26px;"
              @keyup.enter="GetSearchContent($event)"
            />
          </v-row>
          <v-row
            justify="space-around"
            style="margin: 20px 0 0 0"
          >
            <v-col
              style="maxWidth: 40%;
               margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: center;"
            >
              <v-btn
                outlined
                color="white"
                style="margin: 0 10px 0 0"
                @click="GetSearchContent($event)"
              >
                <v-icon left>
                  mdi-magnify
                </v-icon>
                搜索一下
              </v-btn>
              <v-btn
                outlined
                color="white"
                style="margin: 0 0 0 10px"
                @click="RandomSearchContent($event)"
              >
                <v-icon
                  left
                  color="pink"
                >
                  mdi-heart
                </v-icon>
                运气不错
              </v-btn>
            </v-col>
          </v-row>
          <dashboard-core-view
            style="
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            text-align: center;"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import backgroundUrl from '@/assets/wuming.png'
  // Utilities
  export default {

    name: 'Index',
    components: {
      DashboardCoreView: () => import('./dashboard/components/core/View'),
    },
    data: () => { return { backgroundUrl, SearchContent: 0, input: '' } },
    methods: {
      GetSearchContent (e) {
        this.SearchContent = this.input
        console.log('trigger method Search: ' + this.SearchContent)
        this.$router.push({ name: '番剧', params: { name: this.SearchContent } })
      },
      RandomSearchContent (e) {
        const Random = ['小姐', '异世界', '1', '学', '柯南']
        this.SearchContent = Random[Math.floor(Math.random() * 5)]
        console.log('trigger method Search: ' + this.SearchContent)
        this.$router.push({ name: '番剧', params: { name: this.SearchContent } })
      },
    },
  }
</script>
