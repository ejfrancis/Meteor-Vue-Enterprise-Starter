<style scoped>
.top-pad-large {
  height: 55px;
}

.top-pad-mobile {
  height: 35px;
}

.form-title {
  margin-bottom: 20px;
}

.form-col {
  border: 1px solid #b3b3b3;
  background: white;
  padding: 20px;
}
</style>

<template>
  <div class='AccountsFormContainer'>
    <media :query='{ minWidth: 768 }'>
      <div class='top-pad-large'>
      </div>
    </media>
    <media :query='{ maxWidth: 768 }'>
      <div class='top-pad-mobile'>
      </div>
    </media>
    <Row>
      <Col :xs='24' :sm='{ span: 14, push: 5}' class='form-col'>
        <h1 class='form-title'>{{ title }}</h1>
        <slot></slot>
      </Col>
    </Row>
  </div>
</template>

<script>
import Media from 'vue-media';

export default {
  components: {
    Media
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>