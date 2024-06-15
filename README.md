# rsg-random-strings-generator :speech_balloon:

> Small application to generate random unique strings. :taco: :bomb:

# Goal :speech_balloon:

Create a mini application in Typescript. Application needs to generate random unique strings (every string in a separate row). Users should be able to define how long the string will be - min and max length, specify possible chars of string (from what characters string should be made) and how much string he wants.

Application should be able to inform about the number of the operations it is currently performing.

# Details :abc:

<div style="font-size: 17px">

-   Generate files with random, unique strings
-   Every string in new row
-   The minimal and maximal string length should be provided by the user
-   Characters used in creating strings should be provided by user
-   The recipient of the file will be identified by the digital identifier received after the application accepts the request

</div>

# Features :sparkler:

1. Application should has a connection to the database in redis
2. Application has to have REST endpoints:
    - endpoint to send the request to generate the set of strings (POST)
    - **endpoint to check how many operations are running currently (GET)** :exclamation:
    - endpoint to grab results - generated file from set of string from database (GET)
3. App needs to check how many combinations of strings can make from provided chars and if the user wants more then app returns a detailed error message. So if a user wants to get 1000 strings from chars ["a","b","c"] app should return an error message.
4. App should allows to generate multiple results in parallel. So while requesting app to generate 10 tasks and get first example the last result. For example:

    1. first user send request to generate 1M of unique strings.
    2. second user request to generate 10k of unique strings.
    3. third user requests the generation of 100k unique strings.

    As the second request is the shortest this request should be finished first than the two others.

5. App will be available on github as a public repository. After downloading the repository there will be only <u>one command to run</u> an application and <u>second to run tests</u>.

# API Endpoints :avocado:

| HTTP | Endpoint                           | Action                                          |
| :--: | :--------------------------------- | :---------------------------------------------- |
| POST | /api/generate-strings/             | Create request to generate new strings list     |
| GET  | /api/currently-running-operations/ | Check how many operations are running currently |
| GET  | /api/return-generated-strings/:id/ | Get generated strings list                      |

# Technologies and Tools :wrench:

<div>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/182884894-d3fa6ee0-f2b4-4960-9961-64740f533f2a.png" alt="redis" title="redis"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest" title="Jest"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png" alt="WebStorm" title="VSCode"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/192108893-b1eed3c7-b2c4-4e1c-9e9f-c7e83637b33d.png" alt="WebStorm" title="WebStorm"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" alt="Swagger" title="Swagger"/>
</div>

# Project structure :world_map: :file_folder:

```
    |
    ├── config
    |	└── index.ts
    ├── src
    │   ├── components
    |	|   ├── Database.ts
    |	|   └── StringsGenerator.ts
    │   ├── middlewares
    |	|   ├── checkRequestPossibility.ts
    |	|   └── unpackRequestBody.ts
    │   ├── utils
    |	|   ├── ErrorResponses.ts
    |	|   ├── Log.ts
    |	|   └── requestsValidation.ts
    │   ├── App.ts
    │   ├── AppControllers.ts
    │   ├── AppRoutes.ts
    │   ├── constants.ts
    │   └── index.ts
    ├── (.env)
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── setup.sh
    └── tsconfig

```

# Installation Guide :scroll:

1.  Clone the repository

```bash
    git clone https://github.com/sbacanski0730/rsg-random-strings-generator.git
```

2.  Change the working directory

```bash
    cd rsg-random-strings-generator
```

3.  Create `.env` file
4.  Provide configuration content for application

    To install the application correctly, you must create an `.env` file and enter environment variables into it.

    This file should contains three variables:

    -   **PORT** - port number on which application will be running
    -   **DB_URL** - address of REDIS database; this address can originate from local database or other services providing redis databases.
    -   **DB_GENERATED_STRINGS_EXPIRATION_TIME** - time after which created list of strings will be deleted from database (value needs to be in seconds)

    Example `.env` file:

```bash
    PORT = 5017
    DB_URL = redis://:authpassword@127.0.0.1:6380/4
    DB_GENERATED_STRINGS_EXPIRATION_TIME = 1800
```

5.  Install dependencies

```bash
    npm install
```

6.  Run the application in developer mode

```bash
    npm run dev
```

7. To run test

```bash
    npm run test
```

**:sparkler: All set!**

> You can use the script contained in the `setup.sh` file to install and run application [**with Git Bash**]
