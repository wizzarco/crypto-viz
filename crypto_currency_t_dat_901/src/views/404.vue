<template>
    <div class="isolate">

        <!-- Navbar -->
        <Navbar />

        <!-- 404 -->
        <div class="flex min-h-full py-56 flex-col">
            <main class="mx-auto flex max-w-7xl flex-grow flex-col justify-center">
                <div class="text-center">
                    <p class="text-xl font-semibold text-sky-600">404</p>
                    <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">Page not found.</h1>
                    <p class="mt-2 text-base text-gray-300">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div class="mt-6">
                        <a href="/" class="text-base font-medium text-sky-600 hover:text-sky-500">
                            Go back home
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </div>
            </main>
            <center><img src="/img/error-404.png" class="h-48"/></center>
        </div>

    </div>
</template>

<script setup>
  import Navbar from "@/components/layouts/Header.vue";
</script>