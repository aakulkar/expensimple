README

Akash Kulkarni (aakulkar)
Anish Phophaliya (aphophal)
Eshan Chordia (echordia)

------------------------------HOW TO RUN IT-----------------------------------------------------
Run the server by going into the /project folder and running the command
node app.js
This should start up the server on port 3000.
Then you can open the app locally 
http://localhost:3000
or remotely by going to 
http://your_ip_address:3000

------------------------------Description--------------------------------------------------------------------------

ExSimplify

Our app keeps track of a person's expenditures. It allows the user to create a receipt with a photo, add a title, time, date, and tags to it and store it in the database. The user can also view all of their expenses, and details about their expenses. Users can also filter expenses by the tags they game them or dates and view the expenditures that are relevant only to those tags or between the dates. 

---------------Organization------------------------------------
We have organized our code in a standard fashion.
- All the server code is in the main directory.
- The html files are put in the html folder.
- All the other files are in the public directory.
	Public directory
		- autocomplete => contains the autocomplete widget's javascript and css files.
		- css => all jqueryMobile data(css, themes and icons), css reset, term.css(our file).
		- img => contains external images (Taken from www.thenounproject.com).
		- js => all the javascript files + jquery, jqueryMobile libraries + cordova files.


-----------------Contract---------------------------------------------------------------------

NOTE:
- Our original wireframe design is added on the front page for reference.

Eshan - Hours Spent
-------------------
Thanksgiving Break - 0 hours
Week after thanksgiving break - 20 hours
Monday, December 3rd - 6 hours
Tuesday, December 4th - 9 hours
Wednesday, December 5th - 6 hours
Thursday, December 6th - 11 hours
Friday, December 7th - 9 hours

Anish - Hours Spent
--------------------
Thanksgiving Break - 0 Hours
Week after thanksgiving break - 25 hours
Monday, December 3rd - 8 hours
Tuesday, December 4th - 9 hours
Wednesday, December 5th - 6 hours
Thursday, December 6th - 11 hours
Friday, December 7th - 1 hour
Finals week - 12 hours

Akash - Hours Spent
--------------------
Thanksgving Break - 0 Hours
Week after thanksgiving break - 10 hours
Monday, December 3rd - 3 hours
Tuesday, December 4th - 3 hours
Wednesday, December 5th - 5 hours
Thursday, December 6th - 7 hours hours
Friday, December 7th - 10 hours

-------------------------------Iterative Design-------------------------------------

We went through user studies three different times.
Our first iterative design was at the hackathon on Saturday night. We got five people to test our 
app. Below is what each person said and how we fixed the problems. 

Person 1 - This was the first person to test our app. He said the UI on the app is really nice,
but the very first time he used the app, it's difficult to use. Then he said, it's very easy to use
after the first, but there is a very steep learning curve on how to use the app. He also said that
removing tags was hard, and it wasn't obvious how to remove tags.

We fixed this by giving input boxes placeholders with directions in them. We also made the header
of each page the full title, with the tab for that page having one word that describes the action
the user expects on that page, and also giving each tab an icon. That way each user has a very easy
way of understanding of what is happening on the page. We added a "X" button on each tag to make it
to remove each tag. The "X" button is pretty prominent, and thus it is very easy for the user to understand that's the button to remove the tag.

Person 2 - This person said the app was very easy to use. He suggested that we use a different color instead of black for the header and the tabs, and we should add some more color to the app to make it look nicer. He also wanted us to turn tag boxes, into tag buttons. At this point, our tags were in little green boxes and he said they weren't big enough. He also liked the gray we used for
the parts of the screen that weren't used.

We fixed the tags problem by making our tags, buttons as opposed to boxes. We also increased the size of the tag buttons. We made our header and buttons have a nice salmon color. This added some color to our app. 

Person 3 - This person made the same comments about the lack of color in our app. She also said that our screen was too cluttered on login and register page. She also mentioned that she should be able to press the return or go button on her phone to log in and submit forms. Otherwise, she really liked that our UI was simple and very easy to use, and everything was labeled nicely.

Like in the previous case, we added color to our app. On login and register, we got rid of all the labels, and added placeholders enough. 
We chose placeholders for two reasons: 1) because phones aren't that big, they save space and make things look "cleaner" and they also look nicer than labels. We also added the feature to be able to press the go or return button to login and add an expense. We didn't for filter expenses because there are multiple forms in there, and we couldn't add it to the register because of the we implemented register.

Person 4 - He didn't say anthing that hadn't been said to us earlier, except that a user shouldn't be able to highlight things in our app. He accidently did that, and he didn't really like it.

We fixed that problem by simplying adding some CSS to our CSS file.

Person 5 - She said she really liked the UI and it was pretty easy to use. She said that most people probably create expenses the same day that they had that expense, so we should make a button that sets current date so the user doesn't have to input the date.

We fixed this by making the current date the default date when the user wants to create an expense, and the user then can change the date if he or she wishes. 

-----------------------------------------------------------------------------------------------------------------------------------

Our second user-study time was in class that one day when Professor Kosbie wanted to us to get people to test our app. We got one person to test our app on that day.

Person 1 - He really liked the look and feel of the app. He said the UI was simple and very easy to use. We asked him if there was a steep learning curve, and he said no, everything is labeled so well that I know what I have to do immediately by looking at it.
He said we should change the camera button text to a picture of a camera, because that's very simple to understand. He also said that we should make the logout button an icon instead of having text, because we have a lot of text on the screen already.

We found good images of logout and camera, so we got rid of the text. The change for the camera was pretty obvious.
We changed the logout button text to an image as some of our friends said it was pretty obvious that was a log out button.

-------------------------------------------------------------------------------------------------------------------------------------

Our third user study was in Gates with two of our friends. 

Person 1 - She said that she really liked all the colors we used in our app. She also said that our UI was simple and easy to use. She said that it would look much nicer if the log out button was on the right hand of the screen, and if it wasn't left of the header.

We moved the logout button to the right of the header, and that made it look significantly better. 

Person 2 - He said that he really liked the UI and the colors we used. He said the app was pretty easy to use. One thing he mentioned was to change the font of the text and change the color of the text. He said white would look better on the type of salmon we were using and we should match the colors of the header and page tabs.

We got rid of the text shadow, made the text white on the header, the text white on the active tab and the text black on an inactive tab. It made the app look much nicer.

-------------------------------------------------Required Elements---------------------------------------------------------------------------

Required elements that we are being graded on: 

1. HTML
	
	We have two HTML files called index.html and main.html. index.html has two forms, one for register and one for login. We use the placeholder feature in each of the input boxes, and we use a form to submit the data to the server. We also use various html input fields for emails, passwords,etc. and we validate all the inputs. We use IDs and classes appropriately in various places depending on how we need to access the element. We also separated all our javascript and css files so that only markup is there in the html files. We also used img tags to display photos of receipts.

2. DOM Manipulation
	We do a fair bit of DOM manipulation in order to add/remove elements on various actions. This can be seen in any of our .js files (term.js, MainPage.js, etc). One of the cases is the 'Tag' widget, which allows a user to add multiple tags, choosing from a list of past used tags (autocomplete), or creating a new one. These tags are buttons and can be removed simply by tapping on them. 
	A major challenge we faced to DOM manipulation was that when using jquery mobile, there are a lot of changes to the DOM that it makes onload. The way we go around it is by inspecting the element after load and manipulating the DOM accordingly.

3. jQuery
	There is a lot of jquery used. This can be seen in term.js (and all the other js files too).

4. JQuery Mobile
	
	We used jQuery mobile for the whole UI of the project. index.html and main.html use a lot of  the jquery mobile tags for the HTML. We use data-transitions, data-roles for buttons, data-corners="false" for a square button, data-ajax="false" for form submissions because we don't want jquery mobile to submit forms, data-positions, data-icons, and we also had jquery mobile
	information to classes to make the button stay in a certain place or make a tab active, data-titles, and list views to show our receipts so we could make them clickable buttons and make them look nice at the same time. 

5. PhoneGap
	We made use of the camera API provided by phoneGap, in addition to making a .apk file using it. The code can be found in camera.js and can be seen in addAnExpense page in main.html.

6. AJAX server
	We wrote an ajax server whose API we consume. We use it to talk to a mongodb database where we store receipts and user info. We also use passport to make authentication work and salt passwords. The files appRoutes and loginRoutes show the routes that are setup for the client to talk to the server.

7. node.js
	We have used node as our server of choice. This can be seen in our server code in app.js, appRoutes.js and loginRoutes.js. We also have used plugins for mongodb, express, passport and passport-local. These plugins makes node much more powerful and allows us to do things like client authentication and data storage easily.

8. localStorage
	
	We use localStorage to store the tags on the user's phone so we can autocomplete better.We use local storage to store all user's tags which can be accessed quickly to generate a suggested list of tags to auto-complete from.

9. server-side databases: MongoDb
	We have used MongoDB as our server side database. The schemas are in User.js and Receipt.js. We use mongoose to configure node with and allow for easy access to the database (as can be seen in appRoutes.js and loginRoutes.js.

10. Google Graphs 
	We have implemented two different types of graphs (pie charts and histograms) using google graphs. we use it to display filtered expenses in the various forms. Code is present in /js/graphs.js

