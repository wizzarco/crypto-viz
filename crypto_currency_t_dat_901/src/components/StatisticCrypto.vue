<template>
    <section data-aos="fade-up" class="max-w-screen-2xl mx-2 sm:mx-auto mt-4 py-6 sm:py-6 rounded-[2.25rem] sm:rounded-xl bg-gray-700 shadow-lg sm:shadow-md transform lg:-translate-y-12">
      <div class="flex flex-col lg:flex-row">

        <!-- Top trending -->
        <div data-aos="fade-up" data-aos-delay="300" class="relative flex flex-col min-w-0 break-words bg-gray-700 w-full rounded xl:border-r border-gray-200">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-gray-100">🔥 Top Trending</h3>
              </div>
              <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <a v-if="this.$route.name != 'cryptocurrency'" href="/cryptocurrency"><button class="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button></a>
              </div>
            </div>
          </div>

          <div class="block w-full overflow-x-auto">
            <table class="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Price</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Stats</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cryptostat, index) in topTrending.slice(0, 3)" :key="cryptostat.symbol" class="text-sm">
                    <th class="border-b-0 hover:text-gray-300  px-6 align-middle border-t border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-left flex items-center text-gray-100">
                        <img :src="cryptostat.image" class="mr-2 h-5"/><a href="">{{ cryptostat.name }}</a>
                    </th>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">{{ cryptostat.price }}</td>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">
                        <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>{{ cryptostat.market_cap }}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Top gainerss -->
        <div data-aos="fade-up" data-aos-delay="400" class="relative flex flex-col min-w-0 mt-20 sm:mt-0 break-words bg-gray-700 w-full rounded xl:border-r border-gray-200">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-gray-100">🚀 Top Gainers</h3>
              </div>
              <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <a v-if="this.$route.name != 'cryptocurrency'" href="/cryptocurrency"><button class="bg-blue-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button></a>
              </div>
            </div>
          </div>

          <div class="block w-full overflow-x-auto">
            <table class="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Price</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Stats</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cryptostat, index) in topGainers.slice(0, 3)" :key="cryptostat.symbol" class="text-sm">
                    <th class="border-b-0 hover:text-gray-300 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-left flex items-center text-gray-100">
                        <img :src="cryptostat.image" class="mr-2 h-5"/><a href="">{{ cryptostat.name }}</a>
                    </th>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">{{ cryptostat.price }}</td>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">
                        <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>{{ cryptostat.market_cap }}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recently Added -->
        <div data-aos="fade-up" data-aos-delay="500" class="relative flex flex-col min-w-0 mt-20 sm:mt-0 break-words bg-gray-700 w-full rounded ">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-gray-100">💎 Recently Added</h3>
              </div>
              <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <a v-if="this.$route.name != 'cryptocurrency'" href="/cryptocurrency"><button class="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button></a>
              </div>
            </div>
          </div>

          <div class="block w-full overflow-x-auto">
            <table class="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Price</th>
                  <th class="px-6 bg-gray-700 text-gray-100 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Stats</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cryptostat, index) in recentlyAdded.slice(0, 3)" :key="cryptostat.symbol" class="text-sm">
                    <th class="border-b-0 hover:text-gray-300 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-left flex items-center text-gray-100">
                        <img :src="cryptostat.image" class="mr-2 h-5"/><a href="">{{ cryptostat.name }}</a>
                    </th>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">{{ cryptostat.price }}</td>
                    <td class="border-b-0 px-6 align-middle border border-solid border-gray-100 border-l-0 border-r-0 whitespace-nowrap p-4 text-gray-100">
                        <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>{{ cryptostat.market_cap }}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </section>
</template>

<script>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    export default {
        setup() {
            const topTrending = ref([]);
            const topGainers = ref([]);
            const recentlyAdded = ref([]);

            const fetchData = async (url, dataRef) => {
            try {
                const response = await axios.get(url);
                dataRef.value = response.data;
                // updatePagination(); // Assurez-vous que cette fonction est définie quelque part.
            } catch (error) {
                console.error(`Erreur lors de la récupération des données depuis ${url}:`, error);
            }
            };

            onMounted(async () => {
            const storageKey = 'coins';

            try {
                const endpoints = [
                { url: 'http://localhost:3000/api/cryptos/top-trending', ref: topTrending },
                { url: 'http://localhost:3000/api/cryptos/top-gainers', ref: topGainers },
                { url: 'http://localhost:3000/api/cryptos/recently-added', ref: recentlyAdded },
                ];

                for (const { url, ref } of endpoints) {
                await fetchData(url, ref);
                }

                // Save the data to localStorage (you may want to store it differently for each category)
                localStorage[storageKey] = JSON.stringify({
                topTrending: topTrending.value,
                topGainers: topGainers.value,
                recentlyAdded: recentlyAdded.value,
                });

            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
            });

            return {
            topTrending,
            topGainers,
            recentlyAdded,
            };
        },
    };
</script>
