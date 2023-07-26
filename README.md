# Asset Vistas

## Table of Contents

---

- [Description](#description)
- [Deployment Link](#deployment-link)
- [Code Installation Guide](#code-installation-guide)
- [Timeframe & Working Team](#timeframe--working-team)
- [Technologies Used](#technologies-used)
- [Brief](#brief)
- [Planning](#planning)
- [Build Process](#build-process)
- [Challenges](#challenges)
  - [Switching Api Services and Troubleshooting Issues](#switching-api-services-and-troubleshooting-issues)
  - [D3.js Line Graph Rendering with IEX Cloud Historical Data](#d3js-line-graph-rendering-with-iex-cloud-historical-data)
  - [Implementing Circles and Tooltips on the D3.js Line Graph](#implementing-circles-and-tooltips-on-the-d3js-line-graph)
  - [TotalValue and PriceChange Implementation](#totalvalue-and-pricechange-implementation)
- [Wins](#wins)
- [Key Learnings & Takeaways](#key-learnings--takeaways)
- [Bugs](#bugs)
- [Future Improvements](#future-improvements)
  - [Features](#features)
  - [Engineering Excellence](#engineering-excellence)

## Description

---

Diving headfirst into the culmination of my GA SEI journey, I built a MERN stack application, Asset Vistas, the Investment Portfolio Tracker. With no formal background in economics or investments, I braved the challenge of creating a data-driven, user-centric application, designed to aid users in managing their investment portfolios. Pulling real-time data from third-party APIs and using D3.js for data visualisation, I overcame steep learning curves to deliver a user experience that marries functionality with aesthetics. This application is a testament to my ability to adapt, learn rapidly, and harness new technologies, making this an embodiment of my development philosophy and passion for web development.

![Dashboard gif](/src/assets/readme/dashboardherogif.gif)
![Dashboard](/src/assets/readme/dash.png)

## Deployment Link

---

https://assetvistas-778bebda714a.herokuapp.com/

## Code Installation Guide

---

To get this project up and running locally on your machine, please follow the steps outlined below.

Pre-requisites
Ensure that you have the following installed on your machine:

- Node.js (v14 or newer)
- NPM (v7 or newer)
- MongoDB (v4 or newer)

You will also need to create a free account at IEX Cloud to access their finance API. After setting up your account, make a note of your API keys as you'll need to input them into the environment variables.

**Step 1: Clone the repository**

Begin by cloning the repository to your local machine. You can do this by running the following command in your terminal:

```bash
git clone https://github.com/louraff/asset-vistas.git
```

**Step 2: Navigate to the project directory**
Switch to the project directory by entering the following command in the terminal:

```bash
cd asset-vistas
```

**Step 3: Install dependencies**
Next, install the required dependencies by executing the following command in the terminal:

```bash
npm install
```

This command will install all dependencies listed in the package.json file.

**Step 4: Setting up Environment Variables**
Now, you'll need to set up some environment variables. Create a new file in the root directory of the project named .env. In this file, add the following lines:

```bash
DATABASE_URL=your_db_url
SECRET=your_secret
REACT_APP_IEX_API_KEY=your_api_key
REACT_APP_ALPHA_API_KEY=your_api_key
```

**Step 5: Starting the server**
To start the server, enter the following command:

```bash
npm start
```

```bash
nodemon server
```

Your local server should now be running at http://localhost:3000.

**Step 6: Accessing the app**

Finally, you can access the application in your web browser at http://localhost:3000.

Congratulations! You now have the Asset Vistas application running locally on your machine.

For any issues during installation, please submit an issue on the GitHub page.

## Timeframe & Working Team

---

Venturing solo, I developed this investment portfolio MERN stack application from scratch in an intensive one-week sprint, demonstrating my ability to self-manage, make efficient decisions and deliver within a tight timeframe.

## Technologies Used

---

I dove headfirst into a colourful array of technologies as if I stumbled upon a treasure trove of developer goodies. Brace yourself for the grand unveiling of the incredible toolkit I wielded to conjure up this dynamic and user-friendly application. Behold the lineup:

**Front End:**

- React.js: My maestro, conducting an efficient component-based architecture.
- Chart.js, D3.js, and react-chartjs-2: Crucial for data visualisation, enabling users to interact with data effectively.
- @mui/material and @mui/icons-material: Leveraged to enhance UI and UX design.
- react-bootstrap and reactstrap: Provided a robust, responsive framework for building a modern, sleek UI.
- react-fontawesome and @fortawesome/react-fontawesome: Enhanced the UI with scalable vector icons.

**Back End:**

- Express.js: Facilitated routing, middleware, and API functionality.
- Mongoose: Used for modelling and managing application data using MongoDB.
- bcrypt: Ensured security by hashing and salting user passwords.
- JSON web token: Implemented JWT for stateless, secure authentication.

**APIs and Libraries:**

- Axios: Facilitated promise-based HTTP requests to external APIs.
- Alpha Vantage API and Cloud IEX API: Sourced real-time financial market data.

**Development Tools:**

- Trello: Kept project organisation on track with card-based task management.
- Lucid.app: Crafted Entity Relationship Diagrams for database planning.
- Excalidraw: Drafted intuitive wireframes for UI planning.
- Dotenv: Handled environment variables for secure project configuration.
- Morgan: Simplified logging for easier troubleshooting during development.
- JSON: Used for transmitting data between server and application.

**Node.js Dependencies**

- Ag-grid-community and ag-grid-react: Supported interactive table elements for data display.
- Moment: Handled date and time manipulations.
- Uuid: Generated unique identifiers where necessary.
  Serve-favicon: Managed favourite icons for the application.

## Brief

---

For my capstone project, I was tasked with the following technical requirements:

- To create a fully-functioning, full-stack, single-page application hosted on Heroku.
- To craft a MERN-stack application, incorporating MongoDB/Mongoose, Express, React, and Node.
- To style an interactive front-end that would dazzle users and keep them engaged.
- To facilitate communication between the Express backend and the front end via AJAX.
- To implement token-based authentication, allowing users to sign-up, login, and log out.
- To ensure user authorisation, restrict CRUD data functionalities to authenticated users. Additionally, the application's navigation should respond to the user's login status.
- To maintain a well-scoped feature set. Although full-CRUD data operations were not mandatory, the application needed to incorporate one or more advanced features, such as consuming data from a third-party API, implementing additional functionalities for admin users, realising a highly dynamic UI or data visualisation, or integrating other complexity/features approved by the instructor.

## Planning

---

In the planning phase of my investment portfolio tracking application, I jumped headfirst into the world of economics and investment, a domain quite alien to me until now.

I dove into resources like Investopedia, Yahoo Finance, and Morningstar, soaking up knowledge from articles, blog posts, and educational videos and ChatGPT became my tutor. I felt like a sponge in a sea of investment jargon, slowly expanding with new-found wisdom. Ideas such as portfolio diversification and asset allocation weren't just theoretical concepts anymore but concrete pillars upon which I'd build my app.

This was a journey towards creating a user-friendly application that would be a powerhouse of insightful data for the user, without overwhelming them. Like a skilled sculptor, I envisaged chiselling a dashboard where users could see key indicators at a glance - total portfolio value, total number of assets, allocation percentages, historical performance, and more.

![Project Wireframe](/src/assets/readme/a-dash.png)

My wireframes mapped out (clockwise from the top left) the Dashboard, Signup, Login, Add Assets and My Assets pages, with the final frame and imagining of the edit asset functionality.

![Modal](/src/assets/readme/modal.gif)

To keep my sanity intact amidst this information explosion, I turned to Trello, my trusted companion for project management. User stories neatly filed into 'MVP', ‘Stretch Goals’, and 'Completed' columns provided a clear roadmap for my project while ensuring that the scope didn't run wild.

Now, here's where the fun really began: harnessing the power of D3.js. My intention when practising with this library was to create visual candy, however, at this stage, I hadn’t yet succeeded at making graphs and pie charts that looked as good as they were functional. But we got there in the end. I admit, when I finally got a D3.js line chart to render with my dummy data, I felt like a million bucks. The joy of coding is truly exceptional, delivering highs that stand in a league of their own. It was a moment of pure triumph.

Behold my pride and joy: my first D3.js graphs… (just a small note on the image below- I was drinking a Coke when I created the user).

![Draft Graphs](/src/assets/readme/draftgraph.png)

Initial planning led me down the path of Bootstrap templates, but I soon discovered that creating smaller, custom components granted me more control over styling. I had a clear vision for how I wanted the application to look and feel and I wasn’t ready to compromise - a revelation that led me to experiment with other Bootstrap libraries.

API selection was another round of roulette where my planning didn’t quite cut the mustard when it came to the nitty gritty of coding and testing the API on my Dashboard. I ended up jumping from Alpha Vantage to TwelveData, finally hitting the jackpot with the IEX Cloud API for historical data. This journey was a schooling on how important it is to consider API credit allowances.

Planning the integration of third-party API data into my database was like playing chess with an invisible opponent. It involved thorough research, brainstorming, and a generous helping of trial and error along the way. The Entity Relationship Diagrams (ERDs) I created served as my chessboard, giving me a clear picture of data relationships.

![EDR](/src/assets/readme/AssetEDR.png)

My coding strategy was as methodical as a seasoned detective building a case. My plan began with user authentication, gradually moving on to fetch asset data from the API, updating the portfolio value, and pie charts, and finally managing assets. I decided to dedicate half my time to backend logic, with the other half assigned to frontend work, a balanced diet for a well-rounded project.

Looking back, the planning phase was an exhilarating roller coaster ride filled with learning, exploration, and key decisions. The challenges I faced were the loop-the-loops, the knowledge I gained was the exciting speed, and the careful planning was the secure harness keeping it all together.

## Build Process

---

Think of building this project as solving a jigsaw puzzle - each piece, seemingly insignificant on its own, coming together to form a cohesive picture. That picture, in this case, is a user-friendly investment portfolio app.

Models and Client-side Routes:
I kicked things off by setting up MongoDB to store user data, and defining the models and client-side routes. Much like the corner pieces of a puzzle, these laid the groundwork for everything else. In the React routes, I ensured seamless navigation for users. Here's a snapshot of how I defined the models:

User Authentication:
Next up was user authentication, essentially our bouncer at the door, ensuring only the right folks got in. Using bcrypt for password hashing and JWT for token generation, I safeguarded access to portfolio data. A nifty sign-up and login form on the front end, complete with error messages, handled the onboarding, while the auth token was securely stored in the user's browser.

###### controllers/users.js

![code](/src/assets/readme/a1.png)
![code](/src/assets/readme/a2.png)

Data Integration:
Real-time data from IEX Cloud API added depth and dynamism. Server-side logic fetched asset data, and portfolio values are constantly updated with the latest data.

Dashboard:
The puzzle's central image started forming with the dashboard, a central hub offering a snapshot of key indicators. By leveraging user portfolio data, I calculated the total value and designed a line chart to show portfolio growth. I also created four cards showcasing the highest value asset, highest growth, total number of assets and highest loss assets. Here's a snippet of the card creation in Dashboard.jsx:

![code](/src/assets/readme/a3.png)

Asset Management:
Giving users the tools to add, update or remove assets from their portfolios was the next piece of the puzzle. Much like deciding which piece goes where users can customise their portfolio based on their personal investment strategies. This code snippet below is defining a callback function called handleEditCellChangeCommit, which is used to handle cell edits in the DataGrid component. The DataGrid is a part of the Material-UI library and is used to display and edit tabular data.

###### AssetTable.jsx

![code](/src/assets/readme/a4.png)
![Modal](/src/assets/readme/modal.gif)

Asset Allocation:
Finally, using D3.js, I pieced together a pie chart (pun fully intended) showcasing sector allocations. As the portfolio updated, the chart dynamically adjusted, providing a constant visual aid for the user's investments. Here's a glimpse into the asset allocation pie chart:

###### Dashboard.jsx (inside useEffect)

![code](/src/assets/readme/a5.png)

###### PieChart.js

![code](/src/assets/readme/a6.png)
![code](/src/assets/readme/a7.png)

![Pie Chart](/src/assets/readme/pietooltip.gif)

Responsive UI:
Now that the borders of the puzzle were forming, it was time to fill in the middle, ensuring the app was as easy on the eyes as it was to use. Bootstrap came to the rescue for quick responsiveness, and custom CSS sprinkled in a touch of personality. The aim was a well-rounded user experience across devices.

![Dynamic Navbar](/src/assets/readme/navbar.gif)

In the end, building a MERN stack application was a lot like piecing together a puzzle. There's a method to the madness, a certain charm in seeing disparate parts come together, and the satisfaction of stepping back to admire the completed work. As you navigate through my application, I hope you appreciate the careful thought and problem-solving that went into each 'piece'. Now, who's up for another puzzle?

## Challenges

---

Software development often presents interesting obstacles and, in the spirit of learning and growth, this section elaborates on the challenges I encountered while building Asset Vistas. Each section walks through a problem statement, the steps I took to solve it, and the insights gleaned from the experience.

### Switching Api Services and Troubleshooting Issues

While building the 'Add Asset' feature of my MERN stack investment portfolio tracker, I faced a challenge with my implemented twelvedata API. It was supposed to allow users to search for their ticker symbol but didn't provide enough free credits for consistent use. I decided to switch to the Alpha Vantage symbol search API and this led to a series of problem-solving endeavors.

![Add Asset Gif](/src/assets/readme/addasset.gif)

**Step 1: Implementing the Alpha Vantage API**

My first task was to replace the twelvedata API with the Alpha Vantage API. However, this transition wasn't seamless. The initial hiccup was an error message:

```bash
 Refused to set unsafe header "User-Agent"
```

I researched this error message on StackOverflow and found that it originates from a browser restriction, preventing JavaScript from setting certain request headers like "User-Agent" and "Referer" to maintain user privacy. To resolve this, I set the header to empty curly brackets, as suggested by a few developers in the forum threads.

**Step 2: Debugging the Rendering of Suggestions**

The next hurdle was the appearance of empty bullet points when entering letters into the ticker field of the Add Asset form. After reading over my code and the API documentation, I realised this was due to incorrect handling of the API response and rendering of suggestions. The SYMBOL_SEARCH function of the Alpha Vantage API returns an array of matches, each containing information such as '1. symbol', '2. name', '3. type', etc.

I understood that my getTickerSuggestionValue and renderTickerSuggestion functions were not correctly managing this data structure. Hence, I updated them to correctly retrieve and display the symbol and the name of the company:

![code](/src/assets/readme/a8.png)

**Step 3: Refactoring the Suggestions State Function**

Next, I refactored the function where I set the ticker suggestions in the state. This was vital to ensure that the ticker suggestions get updated with the correct information from the Alpha Vantage API:

##### NewAssetForm.jsx

```javascript
getTickerSuggestions = async (value) => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${process.env.REACT_APP_ALPHA_API_KEY}`,
      {
        headers: {},
      }
    );

    if (response.data) {
      this.setState({ tickerSuggestions: response.data.bestMatches });
    }
  } catch (error) {
    console.log("Ticker API error:", error);
  }
};
```

** Step 4: Solving the Undefined Prop Issue**

Despite these updates, when I attempted to enter a ticker in the input field, I encountered another error:

Warning: Failed prop type: The prop `suggestions` is marked as required in `Autosuggest`, but its value is `undefined`.

To uncover the cause of this issue, I revisited the Autosuggest component documentation and scoured coding forums. It emerged that the 'suggestions' prop in the Autosuggest component was required but, at some point, its value was 'undefined'.

To fix this, I updated the getTickerSuggestions function to ensure it always sets tickerSuggestions to an array:

![code](/src/assets/readme/a9.png)

With this modification, the ticker input field began functioning as expected. I was now able to enter letters in the ticker input field and select from a list of suggestions that appeared.

**Thoughts**

This challenge has bolstered my proficiency in handling and managing APIs and has provided me with deeper insights into the role of 'User-Agent' headers in maintaining privacy, the intricacies of managing the state in React, and the usage of the Autosuggest component.

Moreover, I have deepened my understanding of how to navigate and interpret API documentation, a skill that was crucial in resolving the rendering issue with suggestions.

The process of resolving the 'undefined prop' error has further reinforced the importance of robust error handling. It taught me to consider all possible edge cases to ensure that the application continues to run smoothly under any circumstances.

### D3.js Line Graph Rendering with IEX Cloud Historical Data

A significant challenge I faced during this project was rendering a D3.js line graph using historical stock data fetched from the IEX Cloud API.

**Step 1: Identifying the Problem**

The initial hurdle was noticing that the historical data passed to the LineGraph component wasn't structured as it should be. I initially became aware of this requirement by studying the D3.js documentation in-depth, which detailed the expected data structure for rendering line graphs. Armed with this knowledge, I decided to log the data before passing it to the component:

```javascript
console.log("Historical data:", historicalData);
return (
  <>
    <h1>Dashboard</h1>
    <PieChart data={sectorAllocations} />
    <h2>{user.name}'s Portfolio</h2>
    <LineGraph data={historicalData} />
  </>
);
```

The console log showed {datetime: undefined, value: NaN}, suggesting that there was an issue either with the data format returned from the API call or the subsequent data processing.

**Step 2: Debugging the API Response**

Next, I decided to look at the actual data returned from the fetchHistoricalData function. I thought it would be a good place to start since the structure of the data received could be the root of the problem. To get a clear view of the response from the API, I logged it:

```javascript
try {
  const response = await axios.get(url);
  console.log("From historicalData-api.js response.data:", response.data);
  return response.data;
} catch (err) {
  console.error("Failed to fetch historical data from API ", err);
  throw err;
}
```

The console logged From historicalData-api.js response.data: [object Object], indicating that the response data was an object. However, the D3.js documentation and my code expected an array of objects. This gave me a strong hint about the mismatch in the data structure.

**Step 3: Understanding and Handling the Data**

After discovering the nature of the returned data, I looked up the IEX Cloud API documentation to understand how it returned historical data. It showed me that the data was indeed returned directly as an array.

So, I updated the function fetchAndCalculateAssetValues to handle the data as an array:

##### Dashboard.jsx

![code](/src/assets/readme/a10.png)

**Step 4: Matching the Data Fields**

After adjusting the handling of the API response, my next task was to ensure that the data fields matched what my LineGraph component expected. I dug deeper into the IEX Cloud API documentation, which showed that the fields I needed were 'close' for the closing price and 'date' for the date.

With this information, I restructured the pointData object to match these fields:

##### Dashboard.jsx

![code](/src/assets/readme/a11.png)

**Step 5: Verifying the Solution**

After making these adjustments, I logged the historical data for each asset:

```javascript
Historical data for IBM: [
    {date: "2023-01-01", close: 100},
    {date: "2023-01-02", close: 120},
    // and so on...
]
```

The console output was now aligned with my expectations and the D3.js LineGraph component rendered correctly.

**Thoughts**

This challenge drove home the importance of understanding the structure and format of data when working with APIs. Logging and debugging were instrumental in identifying and rectifying the issues. Additionally, a thorough understanding of the structure of the component that was expected to consume the data was essential.

### Implementing Circles and Tooltips on the D3.js Line Graph

I managed to code tooltips to appear when the mouse hovers over the plotted line, displaying the total value of the portfolio then. Due to the thinness of the graph line, it was challenging to hover the mouse accurately to display the tooltip. So, I decided to add dots or circles at certain points in the graph that would allow the user to easily hover over the circle to see the value of the portfolio. However, the dots were pulling a no-show, which was seriously impairing the user interaction I envisioned.

**Step 1: Don’t go dotty over dots**

Initially, I was confused as to why the dots were not visible on the graph. I had written the code that should have positioned them correctly, but they were mysteriously absent. After taking a break and returning to the problem with a fresh mind, I realised I had overlooked a simple error - the opacity of the dots was set to zero. This resulted in them being invisible. Increasing the opacity to one in the style attribute resolved this issue:

##### LineGraph.js (adjusted opacity to 1)

![code](/src/assets/readme/a12.png)

**Step 2: Filtering Dots for Each Month**

![Warty Graph](/src/assets/readme/wartgraph.png)

While I now had visible dots on the graph, they were plotted for every data point and made the graph look warty, to say the least- not a good look.
To enhance the graph's clarity and user interaction, I wanted to limit the dots to the start of each month. However, I was unsure of how to implement this. So, I embarked on a research mission and found a helpful thread on Stack Overflow. From this, I learnt about the concept of filtering the data to include only the first (or last) data point of each month.

I implemented this by creating a new array to store the monthly data and iterating over the original dataset. This allowed me to compare each data point's month with the previous one added to the monthlyData array. If the data point was the first or if its month was different from the last added data point, it would be pushed into the monthlyData array.

##### LineGraph.js

![code](/src/assets/readme/a13.png)

// using monthlyData instead of data to plot my dots
![code](/src/assets/readme/a14.png)

This approach ensured that the dots were placed only at the points where the line intersects each new month on the x-axis.

**Thoughts**

With these changes, the graph was significantly improved. It was not only more visually appealing but also more interactive and intuitive. The addition of visible dots marking the start of each month enhanced the usability of the tooltips, thus augmenting the overall user experience.

![Line Graph Tooltips](/src/assets/readme/linetooltipgif.gif)

### TotalValue and PriceChange Implementation

In the final phase of the MERN stack investment portfolio tracker development, I embarked on the mission to implement a stretch goal, which was to add two additional features to the Asset Table. Specifically, I aimed to introduce the 'totalValue' and 'priceChange' columns, enhancing the comprehensibility of each asset's performance. The Asset Table, being an integral part of the application, resided both on the Dashboard and the 'My Assets' page at this point.

**Step 1: Tripping Over TotalValue**

The challenge struck when the 'totalValue' of assets started displaying accurately on the Dashboard page but persistently showed up as £0 on the 'My Assets' page. Given that the same table component was being utilised in both instances, this inconsistency was initially puzzling.

To troubleshoot this, I decided to dive into the depths of online forums and communities like StackOverflow. I came across a thread with a similar issue, prompting me to examine how my state was being managed across these two instances of the Asset Table. Further probing revealed that the 'totalValue' was being calculated within the Dashboard component but wasn't being preserved in the data source (or state) that the Asset Table could access. Consequently, the calculated value wasn't directly accessible by the Asset Table on the 'My Assets' page, causing it to display as £0.

**Step 2: Assessing the Situation**

Given the looming deadline for the project, I needed to make a strategic decision. The resolution of this issue needed a more in-depth exploration of React state management and prop-drilling, which was a more significant time investment than I could afford at that stage (all puns intended). After considering this issue and discussing it with my project mentor, I decided to eliminate the 'My Assets' page and let the Dashboard be the sole bearer of the Asset Table. This was a tough decision, but essential in maintaining the standard of the application. Having the Asset Table on the 'My Assets' page without the 'totalValue' and 'priceChange' columns would have presented an inconsistent and potentially misleading picture to the user, something I wanted to avoid.

**Thoughts**

Looking back, this challenge taught me an invaluable lesson about state management and data flow in a React application. Especially the importance of ensuring proper data propagation across components.

## Wins

---

**The Visuals**

My proudest win is the design of the project. The application's interface presents data and insights in an easily digestible, yet visually appealing manner, that doesn't overwhelm the user. The blend of the colour scheme and the animated elements of the line graph, pie chart, and navigation bar certainly make you sit up and take notice. I mean, isn't that graph just drool-worthy?

![Dashboard gif](/src/assets/readme/dashboardherogif.gif)

**Scaling the Learning Mountain**

Coming from a language background, I knew my journey into the realm of investment and economics wouldn't be a cakewalk. Especially with a MERN stack project that required me to learn D3.js and Bootstrap. But I am not known for shying away from a challenge. It was a steep curve, but the triumph of rendering that first line graph was my 'Rocky on top of the steps' moment. The rush of nailing a piece of code? Better than a triple espresso.

**Self-Management**

A project sprint can easily turn into a burnout marathon, but I've been able to maintain a steady pace throughout the development. It's not just about working hard but also about working smart. I'm quite proud of my resilience and my ability to manage my work effectively.

**The Glorious Code Freeze**

In this wild ride of a project, I implemented a code freeze a day before the end. Best. Decision. Ever. Splitting my week between the backend and front end, I encountered a surprising twist when none of my CRUD functionality was working during the testing phase on code freeze day! Luckily, with a full day in hand, I could wrestle those bugs into submission.

**Harnessing the Power of GPT**

Last but not least, a massive shoutout to ChatGPT! This AI wonder significantly sped up my ability to unblock myself, helped me master new libraries, and supercharged my efficiency. Without its support, I would not have been able to get as far as I did with my project. Here's to streamlined coding with ChatGPT - a real game-changer.

## Key Learnings & Takeaways

---

Developing this Investment Portfolio application has been one hell of a journey. The numerous technical and non-technical lessons that I have gathered are invaluable and have significantly contributed to my growth as a software engineer.

**Technological Proficiency**

I have gained considerable confidence in React as a result of this project. I've gained a deep understanding of its nuances, particularly in the use of hooks like useRef, useNavigate, useEffect, and useState. useRef really came into its own when it came to manipulating D3.js elements in the DOM. These hooks have revolutionised the way I handle state and side effects in my applications, and navigate users through the application.

This project also introduced me to D3.js, my new best mate. My pride and joy. Despite it being outside my comfort zone, I have been able to leverage its features for data processing from APIs, all thanks to effective learning strategies and tools.

**Project Architecture and Management**

I've learned that laying out a clear project architecture from the onset is paramount. I realised that careful consideration of state management and feature coding in the initial stages leads to a smoother development process and fewer unexpected issues further down the line.

Implementing code freezes towards the end of the development cycle was also a critical takeaway. Like a band trying to squeeze in one more encore, it's tempting to keep adding features right up to the wire. But let's face it, all that's going to do is turn you into a caffeine-fuelled code zombie, banging out keystrokes at 3 AM and racing the sunrise to presentation day. Incorporating the code freeze allowed me to focus on debugging and resolving issues (and boy did I need it) without the added complexity of new features, not to mention a sound night’s sleep before the deadline, leading to a pretty polished final product.

**Documentation Proficiency**

The importance of thoroughly understanding documentation, whether for an API, a Bootstrap element (shoutout to MaterialiseUI) or a JS library (D3.js I’m looking at you), has been another key learning. I've come to appreciate well-written documentation as an invaluable resource for implementing and troubleshooting features.

**Harnessing the Power of ChatGPT**
ChatGPT has been an essential part of this learning journey, serving as a virtual mentor:

- Guiding through Documentation: Whenever I felt lost in documentation, ChatGPT was there to steer me in the right direction, increasing the efficiency of my research.
- Explaining Errors and Debugging: When faced with tricky errors or bugs, ChatGPT served as an interpreter, explaining what error messages meant, suggesting what to log, and generally aiding in swift resolution.
- Teaching Rather Than Doing: I learned to use ChatGPT as a teaching tool, asking it to explain concepts rather than write code for me. This approach ensured a deeper understanding of the underlying concepts and faster implementation.
- Recommending Resources: When I found myself blocked, I could ask ChatGPT to recommend useful resources, thus accelerating problem-solving.
- Learning New Technologies: When I was grappling with D3.js, ChatGPT served as a private tutor, explaining documentation, providing examples, and answering queries. This support greatly sped up my learning process and bolstered my confidence.
- Code Reviews: I also used ChatGPT for syntax error identification during code reviews. Its fast and accurate detection greatly streamlined the debugging process.
- Brainstorming: ChatGPT even contributed to the creative aspect of the project by helping me come up with a catchy slogan: "Your Wealth. Your Landscape"

Is it just me who can’t help to be ridiculously polite to chatGPT??

This project has been a pivotal point in my journey as a software engineer. The lessons learned, both technical and non-technical, have significantly shaped my problem-solving approach and project management skills. These insights will continue to guide me as I tackle future projects, further honing my skills and contributing to my growth.

## Bugs

---

IEX Cloud API Data Shortage: At present, if the IEX Cloud API does not have historical data on a specific ticker, the app doesn't display an error message. I believe in giving feedback, even when it's bad news, so a prompt to inform the user is definitely in the works.

Duplicate Tickers in User Portfolio: Currently, users can add the same ticker multiple times to their portfolio. While this does not disrupt functionality per se, it may confuse users or skew their portfolio representation. Adding error handling to prevent or alert such duplicates is a priority. For now, users can rectify this manually by deleting any duplicated tickers.

Page Refresh Required for Asset Table Updates: At the moment, when changes are made to the asset table, a manual page reload is required to display updated insights. It's a bit old-school, I admit, and something that I'm planning to address. Automatic page updates are on the horizon! For now, I’ve added a snack bar popup to let users know to refresh the page for updated insights.

![Snackbar gif](/src/assets/readme/snackbardelete.gif)
![Edit gif](/assets/readme/re4fresh-page-demo.gif)

## Future Improvements

---

For all the blood, sweat, and tears that have gone into creating this Investment Portfolio tracker, there's always the "coulda, shoulda, woulda" list that sneaks up on you like a mid-life crisis. I will say that over the week of building this project, I was mainly pushing for feature development but I also care about code quality which I would like to address in this section. Here's what I'd take a swing at if I had a time-turner or if coffee suddenly started working as it does in cartoons:

### Features

- Bug Extermination: Like an episode of Starship Troopers, squashing bugs that pop up is always high on the list. This is my solemn vow to any unsuspecting user who encounters a bug in their quest for financial dominance.

- Improved API References: To make the Dashboard more user-friendly, I plan to add more references to the APIs and information used in the application. This will make it easier for users to understand and navigate the Dashboard.

- Asset-Specific Historical Data: I aim to allow users to click on an asset in the asset table and see a line graph that displays historical data exclusively for that asset. This targeted data view would provide users with more granular insights.

- Customisable Portfolio Performance View: I'd like to extend the capability of the application to display the performance of a user's portfolio over various periods. I plan on letting users compare their portfolio's performance against benchmark indices, thereby gaining a more holistic view of their investment performance.

- Risk Assessment: Calculating and displaying the portfolio's risk based on volatility, beta, and maximum drawdown is in the pipeline. Because we all need to know if we're living on the edge, right?

- News API: Adding relevant news for the assets in the portfolio via a third-party news API is on the cards. I would like to experiment with sentiment analysis on the news. Who knew our portfolios could read the news and have feelings?

- Future Portfolio Value Forecasting: Using historical data, I plan to implement a feature that would project the future value of the portfolio. This predictive tool would help users in making informed future investment decisions.

- Geographical Heatmap: I'm planning to add a feature that displays a heatmap of your investments' geographical distribution. Because who wouldn't want to say, "Darling, did I mention I have investments in the Cayman Islands?"

- Mobile Compatibility: Lastly, but far from leastly, I aim to make the app compatible with mobile phones. Because the only thing better than managing your wealth from your laptop is doing it from the comfort of... well, anywhere else!

### Engineering Excellence

- Tests including Continuous Integration, Deployment, and End-to-End Testing: I aim to expand my testing coverage, from unit tests to end-to-end tests, ensuring each component and functionality operates as expected. By integrating these tests into a CI/CD pipeline, I can catch issues early and automate the process of pushing code changes into production.

- Durability: I aim to enhance the durability of the application by implementing a robust data backup and recovery strategy. This will involve regular automated backups of the database and establishing procedures to recover data in the event of any loss or corruption.

- Observability: To achieve better monitoring and diagnostic capabilities, I plan to incorporate observability tools such as log management, error tracking, and performance monitoring into the application. This will allow me to swiftly identify and resolve any issues that may arise.

- Availability: High availability of the application is crucial for a seamless user experience. I plan to use load balancers and redundancy to ensure that the application remains accessible even in the event of server failures.

- DNS Name for Web: To make the application easily accessible to users, I intend to associate it with a DNS name. This will provide the app with a memorable web address and give it a professional appearance.
