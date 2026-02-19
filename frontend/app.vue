<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100">
    <header class="border-b border-zinc-800">
      <div class="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
        <NuxtLink to="/" class="text-lg font-semibold tracking-wide">
          Guerilla Minstrel
        </NuxtLink>
        <a
          class="text-sm text-zinc-300 hover:text-white"
          :href="cmsUrl"
          target="_blank"
          rel="noreferrer"
        >
          CMS
        </a>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-10">
      <NuxtPage />
    </main>

    <footer class="border-t border-zinc-800">
      <div class="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-400">
        © {{ new Date().getFullYear() }} Guerilla Minstrel Publishing
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const cmsUrl = config.public.wpBaseUrl
</script>