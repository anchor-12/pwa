<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row my-5>
          <v-col cols="8" offset="1">
            <v-text-field label="To do" autofocus v-model="sTodoTitle">
            </v-text-field>
          </v-col>
          <v-col cols="2" my-2>
            <v-btn
              fab
              max-height="50px"
              max-width="50px"
              color="pink"
              dark
              @click="fnSubmitTodo()"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-list two-line v-for="item in oTodos" :key="item.key">
              <v-card flat color="gray lighten-3" v-if="!item.b_edit">
                <v-list-item class="py-2">
                  <v-list-item-action>
                    <v-checkbox
                      v-model="item.b_completed"
                      @change="fnCheckboxChange(item)"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title
                      :class="{'style_completed': item.b_completed}"
                    >{{item.todo_title}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="mt-2">
                      <v-icon class="pointer" @click="fnSetEditTodo(item['.key'])">mdi-pencil</v-icon>
                      <v-icon class="pointer" @click="fnRemoveTodo(item['.key'])">mdi-delete</v-icon>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
              <v-card v-else dark>
                <v-list-item class="py-2">
                  <v-list-item-action>
                    <v-checkbox v-model="item.b_completed"></v-checkbox>
                  </v-list-item-action>
                  <v-card-text>
                    <v-text-field autofocus clearable v-model="item.todo_title"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-icon class="pointer" @click="fnSaveEdit(item)">mdi-floppy</v-icon>
                    <v-icon class="pointer" @click="fnCancelEdit(item['.key'])">mdi-cancel</v-icon>
                  </v-card-actions>
                </v-list-item>
              </v-card>
            </v-list>
          </v-col>
        </v-row>
      </v-container>  
    </v-main>
  </v-app>
</template>

<script>
  import {oTodosinDB} from '@/datasources/firebase'

  export default {
    name: 'App',
    data() {
      console.log(oTodosinDB);
      return {
        oTodos: [],
        sTodoTitle: ''
      }
    },
    firebase: {
      oTodos: oTodosinDB
    },
    methods: {
      fnSubmitTodo() {
        oTodosinDB.push({
          todo_title: this.sTodoTitle,
          b_completed: true,
          b_edit: false
        })
        this.sTodoTitle = ''
      },
      fnRemoveTodo(pKey) {
        oTodosinDB.child(pKey).remove()
      },
      fnSetEditTodo(pKey) {
        oTodosinDB.child(pKey).update({
          b_edit: true
        })
      },
      fnCancelEdit(pKey) {
        oTodosinDB.child(pKey).update({
          b_edit: false
        })
      },
      fnSaveEdit(pItem) {
        const sKey = pItem['.key'];
        oTodosinDB.child(sKey).set({
          todo_title: pItem.todo_title,
          b_completed: pItem.b_completed,
          b_edit: false
        })
      },
      fnCheckboxChange(pItem) {
        const sKey = pItem['.key'];
        oTodosinDB.child(sKey).update({
          b_completed: pItem.b_completed
        })
      }
    }
  }
</script>
<style scoped>
  .pointer {
    cursor: pointer;
  }
  .style_completed {
    text-decoration: line-through;
  }
</style>