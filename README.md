# contactsApp-backend

Functional Authentication and Authorization using <b> Node js and JWT </b>.

New user can Signup or already existing user can login to their account with correct credentials, upon successful authentication user will be provided with token which can be used and verified using middleware for authorization for future data access.

<b> CRUD </b> – Create, Read, Update, Delete operations are performed on contact table of each user.
Each user has its own contact table with its own private data only he/she can access after successful login. New user will get unique different table.
MongoDB atlas has been used for user and contacts storage database.

<h4> Functionalities </h4>
<ul>
  <li> User authentication and signup. </li>
  <li> Json Web Token for authentication and authorization. </li>
  <li> Middleware for verifying the token in each request. </li>
  <li> CRUD operations. </li>
  <li> Different contact list for different users. </li>
  <li> MongoDB atlas for database. </li>
</ul>
