const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(()=>{
  (async function(){
    // Run your code here, after you have insured that the connection was made
    //console.log(title);
  try {  
  const recipCreat = await Recipe.create({ title: "New recette" , cuisine: "francaise" });
       console.log (recipCreat.title);

  const recipCreatall = await Recipe.insertMany(data);
      recipCreatall.forEach(rec =>{
        console.log(rec.title);
      });

  const recipUpdate =await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }); 
      recipUpdate? console.log('success'):console.log('failed');

  const recipDelete =await Recipe.deleteOne({ title: "Carrot Cake" });
      recipDelete.title === "Carrot Cake"? console.log('failed'):console.log('success');

      console.log('disconnect to the database');      
      process.exit();
    
  } catch (err) {
  console.error(err);
  
  };

 })()});
