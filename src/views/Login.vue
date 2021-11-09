<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third is-offset-4">
            <h1 class="title">Please Sign In</h1>
            <b-field label="Email">
              <b-input v-model="email"></b-input>
            </b-field>
            <b-field label="Password">
              <b-input v-model="password" type="password"></b-input>
            </b-field>
            <b-button @click="submit" type="is-primary">Submit</b-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<!--suppress ES6CheckImport -->
<script>
import {auth} from '../firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'

export default {
  name: "Login",
  data () {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    submit: function () {
      if (this.email !== null) {
        signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
              this.$router.push({name: 'MainPage'})
            }).catch(e => {
          this.$buefy.toast.open({
            message: e.toString(),
            type: "is-danger"
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>