## Project Description
This project involves the contribution of a new chess analysis tool to be used on the open source chess platform Lichess by any and all visitors to the site. The goal is to introduce a tool that allows users to search through any player's games and place them side-by-side on the page, enabling big-picture analysis of their overall game plans in certain situations. Users will be able to sort through the games of their desired players by opening name, piece color, and more. They'll be able to step through the games simultaneously or one-by-one. The tool will be freeform in that each board on the page can be injected with the games of different players, allowing for easy comparison of playstyles between users. We will manage the development in a scrum environment using agile methodologies. 

The team will be organized as follows: The product owner will be Andy Phillips. The development team will consist of Brian Durkin, Hao Long Li, and Keshav Saraogi.

The idea is to have a working, stylized proof-of-concept to present by the end of the semester. We plan to have a fully working feature to present at the end of each sprint and the overarching goal is to build a useful tool that will potentially be used by the millions of users that use Lichess every month. 

## Installation
NOTE: These instructions are for WINDOWS ONLY. Reach out to Andy if you are using a different OS so I can make time to slap you the next time I see you.

Download Docker for Windows the following link and install:
https://docs.docker.com/get-docker/
	-You can use the Docker GUI to stop and start the Lichess container that you'll setup. 

Navigate to this repo and clone it: 
https://github.com/benediktwerner/lichess-docker
	-Open a terminal and cd to the location of your newly cloned lichess-docker repo 
	-Open Dockerfile in a text editor and: 
		1. Add the following lines JUST BELOW "# nvm => node => yarn":
			RUN sudo apt-get install dos2unix \
			  && sudo dos2unix /home/lichess/build/sdkman-init.sh \
			  && sudo dos2unix /home/lichess/build/nvm-install.sh
		2. Add the following line JUST BELOW "ADD run.sh /home/lichess/run.sh" 
			RUN sudo dos2unix /home/lichess/run.sh

In your terminal, run the following command INCLUDING the period after a space:
	docker build --tag lichess .

Clone the following two repos to the same directory (e.g. C:/Users/Andy/Documents/Github):
	https://github.com/ornicar/lila
	https://github.com/ornicar/lila-ws
	
	
Edit the following command to use the directory that houses both repos from the previous step and run it in your terminal:
docker run --mount type=bind,source=YOUR:/PATH/HERE/,target=/home/lichess/projects --publish 9663:9663 --publish 9664:9664 --publish 8212:8212 --name lichess --interactive --tty lichess

Your terminal path should now look something like this: 
	lichess@88f4ab9da926:
	
That is what your terminal will look like as you start up the application locally (from your Docker container)

Now, in your terminal, run the following script to create your DB indices:
	mongo lichess bin/mongodb/indexes.js

Next, run the following series of commands:
	cd projects/lila
	sudo dos2unix lila
	cd ui
	sudo dos2unix build

So far this has all been one-time setup stuff. FYou can use the following command to get back into your lichess Docker container in the command line at anytime:
	docker exec -it lichess bash
	
## Building
Luckily, building and compiling is MUCH simpler than the installation process. All you have to do is get into your docker in the terminal (docker exec -it lichess bash) and run the following commands:
	
	cd projects/lila
	./ui/build
	./lila 
		- This opens the sbt (scala build tool, a command line interface). Once inside, enter "compile" without the quotes to begin compilation. 

At this point, open a second terminal to run lila-ws, the web socket library. To do this, start by entering "docker exec -it lichess bash". Then, navigate to ~projects/lila-ws and enter the following command:

	sbt run
	
After lila-ws is successfully running, go back to your first terminal (where the sbt is still running) and type "run" without the quotes. This will fire up your local lichess instance! Now you can go to the following URL to enjoy Lichess locally!! 

	http://localhost:9663/

## Product Vision

For chess players of all ages and skill levels who are interested in improving their chess skills through self-analysis, the Lichess Multi-Board Analysis Tool (LMBAT) is an extension of Lichess’s analytical toolkit that enables users to analyze multiple past games simultaneously to improve their understanding of how a given position can play out. 

Unlike most other chess analysis tools, the LMBAT allows you to step through multiple games simultaneously, side-by-side, to easily visualize how decisions made in those games can impact the outcome. 


## Personas

#### Chess Coach (30 years old, high rated, paid to coach less experienced players)


#### Adult Chess Amateur (22 years old, only plays online, wonders why he always loses with a certain opening)


#### Chess Professional (30 years old, plays professionally, needs to examine his opponents opening habits for an upcoming match)
Magnus Carlsen is the current World Chess Champion and has been #1 ranked player in the world for over 10 years. In his upcoming World Chess Championship match against Ian Nepomniachtchi or just Nepo, he has been preparing for his matches and developing chess ideas not for himself but analyzing his oppononent's games as well. Magnus Carlsen wants to examine his previous games against Ian and wants to analyze his previous games against Ian in terms of what could have been done differently compared to what actually took place in the games. Using the Multi-Board-Analysis-Tool will allow Magnus to think of multiple variations of the game at the same time and this would allow him to save time in terms of his preparation. While it is common for a chess professional to be able to think multiple moves ahead in the future, having a multiple-board will allow Magus to develop more ideas and defend his title better. 


#### Chess Lecturer (45+ years old, retired ex-pro, gives lectures at a local chess club, wants to present various openings with small deviations)

Yasser Seirawan is a legendary chess grandmaster and lecturer who often gives talks at the St. Louis Chess Club. A typical chess lecture involves a game board projected onto the screen and an instructive verbal analysis of that game is provided by the lecturer. Yasser has an idea for a lecture that involves comparing the Najdorf Sicilians of Maxime Vachier-Lagrave and Magnus Carlsen but this would require having multiple game boards open in multiple browser windows and stepping through each game individually. This is a tedious process for someone who is simultaneously trying to teach a full classroom the intricacies of the games. Using the Multi-Board Analysis Tool, Yasser is able to show four boards on the same screen: 2 of Maxime's games and 2 of Magnus's. He can step through every game at the same time while making his points about their unique deviations. 

## Updated Proposal

### Project Abstract
Lichess is the largest and most popular open-source online chess platform. Millions of games are
played every week on their site and many players use it as a place to hone their skills. Lichess has a few tools to help players improve their game – from their AI-assisted analysis board to their opening explorer, it's easy to analyze your games on their site. But I believe something is missing.
One thing Lichess does is keep a history of all your games stored in their database using encoded
strings of text called PGNs for lightweight storage. If you want to examine an individual game, you can load its PGN into an analysis board and explore where you went wrong (in chess, you're always wrong at least once). What you cannot do is explore multiple games side-by-side. This can be useful for many things. 

In chess, you typically have a repertoire of opening strategies that you focus on, so usually, up to a certain point, you have played the game the exact same way many times. What I believe would be useful is to view multiple games with the same opening patterns side-by-side. This would allow the user to explore the general shift that their opening decisions make in the flow of the game. This is what I call the Multi-Board Analysis Module. A user would be able to sort through their game history by opening, date, white/black, etc. and place multiple games on to the page at once. Users could step through them all simultaneously or one-by-one. The point is to allow easy analysis of the overall patterns your games go in to help the user identify bigger-picture issues with their strategies.


### Project Relevance
This project would involve GUI development as we'd be developing a brand new interactive page for
Lichess.com, Object-Oriented Programming will be used to structure our program, and design patterns
and API utilization will be required for this project. The project will be broken up into tasks using a trello board where the individual tasks will be assigned to group members. Lichess is coded in Scala (a Java-like programming language designed for web development). I'm new to the language myself, but considering we're all familiar with Java, I don't think it'll be too challenging.

### Conceptual Design
The module itself will be simple. It will be added to the "Tools" section of Lichess.com as its own page. On pageload, we'll make an API call to receive a payload containing all the games the user has played on Lichess (remember, these are just PGNs so it's fairly lightweight). The payload will contain all the data we'll need to filter the games out for easy selection. The user will then be presented with a list of their games and they'll be able to pick which ones will be presented on boards on the screen below the filtering options. The boards are simply populated using Lichess's open source libraries. We'll have to incorporate some responsive-design. In addition, the user will be able to step through moves of their games (a built in feature of the Lichess boards) but we'll have to make a modification to the stepping mechanism because we'll have to differentiate between stepping through multiple boards at once or single boards. 

### Background
All of Lichess's open source repos are listed here: <https://lichess.org/source>
They provide a concise and convenient guide for installing a local instance of Lichess on your machine here: <https://github.com/ornicar/lila/wiki>
Additionally, here is the URL to the API we'll be calling <https://lichess.org/api>
And here is some Hello World! documentation for Scala: <https://docs.scala-lang.org/overviews/scala-book/hello-world-1.html>


Lichess makes it easy for us to contribute to their libraries because they rely on developers like us to keep their platform growing. Setup is a little tricky as they kind of force you to install a VM with Linux on it to work from, but having that added step gives us more material for our resumes.  


### Required Resources
Team members should have a basic understanding of web development and OOP. Team members need access to the internet and a desire to build something that might be used by millions of people. 

I will lead gladly lead the project - I have 2 years of web dev experience in a professional environment and have developed some pet projects for Android and the web in the past. I'm excited to explore Scala and to contribute to a great organization like Lichess. 

### Whiteboard Image
![whiteboard](https://user-images.githubusercontent.com/77801012/136469084-9edfe897-fcbd-4409-930f-334d27a4413e.jpg)
