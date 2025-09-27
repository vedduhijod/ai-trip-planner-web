export const SelectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈️",
    people: "1 person",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "⛵",
    people: "5 to 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];

export const AI_PROMPT = `
Generate a Travel Plan for Location: {location}, for {totalDays} days, for {traveler} with a {budget} budget.  

Return ONLY valid JSON in this structure (no markdown, no explanations):  

{
  "hotels": [
    {
      "hotelName": "",
      "hotelAddress": "",
      "price": "",
      "hotelImageUrl": "",
      "geoCoordinates": "",
      "rating": "",
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "places": [
        {
          "placeName": "",
          "placeDetails": "",
          "placeImageUrl": "",
          "geoCoordinates": "",
          "ticketPricing": "",
          "rating": "",
          "timeToVisit": ""
        }
      ]
    }
  ]
}
`;
