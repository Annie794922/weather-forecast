<template>
    <nav
        class="navbar navbar-expand-lg navbar-light mb-3"
        style="background-color: #8e8e8e"
    >
        <div class="container-fluid">
            <!-- Project logo(name) -->
            <router-link class="navbar-brand text-light" to="/">
                <i class="bi bi-brightness-alt-high"></i>
                {{ projectName }}
            </router-link>
            <!-- The button with hamburger icon in RWD mode -->
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Nav items -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li
                        class="nav-item"
                        v-for="(nav, index) in navSettings"
                        :key="index"
                    >
                        <router-link
                            class="nav-link"
                            :class="nav.color"
                            :to="nav.path"
                            :exact-active-class="nav.activeClass"
                        >
                            {{ nav.title }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'BaseNavbar',
    data() {
        return {
            projectName: 'Taiwan Weather Forecast',
            navSettings: [
                {
                    title: 'Home',
                    color: 'text-white',
                    path: '/',
                    activeClass: 'reading-page'
                }
                // {
                //     title: 'About',
                //     color: 'text-white',
                //     path: '/about',
                //     activeClass: 'reading-page'
                // }
            ]
        }
    }
}
</script>
<style scoped>
/* The active class when the user is reading the corresponding page */
.reading-page {
    text-decoration: underline;
    text-underline-offset: 5px;
}
</style>
