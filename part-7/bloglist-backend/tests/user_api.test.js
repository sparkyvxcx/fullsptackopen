const bcrypt = require("bcrypt");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");

jest.setTimeout(100000);

describe("when there is intially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("hola", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh user", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "elliot",
      name: "Elliot Alderson",
      password: "fsocity",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("add two test user", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser1 = {
      username: "hellas",
      name: "Arto Hellas",
      password: "fa0g34uip;qg;4[3h",
    };

    const newUser2 = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "fa0g34uip;qg;4[3h",
    };

    await api.post("/api/users").send(newUser1).expect(200);
    await api.post("/api/users").send(newUser2).expect(200);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 2);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser1.username);
    expect(usernames).toContain(newUser2.username);
  });
});

// 4.16*: bloglist expansion, step4
describe("invalid users are not created", () => {
  test("length of username less that 3 characters is not added", async () => {
    const usersAtStart = await helper.usersInDb();

    const invalidUser = {
      username: "vu",
      name: "vue",
      password: "vuevue",
    };

    let response = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const error_message = {
      error:
        "User validation failed: username: Path `username` (`vu`) is shorter than the minimum allowed length (3).",
    };

    // response = response.toJSON();
    const error = JSON.parse(response.text);

    expect(error).toEqual(error_message);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("password length is less thatn 3 character", async () => {
    const usersAtStart = await helper.usersInDb();

    const invalidUser = {
      username: "react",
      name: "react",
      password: "re",
    };

    let response = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const error_message = {
      error: "password too short!",
    };

    const error = JSON.parse(response.text);
    expect(error).toEqual(error_message);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("no password", async () => {
    const invalidUser = {
      username: "react",
      name: "react",
    };

    let response = await api
      .post("/api/users")
      .send(invalidUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const error_message = {
      error: "password required!",
    };

    const error = JSON.parse(response.text);
    expect(error).toEqual(error_message);
  });
});
