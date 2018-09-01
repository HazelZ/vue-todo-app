<template>
  <section id='real-app'>
    <input type="text"
          class='add-input'
          autofocus='autofocus'
          placeholder='what to do next?'
          @keyup.enter='addToDo'
    />
    <Item 
      :todo='todo'
      v-for='todo in filteredTodos'
      :key='todo.id'
      @del='deleteTodo' />
    <Tabs 
      :filter='filter'
      :todos='todos' 
      @toggle='toggleFilter'
      @clearAllCompleted='clearAllCompleted'/>
  </section>
</template>
<script>
import '../assets/styles/todo.styl'
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 0;
export default {
    components:{
      Item,
      Tabs,
    },
    data () {
      return {
        todos:[],
        filter:'all'
      }
    },
    computed: {
      filteredTodos() {
        if(this.filter === 'all'){
          return this.todos
        }
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    methods:{
      addToDo (e) {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        })
        e.target.value=''
      },
      deleteTodo (id) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
      },
      toggleFilter(state) {
        this.filter = state
      },
      clearAllCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed)
      }
    }
}
</script>