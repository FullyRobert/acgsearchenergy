<template>
  <div style="float:top;">
    <div
      align="center"
      style="margin-top: 10px;margin-left:10px;"
    >
      <v-alert
        v-if="list.length2===-1 && list.key"
        max-width="50%"
        color="warning"
        style="margin-top:2%"
      >
        找不到与您输入的关键词相匹配的词条，请重试
      </v-alert>
      <div
        v-if="list.length===''||list.length===0"
        class="grey--text ml-4"
      >
        <p
          class="text-h3"
        >
          相关推荐
        </p>
        <v-divider />
      </div>

      <v-chip-group
        v-if="list.length!==''&&list.length!==0"
        column
      >
        <v-chip
          color="success"
          @click="SortByDefault()"
        >
          按相关性排序
        </v-chip>
        <v-chip
          color="warning"
          @click="SortByGrade()"
        >
          按评分排序
        </v-chip>
        <v-chip
          color="error"
          @click="SortByHot()"
        >
          按热度排序
        </v-chip>
      </v-chip-group>
    </div>
    <ul
      id="HotBloodUL"
      style="     margin-left:2%;
     width: 96%;
     display: inline-block;
     column-count: 4;
     column-width: 20%;
     column-gap:5%;
     "
    >
      <li
        v-for="hits in list.list"
        id="HotBloodLI"
        :key="hits._id"
        style="
          display: inline-block;width:100%;"
      >
        <v-card
          :loading="loading"
          class="mx-auto my-6"
          max-width="100%"
        >
          <v-img
            height="15%"
            :src="hits._source.cover_url"
            @click="Skip(hits)"
          />

          <v-card-title>{{ hits._source.name }}</v-card-title>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="hits._source.rating_score/2"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              />

              <div class="grey--text ml-4">
                {{ hits._source.rating_score }}
                {{ hits._source.areas[0] }}
              </div>
            </v-row>

            <div class="my-4 subtitle-1">
              <v-chip-group
                column
              >
                <v-chip
                  v-if="hits._source.tag_list.length>0"
                  color="success"
                >
                  {{ hits._source.tag_list[0] }}
                </v-chip>
                <v-chip
                  v-if="hits._source.tag_list.length>1"
                  color="warning"
                >
                  {{ hits._source.tag_list[1] }}
                </v-chip>
                <v-chip
                  v-if="hits._source.tag_list.length>2"
                  color="error"
                >
                  {{ hits._source.tag_list[2] }}
                </v-chip>
              </v-chip-group>
            </div>

            <div style="width:90%">
              {{ hits._source.short_description }}...
            </div>
          </v-card-text>

          <v-divider class="mx-4" />

          <v-card-title>声优</v-card-title>

          <v-card-text>
            <v-chip-group
              v-model="selection"
              active-class="deep-purple accent-4 white--text"
              column
            >
              <div style="width:90%">
                <div
                  v-for="(cv,index) in hits._source.cv_list.cv"
                  :key="cv"
                >
                  <tr v-if="index%2==0">
                    <td
                      v-if="cv.indexOf(list.key) != -1&&list.key!=''"
                    >
                      <p style="color:#C00000;">
                        {{ cv }}
                      </p>
                    </td>
                    <td
                      v-else
                    >
                      <p>
                        {{ cv }}
                      </p>
                    </td>
                    <td v-if="index+1< hits._source.cv_list.cv.length">
                      <template v-if="hits._source.cv_list.cv[index+1].indexOf(list.key) != -1 &&list.key!=''">
                        <p style="color:#C00000;margin-left:40%;width:140%">
                          {{ hits._source.cv_list.cv[index+1] }}
                        </p>
                      </template>

                      <template v-else>
                        <p style="margin-left:40%;width:140%">
                          {{ hits._source.cv_list.cv[index+1] }}
                        </p>
                      </template>
                    </td>
                  </tr>
                </div>
              </div>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
  // import Qs from 'qs'
  import Bus from '../../Bus.js'
  import axios from 'axios'
  export default {
    name: 'DashboardDashboard',
    data () {
      return {
        loading: false,
        selection: 1,
        list: {
          length: '',
          length2: '',
          key: this.$route.params.name,
          list: '',
        },
      }
    },
    watch: {
      'list.key': {
        handler (newValue, oldValue) {
          console.log('list.key' + this.list.key)
          // console.log('new:' + newValue)
          // console.log('old:' + oldValue)
          // console.log('value changed')
          axios.post('/api1/_search', {
            size: 20,
            query: {
              wildcard: {
                name: '*' + this.list.key + '*',
              },
            },
          }).then((res) => {
            res = res.data.hits.hits
            this.$set(this.list, 'list', res)

            if (this.list.length === 0 && res.length === 0) {
              this.$set(this.list, 'length', '')
            } else if (this.list.length === '' && res.length === 0) {
              this.$set(this.list, 'length', 0)
            } else {
              this.$set(this.list, 'length', res.length)
            }
            if (res.length === 0) {
              this.$set(this.list, 'length2', -1)
            } else {
              this.$set(this.list, 'length2', res.length)
            }
            console.log(this.list)
          }).catch((error) => {
            console.warn(error)
          })
        },
        deep: true,
        immediate: true,
      },
      'list.length': {
        handler (newValue, oldValue) {
          if (this.list.length === '' || this.list.length === 0) {
            const Random = ['小姐', '异世界', '1', '学', '柯南']
            const SearchContent = '*' + Random[Math.floor(Math.random() * 5)] + '*'
            axios.post('/api1/_search', {
              size: 20,
              query: {
                wildcard: {
                  name: SearchContent,
                },
              },
            }).then((res) => {
              if (this.list.list.length === 0) {
                res = res.data.hits.hits
                this.$set(this.list, 'list', res)
              }
            }).catch((error) => {
              console.warn(error)
            })
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted: function () {
      Bus.$on('Search', (data) => {
        console.log('origin' + this.list.key)
        this.list.key = data
        console.log('Bus' + this.list.key)
      })
    },

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      Skip (hits) {
        this.$router.push({ name: 'comic', params: { hits: hits } })
      },
      complete (index) {
        this.list[index] = !this.list[index]
      },
      SortByGrade () {
        axios.post('/api1/_search', {
          size: 20,
          query: {
            wildcard: {
              name: '*' + this.list.key + '*',
            },
          },
          sort: {
            rating_score: 'desc',
          },
        }).then((res) => {
          res = res.data.hits.hits
          this.$set(this.list, 'list', res)
          console.log(this.list)
        }).catch((error) => {
          console.warn(error)
        })
        console.log('SortByName')
      },
      SortByDefault () {
        axios.post('/api1/_search', {
          size: 20,
          query: {
            wildcard: {
              name: '*' + this.list.key + '*',
            },
          },
        }).then((res) => {
          res = res.data.hits.hits
          this.$set(this.list, 'list', res)
          console.log(this.list)
        }).catch((error) => {
          console.warn(error)
        })
        console.log('SortByDefault')
      },
      SortByHot () {
        axios.post('/api1/_search', {
          size: 20,
          query: {
            wildcard: {
              name: '*' + this.list.key + '*',
            },
          },
          sort: {
            views: 'desc',
          },
        }).then((res) => {
          res = res.data.hits.hits
          this.$set(this.list, 'list', res)
          console.log(this.list)
        }).catch((error) => {
          console.warn(error)
        })
        console.log('SortByGrade')
      },
    },
  }
</script>
<style module>

</style>
