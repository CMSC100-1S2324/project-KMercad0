import needle from "needle";

needle.get("http://localhost:3001/get-users", (err, res) => {
    console.log(res.body);
});

needle.post(
    "http://localhost:3001/add-user",
    {
        fname: "Jessie",
        mname: "Jay",
        lname: "Jose",
        usertype: "user",
        email: "jjjose@g.c",
        password: "jose123",
    },
    (err, res) => {
        console.log(res.body);
    }
);
