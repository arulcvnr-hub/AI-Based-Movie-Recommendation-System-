AI-BASED MOVIE RECOMMENDATION SYSTEM
====================================

PROJECT DESCRIPTION
-------------------

This project is a responsive AI-Based Movie Recommendation System
developed using HTML, CSS, and Vanilla JavaScript.

The application allows users to search for movies, view trending
movies, filter movies by genre, rating, and year, view movie details,
and save favorite movies in the browser.

Movie information and poster images are fetched from the TMDB API.

TECHNOLOGIES USED
-----------------

- HTML5
- CSS3
- Vanilla JavaScript
- TMDB API
- LocalStorage
- CSS Grid
- CSS Flexbox
- Responsive Web Design

MAIN FEATURES
-------------

- Responsive dark-themed user interface
- Movie search functionality
- Trending movies section
- Recommended movies section
- Genre filtering
- Rating filtering
- Release-year filtering
- Movie details modal
- Favorite movie functionality
- Favorite movies saved in LocalStorage
- Loading animation
- Error messages
- Responsive layout for mobile, tablet, and desktop
- Movie poster images
- Smooth hover effects and animations

PROJECT FILES
-------------

AI-Movie-Recommendation-System/
|
|-- index.html
|-- style.css
|-- script.js
|-- README.txt
|
|-- images/
    |-- hero-background.jpg
    |-- logo.png

FILE DESCRIPTION
----------------

index.html
Contains the structure of the movie recommendation website.

style.css
Contains the website design, colors, layout, responsive styles,
animations, buttons, movie cards, and modal styles.

script.js
Contains the movie API requests, search functionality, filters,
recommendations, favorites, LocalStorage, and movie details modal.

images/hero-background.jpg
Used as the background image for the hero section.

images/logo.png
Used as the website logo or brand image.

IMAGES USED
-----------

This project uses two main custom images:

1. hero-background.jpg

   This image is used in the hero section of the website.
   It should be a cinematic, movie theater, film, or entertainment
   background image.

   Recommended size:
   1920 x 900 pixels

2. logo.png

   This image is used as the CineMind website logo.
   It should preferably have a transparent background.

   Recommended size:
   300 x 100 pixels

Movie poster images are loaded automatically from the TMDB API.

TMDB API SETUP
--------------

To use movie data and poster images, you need a TMDB API key.

1. Visit:

   https://www.themoviedb.org/

2. Create a free account.

3. Open your account settings.

4. Select the API option.

5. Create an API key.

6. Open the script.js file.

7. Find the following line:

   const API_KEY = "YOUR_TMDB_API_KEY";

8. Replace it with your personal API key.

Example:

   const API_KEY = "123456789abcdef123456789";

Do not share your API key publicly.

HOW TO RUN THE PROJECT
----------------------

1. Download or clone the project files.

2. Make sure the following files are available:

   - index.html
   - style.css
   - script.js
   - images/hero-background.jpg
   - images/logo.png

3. Add your TMDB API key inside script.js.

4. Open index.html in a web browser.

For the best experience, use Visual Studio Code with the Live Server
extension.

HOW THE SYSTEM WORKS
--------------------

The user can search for a movie by entering its name in the search bar.

The application sends a request to the TMDB API and displays movie
results with:

- Movie poster
- Movie title
- Release year
- Rating
- Movie description
- Genre information

Users can also select filters such as genre, rating, and release year.

When a user clicks on a movie card, a details popup appears with more
information about the selected movie.

FAVORITES
---------

Users can add movies to their favorites by clicking the heart icon.

Favorite movies are saved in the browser using LocalStorage. This
means the favorites will remain available after refreshing the page.

To remove a movie from favorites, click the heart icon again.

RESPONSIVE DESIGN
------------------

The website supports:

- Desktop computers
- Laptops
- Tablets
- Android phones
- iPhones

The movie cards, navigation menu, search bar, filters, and modal window
automatically adjust to different screen sizes.

IMAGE RECOMMENDATIONS
---------------------

Use high-quality images for the project.

Recommended image websites:

- https://unsplash.com/
- https://pexels.com/
- https://pixabay.com/

The hero background image should be dark and cinematic so that the
website text remains easy to read.

TMDB movie poster images are loaded automatically through the TMDB API.

ERROR HANDLING
--------------

The application displays a message when:

- The API key is missing.
- The search field is empty.
- No movie is found.
- The API request fails.
- The internet connection is unavailable.
- A movie poster is not available.

FUTURE IMPROVEMENTS
-------------------

Future improvements may include:

- User registration and login
- Watchlist feature
- Movie trailer support
- Actor and director search
- User reviews and ratings
- Light and dark theme switcher
- Multiple language support
- Voice search
- Advanced artificial intelligence recommendations
- Movie streaming links

API CREDIT
----------

This project uses the TMDB API but is not endorsed or certified by
TMDB.

Movie data and movie images are provided by:

The Movie Database (TMDB)
Website: https://www.themoviedb.org/

AUTHOR
------

Project Name:
AI-Based Movie Recommendation System

Developed Using:
HTML, CSS, and Vanilla JavaScript

Project Type:
Frontend Web Development Project

LICENSE
-------

This project is created for educational purposes.

Please follow the TMDB API terms of use when using movie data and
movie poster images.
