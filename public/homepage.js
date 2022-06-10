// these constants and variables are setting up the daily quote generator     
    const dailyQuote = document.querySelector(".daily-quote");
    var quotes = [
        '“You don’t have to control your thoughts. You just have to stop letting them control you.” — Dan Millman',
        '“One small crack does not mean that you are broken, it means that you were put to the test and you didn’t fall apart.” — Linda Poindexter',
        '“You can’t control everything. Sometimes you just need to relax and have faith that things will work out. Let go a little and just let life happen.” — Kody Keplinger',
        '“Emotional pain is not something that should be hidden away and never spoken about. There is truth in your pain, there is growth in your pain, but only if it’s first brought out into the open.” — Steven Aitchison',
        '“There is hope, even when your brain tells you there isn’t.” ― John Green',
        '“Life doesn’t make any sense without interdependence. We need each other, and the sooner we learn that, the better for us all.”  — Erik Erikson',
        '“I would say what others have said: It gets better. One day, you’ll find your tribe. You just have to trust that people are out there waiting to love you and celebrate you for who you are. In the meantime, the reality is you might have to be your own tribe. You might have to be your own best friend. That’s not something they’re going to teach you in school. So start the work of loving yourself." — Wentworth Miller',
        '“You don’t have to be positive all the time. It’s perfectly okay to feel sad, angry, annoyed, frustrated, scared and anxious. Having feelings doesn’t make you a negative person. It makes you human.” — Lori Deschene',
        '“There is a crack in everything, that’s how the light gets in.” ― Leonard Cohen',
        '"Promise me you’ll always remember — you’re braver than you believe, and stronger than you seem, and smarter than you think.” — Christopher Robin (Winnie the Pooh)',
        '“If you’re going through hell, keep going.” — Winston Churchill',
        '“In any given moment, we have two options: to step forward into growth or to step back into safety.” — Abraham Maslow',
        '“Don’t let your mind bully your body into believing it must carry the burden of its worries.” — Astrid Alauda',
        '"Do not save your best for when you think the material calls for it. Always bring your full potential to every take, and be on top of your job, or they will replace you." - Gabrielle Union',
        '"When your dreams are bigger than the places you find yourself in, sometimes you need to seek out your own reminders that there is more. And there is always more waiting for you on the other side of fear." - Elaine Welteroth',
        '"It’s no use going back to yesterday because I was a different person then." - Lewis Carroll',
        '“The gentlest reminder: You might not need to read another self-help book, attend another training, or bookmark another Instagram post as much as you need to listen to, trust, and practice what you already know. What if the answer you’re looking for is actually within you already?” — Lisa Olivera'
    ]

// these constants and variables are setting up the daily activity generator     
    const dailyActivity = document.querySelector(".daily-activity");
    var activities = [
        'Exposure to bright light first thing in the morning increases feelings of wakefulness. To clear away morning grogginess, try turning on a lamp or your bedroom lights, or take in some sunlight within the first 5 to 10 minutes of waking up in the morning.',
        'Instead of hopping out of bed abruptly or reaching for your phone, try allowing yourself time to wake up gradually. This will enhance feelings of tranquility for both mind and body, and reduce the changes of you going into auto-pilot.',
        'Take a couple minutes to jot down your goals for the day, and you won’t need to worry about forgetting to do anything on the list!. List-writing works by reducing chaos and lending structure to your day, as well as support for your memory. Keep it small, realistic, and focused–monitor negative self-talk and watch out for tasks that aren’t necessary or contribute to distraction.',
        'Walk Tall: Switch off your tech, put away your phones, and go back to the basics. A good book in a comfy rocking chair with a glass of your favorite drink can show you there is more to life than social media.',
        'Practice Good Sleep Hygiene: For many of us, the evenings are when all the not-so-great stuff tends to occur to us. Anxieties about work, personal issues or grief, or other emotional concerns tend to stake their claim on our evenings as we spend most of our days trying to fend off these ills. By making time earlier in the day to work through challenging emotional material, and leaving positive stuff for night time, we set up ourselves up for successful sleep.'
    ]


    newQuote();
    newActivity();

// the newQuote function calls a new quote from the array using the array.length and math.random functionalities,
// meaning each new user entry will call a new quote. this also means that i can add quotes in the future without
// having to edit this function, only the array 
    function newQuote() {
        var quoteGenerator = Math.floor(Math.random() * quotes.length);
        let newQuote = document.createElement("p");

        newQuote.innerText = quotes[quoteGenerator];
        dailyQuote.appendChild(newQuote);
    }

    
// the newActivity function calls a new activity from the array using the array.length and math.random functionalities,
// meaning each new user entry will call a new activity. this also means that i can add activities in the future without
// having to edit this function, only the array 
    function newActivity() {
        var activityGenerator = Math.floor(Math.random() * activities.length);
        let newActivity = document.createElement("p");

        newActivity.innerText = activities[activityGenerator];
        dailyActivity.appendChild(newActivity);
    }



