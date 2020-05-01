# AuthenticationUsingNodeJS

1. Make sure to run npm install before running app.js file
2. I have used csurf package to enabel csrf in the page routing and connect-flash package to display error messages while authenticating.
3. The above mentioned 2 packages will be used as a functions in the app.js file
4. all the sessions will be stored in mongo DB session collection.
5. from line 42 and 43 in app.js file i have used locals which means it allows all the local variables to pass these properties.
6. query params were used for routing. and a middleware is added in line 9 authroutes.js file for the fetching the special page.i.e., it      will only allow to fetch the special page only after authentication
7. authentication.js file inside middleware is used to check the authenticity of session. if not it will be redirected back.
8. In controller user.js file, line 30, 45 and 62 i have added req.flash which will take 2 parameteres key and value these error messages    will be flashed whenever any error happened in add the data and retrieving the data from mongoDB.
9. We must need to add a hidden input field with value csrfToken and with name _csrf. in all the forms or else we will end up with the        invalid CSRF token error.
10. This CSRF token is added inorder to prevent out app from cross site request attacks.
