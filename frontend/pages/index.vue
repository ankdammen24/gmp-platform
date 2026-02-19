<template>
  <section>
    <h1 class="text-3xl font-semibold tracking-tight">Senaste inlägg</h1>
    <p class="mt-2 text-zinc-300">Hämtas från WordPress via REST API.</p>

    <div v-if="pending" class="mt-8 text-zinc-300">Laddar…</div>
    <div v-else-if="error" class="mt-8 text-red-300">
      Kunde inte hämta inlägg. Kolla att WP API är åtkomligt.
      <div class="mt-2 text-xs opacity-80">{{ errorMessage }}</div>
    </div>

    <div v-else class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <PostCard v-for="p in posts" :key="p.id" :post="p" />
    </div>
  </section>
</template>

<script setup lang="ts">
import PostCard from '~/components/PostCard.vue'

type WpPost = {
  id: number
  slug: string
  date: string
  title?: { rendered: string }
  excerpt?: { rendered: string }
}

const config = useRuntimeConfig()
const endpoint = `${config.public.wpBaseUrl}/wp-json/wp/v2/posts?per_page=12&_embed=1`

const { data, pending, error } = await useFetch<WpPost[]>(endpoint, {
  server: true
})

const posts = computed(() => data.value ?? [])
const errorMessage = computed(() => (error.value as any)?.message ?? String(error.value ?? ''))
</script>