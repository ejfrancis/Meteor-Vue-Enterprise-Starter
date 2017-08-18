<style scoped>
.sent-success {
  color: green;
}
</style>

<template>
  <div class='PasswordResetEmailForm'>
    <accounts-form-container title='Reset Password'>
      <Form :model='formData' :rules='formRules'>
        <Row>
          <Col :xs='24'>
            <Form-item prop='email' class='email' label='Enter your email'>
              <Input type='text' v-model='formData.email' placeholder='Email'>
              <Icon type='email' slot='append'></Icon>
              </Input>
            </Form-item>
          </Col>
          <Col :xs='24'>
            <Form-item>
              <Button 
                type='primary' 
                @click='submitSendEmailForm()' 
                class='password-reset-email-submit-btn' 
                :disabled='isSubmitDisabled' 
                html-type='submit'
              >
                Reset Password
              </Button>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </accounts-form-container>
    <!-- <h3>Reset Password</h3>
  
    <form @submit.prevent="submitSendEmailForm">
      <div class='email'>
        <label>Enter your email</label>
        <input v-model='formData.email' />
      </div>
      <button type='submit' class='submit-form-btn' :disabled='formData.email.length === 0'>Reset Password</button>
      <div class='sent-success' v-if='passwordResetEmailSent'>
        Email sent!
      </div>
    </form> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import SimpleSchema from 'simpl-schema';
import AccountsFormContainer from './../AccountsFormContainer/AccountsFormContainer.vue';

export default {
  name: 'PasswordResetEmailForm',
  components: {
    AccountsFormContainer
  },
  data() {
    return {
      formData: {
        email: ''
      },
      formRules: {
        email: [
          { required: true, message: 'Email required', trigger: 'blur' },
          { type: 'email', message: 'Email must be a valid emai address ', trigger: 'change' }
        ]
      }
    }
  },
  destroyed() {
    this.clearPasswordResetFailure();
  },
  computed: {
    ...mapState({
      passwordResetEmailSent: (state) => state.auth.passwordResetEmailSent
    }),
     isSubmitDisabled() {
      return !this.formData.email ||
        !SimpleSchema.RegEx.EmailWithTLD.test(this.formData.email);
    }
  },
  methods: {
    ...mapActions({
      sendPasswordResetEmail: (actions) => actions.auth.sendPasswordResetEmail,
      clearPasswordResetFailure: (actions) => actions.auth.clearPasswordResetFailure
    }),
    async submitSendEmailForm() {
      try {
        if (!this.formData.email) {
          return;
        }
        const success = await this.sendPasswordResetEmail({ email: this.formData.email });
        if (success) {
          this.$Message.success({
            content: 'Email sent',
            duration: 10,
            closable: true
          });
        }
      } catch (e) {
        this.$Message.error({
          content: e.message,
          duration: 10,
          closable: true
        });
      }
    }
  }
}
</script>