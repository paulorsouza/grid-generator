# Grid Generator

A plop sample that generates columns definition based on keys of a response.

### Usage:

```sh
$ yarn
$ yarn plop grid
```

### Prompt

- url -> define endpoint base to columns
- modelName -> name of folder that will be generated

### Example

```sh
$ yarn plop grid
$ ? endpoint url http://pokeapi.co/api/v2/pokemon/1
$ ? file's name pokemon
[SUCCESS] add /src/pokemon/GridPokemon.js
[SUCCESS] add /src/redux/modules/pokemon.js
[SUCCESS] function 
Done in 6.89s.
```