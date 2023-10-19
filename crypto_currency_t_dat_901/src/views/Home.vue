<template>
  <div>
    <Navbar />

    <!-- Home du site -->
    <main>
      <div class="relative px-6 lg:px-8 bg-gray-800">
        <div class="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
          <div>
            <div>
              <div class="hidden sm:block col-span-12 lg:col-span-6">
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/ellipse-1.png" class="hidden sm:block absolute ml-8 mb-8 bottom-40 xl:bottom-16 left-4 xl:left-0 w-6"/>
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/ellipse-2.png" class="hidden sm:block absolute top-4 sm:top-10 right-64 sm:right-96 xl:right-[32rem] w-6"/>
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/ellipse-3.png" class="hidden sm:block absolute bottom-56 right-24 w-6"/>
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/star.png" class="hidden sm:block absolute top-20 sm:top-28 right-16 lg:right-0 lg:left-[30rem] w-8"/>
              </div>
              <h1 data-aos="zoom-in" class="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl text-gray-100">The World's <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-sky-500">Top Cryptocurrencies</span> Web App</h1>
              <p data-aos="fade-up" data-aos-once="true" data-aos-delay="700" class="mt-6 text-lg leading-8 text-gray-200 sm:text-center">Consult CryptoCoin and follow live the price of the main cryptocurrencies. Evolution over 24 hours, volumes, capitalization, evolution of euro/dollar prices in real time.</p>
            </div>
          </div>
        </div>
      </div>
    </main>   
    
    <!-- Crypto statistic -->
    <StatisticCrypto />

    <!-- View all cryptocurrency -->
    <div>
        <center><a href="/cryptocurrency"><button class="py-2 px-4 bg-transparent mt-8 text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">View all Cryptocurrency</button></a></center>
    </div>

    <!-- Get started -->
    <section class="bg-gray-700">
      <div class="relative max-w-full sm:mx-4 xl:mx-10 my-24 shadow sm:rounded-2xl overflow-hidden">
        <div class="w-full py-16 flex flex-col items-center">
          <h2 data-aos="flip-down" class="text-3xl sm:text-4xl font-semibold text-center text-gray-100">
            Get started in just a few minutes
          </h2>
          <div data-aos="fade-up" class="relative w-full flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 px-4 xl:px-10 mt-16 sm:mt-8">
            <div class="max-w-[280px] xl:max-w-[363px] space-y-6 sm:space-y-3 text-center">
              <img src="img/icon-started/signup.png" class="max-w-[245px] mx-auto" alt="" />
              <h3 class="text-xl text-neutral-100 font-semibold">View top cryptocurrency</h3>
              <p class="text-sm text-gray-100 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rem quaerat unde aspernatur id delectus temporibus velit asperiores, natus quod quasi impedit sint consectetur, et nesciunt doloribus fugit tempora ipsa.
              </p>
            </div>
            <div class="max-w-[280px] xl:max-w-[363px] space-y-6 sm:space-y-3 text-center">
              <img src="img/icon-started/fund.png" class="max-w-[245px] mx-auto" alt="" />
              <h3 class="text-xl text-neutral-100 font-semibold">Fund</h3>
              <p class="text-sm text-gray-100 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sint tenetur in delectus possimus beatae. Minima vel dignissimos, cum iure dolorem ab eum officia error tempora atque, totam commodi temporibus!
              </p>
            </div>
            <div class="max-w-[280px] xl:max-w-[363px] space-y-6 sm:space-y-3 text-center">
              <img src="img/icon-started/trading.png" class="max-w-[245px] mx-auto" alt="" />
              <h3 class="text-xl text-neutral-100 font-semibold">Trading</h3>
              <p class="text-sm text-gray-100 leading-relaxed">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis tenetur quaerat repellat quidem numquam ex molestiae ipsa, enim reprehenderit nulla nobis in quae assumenda incidunt delectus temporibus, natus facilis voluptatum.
              </p>
            </div>
            <img src="img/icon-started/arrow.png" class="hidden lg:inline-block absolute top-32 left-64 xl:left-[30rem] w-24 xl:w-[9.5rem]"/>
            <img src="img/icon-started/arrow.png" class="hidden lg:inline-block absolute top-32 right-64 xl:right-[30rem] w-24 xl:w-[9.5rem]"/>
          </div>
        </div>
      </div>
    </section>

    <!-- Blogs -->
    <div data-aos="zoom-out" data-aos-delay="500" class="mx-auto max-w-8xl pb-12 px-4 sm:px-6 lg:px-8">
      <div class="overflow-hidden rounded-lg bg-sky-700 shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
        <div class="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
          <div class="lg:self-center">
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <span class="block">Blog</span>
            </h2>
            <p class="mt-4 text-lg leading-6 text-sky-200">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.</p>
            <a href="/blog" class="mt-8 inline-flex items-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-sky-600 shadow hover:bg-sky-50">See all announcing</a>
          </div>
        </div>
        <div class="aspect-w-5 aspect-h-3 -mt-6 md:aspect-w-2 md:aspect-h-1">
          <img class="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20" src="/img/news.jpeg">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Navbar from "@/components/layouts/Header.vue";
  import StatisticCrypto from "../components/StatisticCrypto.vue";
</script>
