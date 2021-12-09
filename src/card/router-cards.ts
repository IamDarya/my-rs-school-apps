import { Router } from "express";
import { Card } from "./card";
import {
  getCardsByCategory,
  getCard,
  getAllCards,
  deleteCard,
  createCard,
  updateCard,
} from "./repository-card";

const router = Router();

router.get("/", async (req, res) => {
  const allCards = await getAllCards();
  res.json(allCards);
});

router.get("/category/:id", async (req, res) => {
  const catId = Number(req.params.id);
  if (!catId) {
    return res.sendStatus(400);
  }
  const WordsOfCategory = await getCardsByCategory(catId);
  if (!WordsOfCategory) {
    return res.sendStatus(404);
  }
  res.json(WordsOfCategory);
});

router.get("/word/:word", async (req, res) => {
  const word = req.params.word;
  if (!word) {
    return res.sendStatus(400);
  }
  const WordOfCategory = await getCard(word);
  if (!WordOfCategory) {
    return res.sendStatus(404);
  }
  res.json(WordOfCategory);
});

router.delete("/word/:word", async (req, res) => {
  const cardWord = String(req.params.word);
  if (!cardWord) {
    return res.sendStatus(400);
  }
  try {
    deleteCard(cardWord);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.post("/", async (req, res) => {
  const data = req.body as Card;
  if (!data.word) return res.sendStatus(404);
  try {
    const newCard = await createCard(data);
    return res.json(newCard);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.put("/", async (req, res) => {
  const data = req.body as Card;
  if (!data.categoryId) return res.sendStatus(404);
  try {
    const categoryToUpdate = await updateCard(data);
    return res.json(categoryToUpdate);
  } catch (e) {
    return res.status(400).send(e);
  }
});

export default router;
