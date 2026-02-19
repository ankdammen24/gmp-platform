<template>
  <article class="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:bg-zinc-900/70 transition">
    <NuxtLink :to="`/post/${post.slug}`" class="block">
      <h3 class="text-base font-semibold leading-snug">
        {{ post.title?.rendered }}
      </h3>

      <p class="mt-3 text-sm text-zinc-300 line-clamp-3" v-html="excerpt"></p>

      <div class="mt-4 text-xs text-zinc-400">
        {{ dateText }}
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
type WpPost = {
  id: number
  slug: string
  date: string
  title?: { rendered: string }
  excerpt?: { rendered: string }
}

const props = defineProps<{ post: WpPost }>()
const excerpt = computed(() => props.post?.excerpt?.rendered ?? '')
const dateText = computed(() => {
  try {
    return new Date(props.post.date).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    })
  } catch {
    return props.post.date
  }
})
</script>