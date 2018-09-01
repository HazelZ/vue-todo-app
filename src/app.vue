<template>
  <div id='app'>
    <div id="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'

export default {
  data () {
    return {
    }
  },
  components:{
    Header,
    Todo,
    Footer
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
#cover{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #333;
  opacity: 0.9;
  z-index: -1;
}
</style>