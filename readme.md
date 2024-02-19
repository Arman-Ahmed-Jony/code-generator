# Quasar crud generator
The Quasar CRUD Generator simplifies the process of creating CRUD (Create, Read, Update, Delete) functionality for Quasar applications while adhering to coding best practices. This package provides several components and features:

1. ***Form Component :*** Used for creating and editing entities.
2. ***List Component :*** Displays a list of entities.
3. ***Header Filter (optional) :*** Allows filtering entities.
4. ***Pagination (optional) :*** Provides pagination controls.
5. ***Store, Actions, and Services :*** Sets up the necessary Vuex store and actions.

Users can create a CRUD setup using a command-line prompt, which is self-intuitive. Alternatively, you can provide an entity JSON file as an argument.

### Generate using intuitive command prompt

``` npm run generate ```

### Generate using a backend generated entity json

``` npm run generate -- --json=Books.json ```

Below is an example of a backend-generated entity JSON. Note that fields with "system": false are automatically generated:

``` 
{
    "fields": [
        {
            "name": "name",
            "type": "string",
            "system": false
        },
        {
            "name": "age",
            "type": "integer",
            "system": false
        },
        {
            "name": "owner_id",
            "type": "integer#unsigned"
        },
        {
            "name": "tenant_id",
            "type": "integer#unsigned"
        },
        {
            "name": "is_active",
            "type": "boolean#default"
        },
        {
            "name": "sort_order",
            "type": "integer"
        }
    ],
    "foreign_keys": [
        {
            "column": "tenant_id",
            "references": "id",
            "on": "tenants",
            "onDelete": "cascade"
        },
        {
            "column": "owner_id",
            "references": "id",
            "on": "users",
            "onDelete": "cascade"
        }
    ],
    "relationships": [
        {
            "name": "owner",
            "type": "belongsTo",
            "class": "App\\Models\\User"
        }
    ]
}
```
