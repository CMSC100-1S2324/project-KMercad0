import needle from "needle";

// TEST CASES FOR USERS
needle.get("http://localhost:3001/get-users", (err, res) => {
    // console.log(res.body);
});

// needle.post(
//     "http://localhost:3001/add-user",
//     {
//         fname: "Alan",
//         mname: "Jay",
//         lname: "Turing",
//         type: "user",
//         email: "ajturing@g.c",
//         password: "turing123",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-user",
//     {
//         fname: "Dan",
//         mname: "Jes",
//         lname: "Ferrer",
//         type: "user",
//         email: "djferrer@g.c",
//         password: "ferrer123",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-user",
//     {
//         fname: "Steph",
//         mname: "Curry",
//         lname: "Tanig",
//         type: "user",
//         email: "sctanig@g.c",
//         password: "tanig123",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-user",
//     {
//         fname: "Eric",
//         mname: "Coy",
//         lname: "Panga",
//         type: "user",
//         email: "ecpanga@g.c",
//         password: "panga123",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-user",
//     {
//         fname: "Karl",
//         mname: "Lark",
//         lname: "Mercado",
//         type: "user",
//         email: "klmercado@g.c",
//         password: "mercado123",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-user",
//     {
//         fname: "Jessie",
//         mname: "Jay",
//         lname: "Jose",
//         type: "user",
//         email: "jjjose@g.c",
//         password: "jose123",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// TEST CASES FOR PRODUCTS
needle.get("http://localhost:3001/get-products", (err, res) => {
    // console.log(res.body);
});

// needle.post(
//     "http://localhost:3001/add-product",
//     {
//         title: "Brown Rice",
//         name: "Soft and delicious",
//         type: 1,
//         quantity: 150,
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-product",
//     {
//         title: "Manggos",
//         name: "Sweet Manggos",
//         type: 1,
//         quantity: 100,
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-product",
//     {
//         title: "Eggs",
//         name: "Brown Eggs",
//         type: 2,
//         quantity: 500,
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-product",
//     {
//         title: "Fresh Chicken",
//         name: "Submissive and Breedable Chicken",
//         type: 2,
//         quantity: 50,
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-product",
//     {
//         title: "Fresh Honey",
//         name: "Honey Honey I love you",
//         type: 1,
//         quantity: 200,
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// TEST CASES FOR ORDERS
// needle.get("http://localhost:3001/get-orders", (err, res) => {
//     // console.log(res.body);
// });

// needle.post(
//     "http://localhost:3001/add-order",
//     {
//         productID: "656aa76148fceacf75a642bb",
//         quantity: 10,
//         status: 1,
//         email: "ajturing@g.c",
//         dateOrdered: "2023-12-01T10:15:00.000Z",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-order",
//     {
//         productID: "656aa76148fceacf75a642bd",
//         quantity: 5,
//         status: 1,
//         email: "djferrer@g.c",
//         dateOrdered: "2023-12-01T12:30:00.000Z",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-order",
//     {
//         productID: "656aa76148fceacf75a642bf",
//         quantity: 20,
//         status: 0,
//         email: "sctanig@g.c",
//         dateOrdered: "2023-12-02T09:45:00.000Z",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-order",
//     {
//         productID: "656aa76148fceacf75a642c1",
//         quantity: 2,
//         status: 2,
//         email: "ecpanga@g.c",
//         dateOrdered: "2023-12-02T14:00:00.000Z",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/add-order",
//     {
//         productID: "656aa76148fceacf75a642c3",
//         quantity: 15,
//         status: 1,
//         email: "klmercado@g.c",
//         dateOrdered: "2023-12-03T11:20:00.000Z",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

// needle.post(
//     "http://localhost:3001/retrieve-items-from-cart",
//     {
//         _id: "657b05117ebc3fdb6a14ab80",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );

needle.post(
    "http://localhost:3001/get-order-product",
    {
        _id: "656adf0d83e5ea0081bda2c7",
    },
    (err, res) => {
        console.log(res.body);
    }
);
