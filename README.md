# GitHub Profiles Card App

## Description
	- app uses axios to read data from API on github and gets some data from the user and the profile picture
	
## Run
	- npm install
	- npm run start

## Docker
	docker build -t gitcardapp.img .
	docker run -it -d --name gitcardapp -p 80:3000 gitcardapp.img
