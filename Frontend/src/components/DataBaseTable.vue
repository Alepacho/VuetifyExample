<template>
    <v-card>
        <v-card-title>
            Meal
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        New Meal
                    </v-btn>
                </template>

                <!-- DIALOG -->
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Add New Meal</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field label="Name" required :rules="nameRules" ref="dialogData.name" v-model="dialogData.name"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                <v-textarea
                                    counter
                                    label="Description"
                                    :rules="descriptionRules"
                                    v-model="dialogData.description"
                                ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                <v-text-field label="Country" required :rules="countryRules" ref="dialogData.country" v-model="dialogData.country"></v-text-field>
                                </v-col>
                                <v-col>
                                <v-text-field label="Course" required :rules="courseRules" ref="dialogData.course" v-model="dialogData.course"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                <v-text-field label="Price" prefix="₽" type="number" ref="dialogData.price" v-model="dialogData.price"></v-text-field>
                                </v-col>
                                <v-col>
                                <p class="text-left">Rating:</p> 
                                    
                                <v-rating
                                    color="amber"
                                    length="5"
                                    value="5"
                                    v-model="dialogData.rating"
                                ></v-rating>
                                </v-col>
                            </v-row>
                            <!--<v-row>
                                <v-file-input
                                    :rules="imageUploadRules"
                                    accept="image/png, image/jpeg, image/bmp"
                                    prepend-icon="mdi-camera"
                                    label="Image"
                                    v-model="dialogData.image"
                                ></v-file-input>
                            </v-row>-->
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
                        <v-btn color="blue darken-1" text @click="AddToBD($event)"> Add </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card-title>

        <!-- TABLE -->
        <v-data-table :headers="headers" :items="items" :search="search" :loading="tableLoading" loading-text="Loading... Please wait.">
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td class="text-truncate">{{ props.item.description }}</td>
                    <td>{{ props.item.country }}</td>
                    <td>{{ props.item.course }}</td>
                    <td>{{ props.item.price }}</td>
                    <!--<td>{{ props.item.image }}</td>-->
                    <td><v-rating
                                    color="amber"
                                    length="5"
                                    size="15"
                                    :value="props.item.rating"
                                    readonly
                    ></v-rating></td>

                    <td><v-icon small @click="deleteItem(props.item.id)"> mdi-delete </v-icon></td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    name: 'DataBaseTable',

    data: () => ({
        dialogData: {
            name: '',
            description: '',
            price: 99,
            //image: null,
            rating: 5,
            country: '',
            course: ''
        },
        descriptionRules: [v => v.length <= 255 || 'Max 255 characters'],
        nameRules: [v => !!v || 'Name is required'],
        countryRules: [v => !!v || 'Country is required'],
        courseRules: [v => !!v || 'Course is required'],
        //imageUploadRules: [ v => !v || v.size < 2000000 || 'Image size should be less than 2 MB!'],
        dialog: false,
        tableLoading: true,
        search: '',
        headers: [
            { align: 'center', text: 'Id', value: 'id' },
            { align: 'center', text: 'Name', value: 'name' },
            { align: 'center', text: 'Description', value: 'description' },
            { align: 'center', text: 'Country', value: 'country' },
            { align: 'center', text: 'Course', value: 'course' },
            { align: 'center', text: 'Price', value: 'price' },
            //{ align: 'center', text: 'Image', value: 'image' },
            { align: 'center', text: 'Rating', value: 'rating' },
            { align: 'center', text: 'Actions', value: 'actions', sortable: false },
        ],
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
                //mode: 'no-cors',
                method: 'GET'
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                self.items = data;
                this.tableLoading = false;
            }).catch(error => console.error(error));
        },
        AddToBD() {
            this.dialog = false;
            var self = this;
            this.items = [];
            //console.log(this.dialogData);
            //console.log(JSON.stringify(this.dialogData));

            fetch('http://localhost:3000/api/new', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.dialogData)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then((data) => {
                console.log(data);
                self.items = data;
            }).catch(error => console.error(error));

            
            //this.tableLoading = true;
            //window.location.reload();
            //this.loadData();
        },
        deleteItem(item) {
            var self = this;
            this.items = [];

            console.log("deleting: " + item);

            fetch("http://localhost:3000/api/" + item, {
                //mode: 'no-cors',
                method: 'DELETE'
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                self.items = data;
                this.tableLoading = false;
            }).catch(error => console.error(error));
        }
    }
}
</script>
