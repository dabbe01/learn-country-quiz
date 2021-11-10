import React, { useEffect } from 'react'
import * as R from 'ramda'
import { Link, Route, useLocation } from "wouter"
import { customAlphabet } from 'nanoid'
import './App.css'
import * as utils from './utils'
import countries from './countries'
import winning from '../assets/winning.png'
import dog from '../assets/dog.png'
import tie from '../assets/tie.png'
import * as featureFlags from './features'
import CookieConsentTemp, { getCookieConsentValue } from "react-cookie-consent";
const CookieConsent = CookieConsentTemp.default;
import { initGA, handleAcceptCookie, handleDeclineCookie } from './analytics';
import { Cookies } from './Cookies';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics, logEvent } from "firebase/analytics"
import { ref, getDatabase, set, update } from "firebase/database"
import { useObject } from 'react-firebase-hooks/database'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvxyz', 5)

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC2ADrSknLZmJcGU5OR-rrQOj5nGZs06RE",
	authDomain: "country-quiz-867e9.firebaseapp.com",
	databaseURL: "https://country-quiz-867e9-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "country-quiz-867e9",
	storageBucket: "country-quiz-867e9.appspot.com",
	messagingSenderId: "967534424377",
	appId: "1:967534424377:web:a620c0c0e6a2f97ef738e8",
	measurementId: "G-VNLGTV8JV1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;

const db = getDatabase(app);

function App() {

	useEffect(() => {
		const isConsent = getCookieConsentValue();
		if (isConsent === "true") {
			analytics = initGA(app);
			handleAcceptCookie();
		} else {
			analytics = null;
			handleDeclineCookie();
		}
	}, []);

	return (
		<div className="app">
			<div className="header">THE FLAG GAME</div>
			<div className="middle">
				<Route path="/">
					<StartPage>
						<Consent />
					</StartPage>
				</Route>
				<Route path="/game/:gameId/:playerId">
					{(params) => {
						return <GamePage gameId={params.gameId} playerId={params.playerId} />
					}}
				</Route>
				<Route path="/cookies">
					<Cookies />
				</Route>
			</div>
			<div className="footer"></div>
		</div>
	);
}

const Consent = () => {
	return (<CookieConsent enableDeclineButton onAccept={handleAcceptCookie} onDecline={handleDeclineCookie}>This website uses <Link href="/cookies" className="cookies">cookies</Link> to enhance the user experience.</CookieConsent>)
}

const StartPage = () => {
	const [snapshot, loading, error] = useObject(ref(db, 'nextGame'))
	const [location, setLocation] = useLocation();

	const moreFlagsFeature = JSON.parse(localStorage.getItem('features'))?.moreStartPageFlags.enabled;

	if (loading) return <div className="fw6 fs5">Loading...</div>
	const nextGame = snapshot.val()

	const play = async () => {
		if (R.isNil(nextGame)) {
			const updates = {}
			const gameId = nanoid()
			updates['/nextGame'] = gameId
			await update(ref(db), updates)
			setLocation(`/game/${gameId}/1`)
		}
		else {
			const game = utils.createGame()
			const updates = {}
			updates['/nextGame'] = null
			updates[`/games/${nextGame}`] = game
			await update(ref(db), updates)
			setLocation(`/game/${nextGame}/2`)

			await utils.sleep(3000)
			const updates2 = {}
			updates2[`/games/${nextGame}/status`] = 'playing'
			await update(ref(db), updates2)
		}
	}

	const shuffledFlags = utils.shuffle(Object.keys(countries).map(key => key.toLowerCase()));
	const flags = [];
	if (moreFlagsFeature) {
		for (let i = 0; i < 78; i++) {
			if (flags.includes(shuffledFlags[i])) {
				i--;
				continue;
			}
			flags.push(<div className="f32" key={shuffledFlags[i]}><div className={`flag ${shuffledFlags[i]}`}></div></div>)
		}
	}

	return (moreFlagsFeature
		? <div className="page">
			<div className="st-flags">
				{flags}
			</div>
			<div className="button btn-square" onClick={play}>Play</div>
			<Consent />
		</div>

		: <div className="page">
			<div className="st-flags">
				<div className="f32"><div className={`flag aze`}></div></div>
				<div className="f32"><div className={`flag bih`}></div></div>
				<div className="f32"><div className={`flag brb`}></div></div>
				<div className="f32"><div className={`flag swe`}></div></div>
				<div className="f32"><div className={`flag bgd`}></div></div>
				<div className="f32"><div className={`flag bel`}></div></div>
				<div className="f32"><div className={`flag bfa`}></div></div>
				<div className="f32"><div className={`flag bgr`}></div></div>
				<div className="f32"><div className={`flag bhr`}></div></div>
				<div className="f32"><div className={`flag bdi`}></div></div>
				<div className="f32"><div className={`flag ben`}></div></div>
				<div className="f32"><div className={`flag bmu`}></div></div>
				<div className="f32"><div className={`flag brn`}></div></div>
				<div className="f32"><div className={`flag bol`}></div></div>
				<div className="f32"><div className={`flag bra`}></div></div>
				<div className="f32"><div className={`flag bhs`}></div></div>
				<div className="f32"><div className={`flag btn`}></div></div>
				<div className="f32"><div className={`flag fra`}></div></div>
				<div className="f32"><div className={`flag bwa`}></div></div>
			</div>
			<div className="button btn-square" onClick={play}>Play</div>
			<Consent />
		</div>
	)
}

const GamePage = ({ gameId, playerId }) => {
	const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`))
	const [location, setLocation] = useLocation();

	if (loading) return <div className="fw6 fs5">Loading...</div>
	const game = snapshot.val()

	const cancel = async () => {
		const updates = {}
		updates['/nextGame'] = null
		await update(ref(db), updates)
		setLocation(`/`)
	}

	if (game && game.status === 'playing') return <QuestionPage gameId={gameId} playerId={playerId} />
	if (game && game.status === 'finished') return <ResultsPage gameId={gameId} playerId={playerId} />

	return (
		<div className="page">
			<div className="fw6 fs9 tac">
				{!game && 'Waiting for opponent...'}
				{game && game.status === 'starting' && 'Starting game... Get READY!'}
			</div>
			{!game && <div className="link" style={{ marginTop: '10rem' }} onClick={cancel}>Cancel</div>}
		</div>
	)
}

const QuestionPage = ({ gameId, playerId }) => {
	const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`))

	if (loading) return <div className="fw6 fs5">Loading...</div>
	const game = snapshot.val()

	const youKey = `player${playerId}`
	const opponentKey = `player${parseInt(playerId) === 1 ? 2 : 1}`

	const question = game.questions[`${game.currentQuestion}`]

	if (!question) return 'Loading...'

	const features = JSON.parse(localStorage.getItem('features'));
	const smartScore = features?.smartScore;

	console.log(features)

	const answer = async (countryCode) => {
		if (question.fastest) return

		const updates = {}
		updates[`/games/${gameId}/questions/${game.currentQuestion}/fastest`] = { player: playerId, answer: countryCode }
		if (countryCode == question.correct) {
			updates[`/games/${gameId}/score/${youKey}`] = game.score[youKey] + 1
		} else if (countryCode != question.correct && smartScore?.enabled) {
			updates[`/games/${gameId}/score/${youKey}`] = game.score[youKey] - 1
		}
		await update(ref(db), updates)

		if (game.currentQuestion < Object.values(game.questions).length) {
			await utils.sleep(3000)
			const updates2 = {}
			updates2[`/games/${gameId}/currentQuestion`] = parseInt(game.currentQuestion) + 1
			await update(ref(db), updates2)
		}
		else {
			await utils.sleep(3000)
			const updates2 = {}
			updates2[`/games/${gameId}/status`] = 'finished'
			await update(ref(db), updates2)
		}
	}

	return (
		<div className="page">
			<div className="f32"><div className={`flag ${question.correct}`}></div></div>
			<div className="alternatives">
				{Object.entries(question.alternatives).map(([k, countryCode]) => {
					let correct = null
					let youOrOpponent = false
					if (question.fastest && question.fastest.answer == countryCode) {
						correct = question.fastest.answer === question.correct
						if (question.fastest.player === playerId) {
							youOrOpponent = `YOU ${correct ? ' +1' : smartScore.enabled ? ' -1' : ''}`;
						}
						else {
							youOrOpponent = `OPPONENT ${correct ? ' +1' : smartScore.enabled ? ' -1' : ''}`;
						}
					}
					return (
						<div className={`button alt ${correct && 'alt-green'} ${correct === false && 'alt-red'}`}
							key={countryCode} title={countryCode} onClick={() => answer(countryCode)}>
							{countries[countryCode.toUpperCase()]}
							{ }
							{youOrOpponent && <div className="alt-label">{youOrOpponent}</div>}
						</div>)
				})}
			</div>
			{question.fastest && <div className="fs7 fw5 m9">Get ready for the next question...</div>}
			{question.fastest &&
				<QuickResults you={game.score[youKey]} opponent={game.score[opponentKey]} />
			}
		</div>
	)
}

const QuickResults = ({ you, opponent }) => {
	return (
		<div className="quick-results">
			YOU {you} - {opponent} OPPONENT
		</div>
	)
}

const ResultsPage = ({ gameId, playerId }) => {
	const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`))

	if (loading) return <div className="fw6 fs5">Loading...</div>
	const game = snapshot.val()

	const youKey = `player${playerId}`
	const opponentKey = `player${parseInt(playerId) === 1 ? 2 : 1}`

	const youWon = game.score[youKey] > game.score[opponentKey];

	const youLost = game.score[youKey] < game.score[opponentKey];

	const tied = game.score[youKey] === game.score[opponentKey];

	return (
		<div className="page">
			{youWon && <Won you={game.score[youKey]} opponent={game.score[opponentKey]} />}
			{youLost && <Lost you={game.score[youKey]} opponent={game.score[opponentKey]} />}
			{tied && <Tied you={game.score[youKey]} opponent={game.score[opponentKey]} />}
			<Link href="/" className="re-home link">Home</Link>
		</div>
	)
}

const Tied = ({ you, opponent }) => {
	return (
		<div className="results">
			<img src={tie} style={{ width: '80%' }} />
			<div className="re-text">It's a tie!</div>
			<QuickResults you={you} opponent={opponent} />
		</div>
	)
}

const Won = ({ you, opponent }) => {
	return (
		<div className="results">
			<img src={winning} style={{ width: '80%' }} />
			<div className="re-text">Congratulations!!</div>
			<QuickResults you={you} opponent={opponent} />
		</div>
	)
}

const Lost = ({ you, opponent }) => {
	return (
		<div className="results">
			<img src={dog} style={{ width: '80%' }} />
			<div className="re-text">Better luck next time...</div>
			<QuickResults you={you} opponent={opponent} />
		</div>
	)
}

export default App;







