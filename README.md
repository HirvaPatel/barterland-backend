<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 

# BarterLand

* *Date Created*: 12 APR 2022
* *Last Modification Date*: 12 APR 2022
* *GitLab  Front-End Application URL*: https://git.cs.dal.ca/vrajendran/group_16csci5709/-/tree/master
* *GitLab  Back-End Application URL*: https://git.cs.dal.ca/vrajendran/group_16csci5709_backend/-/tree/master
* *Deployment URL Back-End*: https://barterland-backend.herokuapp.com/
* *Deployment URL Front-End*: https://barterland.herokuapp.com/

## Authors
* [Vikram Babu Rajendran](vk712598@dal.ca) - *(Developer)*
* [Sowjanya Mani](sw891064@dal.ca) - *(Developer)*
* [Hardik Mesvania](hr860663@dal.ca) - *(Developer)*
* [Hirva Patel](hirva.patel@dal.ca) - *(Developer)*
* [Shivam Barot](shivam@dal.ca) - *(Developer)*

#### Features and Tasks

###### User Profile Management [Author : Sowjanya Mani]
* Login
* Register
* Forgot Password
* User Profile update - Email, Password, Name and Address.
* Delete User Account
* Logout

###### Search Feature [Author : Sowjanya Mani]
* Search for Ads based on the name, title or location keywords.

######  Deal Management [Author : Vikram Babu Rajendran]
* Propose a deal.
* Update a deal.
* Delete a deal.

######  Home Page [Author : Vikram Babu Rajendran]
* Title Section
* Menu Section
* Footer Section
* List all Ads.

###### My Deals [Author : Vikram Babu Rajendran]
* List all the deals.

######  MyAdvertisement [Author : Hirva Patel]
The advertisements added by the user is displayed in the MyAds web page. The ads webpage enables the user to open any particular advertisement and perform edit, delete operations on their advertisement.
* View Advertisements
* View any Advertisement
* Edit Advertisement
* Delete Advertisement

###### Feedbacks [Author : Hirva Patel]
The feedback webpage is created to list all the feedbacks added by the user. The user can update or delete the feedback if they wish the detail needs to be modified.
* View any Feedbacks
* Edit Feedback
* Delete Feedback

###### Admin [Author : Hardik Mesvania]
When user login to the application using the Admin credentials, home page will show a button "Admin" which will redirect to the admin module of the application.
* user profile update,register and delete.
* Ads mangement
* Shows new user widgets
* Shows recent adds widgets
* shows graph of location specific deals
* shows total number of ads and users in the application 

##### Wishlist
* Add to Wishist
You can click on add to wishlist button below the product and the item will be added to your wishlist.
* Displaying all the items of the Wishlist 
You can click on the wishlist button where you can see your wishlisted products.
* Remove from Wishlist 
In the wishlist section, you can click on remove from wishlist button below any wishlisted item and the item will be removed from your wishlist.

```
The application can be tested by either registering yourself as a user or with the credentials given below. This is one of the registerd user in the application.
Login Credentials:

User Login:
    Email    :  karol@123
    Password :  Password@123

Admin Login:
    Email: admin@gmail.com
    Password: Admin@123

```
#### Files and thier Authors

    ===========================================================================================
            Folder             ||      File Name                ||      Author               ||
    ===========================================================================================
        /home                  ||  homeRouter.js                ||  Vikram Babu Rajendran    ||
        /deals                 ||  dealsRouter.js               ||  Vikram Babu Rajendran    ||
        /                      ||  mongo.js                     ||  Vikram Babu Rajendran    ||
                               ||                               ||                           ||
        /api/model             ||   users.js                    ||   Sowjanya Mani           ||
        /api/routes            ||   users.js                    ||   Sowjanya Mani           ||
        /api/search            ||   searchRouter.js             ||   Sowjanya Mani           ||      
                               ||                               ||                           ||
        /Wishlist/route        ||   wishlistRoute.js            ||   Shivam Barot            ||
        /Blog/route        	||   blogRoute.js            	  ||   Shivam Barot            ||
                               ||                               ||                           ||
        /myAds                 ||   deleteMyAdRoute.js          ||   Hirva Patel             ||
        /myAds                 ||   getMyAdsRoute.js            ||   Hirva Patel             ||
        /myAds                 ||   updateMyAdRoute.js          ||   Hirva Patel             ||
        /feedback              ||   createFeedback.js           ||   Hirva Patel             ||
        /feedback              ||   deleteFeedbac.js            ||   Hirva Patel             ||
        /feedback              ||   getAdForFeedback.js         ||   Hirva Patel             ||
        /feedback              ||   getFeedbackRoute.js         ||   Hirva Patel             ||
        /feedback              ||   getSellerForFeedback.js     ||   Hirva Patel             ||
        /feedback              ||   updateFeedbackRoute.js      ||   Hirva Patel             ||        
        /admin                 ||   getAllAdsRoutes.js          ||   Hardik Mesvania         ||
        
## Built With

* [React](https://reactjs.org/) - Javascript Library (Front End)
* [Heroku](https://www.heroku.com/) - Deployment
* [NodeJs](https://nodejs.org/en/) - JavaScript Runtime Environment (Back End)
* [MongoDB](https://www.mongodb.com/) - Database
* [ExpressJs](https://www.mongodb.com/) - Web Application Framework for NodeJS


## Sources Used
##### Resources used for reading purpose to complete this assignment
*  https://www.w3schools.com/nodejs/nodejs_intro.asp
*  https://www.codecademy.com/learn/learn-node-js
*  https://code.visualstudio.com/docs/nodejs/nodejs-tutorial
*  https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
*  https://stackoverflow.com/questions/32682962/javascript-loop-through-array-backwards-with-foreach
*  https://reactjs.org/docs/forms.html
*  https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm
*  https://www.mongodb.com/docs/manual/tutorial/query-array-of-documents/
*  https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp
*  https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/

##### Resources from where code has been taken and modified
* https://stackoverflow.com/questions/47637709/mongodb-query-elements-of-an-array-of-objects-nested-in-a-collection-property
* https://thinkster.io/tutorials/mean-stack/creating-schemas-with-mongoose
* https://www.npmjs.com/package/uuid
* https://stackoverflow.com/questions/14588032/mongoose-password-hashing

### deals/dealsRouter.js

*Lines 26 - 40*

```
$project: {
                _id: 0,
                ad_details: 1,
                ad_id: 1,
                user_id: 1,
                "deals": {
                    $filter: {
                        input: "$deals",
                        as: "deals",
                        cond: {
                            $eq: ["$$deals.user_id", user_id]
                        }
                    }
                }
            }
```
The code above was created by adapting the code in [StackOverflow](https://stackoverflow.com/questions/47637709/mongodb-query-elements-of-an-array-of-objects-nested-in-a-collection-property) as shown below:
```
Race.aggregate([
{ 
    $match: {
        "year": req.params.year // filter out all documents that we're not interested in
    }
}, {
    $project: {
        _id: 0
        "runners": {
            $filter: {
                input: "$runners", // we want to filter the "runners" array
                as: "runner",
                cond: {
                    $eq: [ "$$runner.Ag", "34" ] // just an example filter
                }
            }
        }
    }
}], function(err, results) {
      rs.json(results);
});
```

- The code in [StackOverflow](https://stackoverflow.com/questions/47637709/mongodb-query-elements-of-an-array-of-objects-nested-in-a-collection-property) was implemented by dnickless
- [StackOverflow](https://stackoverflow.com/questions/47637709/mongodb-query-elements-of-an-array-of-objects-nested-in-a-collection-property)'s Code was used to filter deals with specific user id from the advertisments collection.
- [StackOverflow](https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript)'s Code was modified by changing the query with our collection variables and by removing and altering some logic.

### model/users.js

```
const userSchema = {
_id: mongoose.Schema.Types.ObjectId,
user_id :{type: String, required : true},
email: {type: String, required : true},
}

module.exports = mongoose.model("users",userSchema)

```

The code above was created by adapting the code in  [thinkster](https://thinkster.io/tutorials/mean-stack/creating-schemas-with-mongoose) as shown below: 

```
var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});


```

- The code in [thinkster](https://thinkster.io/tutorials/mean-stack/creating-schemas-with-mongoose) was implemented by thinkster
- [thinkster](https://thinkster.io/tutorials/mean-stack/creating-schemas-with-mongoose)'s Code was used because I wanted to understand and learn about creating a schema in mongoose.
- [thinkster](https://thinkster.io/tutorials/mean-stack/creating-schemas-with-mongoose)'s Code was modified by creating my own schema that fits with my requirements, also it was modified by adding mongoose schema types objectId to the id property.


#### routes/users.js

```
   var user_id = uuid.v4();
   var email = req.body.email;
    
```

The code above was created by adapting the code in [npm](https://www.npmjs.com/package/uuid) as shown below: 

```
const { v4: uuidv4 } = require('uuid');
uuidv4();

```

-  The code in [npm](https://www.npmjs.com/package/uuid) was implemented by npm.
-  [npm](https://www.npmjs.com/package/uuid)'s Code was used because to understand how uuid works to generate the random id and its correct way of using it in the code.
-  [npm](https://www.npmjs.com/package/uuid)'s Code was modified by using it against ID value to genrate a random ID to the user.


### routes/users.js

```
bcrypt.compare(req.body.password, user.password).then((passwordCheck) => {
      if (!passwordCheck) {
        return res.status(400).send({
          message: "Passwords does not match",
          error,
          success: false
        });
      }

```

The code above was created by adapting the code in [Stackoverflow](https://stackoverflow.com/questions/14588032/mongoose-password-hashing) as shown below: 

```
// hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });

```

- The code in [Stackoverflow](https://stackoverflow.com/questions/14588032/mongoose-password-hashing) was implemented by Jnovack.
- [Stackoverflow](https://stackoverflow.com/questions/14588032/mongoose-password-hashing)'s Code was used because I wanted to gain knowledge on hashing passwords in node js.
- [Stackoverflow](https://stackoverflow.com/questions/14588032/mongoose-password-hashing)'s Code was modified by using the compare funtion to check the password coming in the request body with the hashed password present in the database against the user.
