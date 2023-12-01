import needle from "needle";

needle.get("http://localhost:3001/users", (err, res) => {
    console.log(res.body);
});
