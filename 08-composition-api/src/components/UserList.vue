<template>
    <ul>
        <slot v-for="user in users" :key="user.id" :user="user"></slot>
    </ul>
</template>

<script>
export default {
    props: {
        users: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

ul{
    list-style: none;
}

</style>