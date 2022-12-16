const sortOptions = [
  { id: "popularity", label: "Popularity", dbField: "wishlistCount", order: "desc" },
  { id: "latest", label: "Latest Listings", dbField: "timestamp", order: "desc" },
  { id: "priceAsc", label: "Price Low to High", dbField: "price", order: "asc" },
  { id: "priceDesc", label: "Price High to Low", dbField: "price", order: "desc" },
];

export default sortOptions;
