<script setup lang="ts">
import { onMounted } from 'vue'
import { useComicStore } from './modules/comic/store/index'

const comic = useComicStore()

onMounted(async () => {
  const page = localStorage.getItem('page')

  comic.setPage(page ? Number(page) : 1)
})
</script>

<template>
  <RouterView />
</template>
