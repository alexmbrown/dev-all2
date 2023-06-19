<template>
  <div class="h-100">
    <el-container class="h-100">
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <el-aside class="d-flex" width="200px">
            <GlobalNav></GlobalNav>
            <LocalNav></LocalNav>
          </el-aside>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import GlobalNav from './GlobalNav.vue'
import LocalNav from './LocalNav.vue'
</script>

<style scoped>
header {
  --el-header-height: 3rem;
  --el-header-padding: 0;
}

main {
  --el-main-padding: 0;
}

footer {
  --el-footer-height: 1.5rem;
  --el-footer-padding: 0;
}
</style>