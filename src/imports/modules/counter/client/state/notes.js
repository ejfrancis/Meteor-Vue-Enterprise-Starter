 computed: ...mapState({
    // arrow functions can make the code very succinct!
    count: state => state.count,

    // passing the string value 'count' is same as `state => state.count`
    countAlias: 'count',

    // to access local state with `this`, a normal function must be used
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })

 computed: ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }


methods: {
    ...mapMutations([
      'increment', // map `this.increment()` to `this.$store.commit('increment')`

      // `mapMutations` also supports payloads:
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // map `this.add()` to `this.$store.commit('increment')`
    })
  }
}

 methods: {
    ...mapActions([
      'increment', // map `this.increment()` to `this.$store.dispatch('increment')`

      // `mapActions` also supports payloads:
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
    ])
 }

 ----------------------------------------------------------------------

 /**
  * 
  * - no mutations. only actions, state and getters in components
  * - allow mapActions mapGetters alternatives
  */
 mapState({
   count: (state) => state.counter.count
 })
--- NO! actions only call mutations, always use actions -- mapMutations({
   increment: (mutations) => mutations.counter.increment
 })
 mapActions({
   increment: (actions) => actions.counter.increment
 })
 mapGetters({
   countPlusTen: getters.counter.countPlusTen
 })