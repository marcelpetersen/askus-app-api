# AskUs API Application
---

This repository contains the code for AskUs server.
This server is used for signing AWS posting pictures requests.
It is also used when a user wants to delete his account and posts.

Check AskUs application repo here:
[AskUs Repo](https://github.com/renandeswarte/AskUs)

Please check the website at :
[AskUs Website](https://URL)

AskUs application helps people to share post and ask the community to make a choice between 2 elements of a post by voting.<br>
AskUs uses Facebook for user login. User can check if their friends are using the application and check their posts<br>
AskUs is available only on mobile devices.

## Technologies Stack
---

* BACK
	* **Node.js/Express** Server
	* **Firebase** Database
* OTHER
	* **AWS S3** CDN


## Local installation
---

### Third Party Applications

The application uses Firebase for Database and Facebook login, You need to create a Firebase application and enable the facebook login. [Firebase](https://www.firebase.com/)

An AWS S3 CDN is used to store the pictures. [AWS](https://console.aws.amazon.com)

### Configuration file

You need to add a .env file in the root folder.

You can find an example of the file in the documentations folder: [.env](Documentations/dotenvfile.json).


### Run the application

Install packages: `npm install`

Run: `nodemon`



