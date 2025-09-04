import express from "express"
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Sci-Competition Api');
});

app.listen(PORT , () => {
    console.log("litsening too http:\\localhost:" + PORT);
});
