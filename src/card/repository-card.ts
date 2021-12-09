import { Category } from "../category/category";
import { Card } from "./card";

const cards: Card[] = [
  {
    categoryId: 1,
    word: "cry",
    translation: "плакать",
    image: "img/Action (set A)/cry.jpg",
    audioSrc: "audio/Action (set A)/cry.mp3",
  },
  {
    categoryId: 1,
    word: "dance",
    translation: "танцевать",
    image: "img/Action (set A)/dance.jpg",
    audioSrc: "audio/Action (set A)/dance.mp3",
  },
  {
    categoryId: 1,
    word: "dive",
    translation: "нырять",
    image: "img/Action (set A)/dive.jpg",
    audioSrc: "audio/Action (set A)/dive.mp3",
  },
  {
    categoryId: 1,
    word: "draw",
    translation: "рисовать",
    image: "img/Action (set A)/draw.jpg",
    audioSrc: "audio/Action (set A)/draw.mp3",
  },
  {
    categoryId: 1,
    word: "fish",
    translation: "ловить рыбу",
    image: "img/Action (set A)/fish.jpg",
    audioSrc: "audio/Action (set A)/fish.mp3",
  },
  {
    categoryId: 1,
    word: "fly",
    translation: "летать",
    image: "img/Action (set A)/fly.jpg",
    audioSrc: "audio/Action (set A)/fly.mp3",
  },
  {
    categoryId: 1,
    word: "hug",
    translation: "обнимать",
    image: "img/Action (set A)/hug.jpg",
    audioSrc: "audio/Action (set A)/hug.mp3",
  },
  {
    categoryId: 1,
    word: "jump",
    translation: "прыгать",
    image: "img/Action (set A)/jump.jpg",
    audioSrc: "audio/Action (set A)/jump.mp3",
  },

  {
    categoryId: 2,
    word: "open",
    translation: "открывать",
    image: "img/Action (set B)/open.jpg",
    audioSrc: "audio/Action (set B)/open.mp3",
  },
  {
    categoryId: 2,
    word: "play",
    translation: "играть",
    image: "img/Action (set B)/play.jpg",
    audioSrc: "audio/Action (set B)/play.mp3",
  },
  {
    categoryId: 2,
    word: "point",
    translation: "указывать",
    image: "img/Action (set B)/point.jpg",
    audioSrc: "audio/Action (set B)/point.mp3",
  },
  {
    categoryId: 2,
    word: "ride",
    translation: "ездить",
    image: "img/Action (set B)/ride.jpg",
    audioSrc: "audio/Action (set B)/ride.mp3",
  },
  {
    categoryId: 2,
    word: "run",
    translation: "бегать",
    image: "img/Action (set B)/run.jpg",
    audioSrc: "audio/Action (set B)/run.mp3",
  },
  {
    categoryId: 2,
    word: "sing",
    translation: "петь",
    image: "img/Action (set B)/sing.jpg",
    audioSrc: "audio/Action (set B)/sing.mp3",
  },
  {
    categoryId: 2,
    word: "skip",
    translation: "пропускать, прыгать",
    image: "img/Action (set B)/skip.jpg",
    audioSrc: "audio/Action (set B)/skip.mp3",
  },
  {
    categoryId: 2,
    word: "swim",
    translation: "плавать",
    image: "img/Action (set B)/swim.jpg",
    audioSrc: "audio/Action (set B)/swim.mp3",
  },

  {
    categoryId: 3,
    word: "cat",
    translation: "кот",
    image: "img/Animal (set A)/cat.jpg",
    audioSrc: "audio/Animal (set A)/cat.mp3",
  },
  {
    categoryId: 3,
    word: "chick",
    translation: "цыплёнок",
    image: "img/Animal (set A)/chick.jpg",
    audioSrc: "audio/Animal (set A)/chick.mp3",
  },
  {
    categoryId: 3,
    word: "chicken",
    translation: "курица",
    image: "img/Animal (set A)/chicken.jpg",
    audioSrc: "audio/Animal (set A)/chicken.mp3",
  },
  {
    categoryId: 3,
    word: "dog",
    translation: "собака",
    image: "img/Animal (set A)/dog.jpg",
    audioSrc: "audio/Animal (set A)/dog.mp3",
  },
  {
    categoryId: 3,
    word: "horse",
    translation: "лошадь",
    image: "img/Animal (set A)/horse.jpg",
    audioSrc: "audio/Animal (set A)/horse.mp3",
  },
  {
    categoryId: 3,
    word: "pig",
    translation: "свинья",
    image: "img/Animal (set A)/pig.jpg",
    audioSrc: "audio/Animal (set A)/pig.mp3",
  },
  {
    categoryId: 3,
    word: "rabbit",
    translation: "кролик",
    image: "img/Animal (set A)/rabbit.jpg",
    audioSrc: "audio/Animal (set A)/rabbit.mp3",
  },
  {
    categoryId: 3,
    word: "sheep",
    translation: "овца",
    image: "img/Animal (set A)/sheep.jpg",
    audioSrc: "audio/Animal (set A)/sheep.mp3",
  },

  {
    categoryId: 4,
    word: "bird",
    translation: "птица",
    image: "img/Animal (set B)/bird.jpg",
    audioSrc: "audio/Animal (set B)/bird.mp3",
  },
  {
    categoryId: 4,
    word: "fish",
    translation: "рыба",
    image: "img/Animal (set B)/fish.jpg",
    audioSrc: "audio/Animal (set B)/fish.mp3",
  },
  {
    categoryId: 4,
    word: "frog",
    translation: "жаба",
    image: "img/Animal (set B)/frog.jpg",
    audioSrc: "audio/Animal (set B)/frog.mp3",
  },
  {
    categoryId: 4,
    word: "giraffe",
    translation: "жирафа",
    image: "img/Animal (set B)/giraffe.jpg",
    audioSrc: "audio/Animal (set B)/giraffe.mp3",
  },
  {
    categoryId: 4,
    word: "lion",
    translation: "лев",
    image: "img/Animal (set B)/lion.jpg",
    audioSrc: "audio/Animal (set B)/lion.mp3",
  },
  {
    categoryId: 4,
    word: "mouse",
    translation: "мышь",
    image: "img/Animal (set B)/mouse.jpg",
    audioSrc: "audio/Animal (set B)/mouse.mp3",
  },
  {
    categoryId: 4,
    word: "turtle",
    translation: "черепаха",
    image: "img/Animal (set B)/turtle.jpg",
    audioSrc: "audio/Animal (set B)/turtle.mp3",
  },
  {
    categoryId: 4,
    word: "dolphin",
    translation: "дельфин",
    image: "img/Animal (set B)/dolphin.jpg",
    audioSrc: "audio/Animal (set B)/dolphin.mp3",
  },

  {
    categoryId: 5,
    word: "skirt",
    translation: "юбка",
    image: "img/Clothes/skirt.jpg",
    audioSrc: "audio/Clothes/skirt.mp3",
  },
  {
    categoryId: 5,
    word: "pants",
    translation: "брюки",
    image: "img/Clothes/pants.jpg",
    audioSrc: "audio/Clothes/pants.mp3",
  },
  {
    categoryId: 5,
    word: "blouse",
    translation: "блузка",
    image: "img/Clothes/blouse.jpg",
    audioSrc: "audio/Clothes/blouse.mp3",
  },
  {
    categoryId: 5,
    word: "dress",
    translation: "платье",
    image: "img/Clothes/dress.jpg",
    audioSrc: "audio/Clothes/dress.mp3",
  },
  {
    categoryId: 5,
    word: "boot",
    translation: "ботинок",
    image: "img/Clothes/boot.jpg",
    audioSrc: "audio/Clothes/boot.mp3",
  },
  {
    categoryId: 5,
    word: "shirt",
    translation: "рубашка",
    image: "img/Clothes/shirt.jpg",
    audioSrc: "audio/Clothes/shirt.mp3",
  },
  {
    categoryId: 5,
    word: "coat",
    translation: "пальто",
    image: "img/Clothes/coat.jpg",
    audioSrc: "audio/Clothes/coat.mp3",
  },
  {
    categoryId: 5,
    word: "shoe",
    translation: "туфли",
    image: "img/Clothes/shoe.jpg",
    audioSrc: "audio/Clothes/shoe.mp3",
  },

  {
    categoryId: 6,
    word: "sad",
    translation: "грустный",
    image: "img/Emotions/sad.jpg",
    audioSrc: "audio/Emotions/sad.mp3",
  },
  {
    categoryId: 6,
    word: "angry",
    translation: "сердитый",
    image: "img/Emotions/angry.jpg",
    audioSrc: "audio/Emotions/angry.mp3",
  },
  {
    categoryId: 6,
    word: "happy",
    translation: "счастливый",
    image: "img/Emotions/happy.jpg",
    audioSrc: "audio/Emotions/happy.mp3",
  },
  {
    categoryId: 6,
    word: "tired",
    translation: "уставший",
    image: "img/Emotions/tired.jpg",
    audioSrc: "audio/Emotions/tired.mp3",
  },
  {
    categoryId: 6,
    word: "surprised",
    translation: "удивлённый",
    image: "img/Emotions/surprised.jpg",
    audioSrc: "audio/Emotions/surprised.mp3",
  },
  {
    categoryId: 6,
    word: "scared",
    translation: "испуганный",
    image: "img/Emotions/scared.jpg",
    audioSrc: "audio/Emotions/scared.mp3",
  },
  {
    categoryId: 6,
    word: "smile",
    translation: "улыбка",
    image: "img/Emotions/smile.jpg",
    audioSrc: "audio/Emotions/smile.mp3",
  },
  {
    categoryId: 6,
    word: "laugh",
    translation: "смех",
    image: "img/Emotions/laugh.jpg",
    audioSrc: "audio/Emotions/laugh.mp3",
  },

  {
    categoryId: 7,
    word: "cake",
    translation: "пирожное",
    image: "img/Food/cake.jpg",
    audioSrc: "audio/Food/cake.mp3",
  },
  {
    categoryId: 7,
    word: "juice",
    translation: "сок",
    image: "img/Food/juice.jpg",
    audioSrc: "audio/Food/juice.mp3",
  },
  {
    categoryId: 7,
    word: "nuts",
    translation: "орехи",
    image: "img/Food/nuts.jpg",
    audioSrc: "audio/Food/nuts.mp3",
  },
  {
    categoryId: 7,
    word: "pasta",
    translation: "паста",
    image: "img/Food/pasta.jpg",
    audioSrc: "audio/Food/pasta.mp3",
  },
  {
    categoryId: 7,
    word: "pizza",
    translation: "пицца",
    image: "img/Food/pizza.jpg",
    audioSrc: "audio/Food/pizza.mp3",
  },
  {
    categoryId: 7,
    word: "fruit",
    translation: "фрукт",
    image: "img/Food/fruit.jpg",
    audioSrc: "audio/Food/fruit.mp3",
  },
  {
    categoryId: 7,
    word: "soup",
    translation: "суп",
    image: "img/Food/soup.jpg",
    audioSrc: "audio/Food/soup.mp3",
  },
  {
    categoryId: 7,
    word: "water",
    translation: "вода",
    image: "img/Food/water.jpg",
    audioSrc: "audio/Food/water.mp3",
  },

  {
    categoryId: 8,
    word: "autumn",
    translation: "осень",
    image: "img/Seasons/autumn.jpg",
    audioSrc: "audio/Seasons/autumn.mp3",
  },
  {
    categoryId: 8,
    word: "rain",
    translation: "дождь",
    image: "img/Seasons/rain.jpg",
    audioSrc: "audio/Seasons/rain.mp3",
  },
  {
    categoryId: 8,
    word: "snow",
    translation: "снег",
    image: "img/Seasons/snow.jpg",
    audioSrc: "audio/Seasons/snow.mp3",
  },
  {
    categoryId: 8,
    word: "spring",
    translation: "весна",
    image: "img/Seasons/spring.jpg",
    audioSrc: "audio/Seasons/spring.mp3",
  },
  {
    categoryId: 8,
    word: "summer",
    translation: "лето",
    image: "img/Seasons/summer.jpg",
    audioSrc: "audio/Seasons/summer.mp3",
  },
  {
    categoryId: 8,
    word: "sun",
    translation: "солнце",
    image: "img/Seasons/sun.jpg",
    audioSrc: "audio/Seasons/sun.mp3",
  },
  {
    categoryId: 8,
    word: "thunderstorm",
    translation: "гром",
    image: "img/Seasons/thunderstorm.jpg",
    audioSrc: "audio/Seasons/thunderstorm.mp3",
  },
  {
    categoryId: 8,
    word: "winter",
    translation: "снег",
    image: "img/Seasons/winter.jpg",
    audioSrc: "audio/Seasons/winter.mp3",
  },
];

// const newId = (function() {
//     let id = categories.length+1;
//     return () => id++;
// })();

export function getCardsByCategory(categoryId: number): Promise<Card[]> {
  let words: Card[] = cards.filter((word) => word.categoryId === categoryId);
  return Promise.resolve(words);
}

export function getAllCards(): Promise<Card[]> {
  return Promise.resolve(cards);
}

export function getCard(word: string): Promise<Card | undefined> {
  const wordCard = cards.find((oneWord) => oneWord.word === word);
  return Promise.resolve(wordCard);
}

export function deleteCard(word: string): Promise<void> {
  const cardToDeleteIndex = cards.findIndex((oneWord) => oneWord.word === word);
  if (cardToDeleteIndex < 0) return Promise.reject(new Error("Word not found"));
  cards.splice(cardToDeleteIndex, 1);
  return Promise.resolve();
}

export function createCard(data: Card): Promise<Card> {
  const isExists = cards.find(
    (oneWord) =>
      oneWord.word === data.word && oneWord.categoryId === data.categoryId
  );
  if (isExists) {
    return Promise.reject(
      new Error(`Category with name ${data.word} already exist`)
    );
  }
  const newCard: Card = {
    ...data,
    categoryId: data.categoryId,
  };
  cards.push(newCard);
  return Promise.resolve(newCard);
}

export function updateCard(data: Card): Promise<Card> {
  const cardToUpdate = cards.find(
    (oneWord) =>
      oneWord.word === data.word && oneWord.categoryId === data.categoryId
  );
  if (!cardToUpdate) return Promise.reject(new Error("Word not found"));
  if (data.word) {
    cardToUpdate.word = data.word;
  }
  if (data.translation) {
    cardToUpdate.translation = data.translation;
  }
  if (data.audioSrc) {
    cardToUpdate.audioSrc = data.audioSrc;
  }
  if (data.image) {
    cardToUpdate.image = data.image;
  }
  return Promise.resolve(cardToUpdate);
}
