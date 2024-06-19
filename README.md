bbb# rsg-random-strings-generator :speech_balloon:

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

    ```
        git clone https://github.com/sbacanski0730/rsg-random-strings-generator.git
    ```

2.  Change the working directory

    ```
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

    ```
        PORT = 5017
        DB_URL = redis://:authpassword@127.0.0.1:6380/4
        DB_GENERATED_STRINGS_EXPIRATION_TIME = 1800
    ```

5.  Install dependencies

    ```
        npm install
    ```

6.  Run the application in developer mode

    ```
        npm run dev
    ```

7.  To run test

    ```
        npm run test
    ```

**:sparkler: All set!**

> You can use the script contained in the `setup.sh` file to install and run application [**with Git Bash**]

### Custom WLAN REDIS database

Two redis databases was created for this project. </br>
The first one on the [Upstash.com](https://upstash.com/) platform, the second one on **Raspberry Pi Zero 2 W**. This database was created manually through WiFi connection by **SSH**.

The way in which the local database was created is presented below.

> <ins>Raspberry Pi OS Lite (64-bit)</ins> has been installed on the **Raspberry Pi Zero 2 W** with options allowing for WiFi and SSH connection.

1.  Check connection with device and connect via SSH.

    For this the IP address of feature database host is needed.

    > Connection check:

    ```
        ping <ip_address>
    ```

    > SSH connection:

    ```
        ssh <hostname>@<ip_address>
        [password if needed]
    ```

    ![Database on Raspberry - 1 - Connecting Device](https://github.com/sbacanski0730/rsg-random-strings-generator/assets/72625642/8d4a995a-3c20-448d-9645-7696147768dd)

2.  Instal redis on database host.

    > Update and upgrade device:

    ```
        sudo apt update
        sudo apt upgrade
    ```

    > Install redis:

    ```
        sudo apt install redis
    ```

    > Reboot linux and connect via SSH again:

    ```
        sudo reboot
    ```

3.  Configure redis setting

    > Go into redis configuration file:

    ```
        sudo nano /etc/redis/redis.conf
    ```

    > And change three parameters:

    -   ```bash
        bind 127.0.0.1 [ip_address_of_database_host] -::1
        ```

        Pre existing IP address (**127.0.0.1** and **-::1**) need to stay. They are needed to local connections.

        ![Database on Raspberry - 2 - Adding Database's Host IP Address](https://github.com/sbacanski0730/rsg-random-strings-generator/assets/72625642/8cd68ba1-f45c-475a-8bbd-d5202ae744a9)

    -   ```bash
        requirepass [password]
        ```

        Password is needed for safe connection to database.

        ![Database on Raspberry - 3 - Setting Password](https://github.com/sbacanski0730/rsg-random-strings-generator/assets/72625642/75107cc1-bb5d-43d5-95af-8e787ca9147a)

    -   ```bash
        protected-mode no
        ```

        Without this setting no outside connection can't be established.

        ![Database on Raspberry - 4 - Setting protected-mode](https://github.com/sbacanski0730/rsg-random-strings-generator/assets/72625642/cd0ceac1-0e77-463e-9b5e-6a2b659a028c)

    > **At the end for proper database set up it needs to be restart device again: `sudo reboot`.**

4.  Start Redis Database

    Command `redis-server` starts Redis database.

    ```
        redis-server
    ```

    ![Database on Raspberry - 5 - Starting Database](https://github.com/sbacanski0730/rsg-random-strings-generator/assets/72625642/84eeeec9-02eb-4230-86e7-d8b2de6a8b87)

5.  Create Database URL - WLAN Database Connection Address

    After setting configuration for redis database is ready. To connect with database special URL address is needed. It can be created by using URL schedule.

    <div style="display: flex; justify-content: center; font-size: 22px;letter-spacing: 0.8px; margin-block: 18px;">
                redis[s]://[[username][:password]@][host][:port][/db-number]:
    </div>

    -   <span style="font-size: 21px;">redis[s]</span> - this element is the main part of the URL; it's provides information that this address leads to redis database.
        -   `redis://` - if connecting to Redis standalone, unencrypted
        -   `rediss://` - if connecting to Redis standalone, with TLS encryption
    -   <span style="font-size: 21px;">[username]</span> - this value in the username in which database is located. Creating the user is not mandatory. Without creating the user and with set password on database the URL needs to contain `default` as a username.
    -   <span style="font-size: 21px;">[:password]</span> - password is needed for security purposes.
    -   <span style="font-size: 21px;">[host]</span> - if database is not deployed in any way this value is just IP address of the host in WLAN network.
    -   <span style="font-size: 21px;">[:post]</span> - by default redis database is accessible on port **6379**, this can be change in the same way like setting the password inside `/etc/redis/redis.conf`
    -   <span style="font-size: 21px;">[/db-number]</span> - in case when there are more than one database on the device with this value possible is to choose which one to connect

    At the end the URL for created database can look like this:
    <div style="display: flex; justify-content: center; font-size: 22px;letter-spacing: 0.8px; margin-block: 18px;">
                redis://default:piredis@192.168.1.149:6379/
    </div>

    -   <span style="font-size:15px">`redis://`</span> - database is in standalone mode and isn't encrypted
    -   <span style="font-size:15px">`default`</span> - this's the default name for the username

    -   <span style="font-size:15px">`piredis`</span> - database password
    -   <span style="font-size:15px">`192.168.1.149`</span> - device's IP address in WLAN
    -   <span style="font-size:15px">`6379`</span> - default port number

    > No database number because in this case there is only one database.

6.  Connect to database

    In this project connection with redis database was established with **ioredis** library.

    ![Database on Raspberry - 6 - Connecting Database](https://github.com/sbacanski0730/rsg-random-strings-generator/assets/72625642/9989c6e7-a974-4234-b98f-92de198fb57e)

    Connecting application with database base on creating Redis object which takes URL address as its property.
    If connection to database ends successfully callback will print "Database connected" in application terminal.
