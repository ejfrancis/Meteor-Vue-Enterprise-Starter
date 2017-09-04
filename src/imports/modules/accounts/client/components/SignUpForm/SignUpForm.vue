<style scoped>
</style>

<template>
  <div class='SignUpForm'>
    <accounts-form-container title='Sign Up'>
      <Form :model='formData' :rules='formRules'>
        <Row>
          <Col :xs='24' :md='{ span: 11 }'>
            <Form-item prop='firstName' class='first-name' label='First name'>
              <Input type='text' v-model='formData.firstName' placeholder='First name'>
              <Icon type='person' slot='append'></Icon>
              </Input>
            </Form-item>
          </Col>
          <Col :xs='24' :md='{ span: 11, push: 2 }'>
            <Form-item prop='lastName' class='last-name' label='Last name'>
              <Input type='text' v-model='formData.lastName' placeholder='Last name'>
              <Icon type='person' slot='append'></Icon>
              </Input>
            </Form-item>
          </Col>
          <Col :xs='24'>
            <Form-item prop='email' class='email' label='Email'>
              <Input type='text' v-model='formData.email' placeholder='Email'>
              <Icon type='email' slot='append'></Icon>
              </Input>
            </Form-item>
          </Col>
          <Col :xs='24'>
            <Form-item>
              <Button 
                type='primary' 
                @click='submitForm()' 
                class='sign-up-submit-btn' 
                :disabled='isSubmitDisabled' 
                html-type='submit'
              >
                Register
              </Button>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </accounts-form-container>    
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex-alt';
import SimpleSchema from 'simpl-schema';
import AccountsFormContainer from './../AccountsFormContainer/AccountsFormContainer.vue';

export default {
  name: 'SignUpForm',
  components: {
    AccountsFormContainer
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: ''
      },
      formRules: {
        firstName: [
          { required: true, message: 'First name required', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Last name required', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Email required', trigger: 'blur' },
          { type: 'email', message: 'Email must be a valid emai address ', trigger: 'blur' }
        ]
      }
    }
  },
  destroyed() {
    this.clearRegisterFailure();
  },
  computed: {
    ...mapState({
      enrollAccountEmailSent: (state) => state.accounts.enrollAccountEmailSent
    }),
    isSubmitDisabled() {
      return !this.formData.firstName ||
        !this.formData.lastName ||
        !this.formData.email ||
        !SimpleSchema.RegEx.EmailWithTLD.test(this.formData.email);
    }
  },
  methods: {
    ...mapActions({
      registerUser: (actions) => actions.accounts.registerUser,
      clearRegisterFailure: (actions) => actions.accounts.clearRegisterFailure,
    }),
    async submitForm() {
      try {
        const success = await this.registerUser({
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email
        });
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
