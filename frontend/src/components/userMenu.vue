<script setup>

import  {isUserMenuVisible}  from '../use/useStateMenu'
import { authUserObject } from '../use/useAuth';


</script>

<template>  
    <div class="mt-2 flex relative w-4/5 h-4/5">
        <div class="   rounded-lg  w-full h-full bg-white z-1500 ">
            {{ isUserMenuVisible }}
            <h1>Hello</h1>
            <!-- <span>{{ authUserObject.name }}</span> -->

        </div>

    </div>
</template>