<template>
  <v-app>
    
    <v-app-bar dence flat app color="blue">
        <!--<v-app-bar-nav-icon></v-app-bar-nav-icon>-->
        <h2>Admin Menu</h2>
        <v-spacer></v-spacer>
        <!--<v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>-->
    </v-app-bar>
    
    <v-main>
        <DataBaseTable/>
    </v-main>
    
  </v-app>
</template>

<script>
// @ is an alias to /src
import DataBaseTable from '@/components/DataBaseTable.vue'

export default {
  name: 'Admin',
  components: {
    DataBaseTable
  }
}
</script>
