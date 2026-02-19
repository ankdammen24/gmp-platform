<template>
  <section>
    <div v-if="pending" class="text-zinc-300">Laddar…</div>

    <div v-else-if="error" class="text-red-300">
      Kunde inte hämta inlägg.
      <div class="mt-2 text-xs opacity-80">{{ errorMessage }}</div>
    </div>

    <article v-else-if="post" class="prose prose-invert max-w-none">
      <NuxtLink to="/" class="no-underline text-sm text-zinc-300 hover:text-white">
        ← Tillbaka
      </NuxtLink>

      <h1 class="mt-4">{{ post.title?.rendered }}</h1>
      <div class="text-sm text-zinc-400 -mt-3">
        {{ dateText }}
      </div>

      <div class="mt-8" v-html="post.content?.rendered"></div>
    </article>

    <div v-else class="text-zinc-300">Inlägget hittades inte.</div>
  </section>
</template>

<script setup lang="ts">
type WpPost = {
  id: number
  slug: string
  date: string
  title?: { rendered: string }
  content?: { rendered: string }
}

const route = useRoute()
const slug = String(route.params.slug || '')

const config = useRuntimeConfig()
const endpoint = `${config.public.wpBaseUrl}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`

const { data, pending, error } = await useFetch<WpPost[]>(endpoint, { server: true })
const post = computed(() => (data.value && data.value.length ? data.value[0] : null))

const dateText = computed(() => {
  if (!post.value?.date) return ''
  try {
    return new Date(post.value.date).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    })
  } catch {
    return post.value.date
  }
})

const errorMessage = computed(() => (error.value as any)?.message ?? String(error.value ?? ''))
</script>