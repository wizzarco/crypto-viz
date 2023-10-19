<template>
    <header>
        <div class="flex justify-end items-center py-2 px-4 lg:px-6 lg:hidden bg-gray-700">
            <div class="flex items-center pr-56">
                <button data-aos="fade-up" data-aos-delay="150" data-aos-once="true" type="button" data-dropdown-toggle="language-dropdown" class="inline-flex items-center text-gray-100 hover:bg-gray-600 font-medium rounded-lg text-sm px-2 lg:px-4 py-2 lg:py-2.5 mr-2 md:mr-3 focus:outline-none">
                    <img src="/img/drapeau/france.png" class="w-5 h-5 rounded-full md:mr-2">
                    <span class="hidden mr-2 md:inline">Français</span>
                    <svg class="hidden w-4 h-4 md:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <!-- Dropdown -->
                <div class="hidden z-50 my-4 w-48 text-base list-none bg-white rounded divide-y divide-gray-100 shadow" id="language-dropdown">
                    <ul class="py-1" role="none">
                        <li>
                            <a href="/fr/" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                <div class="inline-flex items-center">
                                    <img src="/img/drapeau/france.png" class="h-3.5 w-3.5 rounded-full mr-2">         
                                    Français
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="" disabled class="cursor-not-allowed block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                <div class="inline-flex items-center">
                                    <img src="/img/drapeau/royaume-uni.png" class="h-3.5 w-3.5 rounded-full mr-2">                                             
                                    English (SOON)
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <a href="/support" class="mr-2 text-sm font-medium hover:underline text-gray-100">Support</a>
            <a href="#" class="inline-flex items-center p-2 text-sm font-medium rounded-lg text-gray-100 focus:ring-4 hover:bg-gray-600 focus:outline-none focus:ring-gray-500">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd"></path></svg>
            </a>
            <a href="#" class="inline-flex items-center p-2 text-sm font-medium rounded-lg text-gray-100 focus:ring-4 hover:bg-gray-600 focus:outline-none focus:ring-gray-500">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
            </a>
        </div>
        <nav class="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
            <div class="grid grid-cols-3 items-center mx-auto max-w-screen-xl">
                <a href="/" class="flex items-center lg:justify-center lg:order-2">
                    <img src="/img/logo/logotype_sf_blanc.png" class="mr-3 h-10 sm:h-12" alt="Logo Crypto" />
                </a>
                <div class="flex col-span-2 justify-end items-center lg:order-3 lg:col-span-1">
                    <a href="/support" class="hidden mr-2 text-sm font-medium hover:underline text-gray-100 lg:inline">Support</a>
                    <a href="#" class="hidden items-center p-2 text-sm font-medium rounded-lg lg:inline-flex text-gray-100 focus:ring-4 hover:bg-gray-700 focus:outline-none focus:ring-gray-800">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd"></path></svg>
                    </a>
                    <a href="#" class="hidden items-center p-2 text-sm font-medium rounded-lg lg:inline-flex text-gray-100 focus:ring-4 hover:bg-gray-700 focus:outline-none focus:ring-gray-800">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                    </a>
                    <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="hidden col-span-3 justify-between items-center w-full lg:flex lg:w-auto lg:order-1 lg:col-span-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <a href="/" class="text-sm block py-2 pr-4 pl-3 border-b border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 text-gray-100 hover:bg-gray-700 hover:text-gray-200 lg:hover:bg-transparent border-gray-700">Accueil</a>
                        </li>
                        <li>
                            <a href="/cryptocurrency" class="text-sm block py-2 pr-4 pl-3 border-b border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 text-gray-100 hover:bg-gray-700 hover:text-gray-200 lg:hover:bg-transparent border-gray-700">Cryptocurrency</a>
                        </li>
                        <li>
                            <a href="/all-crypto" class="text-sm block py-2 pr-4 pl-3 border-b border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 text-gray-100 hover:bg-gray-700 hover:text-gray-200 lg:hover:bg-transparent border-gray-700">All crypto</a>
                        </li>
                        <li>
                            <a href="/blog" class="text-sm block py-2 pr-4 pl-3 border-b border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 text-gray-100 hover:bg-gray-700 hover:text-gray-200 lg:hover:bg-transparent border-gray-700">Blog</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <nav class="border-gray-200 border-gray-600 bg-gray-700 hidden lg:block">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl px-4 md:px-6 py-2.5">
                <form id="search-form" class="hidden w-96 lg:inline-block pl-24">   
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search" id="search-bar" class="block py-2 px-4 pl-10 w-full text-sm text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Recherche">
                    </div>
                </form>
                <div class="flex items-center pr-20">
                    <button data-aos="fade-up" data-aos-delay="150" data-aos-once="true" type="button" data-dropdown-toggle="language-dropdown" class="inline-flex items-center text-gray-100 hover:bg-gray-600 font-medium rounded-lg text-sm px-2 lg:px-4 py-2 lg:py-2.5 mr-2 md:mr-3 focus:outline-none">
                        <img src="/img/drapeau/france.png" class="w-5 h-5 rounded-full md:mr-2">
                        <span class="hidden mr-2 md:inline">Français</span>
                        <svg class="hidden w-4 h-4 md:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <!-- Dropdown -->
                    <div class="hidden z-50 my-4 w-48 text-base list-none bg-white rounded divide-y divide-gray-100 shadow" id="language-dropdown">
                        <ul class="py-1" role="none">
                            <li>
                                <a href="/fr/" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                    <div class="inline-flex items-center">
                                        <img src="/img/drapeau/france.png" class="h-3.5 w-3.5 rounded-full mr-2">         
                                        Français
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="" disabled class="cursor-not-allowed block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                    <div class="inline-flex items-center">
                                        <img src="/img/drapeau/royaume-uni.png" class="h-3.5 w-3.5 rounded-full mr-2">                                             
                                        English (SOON)
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>