<template>
  <div class='helper'>
    <span class='left'>{{unFinishedTodoLength}} items left</span>
    <span class='tabs'>
      <span
        v-for='state in states'
        :key='state'
        :class='[state, filter === state ? "actived" : ""]'
        @click='toggleFilter(state)'>
        {{state}}
      </span>
    </span>
    <span class='clear' @click='clearAllCompleted'>Clear Completed</span>
  </div>
</template>
<script>
  import '../assets/styles/tabs.styl'
  export default {
    props:{
      filter: {
        type: String,
        required:true,
      },
      todos: {
        type: Array,
        required:true,
      }
    },
    data() {
      return {
        states:['all','active','completed']
      }
    },
    computed: {
      unFinishedTodoLength () {
        return this.todos.filter(todo => !todo.completed).length
      }
    },
    methods:{
      toggleFilter(state) {
        this.$emit('toggle',state)
      },
      clearAllCompleted() {
        this.$emit('clearAllCompleted')
      }

    }
  }
</script>