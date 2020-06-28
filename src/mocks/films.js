// films.js
import PropTypes from 'prop-types';

export const fullInfo =
{
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  altPoster: PropTypes.string,
  background: PropTypes.string,
  altBackground: PropTypes.string,
  genre: PropTypes.arrayOf(PropTypes.string).isRequired,
  year: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    score: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }),
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
};

export const filmsInfo = [
  {
    id: 1,
    title: `Joker`,
    poster: `img/joker.jpg`,
    altPoster: `Joker poster`,
    background: `img/joker-bg.jpg`,
    altBackground: `Gotham City`,
    genre: [`Thriller`, `Crime`, `Drama`],
    year: 2019,
    duration: `2h 2min`,
    age: `18+`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `4.3`,
      level: `very good`,
      count: 150,
    },
    director: `Todd Phillips`,
    starring: [`Joaquin Phoenix`, `Zazie Beetz`, `Robert De Niro`, `Bryan Callen`, `Shea Whigham`, `Frances Conroy`, `Glenn Fleshler`, `Brett Cullen`, `Marc Maron`],
    description: `The origin tale of the Joker (Joaquin Phoenix) – one of the most iconic villains in comic book history.`,
    review: `Arthur Fleck (Joaquin Phoenix) isn’t happy with his life. He struggles to make money as a part-time clown while sharing a rundown apartment with his ailing mom (Frances Conroy). But Arthur lives in a city struck by hard times where a decent, honest living is difficult to come by. He also suffers from a condition that causes him to break into uncontrollable laughter. None of this stops Arthur from dreaming big. He aspires to be a stand-up comedian and attempts to write jokes in his diary. Caught in between it all, Arthur slowly begins to lose his grip on sanity`,
  },
  {
    id: 2,
    title: `The Commuter`,
    poster: `img/commuter.jpg`,
    altPoster: `The Commuter poster`,
    background: `img/commuter-bg.jpg`,
    altBackground: `New York City`,
    genre: [`Thriller`, `Action`, `Mystery`],
    year: 2018,
    duration: `1h 45min`,
    age: `16+`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    rating: {
      score: `6.3`,
      level: `Good`,
      count: 550,
    },
    director: `Jaume Collet-Serra`,
    starring: [`Liam Neeson`, `Vera Farmiga`, `Patrick Wilson`, `Jonathan Banks`, `Sam Neill`, `Elizabeth McGovern`, `Killian Scott`, `Shazad Latif`, `Andy Nyman`],
    description: `An Insurance Salesman/Ex-Cop is caught up in a criminal conspiracy during his daily commute home`,
    review: `Now a hard-working life insurance salesman and a caring family man, the former police officer, Michael MacCauley, has taken the commuter rail to New York for the past ten years. But, unexpectedly, things will take a turn for the worse, when on one of his daily journeys, the cryptic passenger, Joanna, makes Michael a generous and tempting offer to locate a single commuter or face grave consequences`,
  },
  {
    id: 3,
    title: `Molly's Game`,
    poster: `img/mollys-game.jpg`,
    altPoster: `Molly game poster`,
    background: `img/mollys-game-bg.jpg`,
    altBackground: `New York City`,
    genre: [`Drama`, `Crime`, `Biography`],
    year: 2017,
    duration: `2h 20min`,
    age: `18+`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `7.4`,
      level: `Good`,
      count: 350,
    },
    director: `Aaron Sorkin`,
    starring: [`Jessica Chastain`, `Idris Elba`, `Kevin Costner`, `Michael Cera`, `Jeremy Strong`, `Chris O'Dowd`, `J.C. MacKenzie`, `Brian d'Arcy James`, `Bill Camp`, `Graham Greene`],
    description: `The true story of Molly Bloom, an Olympic-class skier who ran the world's most exclusive high-stakes poker game and became an FBI target`,
    review: `Molly Bloom, a beautiful young Olympic-class skier, ran the world's most exclusive high-stakes poker game for a decade before being arrested in the middle of the night by 17 FBI agents wielding automatic weapons. Her players included Hollywood royalty, sports stars, business titans, and finally, unbeknownst to her, the Russian mob`,
  },
  {
    id: 4,
    title: `Maze Runner`,
    poster: `img/maze-runner.jpg`,
    altPoster: `Maze runner poster`,
    background: `img/maze-runner-bg.jpg`,
    altBackground: `The Maze`,
    genre: [`Action`, `Mystery`, `Sci-Fi`],
    year: 2014,
    duration: `1h 53min`,
    age: `12+`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    rating: {
      score: `6.8`,
      level: `Good`,
      count: 310,
    },
    director: `Wes Ball`,
    starring: [`Dylan O'Brien`, `Aml Ameen`, `Ki Hong Lee`, `Blake Cooper`, `Thomas Brodie-Sangster`, `Will Poulter`, `Dexter Darden`, `Kaya Scodelario`, `Chris Sheffield`, `Joe Adler`],
    description: `Young hero Thomas embarks on a mission to find a cure for a deadly disease known as The Flare`,
    review: `Awakening in an elevator, remembering nothing of his past, Thomas emerges into a world of about thirty teenage boys, all without past memories, who have learned to survive under their own set of rules in a completely enclosed environment, subsisting on their own agriculture and supplies. With a new boy arriving every thirty days, the group has been in "The Glade" for three years, trying to find a way to escape through the Maze that surrounds their living space`,
  },
  {
    id: 5,
    title: `Braven`,
    poster: `img/braven.jpg`,
    altPoster: `Braven poster`,
    background: `img/braven-bg.jpg`,
    altBackground: `Canada nature`,
    genre: [`Action`, `Drama`],
    year: 2018,
    duration: `1h 34min`,
    age: `18+`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `6.1`,
      level: `Good`,
      count: 210,
    },
    director: `Lin Oeding`,
    starring: [`Jason Momoa`, `Garret Dillahunt`, `Jill Wagner`, `Stephen Lang`, `Sasha Rossof`, `Sala Baker`, `Fraser Aitcheson`, `Teach Grant`, `Glenn Ennis`, `Todd Scot`],
    description: `A logger defends his family from a group of dangerous drug runners`,
    review: `Joe Braven is a logging company owner who lives with his family in Canada. Joe's father, Linden, suffering from dementia, mistakes a woman in a bar for his wife, prompting a barroom brawl that lands Linden in the hospital. The family decides to take a break at their secluded log cabin, where they run into trouble from a drug dealer who wants to use Joe's business as a front for his cocaine operation`,
  },
  {
    id: 6,
    title: `Peter Rabbit`,
    poster: `img/peter-rabbit.jpg`,
    altPoster: `Rabbit poster`,
    background: `img/peter-rabbit-bg.jpg`,
    altBackground: `Nature somewhere`,
    genre: [`Comedy`, `Adventure`, `Family`],
    year: 2018,
    duration: `1h 35min`,
    age: `6+`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    rating: {
      score: `6.5`,
      level: `Good`,
      count: 230,
    },
    director: `Will Gluck`,
    starring: [`James Corden`, `Fayssal Bazzi`, `Domhnall Gleeson`, `Sia`, `Colin Moody`, `Sam Neill`, `Margot Robbie`, `Elizabeth Debicki`, `Daisy Ridley`, `Rose Byrne`],
    description: `Feature adaptation of Beatrix Potter's classic tale of a rebellious rabbit trying to sneak into a farmer's vegetable garden`,
    review: `Based on the books by Beatrix Potter: Peter Rabbit (James Corden;) his three sisters: Flopsy (Margot Robbie,) Mopsy (Elizabeth Debicki) and Cotton Tail (Daisy Ridley) and their cousin Benjamin (Colin Moody) enjoy their days harassing Mr McGregor in his vegetable garden. Until one day he dies and no one can stop them roaming across his house and lands for a full day or so. However, when one of Mr McGregor's relatives inherits the house and goes to check it out, he finds much more than he bargained for`,
  },
  {
    id: 7,
    title: `Journey's End`,
    poster: `img/journeys-end.jpg`,
    altPoster: `Journey poster`,
    background: `img/journeys-end-bg.jpg`,
    altBackground: `First World War`,
    genre: [`Drama`, `War`],
    year: 2017,
    duration: `1h 47min`,
    age: `16+`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    rating: {
      score: `6.6`,
      level: `Good`,
      count: 90,
    },
    director: `Saul Dibb`,
    starring: [`Paul Bettany`, `Sam Claflin`, `Stephen Graham`, `Andy Gathergood`, `Jack Riddiford`, `Adam Colborne`, `Elliot Balchin`, `Theo Barklem-Biggs`, `Asa Butterfield`, `Nicholas Agnew`],
    description: `Set in a dugout in Aisne in 1918, it is the story of a group of British officers, led by the mentally disintegrating young officer Stanhope, as they await their fate`,
    review: `This is not a war movie - it's a movie about war. Specifically, the affects of trench warfare on a group of soldiers. Too that end, the movie is absolutely brilliant from the moment it begins to the moment it ends. You will not see long drawn out battle scenes, hand to hand combat, fire-fights, bloody carnage or anything else you've recently seen in Hacksaw Ridge, Lone Survivor or Fury. What you will see is the persistent and inevitable deterioration of the innocence and humanity of the characters as their fate, which they all know is coming, slowly but surely creeps up on them from one day to the next.`,
  },
  {
    id: 8,
    title: `Deadpool 2`,
    poster: `img/deadpool2.jpg`,
    altPoster: `Deadpool poster`,
    background: `img/deadpool2-bg.jpg`,
    altBackground: `Snow falls`,
    genre: [`Adventure`, `Action`, `Comedy`],
    year: 2018,
    duration: `1h 59min`,
    age: `18+`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    rating: {
      score: `7.7`,
      level: `Good`,
      count: 890,
    },
    director: `David Leitch`,
    starring: [`Ryan Reynolds`, `Josh Brolin`, `Morena Baccarin`, `Julian Dennison`, `Zazie Beetz`, `T.J. Miller`, `Leslie Uggams`, `Karan Soni`, `Brianna Hildebrand`, `Jack Kesy`],
    description: `Foul-mouthed mutant mercenary Wade Wilson (a.k.a. Deadpool), brings together a team of fellow mutant rogues to protect a young boy with supernatural abilities from the brutal, time-traveling cyborg Cable`,
    review: `After losing Vanessa (Morena Baccarin), the love of his life, 4th-wall breaking mercenary Wade Wilson aka Deadpool (Ryan Reynolds) must assemble a team and protect a young, full-figured mutant Russell Collins aka Firefist (Julian Dennison) from Cable (Josh Brolin), a no-nonsense, dangerous cyborg from the future, and must also learn the most important lesson of all: to be part of a family again`,
  },
  {
    id: 9,
    title: `Cargo`,
    poster: `img/cargo.jpg`,
    altPoster: `Cargo poster`,
    background: `img/cargo-bg.jpg`,
    altBackground: `Australias nature`,
    genre: [`Sci-Fi`, `Drama`, `Horror`],
    year: 2017,
    duration: `1h 45min`,
    age: `18+`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    rating: {
      score: `6.3`,
      level: `Good`,
      count: 267,
    },
    director: `Ben Howling`,
    starring: [`Simone Landers`, `Martin Freeman`, `Marlee Jane McPherson-Dobbins`, `Lily Anne McPherson-Dobbins`, `Finlay Sjoberg`, `Finlay Sjoberg`, `Susie Porter`, `Ella Barter`, `Aiden Squire`, `Alexandra Schulze`],
    description: `After an epidemic spreads all over Australia, a father searches for someone willing to protect his daughter`,
    review: `This movie is an adaptation of a 7 minute short film, was produced by netflix, didn't have a huge budget, and they still managed to create a fansastic film with incredible acting and a heartwarming, if tragic, storyline. This is not an oscar worthy film and wasnt created under the same standers as some of these comments seem to believe, but it was definitely worth the watch`,
  },
  {
    id: 10,
    title: `The Grand Budapest Hotel`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    altPoster: `The Grand Budapest Hotel poster`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    altBackground: `The Grand Budapest Hotel`,
    genre: [`Adventure`, `Crime`, `Comedy`],
    year: 2014,
    duration: `1h 39min`,
    age: `16+`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: {
      score: `8.1`,
      level: `very good`,
      count: 950,
    },
    director: `Wes Anderson`,
    starring: [`Ralph Fiennes`, `F. Murray Abraham`, `Mathieu Amalric`, `Adrien Brody`, `SWillem Dafoe`, `Jeff Goldblum`, `	Harvey Keitel`, `Jude Law`, `Bill Murray`],
    description: `Wes Anderson's THE GRAND BUDAPEST HOTEL recounts the adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend`,
    review: `GRAND BUDAPEST HOTEL recounts the adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend. The story involves the theft and recovery of a priceless Renaissance painting and the battle for an enormous family fortune`,
  },
];

export const promoMovie = {
  id: 10,
  title: `The Grand Budapest Hotel`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  altPoster: `The Grand Budapest Hotel poster`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  altBackground: `The Grand Budapest Hotel`,
  genre: [`Adventure`, `Crime`, `Comedy`],
  year: 2014,
  duration: `1h 39min`,
  age: `16+`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: {
    score: `8.1`,
    level: `very good`,
    count: 950,
  },
  director: `Wes Anderson`,
  starring: [`Ralph Fiennes`, `F. Murray Abraham`, `Mathieu Amalric`, `Adrien Brody`, `SWillem Dafoe`, `Jeff Goldblum`, `	Harvey Keitel`, `Jude Law`, `Bill Murray`],
  description: `Wes Anderson's THE GRAND BUDAPEST HOTEL recounts the adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend`,
  review: `GRAND BUDAPEST HOTEL recounts the adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend. The story involves the theft and recovery of a priceless Renaissance painting and the battle for an enormous family fortune`,
};
