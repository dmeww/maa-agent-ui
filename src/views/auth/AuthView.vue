<script setup lang="ts">
import {reactive, ref} from "vue";
import {Auth} from "@/pocketbase/types";
import {login} from "@/pocketbase";

import ThemeButton from "@/components/ThemeButton.vue";

const passType = ref(false)

const form: Auth = reactive({
  baseUrl: '',
  email: '',
  password: ''
})



</script>

<template>

  <v-card class="h-100">
    <v-layout class="h-100">
      <v-app-bar color="primary">

        <v-app-bar-nav-icon rounded="xl" variant="text">
          <v-icon icon="mdi-hexagon-slice-6"></v-icon>
        </v-app-bar-nav-icon>

        <v-toolbar-title>Maa Agent</v-toolbar-title>

        <v-spacer></v-spacer>

        <theme-button />

      </v-app-bar>

      <v-main class="h-100 d-flex align-center justify-center">

        <v-sheet
            class="w-100 d-flex justify-center align-center flex-column pa-5 ma-5"
            max-width="400"
            border elevation="1" rounded="lg">

          <v-sheet class="w-100 d-flex justify-center flex-column">
            <v-icon class="mx-auto" icon="mdi-hexagon-slice-6" size="64" color="primary"/>
            <v-sheet style="font-size: 24px;text-align: center">
              Maa Agent
            </v-sheet>
          </v-sheet>


          <v-sheet class="w-100 h-100">

            <v-sheet class="h-100">
              <v-form>
                <v-label>PocketBase URL</v-label>
                <v-text-field
                    v-model="form.baseUrl"
                    aria-label="Url"
                    class="mt-2 mb-2"
                    required
                    rounded="lg"
                    hide-details="auto"
                    density="compact"
                    variant="outlined"
                    color="primary"
                ></v-text-field>


                <v-label>邮箱</v-label>
                <v-text-field
                    aria-label="邮箱"
                    v-model="form.email"
                    class="mt-2"
                    required
                    rounded="lg"
                    hide-details="auto"
                    density="compact"
                    variant="outlined"
                    color="primary"
                ></v-text-field>
                <v-label class="mt-2">密码</v-label>
                <v-text-field
                    v-model="form.password"
                    required
                    rounded="lg"
                    variant="outlined"
                    density="compact"
                    color="primary"
                    hide-details="auto"
                    :type="passType?'text':'password'"
                    class="mt-2"
                >
                  <template v-slot:append-inner>
                    <v-icon @click="passType = !passType">
                      {{ passType ? 'mdi-eye-off' : 'mdi-eye' }}
                    </v-icon>
                  </template>
                </v-text-field>


                <v-divider/>

                <v-btn
                    color="primary"
                    block
                    class="mt-5"
                    rounded="lg"
                    variant="flat"
                    @click="()=>login(form)"
                    size="large">
                  登录
                </v-btn>
              </v-form>
            </v-sheet>

          </v-sheet>

        </v-sheet>

      </v-main>
    </v-layout>
  </v-card>

</template>

