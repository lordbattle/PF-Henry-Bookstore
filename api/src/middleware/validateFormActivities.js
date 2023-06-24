const validateFormBook = (req, res, next) => {
  const { title, subtitle, publishedDate, publisher, description, pages, averageRating, usersRating, identifier, bookPic } = req.body;

  if (!title) return res.status(400).json({ error: "Missing title" });

  if (!subtitle) return res.status(400).json({ error: "Missing subtitle" });

  if (!publishedDate) return res.status(400).json({ error: "Missing publishedDate" });
  if (!publisher) return res.status(400).json({ error: "Missing publisher" });
  if (!description) return res.status(400).json({ error: "Missing description" });
  if (!pages) return res.status(400).json({ error: "Missing pages" });
  if (!averageRating) return res.status(400).json({ error: "Missing averageRating" });
  if (!usersRating) return res.status(400).json({ error: "Missing usersRating" });
  if (!identifier) return res.status(400).json({ error: "Missing identifier" });
  if (!bookPic) return res.status(400).json({ error: "Missing bookPic" });


  if (!season) return res.status(400).json({ error: "Missing season" });

  const arrSeason = ["summer", "autumn", "winter", "spring"];
  const findSeason = arrSeason.find((e) => e === season.toLowerCase());

  if (!findSeason)
    return res.status(400).json({
      error:
        "Season does not match any of the options: summer, autumn, winter or spring",
    });

  if (!countryId) return res.status(400).json({ error: "Missing countryId" });

  next();
};

const string = 'casa de la mexicana en tucuman se le vino a la maraca de la casa del tio'

let newString = string.slice(0,30)

console.log(string);
console.log(newString);



module.exports = validateFormActivities;
