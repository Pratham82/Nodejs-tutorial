//* Object property shorthand

const name = "Prathamesh";
const userAge = 23;

const user = {
	//* Using shorthand
	name,
	userAge,
	location: "Mumbai",
};

console.log(user);

//* Object destructuring

const products = {
	label: "notebook",
	price: "$65",
	stock: 520,
	salePrice: "$90",
};

//* Older way of accessing properties

// let label = products.label;
// let price = products.price;
// let stock = products.stock;
// let salePrice = products.salePrice;
// console.log(label);
// console.log(price);
// console.log(stock);
// console.log(salePrice);

//* Newer way using object destructuring
//* We have to provide the same property name as it appears in the object, if the property is not present in the object then the default property will be set to undefined
const { label, price, stock, salePrice, rating } = products;

console.log(label);
console.log(price);
console.log(stock);
console.log(salePrice);
console.log(rating);

//* If we want rename the properties that we are fetching from the object then we have to pass colon and the new property name after the old property name

//* Notice that we can also provide default values to the properties if our source object does not have that property, in here the rating property is not present so the default value will be set to 10
const {
	label: newLabel,
	price: costPrice,
	stock: stocked_product,
	salePrice: selling_price,
	rating: rating_by_user = 10,
} = products;

console.log(newLabel);
console.log(costPrice);
console.log(stocked_product);
console.log(selling_price);
console.log(rating_by_user);

//* Accessing destructuring inside a funciton
const transaction = (type, { label, price }) =>
	`Transaction type: ${type} \n${label}: ${price}`;

console.log(transaction("Check", products));
