<template>
  <div class="home">
    <v-app>
        <v-main>
            <v-app-bar dence flat app color="blue">
                <!--<v-app-bar-nav-icon></v-app-bar-nav-icon>-->
                <h2>Menu</h2>
                <v-spacer></v-spacer>
                <v-btn to="/admin"> Admin Panel </v-btn>
                <!--<v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>-->
            </v-app-bar>
            
            <v-container style="width:70%">
                <v-layout row wrap>
                    <v-flex v-for="item in items" :key="item.name">
                        <v-card 
                            style="margin:10px;"
                            width="400px"
                        >
                            <v-img
                                height="250"
                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                            ></v-img>

                            <v-card-title>{{ item.name }}</v-card-title>
                            <v-card-text>
                                <v-row
                                    align="center"
                                    class="mx-0"
                                >
                                <v-rating
                                    color="amber"
                                    length="5"
                                    dense
                                    size="15"
                                    :value="item.rating"
                                    readonly
                                ></v-rating>
                                <div class="grey--text ms-4">({{item.rating}}) </div>
                                </v-row>

                                <div class="my-4 text-subtitle-1"> {{ item.price }}₽ • {{ item.course }}. {{ item.country }} </div>
                                <div class="text-truncate"> {{item.description}} </div>
                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-actions>
                                <v-btn text color="blue lighten-2"> Buy </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
    name: 'Home',

    data: () => ({
        items: [],
    }),
    mounted () {
        this.loadData();
    },
    methods: {
        loadData() {
            var self = this;
            this.items = [];

            fetch("http://localhost:3000/api/", {
                method: 'GET'
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                self.items = data;
            }).catch(error => console.error(error));
        }
    }
};
</script>