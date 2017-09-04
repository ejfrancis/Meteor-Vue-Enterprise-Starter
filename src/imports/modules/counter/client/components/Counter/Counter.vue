<style scoped>
/* .Counter {
  border: 1px solid black;
  padding: 20px;
} */
.counter-btn-wrapper {
  display: inline-block;
  /* width: 20%; */
}
.counter-input-wrapper {
  display: inline-block;
  /* width: 80%; */
}
.counter-form {
  margin-top: 20px;
}
.vuex-note {
  font-size: 11px;
}
</style>

<template>
  <div class='Counter'>
    <Card class='count'>
      <Row>
        <Col :xs='14' :md='6'>
          <p>Count: <em class='vuex-note'>(vuex state)</em></p>
        </Col>
        <Col :xs='10' :md='6'>
          <span class='value'>{{ count }}</span>
        </Col>
      </Row>
      <Row>
        <Col :xs='14' :md='6'>
          <p>Count+10 <em class='vuex-note'>(vuex getter)</em>:</p>
        </Col>
        <Col :xs='10' :md='6'>
          <span class='value-plus-ten'>{{ countPlusTen }}</span>
        </Col>
      </Row>
      <Form :model='formData':rules='formRules' class='counter-form'>
        <Form-item prop='inputIncAmount' class='increase'>
          <Button v-on:click="handleClickIncrement()">Increase by</Button>
          <Input-number :min='0' v-model="formData.inputIncAmount"/> <em class='vuex-note'>(vuex action)</em>
        </Form-item>
        <Form-item prop='inputDecAmount' class='decrease'>
          <Button v-on:click="handleClickDecrease()">Decrease by</button>
          <Input-number :min='0' v-model="formData.inputDecAmount" /> <em class='vuex-note'>(vuex action)</em>
        </Form-item> 
        <Form-item class='reset-delayed'>
          <Button type='primary' v-on:click="handleClickResetDelayed()">Reset After Delay</button> <em class='vuex-note'>(vuex async action)</em>
        </Form-item> 
      </Form>
    </Card>

  </div>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex-alt';

export default {
  data: () => {
    return {
      formData: {
        inputIncAmount: 1,
        inputDecAmount: 1
      },
      formRules: {
        inputIncAmount: [
          { type: 'number', min: 0, trigger: 'blur' }
        ],
        inputDecAmount: [
          { type: 'number', min: 0, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClickIncrement () {
      this.increase({ amount: this.formData.inputIncAmount });
    },
    handleClickDecrease () {
      this.decrease({ amount: this.formData.inputDecAmount });
    },
    handleClickResetDelayed () {
      this.resetDelayed();
    },
    ...mapActions({
      increase: (actions) => actions.counter.increase,
      decrease: (actions) => actions.counter.decrease,
      resetDelayed: (actions) => actions.counter.resetDelayed
    })
  },
  computed: {
    ...mapState({
      count: (state) => state.counter.count
    }),
    ...mapGetters({
      countPlusTen: (getters) => getters.counter.countPlusTen
    })
  }
}
</script>