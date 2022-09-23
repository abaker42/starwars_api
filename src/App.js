import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	// const dummyMovies = [ //NO MORE DUMMY DATA
	//   {
	//     id: 1,
	//     title: 'Some Dummy Movie',
	//     openingText: 'This is the opening text of the movie',
	//     releaseDate: '2021-05-18',
	//   },
	//   {
	//     id: 2,
	//     title: 'Some Dummy Movie 2',
	//     openingText: 'This is the second opening text of the movie',
	//     releaseDate: '2021-05-19',
	//   },
	// ];
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMovieHandler = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch('https://swapi.dev/api/films');
			if (!response.ok) {
				throw new Error('Did not mean to do that!');
			}
			const data = await response.json();
			const transformMovies = data.results.map((movieData) => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseDate: movieData.release_date,
				};
			});
			setMovies(transformMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	};

	let content = <p>No Movies Found!</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Fetching Movies...</p>;
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMovieHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
