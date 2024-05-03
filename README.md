<style>
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
  }
  p {
    font-size: 16px;
  }
</style>

# rsg-random-string-generator :speech_balloon:

> Small application to generate files with random unique strings

## Goal :speech_balloon:

Create a mini application in Typescript. Application needs to generate a file with random unique strings (every string in a separate row). Users should be able to define how long the string will be - min and max length, specify possible chars of string (from what characters string should be made) and how much string he wants.

Application should be able to inform about the number of the operations it is currently performing.

## Details :abc:

<div style="font-size:17px">

-   Generate files with random, unique strings
-   Every string in new row
-   The minimal and maximal string length should be provided by the user
-   Characters used in creating strings should be provided by user
-   The recipient of the file will be identified by the digital identifier received after the application accepts the request

</div>

## Features :sparkler:

1. Application should has a connection to the local database (redis, mongoose)
2. Application has to have REST endpoints:
    - endpoint to send the request to generate the set of strings (POST)
    - **one endpoint to check how many operation are running currently (GET)** :exclamation:
    - one endpoint to grab results - generated file from set of string from database (GET)
3. App needs to check how many combinations of strings can make from provided chars and if the user wants more then app returns a detailed error message. So if a user wants to get 1000 strings from chars ["a","b","c"] app should return an error message.
4. App should allows to generate multiple results in parallel. So while requesting app to generate 10 tasks and get first example the last result. For example:

    1. first user send request to generate 1M of unique strings.
    2. second user request to generate 10k of unique strings.
    3. third user requests the generation of 100k unique strings.

    As the second request is the shortest this request should be finished first than the two others.

5. App will be available on github as a public repository. After downloading the repository there will be only <u>one command to run</u> an application and <u>second to run tests</u>.
