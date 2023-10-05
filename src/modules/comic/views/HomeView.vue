<script lang="ts" setup>
import { useHomeView } from '../composables'

const { HomeInfo, HomeActions, comic, loader } = useHomeView()
</script>

<template>
  <main class="home">
    <template v-if="comic.getIsLoading">
      <img :src="loader" alt="loading..." width="180" />
    </template>

    <section class="home-section" v-else>
      <HomeInfo />

      <HomeActions />
    </section>
  </main>
</template>
