<template>
  <div v-if="currentUser" class="edit-form">
    <h4>User</h4>
    <form>
      <div class="form-group">
        <label for="username">username</label>
        <input type="text" class="form-control" id="username"
          v-model="currentUser.username"
        />
      </div>
      <div class="form-group">
        <label for="email">email</label>
        <input type="text" class="form-control" id="email"
          v-model="currentUser.email"
        />
      </div>


    </form>
    <button @click="updateUser" class="btn btn-success">Submit</button>

    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserService from "../../services/userService";

export default {
  name: "update-user",
  data() {
    return {
      currentUser: null,
      message: ''
    };
  },
  methods: {
    getUser(id) {
      UserService.getUserId(id)
        .then(response => {
          this.currentUser = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      UserService.updateUser(this.currentUser)
        .then(response => {
          console.log(response.data);
          this.message = 'Cập nhật thành công!';
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteUser() {
      UserService.deleteUser(this.currentUser.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
          this.$router.push({ name: "Users" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.$router.push({ name: "users"});
    },

  },
  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
