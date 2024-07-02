db.films_characters.aggregate([
  {
    $lookup: {
      from: "films",
      localField: "film_id",
      foreignField: "id",
      as: "data",
    },
  },
  {
    $match: {
      character_id: 1,
    },
  },
]);
