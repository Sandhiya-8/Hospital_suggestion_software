***Hospital Suggestion System***
Hospital Suggestion System is a web application that helps users find nearby hospitals based on their current location and the medical problem they provide as input.

**Features**
Allows users to input their medical problem.
Utilizes Geolocation API to determine the user's current location.
Fetches nearby hospitals based on the user's location and medical problem.
Provides a list of hospitals along with their details like name, address, and distance.
Technologies Used


**Backend**: Node.js with Express.js
**Frontend**: React.js
**APIs**: Geoapify Places API, OpenAI API
**Other Dependencies**: dotenv, node-fetch

***Installation***
Clone the repository:
git clone <repository_url>

Install dependencies for the backend:

cd <repository_folder>/server
npm install

Install dependencies for the frontend:
cd <repository_folder>/Client
npm install

Create a .env file in the backend folder and add the following variables:
PLACES_API=<your_geoapify_places_api_key>
GPT_API=<your_gemini_api_key>
Replace <your_geoapify_places_api_key> and <your_openai_api_key> with your actual API keys.


***Usage***
**Start the backend server:**
cd <repository_folder>/server
node index.js

**Start the frontend development server:**
cd <repository_folder>/Client
npm start

Access the web application in your browser at http://localhost:3000.



***Implementation Steps***

Clone the repository to your local machine.
Install dependencies for both the backend and frontend using npm.
Obtain API keys for Geoapify Places API and Gemini ai api.
Create a .env file in the backend folder and add the API keys.
Start the backend server using "node index.js" in the backend folder.
Start the frontend development server using "npm start" in the frontend folder.
Access the web application in your browser at "http://localhost:3000".
Input your medical problem and click on the search button to find nearby hospitals.


