<style scoped>
.Counter {
  border: 1px solid black;
  padding: 20px;
}
input {
  width: 3em;
}
.count {
  padding-left: 5px;
  margin-left: 15px;
  margin-bottom: 10px;
  border-left: 1px solid orange;
}
</style>

<template>
  <div class='Counter'>
    <div class='count'>
      <p>count: <span class='value'>{{ count }}</span></p>
      <p>count+10 <em>(getter)</em>: {{ countPlusTen }}</p>
    </div>
    <div class='increment'>
      <button v-on:click="handleClickIncrement()">Increment</button>
      <input type='number' v-model="inputIncAmount" min='0'/>
    </div>
    <div class='decrement'>
      <button v-on:click="handleClickDecrement()">Decrement</button>
      <input type='number' v-model="inputDecAmount" min='0' />
    </div>
    <div>
      <button class='reset-btn' v-on:click="handleClickResetDelayed()">Reset After Delay</button><em>(async action)</em>
    </div>
  </div>
</template>

<script>

// import { mapState, mapActions } from 'vuex';
import { mapGetters, mapActions, mapState } from 'vuex-alt';
import { MUTATION_TYPES, counterStore } from './../state/counter-store.js';

export default {
  data: () => {
    return {
      inputIncAmount: 0,
      inputDecAmount: 0
    }
  },
  methods: {
    handleClickIncrement () {
      this.increment({ amount: this.inputIncAmount });
    },
    handleClickDecrement () {
      this.decrement({ amount: this.inputDecAmount });
    },
    handleClickResetDelayed () {
      this.resetDelayed();
    },
    ...mapActions({
      increment: (actions) => actions.counter.increment,
      decrement: (actions) => actions.counter.decrement,
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