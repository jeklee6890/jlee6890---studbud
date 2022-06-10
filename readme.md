# Joshua Lee (jlee6890) - StudBud Documentation
My web app 'StudBud' is targeted towards users with mental health conditions, allowing them to feel supported and safe while using my prototype. By focusing on this target audience, my web app has multiple features such as a dark-light mode, nature-related style, and a daily reminder on the opening page, all of which have been designed from both primary and secondary research conducted in Assessment 2. 

For the majority of StudBud's development, I used Google Chrome however some features seemed to show up in Safari rather than Chrome (which have been specified in the relevant sections).

## Key Features and Sections
### _Welcome_
The welcome section is what users first see when visiting StudBud. Here, I have included a daily quote and activity in order to provide excitement since these features help to create a sense of motivation and continual usage which was communicated when doing user testing. Moreover, for users that deal with mental health conditions, it's also important to normalise their experiences and aim to provide support, even if these features are a small part of their user experience. 

<img src="./readme-files/welcome1.png" width="240" alt="Development of Welcome page - 1">
<img src="./readme-files/welcome2.png" width="300" alt="Development of Welcome page - 2">

(screenshots of the kanban board's development above)

### _Kanban Board_
The kanban board is one of the main sections of my StudBud web app, where users can input tasks and have them displayed in columns which can be edited and customised. The main features of my kanban board resemble the prototype I created in Assessment 3, however the biggest change was in relation to the styling and aesthetics. Rather than having a cave and lake illustration as the background, I decided to create my own illustrations for each theme that would appear into the kanban board columns, as feedback from tutors and user testing revealed how the initial background idea was seen as distracting. 

<img src="./readme-files/kanban-board1.png" width="250" alt="Development of Kanban Board - 1">
<img src="./readme-files/kanban-board2.png" width="270" alt="Development of Kanban Board - 2">
<img src="./readme-files/kanban-board-modal.png" width="270" alt="Kanban Board Modal">
 
(screenshots of the kanban board's development above)

<img src="./readme-files/brainstorm1.jpg" width="150" alt="Development of Kanban Board Illustrations - 1">
<img src="./readme-files/icons.png" width="480" alt="Development of Kanban Board Illustrations - 1">

(screenshots of the kanban board's illustrations and development above)


### _Stopwatch and Flow Time Tracker_
The stopwatch and flow time tracker are placed inside the navigation sidebar, allowing users to switch between the other sections and the timers with ease. While this feature of StudBud does resemble my prototype, I found its functionality was dependent on the browser used. In Google Chrome, the timers did not function properly but in Safari, they worked as desired.

<img src="./readme-files/stopwatch-1.png" width="200" alt="Development of Stopwatch - 1">
<img src="./readme-files/stopwatch2.png" width="190" alt="Development of Stopwatch - 2">

(screenshots of the stopwatch and flow time tracker's development above)

### _Acronym Maker_
The acronym maker follows the same structure as the kanban board, where users can create acronyms which can be organised between columns. Users also have access to the sidebar in order to track their flow time and navigate between other StudBud sections. 

## Limitations and Future Development 
While my web app does reflect many of the key components of my initial prototype, there are also several issues that I was not able to resolve due to time and ability restraints. 

The first is the music player; while I was able to create the relevant code for the music player, I was unable to make the audio play. Although I did bring this issue up to tutors, they were unsure about the errors I was receiving and how to fix them, making it difficult to debug my music player. An alternative was to use an external music source, however I was not able to implement it in time and I was also unsure as to how to implement it. 

<img src="./readme-files/error.png" width="300" alt="<Music Player Error">

(screenshot of the music players's development error)

Another issue was getting the dark and light mode styles to extend past the 'Account Settings' page and apply to other sections such as the 'Kanban Board' and 'Acronym Maker' pages. I did successfully create functions and utilise local storage to keep the user's style preference on the 'Account Settings' page, but I wasn't able to store and apply the styles to other pages. This feature is something I would like to improve upon for future development as I believe it does create weaknesses in my web app. 

The last noticeable issue is relating to elements within the Javascript code, specifically with the dynamic loading. Unfortunately some input fields do not print onto the screen such as the acronym objects, as well as the illustrations for the dark and light themes that are inside the task and acronym cards. Once again, time and skill limitations meant I was not able to fix these issues, however it is an area I would want to fix soon. 

## Lessons and Conclusion
Ultimately, my conceptualisation of StudBud delivers the main features I intended to create from past assignments, and provided me the opportunity to strengthen my coding abilities. The process was definitely filled with moments of frustration, but I also learnt that I am capable of creating a functional web app and challenging myself in relation to coding and programming, a field of design that had previously been a big weakness of mine. 

While this web app is only a university assignment, I would also greatly appreciate any advice and feedback, particularly in regards to the limitations mentioned above. StudBud is definitely a project I would love to expand upon, especially without the presence of deadlines. 

## References 
Bardo, N. (2020). 15 Daily Activities to Improve Your Mental Health. Retrieved from https://itsallyouboo.com/daily-activities-to-improve-mental-health/

Carabello, JE. (2018). The 12 Best Ways to Spend a Mental Health Day (According to a Therapist). Retrieved from https://www.talkspace.com/blog/12-best-ways-spend-mental-health-day-according-therapist/ 

Mental Health Match. (2020). 101 Inspiring Mental Health Quotes. Retrieved from https://mentalhealthmatch.com/articles/anxiety/inspiring-mental-health-quotes

Payenda, B. (2020). To Do App Using HTML, CSS and JavaScript (Drag & Drop) [Video File]. Retrieved from https://www.youtube.com/watch?v=m3StLl-H4CY&list=LL&index=21&t=923s 

Traversy Media. (2021). Build a Music Player | Vanilla JavaScript [Video File]. Retrieved from https://www.youtube.com/watch?v=QTHRWGn_sJw&t=1376s

W3Schools. (2022). How To - CSS/JS Modals. Retrieved from https://www.w3schools.com/howto/howto_css_modals.asp