<template>
  <div class="submit-form">
    <Form @submit="handleRegister" :validation-schema="schema">
      <div v-if="!submitted">
        <div class="form-group">
          <label>Tên</label>
          <Field name="username" type="text" class="form-control col-md-6" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>

        <div class="form-group">
          <label>Email</label>
          <Field name="email" type="email" class="form-control col-md-6" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>

        <div class="form-group">
          <label>Mật khẩu</label>
          <Field name="password" type="password" class="form-control col-md-6" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            Đăng ký
          </button>
        </div>

      </div>
    </Form>
    <div
            v-if="message"
            class="alert"
            :class="submitted ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";

  export default {
    name: "register-page",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      const schema = yup.object().shape({
        username: yup
                .string()
                .required("Username is required!")
                .min(3, "Must be at least 3 characters!")
                .max(20, "Must be maximum 20 characters!"),
        email: yup
                .string()
                .required("Email is required!")
                .email("Email is invalid!")
                .max(50, "Must be maximum 50 characters!"),
        password: yup
                .string()
                .required("Password is required!")
                .min(6, "Must be at least 6 characters!")
                .max(40, "Must be maximum 40 characters!"),
      });
      return {
        user: {
          id: null,
          username: "",
          email: "",
          password: ""
        },
        loading: false,
        message: "",
        schema,
        submitted: false
      };
    },
    methods: {
      handleRegister(user) {
        this.message = "";
        this.submitted = false;
        this.loading = true;

        this.$store.dispatch("auth/register", user).then(
                (data) => {
                  this.message = data.message;
                  this.submitted = true;
                  this.loading = false;
                },
                (error) => {
                  this.message =
                          (error.response &&
                                  error.response.data &&
                                  error.response.data.message) ||
                          error.message ||
                          error.toString();
                  this.submitted = false;
                  this.loading = false;
                }
        );
      }
    }
  };
</script>

<style>
  label {
    display: block;
    margin-top: 10px;
  }

  .error-feedback {
    color: red;
  }
</style>
