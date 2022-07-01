<template >

  <div class="list row " v-if="showAdminBoard">
    <div class="col-md-12 row">
      <div class="col-md-6">
        <label>Danh sách người dùng</label>
      </div>
      <div class="col-md-6">
        <button @click="addUser()" class="btn btn-success">Thêm mới</button>
      </div>

      <EasyDataTable class="col-md-12" :headers="headers" :items="users">
        <template #actions="{id}">
          <button @click="editUser(id)" class="btn btn-success">
            <!--<font-awesome-icon icon="edit" />--></button>
          <button @click="deleteUser(id)" class="btn btn-danger">
            <!--<font-awesome-icon icon="remove" />--></button>
        </template>
      </EasyDataTable>
    </div>
  </div>
  <div v-else>
    <h3>Bạn không có quyền truy cập</h3>
  </div>

</template>

<script>

  import UserService from "../../services/userService";

  export default  {
    name: "user-list",

    data() {
      return {
        users: [],
        currentUser: null,
        currentIndex: -1,
        username: "",
        headers: [
          { text: "Tên", align: "start", sortable: false, value: "username" },
          { text: "Email", value: "email", sortable: false },
          { text: "Thao tác", value: "actions", sortable: false },
        ],
      };
    },
    created() {
      this.retrieveUser();
    },
    computed: {
      currentUserRole() {
        return this.$store.state.initialState.user;
      },
      showAdminBoard() {
        if (this.currentUserRole && this.currentUserRole['roles']) {
          return this.currentUserRole['roles'].includes('ROLE_ADMIN');
        }
        return false;
      },
    },
    methods: {
      retrieveUser() {
        UserService.getAllUser()
                .then(response => {
                  this.users = response.data.map(this.getDisplayTutorial);
                  console.log(response.data);
                })
                .catch(e => {
                  console.log(e);
                });
      },

      refreshList() {
        this.retrieveUser();
        this.currentUser = null;
        this.currentIndex = -1;
      },

      getDisplayTutorial(user) {
        return {
          id: user.id,
          username: user.username.length > 30 ? user.username.substr(0, 30) + "..." : user.username,
          email: user.email.length > 30 ? user.email.substr(0, 30) + "..." : user.email,
        };
      },
      addUser() {
        this.$router.push({ name: "add"});
      },

      editUser(id) {
        this.$router.push({ name: "user-details", params: { id: id } });
      },
      deleteUser(id) {
        UserService.deleteUser(id)
                .then(() => {
                  this.refreshList();
                })
                .catch((e) => {
                  console.log(e);
                });
      },

    }/*,
    mounted() {
      this.retrieveUser();
    }*/
  };
</script>

<style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
</style>
