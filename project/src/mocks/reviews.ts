const review = () => (
  {
    name:'Kate Muir',
    date:'December 24, 2016',
    rating: 5.6,
    comment : 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years.'
  }
);
const getReviews = () => Array.from({length:5},()=>review());
export {getReviews};
