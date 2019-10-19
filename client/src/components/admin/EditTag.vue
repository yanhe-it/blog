<!-- 编辑标签 -->
<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}标签</h1>
    <el-form label-width="40px" v-model="tag" @submit.native.prevent="save">
      <el-form-item label="标签">
        <el-input v-model="tag.tag"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "edit_tag",
  props: {
    id: {}
  },
  data() {
    return {
      tag: {}
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`admin/common/tags/${this.id}`, this.tag);
      } else {
        await this.$http.post("admin/common/tags", this.tag);
      }
      this.$router.push("/admin/tag-list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`admin/common/tags/${this.id}`);
      this.tag = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style scoped>
</style>