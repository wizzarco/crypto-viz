<template>
    <div data-aos="zoom-in" data-aos-delay="200" data-aos-once="true" class="max-w-8xl mx-auto bg-gray-700 shadow-lg relative z-20 mt-8 hidden md:block">

        <!-- Tables of the best cryptocurrency -->
        <div class="mb-12 xl:mb-0 mx-auto">
            <div class="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-6 shadow-lg rounded">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                    <div class="flex flex-wrap items-center">
                        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-gray-100">Watchlist</h3>
                        </div>
                    </div>
                </div>

                <div class="block w-full overflow-x-auto">
                    <table class="items-center bg-transparent w-full border-collapse ">
                        <!-- Ce que contient la tables des cryptocurrency -->
                        <thead>
                            <tr>
                                <th class="px-6 text-gray-100 align-middle border border-solid border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Rating</th>
                                <th class="px-6 text-gray-100 align-middle border border-solid border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
                                <th class="px-6 text-gray-100 align-middle border border-solid border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Price</th>
                                <th class="px-6 text-gray-100 align-middle border border-solid border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Volume 1h </th>
                                <th class="px-6 text-gray-100 align-middle border border-solid border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">24h %</th>
                                <th class="px-6 text-gray-100 align-middle border border-solid border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">7d %</th>
                                <th class="px-6 text-gray-100 align-middle border border-solid border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Volume (24h)</th>
                                <th class="px-6 text-gray-100 align-middle border border-solid border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Circulating Supply</th>
                                <th class="px-6 text-gray-100 align-middle border border-solid border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Volume Graph (7d)</th>
                            </tr>
                        </thead>

                        <!-- Contents de la table -->
                        <tbody>
                            <tr v-for="cryptocurrency in cryptocurrencies" class="hover:bg-gray-600">
                                <td class="border-t-0 border border-solid border-gray-100 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-gray-100">{{ cryptocurrency.ratingrank }}</td>
                                <th class="border-t-0 px-6 align-middle border border-solid border-gray-100 text-sm border-l-0 border-r-0 whitespace-nowrap p-4 text-left flex items-center text-gray-100">
                                <img :src="cryptocurrency.image" class="mr-2 h-6"/><a href="#">{{ cryptocurrency.symbol }}</a></th>
                                <td class="border-t-0 border border-solid border-gray-100 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-gray-100">{{ cryptocurrency.price }}</td>
                                <td class="border-t-0 border border-solid border-gray-100 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-gray-100"><i class="fas fa-arrow-down text-red-500 mr-4"></i>{{ cryptocurrency.volumehour }}</td>
                                <td class="border-t-0 border border-solid border-gray-100 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-gray-100"><i class="fas fa-arrow-up text-emerald-500 mr-4"></i>{{ cryptocurrency.volume24h }}</td>
                                <td class="border-t-0 border border-solid border-gray-100 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-gray-100"><i class="fas fa-arrow-down text-red-500 mr-4"></i>{{ cryptocurrency.volumeday }}</td>
                                <td class="border-t-0 border border-solid border-gray-100 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-gray-100">{{ cryptocurrency.top24h }}</td>
                                <td class="border-t-0 border border-solid border-gray-100 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-gray-100">{{ cryptocurrency.maxsupply }}</td>
                                <td class="border-t-0 border border-solid border-gray-100 x-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-red-500"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Pagination -->
    <div class="max-w-8xl mx-auto z-50 relative">
        <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
            <div class="-mt-px flex w-0 flex-1">
                <a href="#" v-if="currentPage > 1" @click.prevent="loadPage(currentPage - 1)" class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:text-sky-500">
                    <svg class="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clip-rule="evenodd" />
                    </svg>
                    Previous
                </a>
                <a v-else class="cursor-not-allowed inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500">
                </a>
            </div>

            <div class="hidden md:-mt-px md:flex">
                <template v-for="page in totalPage">
                    <!-- Afficher les trois premières pages -->
                    <a href="#" v-if="page <= 3" :key="page" @click.prevent="loadPage(page)"
                        class="border-t-2 px-4 pt-4 text-sm font-medium"
                        :class="{
                            'border-sky-500 text-sky-600': currentPage === page,
                            'border-transparent text-gray-500 hover:border-gray-300 hover:text-sky-600': currentPage !== page
                        }">
                        {{ page }}
                    </a>

                    <!-- Afficher les points de suspension avant la page actuelle -->
                    <span v-if="page === 4 && totalPage > 6 && currentPage > 4" class="px-4 pt-4 text-sm font-medium text-gray-500">...</span>

                    <!-- Afficher la page actuelle (sauf sur les trois premières pages) -->
                    <span v-if="currentPage === page && currentPage > 3 && currentPage < totalPage - 2"
                        class="border-t-2 px-4 pt-4 text-sm font-medium text-gray-500"
                        :class="{
                            'border-sky-500 text-sky-600': currentPage === page,
                            'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': currentPage !== page
                        }">
                        {{ currentPage }}
                    </span>

                    <!-- Afficher les points de suspension après la page actuelle -->
                    <span v-if="page === currentPage + 2 && totalPage > currentPage + 3 && currentPage < totalPage - 2"
                        class="px-4 pt-4 text-sm font-medium text-gray-500">...</span>

                    <!-- Afficher les trois dernières pages -->
                    <a href="#" v-if="page >= totalPage - 2" :key="page" @click.prevent="loadPage(page)"
                        class="border-t-2 px-4 pt-4 text-sm font-medium"
                        :class="{
                            'border-sky-500 text-sky-600': currentPage === page,
                            'border-transparent text-gray-500 hover:border-gray-300 hover:text-sky-600': currentPage !== page
                        }">
                        {{ page }}
                    </a>
                </template>
            </div>

            <div class="-mt-px flex w-0 flex-1 justify-end">
                <a href="#" v-if="currentPage < totalPage" @click.prevent="loadPage(currentPage + 1)" class="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:text-sky-500">
                    Next
                    <svg class="ml-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clip-rule="evenodd" />
                    </svg>
                </a>
                <a v-else class="cursor-not-allowed inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500">
                </a>
            </div>
        </nav>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const cryptocurrencies = ref([]);
    const currentPage = ref(1);
    const totalPage = ref(159);
    const sortedCryptocurrencies = ref([]);

    const loadPage = async (page) => {
    try {
        if (page < 1) {
            return;
        }

        const response = await axios.get(`http://localhost:11003/api_back/cryptos/all-cryptocurrency?page=${page}`);
        cryptocurrencies.value = response.data;

        // Tri du tableau par le prix (price) en ordre décroissant
        sortedCryptocurrencies.value = response.data.slice().sort((a, b) => b.price - a.price);

        // Calculer le rang en fonction de la page actuelle
        const startIndex = (page - 1) * response.data.length;
            sortedCryptocurrencies.value.forEach((crypto, index) => {
            crypto.rank = startIndex + index + 1;
        });

        currentPage.value = page;
        } catch (error) {
            console.error('Error loading page:', error.response ? error.response.data : error.message);
        }
    };

    onMounted(() => {
        loadPage(currentPage.value);
    });
</script>
