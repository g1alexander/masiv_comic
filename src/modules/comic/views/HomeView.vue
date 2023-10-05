<script lang="ts" setup>
import { useComic } from '../composables'

const { loader, comic, setStar, starClass } = useComic()
</script>

<template>
  <main class="home">
    <template v-if="comic.getIsLoading">
      <img :src="loader" alt="loading..." width="180" />
    </template>

    <section class="home-section" v-else>
      <h1 class="home-section__h1">{{ comic.getComic.title.toUpperCase() }}</h1>
      <img class="home-section__img" :src="comic.getComic.img" :alt="comic.getComic.alt" />

      <div class="home-section__stars">
        <h3>Puntuacion:</h3>
        <p>
          <template v-for="star in 5" :key="star">
            <i
              @click="setStar(star)"
              class="home-section__stars__icon"
              :class="starClass(star)"
            ></i>
          </template>
        </p>
      </div>

      <article class="home-section__btns">
        <button v-if="comic.getPage > 1" @click="comic.setPage(comic.getPage - 1)">prev</button>
        <button @click="comic.setPage(comic.getPage + 1)">next</button>
      </article>
    </section>
  </main>
</template>
