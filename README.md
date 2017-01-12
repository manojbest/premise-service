# uk-code-service

This is one of the main component in postcoder where all the business logic resides for Premise address lookup for the URL https://developers.alliescomputing.com/postcoder-web-api/address-lookup/premise.
Uk-code-service is based on nodejs which runs on a separate docker container and it uses hapijs for server. It fetches address details from third-party API's and caches it in the redis server. When second query gets, it does not take it from API's instead retrieves it from the redis cache.
For more information https://github.com/manojbest/uk-code-service


### Installation


```sh
$ cd uk-code-service
$ npm install
$ npm start