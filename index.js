const express = require("express"); 
const app = express();
const cors = require("cors");
const userRoutes = require('./src/routers/user.routes')
const accountRoutes = require('./src/routers/account.routes')
const transationRoutes = require('./src/routers/transation.routes')
const otpRoutes = require('./src/routers/otp.Routes')
const { connect } = require ('./src/bd')

connect();

app.use(
     cors({
          origin: "*",
          credential: true,
     })
);

app.use(express.json());

app.use("/users", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/transations", transationRoutes)
app.use("/otp", otpRoutes)

app.get("/", (req, res) => {
     res.send("Express on Vercel"); 
}); 


const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

module.exports = app;