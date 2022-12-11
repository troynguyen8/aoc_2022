import { parseLinesToArraySync } from '../utilities/parseLinesToArray.js';

// Begin region: function declarations
const SELF_CHARACTER_INTENT = {
    play: 'play',
    outcome: 'outcome'
};
const RPS_PLAYS = {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors'
}
const GAME_OUTCOMES = {
    win: 'win',
    lose: 'lose',
    draw: 'draw'
};
const CHARACTER_TO_RPS_PLAY = {
    A: RPS_PLAYS.rock,
    B: RPS_PLAYS.paper,
    C: RPS_PLAYS.scissors,
    X: RPS_PLAYS.rock,
    Y: RPS_PLAYS.paper,
    Z: RPS_PLAYS.scissors
};
const CHARACTER_TO_OUTCOME = {
    X: GAME_OUTCOMES.lose,
    Y: GAME_OUTCOMES.draw,
    Z: GAME_OUTCOMES.win
};
const RPS_PLAYS_TO_POINTS = {
    [RPS_PLAYS.rock]: 1,
    [RPS_PLAYS.paper]: 2,
    [RPS_PLAYS.scissors]: 3
};
const OUTCOMES_TO_POINTS = {
    [GAME_OUTCOMES.win]: 6,
    [GAME_OUTCOMES.lose]: 0,
    [GAME_OUTCOMES.draw]: 3
};

function linesToScores(lines, selfCharacterIntent = SELF_CHARACTER_INTENT.play) {
    return lines.filter((line) => !!line).map((line) => {
        const [opponentCharacter, selfCharacter] = line.split(' ');
        return gameScore(opponentCharacter, selfCharacter, selfCharacterIntent);
    });
};

function computeRequiredMove(opponentPlay, outcome) {
    if (outcome === GAME_OUTCOMES.draw) {
        return opponentPlay;
    }

    if (outcome === GAME_OUTCOMES.win) {
        switch (opponentPlay) {
            case RPS_PLAYS.rock:
                return RPS_PLAYS.paper;
            case RPS_PLAYS.paper:
                return RPS_PLAYS.scissors;
            case RPS_PLAYS.scissors:
                return RPS_PLAYS.rock;
        }
    } else {
        switch (opponentPlay) {
            case RPS_PLAYS.rock:
                return RPS_PLAYS.scissors;
            case RPS_PLAYS.paper:
                return RPS_PLAYS.rock;
            case RPS_PLAYS.scissors:
                return RPS_PLAYS.paper;
        }
    }
};

function gameScore(opponentCharacter, selfCharacter, selfCharacterIntent = SELF_CHARACTER_INTENT.play) {
    const opponentCharAsPlay = CHARACTER_TO_RPS_PLAY[opponentCharacter];
    const selfCharAsPlay = selfCharacterIntent === SELF_CHARACTER_INTENT.play ? CHARACTER_TO_RPS_PLAY[selfCharacter] : undefined;

    let pointsFromOutcome = selfCharacterIntent === SELF_CHARACTER_INTENT.play ? 0 : OUTCOMES_TO_POINTS[CHARACTER_TO_OUTCOME[selfCharacter]];
    const basePoints = selfCharacterIntent === SELF_CHARACTER_INTENT.play ?
        RPS_PLAYS_TO_POINTS[selfCharAsPlay] :
        RPS_PLAYS_TO_POINTS[computeRequiredMove(opponentCharAsPlay, CHARACTER_TO_OUTCOME[selfCharacter])];

    if (selfCharacterIntent === SELF_CHARACTER_INTENT.outcome) {
        return pointsFromOutcome + basePoints;
    }

    if (opponentCharAsPlay === selfCharAsPlay) {
        pointsFromOutcome = OUTCOMES_TO_POINTS[GAME_OUTCOMES.draw];
    } else {
        const selfWon = (
            (opponentCharAsPlay === RPS_PLAYS.rock && selfCharAsPlay === RPS_PLAYS.paper) ||
            (opponentCharAsPlay === RPS_PLAYS.paper && selfCharAsPlay === RPS_PLAYS.scissors) ||
            (opponentCharAsPlay === RPS_PLAYS.scissors && selfCharAsPlay === RPS_PLAYS.rock)
        );
        pointsFromOutcome = selfWon ? OUTCOMES_TO_POINTS[GAME_OUTCOMES.win] : OUTCOMES_TO_POINTS[GAME_OUTCOMES.lose];
    }
    return pointsFromOutcome + basePoints;
};
// End region: function declarations

const lines = parseLinesToArraySync('./input.txt');
// Part 1
const scoresWhereSelfCharIsMove = linesToScores(lines);
console.log(scoresWhereSelfCharIsMove.reduce((acc, ele) => acc + ele, 0));

// Part 2
const scoresWhereSelfCharIsOutcome = linesToScores(lines, SELF_CHARACTER_INTENT.outcome);
console.log(scoresWhereSelfCharIsOutcome.reduce((acc, ele) => acc + ele, 0));
