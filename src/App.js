import React, {Component} from 'react';
import StartScreen from './components/StartScreen/StartScreen'
import EndScreen from './components/EndScreen/EndScreen'
import Memory from './components/Memory/Memory'
import CardView from './components/CardView/CardView';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageShown: false,
            namePlayer: '',
            newGame: false,
            numClicksWithinTurn: 0,
            difficulty: '',
            time: 0
        };
        this.getData = this.getData.bind(this);
        this.onCardClicked = this.onCardClicked.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.restartData = this.restartData.bind(this);
        this.memory = new Memory()
    }

    /**
     * componentWillMount
     *
     * The first true life cycle method
     */

    componentWillMount() {
        this.startGame();
    }


    /**
     * getData
     *
     * @param name
     * @param game
     * @param difficulty
     *
     * get the Name and the Difficulty from the StartScreen Component
     */

    getData(name, game, difficulty) {
        this.memory.initCards(difficulty);
        this.startTimer();
        this.setState({
            namePlayer: name,
            newGame: game,
            difficulty: difficulty
        });

    }

    /**
     * restartData
     *
     * restart the Game
     */

    restartData() {
        this.setState({
            newGame: false
        });
        this.startGame();
    }


    /**
     *  tick
     *
     *  add seconds to timer
     */

    tick() {
        this.setState({time: (this.state.time + 1)})
    }

    /**
     * startTimer
     *
     * start the Timer
     */

    startTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(this.tick.bind(this), 1000)
    }

    /**
     * stop Timer
     *
     * stop the Timer
     */

    stopTimer() {
        clearInterval(this.timer)
    }


    /**
     * startGame
     *
     * Set the properties of the State for start a new Game
     */

    startGame() {
        this.setState({
            turnNo: 1,
            pairsFound: 0,
            numClicksWithinTurn: 0,
            firstId: undefined,
            secondId: undefined,
            time: 0
        });
    }


    /**
     * getCardViews
     * @returns {Array}
     *
     * get all Cards from the component CardView and push in Array
     */

    getCardViews() {
        let cardViews = [];
        let onClick = this.onCardClicked;
        this.memory.cards.forEach(c => {
            let cardView = <CardView key={c.id}
                                     id={c.id}
                                     image={c.image}
                                     imageUp={c.imageUp}
                                     matched={c.matched}
                                     onClick={onClick}/>;
            cardViews.push(cardView);
        });
        return cardViews;
    }

    /**
     * onCardClicked
     *
     * @param id
     * @param image
     *
     * this method contains the logic of the game with the various states
     */

    onCardClicked(id, image) {
        if (this.state.numClicksWithinTurn === 0) {
            this.memory.flipCard(id, true);
            this.setState({
                firstId: id,
                numClicksWithinTurn: 1
            });

        }

        if (this.state.numClicksWithinTurn === 1) {
            this.memory.flipCard(id, true);
            this.setState({
                secondId: id,
                numClicksWithinTurn: 2
            }, function () {
                if (this.memory.sameImage(id, this.state.firstId)) {
                    this.memory.setMatched(this.state.firstId, true);
                    this.memory.setMatched(this.state.secondId, true);
                    this.setState({
                        pairsFound: this.state.pairsFound + 1,
                        firstId: undefined,
                        secondId: undefined,
                        turnNo: this.state.turnNo + 1,
                        numClicksWithinTurn: 0
                    });
                }
                else {
                    setTimeout(() => {
                            this.resetCards(this.state.firstId, this.state.secondId);
                        },
                        3000)
                }
            })
        }

        if (this.state.numClicksWithinTurn === 2) {
            this.resetCards(this.state.firstId, this.state.secondId);
            this.memory.flipCard(id, true);
            this.setState({
                firstId: id,
                numClicksWithinTurn: 1
            });
        }
    }

    /**
     * resetCards
     *
     * @param id1
     * @param id2
     *
     * with this method i can reset the state of cards
     */

    resetCards(id1, id2) {
        if (this.state.numClicksWithinTurn !== 2) {
            return;
        }
        this.memory.flipCard(this.state.firstId, false);
        this.memory.flipCard(this.state.secondId, false);
        this.setState({
            firstId: undefined,
            secondId: undefined,
            numClicksWithinTurn: 0,
            turnNo: this.state.turnNo + 1
        });
    }

    render() {
        let cardViews = this.getCardViews();

        let cardNumber = this.memory.num_cards;

        if (this.state.pairsFound === cardNumber) {
            this.stopTimer();
        }

        return (
            <div className="App">
                <div className={"start-screen " + (!this.state.newGame ? 'show' : 'hidden')}>
                    <StartScreen sendData={this.getData}/>
                </div>

                <div className={"end-screen " + (this.state.pairsFound === cardNumber ? 'show' : 'hidden')}>
                    <EndScreen restartData={this.restartData} time={this.state.time} turnNo={this.state.turnNo}/>
                </div>
                <div
                    className={"table-game " + (this.state.newGame ? 'show' : 'hidden') + " " + (this.state.pairsFound === cardNumber ? 'hidden' : 'show')}>
                    <div className="header">
                        <h2>{this.state.namePlayer}</h2>
                        <p>Turn: {this.state.turnNo} | Pair: {this.state.pairsFound} | Time: {this.state.time}</p>
                    </div>

                    <div className="container">
                        {cardViews}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
