<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="username">Tên</label>
        <input
          type="text"
          class="form-control"
          id="username"
          required
          v-model="user.username"
          name="username"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="user.email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
                class="form-control"
                id="password"
                required
                v-model="user.password"
                name="password"
        />
      </div>
      <button @click="saveUser" class="btn btn-primary" :disabled="loading">
            <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
            ></span>
        <span>Submit</span>
      </button>


    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
</template>

<script>
import UserService from "../../services/userService";

export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        username: "",
        email: "",
        password: "",
        loading: false,
      },
      submitted: false
    };
  },
  methods: {
    saveUser() {
      var data = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password
      };
      this.loading = true;
      UserService.createUser(data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.refreshList();
        })
        .catch(e => {
          this.loading = false;
          console.log(e);
        });
    },
    refreshList() {
      this.$router.push({ name: "users"});
    },
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
