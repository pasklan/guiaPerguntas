// imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/models/Questions");
const Answer = require("./database/models/Answer");

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Connection succeded!");
  })
  .catch(error => {
    console.log("Deu ruim! " + error);
  });

// set ejs as view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//############ ROTAS #################
//index
app.get("/", (req, res) => {
  // ordenando por id descrescente
  Question.findAll({ raw: true, order: [["id", "desc"]] }).then(question => {
    res.render("index", {
      question: question, //passar variaveis para a rota
    });
  });
});
//perguntar
app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});
//salvar pergunta no banco
app.post("/saveQuestion", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  Question.create({
    title: title,
    description: description,
  }).then(() => {
    res.redirect("/");
  });
});
//responder pergunta
app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;
  Question.findOne({
    where: { id: id },
  }).then(question => {
    if (question != undefined) {
      Answer.findAll({
        where: { questionID: question.id },
        order: [["id", "DESC"]],
      }).then(respostas => {
        //pergunta encontrada
        res.render("pergunta", {
          pergunta: question,
          respostas: respostas,
        });
      });
    } else {
      //pergunta não encontrada
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  let body = req.body.body;
  let id = req.body.pergunta;
  Answer.create({
    body: body,
    questionID: id,
  }).then(() => {
    res.redirect("/pergunta/" + id);
  });
});

app.listen(5000, () => console.log("Server Up!"));
