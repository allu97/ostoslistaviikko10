<template>
  <v-layout column>
    <h1 v-if="!$store.state.isUserLoggedIn">Kirjaudu sisään käyttääksesi ostoslistaa</h1>
    <div v-if="$store.state.isUserLoggedIn">
      <div class="create-post">
        <label for="create-post">Lisää tavara ostoslistaan:</label>
        <v-text-field
          box
          type="text"
          required
          :rules="[required]"
          id="name"
          v-model="name"
          placeholder="Tavara">
        </v-text-field>
        <div class="error" v-if="error">
          {{error}}
        </div>
        <v-btn v-on:click="createPost">Lisää</v-btn>
      </div>
      <panel title="Ostoslista">
        <div class="post"
         v-for="(post, index) in posts"
         v-bind:text="post"
         v-bind:index="index"
         v-bind:key="post._id">
         <v-layout align-center justify-space-around row fill-height>
           <v-flex xs12>
             <v-card>{{ post.name }}</v-card>
           </v-flex>
           <v-flex xs2>
             <v-btn class="red" v-on:click="deletePost(post._id)">Poista</v-btn>
           </v-flex>
         </v-layout>
        </div>
      </panel>
    </div>
  </v-layout>
</template>

<script>
import PostsService from '@/services/PostsService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      posts: [],
      name: '',
      error: '',
      required: (value) => !!value || 'Required.'
    }
  },
  async mounted () {
    this.posts = (await PostsService.index()).data
  },
  methods: {
    async createPost () {
      this.error = null
      if (!this.name) {
        this.error = 'Please fill in the required field.'
        return
      }
      try {
        await PostsService.post({name: this.name})
      } catch (err) {
        console.log(err)
        this.error = err.message
      }
      this.posts = (await PostsService.index()).data
    },
    async deletePost (id) {
      await PostsService.deletePost(id)
      this.posts = (await PostsService.index()).data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: white;
}
.post {
  font-size: 22px;
}
</style>
