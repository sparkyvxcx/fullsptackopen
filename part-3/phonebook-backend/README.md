# Assignment memo

Assignment memo for phonebook application.

## Exercises 3.9.-3.11.

### 3.9 phonebook backend step9

Frontend project file located at [part-2/phonebook-frontend](https://github.com/sparkyvxcx/fullsptackopen/tree/master/part-2/phonebook-frontend)

Change `services/person.js` endpoint:

```js
const endpoint = "http://localhost:3001/persons" => const endpoint = "/api/persons";
```

Create a production build:

```shell
$ npm run build
```

Current project structure:

```shell
...
├── part-2
│   ├── countries
│   ├── courseinfo
│   ├── phonebook
│   ├── phonebook-frontend
│   └── playground
├── part-3
│   ├── demo-backend
│   ├── heroku-backend
│   └── phonebook-backend
└── README.md
```

Backend project file located at [part-3/phonebook-backend](https://github.com/sparkyvxcx/fullsptackopen/tree/master/part-3/phonebook-backend)

Copy static build resource to backend folder:

```shell
$ cp -r build ../../part-3/phonebook-backend
```

Some change to backend project `index.js` file:

```js
...
const PORT = process.env.PORT || 3001; // specify listening port from environment variable

app.use(express.static("build"));      // add express built-in middleware to serve static build
...
```

Create `.env` file (under backend project):

```shell
touch .env && echo "PORT=3005" >> .env
```

Under backend project, run test:

```shell
npm run dev
```

### 3.10 phonebook backend step10

Create `.gitignore` file:

```shell
touch .gitignore && echo "/node_modules" >> .gitignore
```

Initialize local git repository, run:

```shell
git init && git add .
```

Commit:

```shell
git commit -m "Deploy backend to heroku - Test1"
```

Heroku deployment documentation: [deploy application](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

Create an app on Heroku:

```shell
$ heroku create
```

Push local **master** branch to remove Heroku repository:

```shell
$ git push heroku master
```

Make sure at least one instance of the app is running:

```shell
$ heroku ps:scale web=1
```

Open the website as follows:

```shell
$ heroku open
```

Endpoint api test:

```shell
curl -I -X GET https://dry-cliffs-82868.herokuapp.com/api/persons
```

Result:

```shell
HTTP/1.1 200 OK
Server: Cowboy
Connection: keep-alive
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 225
Etag: W/"e1-9uusa6UagkKanoMGMUtTcV0LlEw"
Date: Wed, 22 Jul 2020 11:19:42 GMT
Via: 1.1 vegur
```

Online Heroku application instance: https://dry-cliffs-82868.herokuapp.com/api/persons

### 3.11 phonebook full stack

Add some npm-scripts to the _package.json_ of the backend repository:

```json
{
  "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../../part-2/phonebook-frontend && npm run build --prod && cp -r build ../../part-3/phonebook-backend/",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",
    "logs:prod": "heroku logs --tail"
  }
}
```

Now run `build:ui` command:

```shell
npm run build:ui
```

Will remove current `build` static file, rebuild phonebook-frontend production file, and copy it into backend folder.

Run `deploy` command:

```shell
npm run deploy
```

Will push current local branch to remove Heroku git repository.

Run `deploy:full` command:

```shell
npm run deploy:full
```

Will run `build:ui` command and add newly rebuilded static file to local repository and push to Heroku.

Run `logs:prod` command:

```shell
npm run logs:prod
```

Will check log info of your application instance from Heroku.

#### Make sure frontend still work locally

Add `proxy` to `package.json` file:

```json
  ...
  "proxy": "http://localhost:3001"
  ...
```

Test:

```shell
npm start
```

Go to http://localhost:3000

## Exercises 3.15.-3.18.

- [x] 3.15: Phonebook database, step3
- [x] 3.16: Phonebook database, step4
- [x] 3.17\*: Phonebook database, step5
- [x] 3.18\*: Phonebook database step6

### 3.15: Phonebook database, step3

Change the backend so that deleting phonebook entries is reflected in the database.

Verify that the frontend still works after making the changes.

### 3.16: Phonebook database, step4

Move the error handling of the application to a new error handler middleware.

### 3.17\*: Phonebook database, step5

If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.

Modify the backend to support this request.

Verify that the frontend works after making your changes.

### 3.18\*: Phonebook database step6

Also update the handling of the api/persons/:id and info routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.
