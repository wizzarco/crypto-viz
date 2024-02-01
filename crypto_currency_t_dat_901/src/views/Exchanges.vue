<template>
    <div>
      <!-- Navbar -->
      <Navbar />
          
      <!-- Exchanges -->
        <div class="font-sans flex flex-col mt-32 mb-20">
            <div>
                <div class="md:overflow-hidden">
                    <div class="px-4 py-12">
                        <div class="relative w-full md:max-w-2xl md:mx-auto text-center">
                          <h1 data-aos="zoom-in" class="font-bold text-gray-100 text-xl sm:text-2xl md:text-5xl leading-tight mb-6">
                            Top Cryptocurrency Spot Exchanges
                        </h1>
                        <p data-aos="fade-up" data-aos-delay="300" class="text-gray-200 md:text-base md:px-18">
                            CryptoCoin ranks and scores exchanges based on traffic, liquidity, trading volumes, and confidence in the legitimacy of trading volumes reported
                        </p>
                        </div>
                    </div>
                    
                    <img data-aos="fade-up" data-aos-delay="400" data-aos-once="true" src="/img/pattern/star.png" class="hidden sm:block absolute ml-8 bottom-40 xl:bottom-80 left-4 xl:left-0 w-6"/>
                    <img data-aos="fade-up" data-aos-delay="400" data-aos-once="true" src="/img/pattern/ellipse-3.png" class="hidden sm:block absolute top-4 sm:top-80 right-64 sm:right-96 xl:right-[32rem] w-6"/>
                    <img data-aos="fade-up" data-aos-delay="400" data-aos-once="true" src="/img/pattern/ellipse-2.png" class="hidden sm:block absolute bottom-56 right-24 w-6"/>
                    <img data-aos="fade-up" data-aos-delay="400" data-aos-once="true" src="/img/pattern/ellipse-2.png" class="hidden sm:block absolute sm:top-48 right-16 lg:right-0 lg:left-[30rem] w-8"/>
                </div>

                <!--  Statistique des exchanges -->
                <StatisticExchanges />
                
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from "@/components/layouts/Header.vue";
import StatisticExchanges from "../components/StatisticExchanges.vue";
</script>