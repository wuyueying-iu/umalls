<template>
  <div>
    <!-- table -->
    <v-list @edit="edit"></v-list>
    <!-- 弹框 -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vForm from "./components/form";
import vList from "./components/list";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "编辑会员"
      }
    };
  },
  components: {
    vList,
    vForm
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    edit(uid) {
      this.info = {
        isshow: true
      };
      this.$refs.form.getOne(uid)
    }
  }
};
</script>

<style>
</style>