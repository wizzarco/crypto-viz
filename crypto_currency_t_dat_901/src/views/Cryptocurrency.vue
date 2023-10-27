<template>
    <div>
      <!-- Navbar -->
      <Navbar />

      <div class="font-sans flex flex-col mt-32 mb-20">
          <div>
              <div class="md:overflow-hidden">
                  <div class="px-4 py-12">
                      <div class="relative w-full md:max-w-2xl md:mx-auto text-center">
                      <h1 data-aos="zoom-in" class="font-bold text-gray-100 text-xl sm:text-2xl md:text-5xl leading-tight mb-6">
                          Today's Cryptocurrency Prices by Market Cap
                      </h1>
                      <p data-aos="fade-up" data-aos-delay="300" class="text-gray-200 md:text-base md:px-18">
                          The global crypto market cap is €805.87B, a <i class="fas fa-arrow-up text-emerald-500 mr-1 ml-1"></i>1.29% increase over the last day.
                      </p>
                      </div>
                  </div>
                  
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/star.png" class="hidden sm:block absolute ml-8 bottom-40 xl:bottom-80 left-4 xl:left-0 w-6"/>
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/ellipse-2.png" class="hidden sm:block absolute top-4 sm:top-80 right-64 sm:right-96 xl:right-[32rem] w-6"/>
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/ellipse-3.png" class="hidden sm:block absolute bottom-56 right-24 w-6"/>
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/star.png" class="hidden sm:block absolute top-40 right-10 w-8"/>
                  <img data-aos="fade-up" data-aos-delay="400" src="img/pattern/ellipse-3.png" class="hidden sm:block absolute top-20 sm:top-48 right-16 lg:right-0 lg:left-[30rem] w-8"/>
              </div>

              <!-- Statistique des currency -->
              <StatisticCurrency />
              
          </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import Navbar from "@/components/layouts/Header.vue";
    import StatisticCurrency from "../components/StatisticCurrency.vue";
  </script>
  