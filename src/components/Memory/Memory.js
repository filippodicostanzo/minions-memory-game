import _ from 'lodash'

class Memory {

    constructor() {
        this.cards = [];
        this.num_cards = 6;
    }

    /**
     * initCards
     *
     * @param difficulty
     *
     * initialize the array with the Cards
     * and set the difficulty
     */

    initCards(difficulty) {

        if (difficulty === "easy") {
            this.num_cards = 4
        }

        if (difficulty === "medium") {
            this.num_cards = 5
        }

        if (difficulty === "hard") {
            this.num_cards = 6
        }


        this.cards = [];

        let id = 1;
        for (let i = 1; i <= this.num_cards; i++) {
            let card1 = {
                id: id,
                image: i,
                imageUp: false,
                matched: false
            };
            id++;
            let card2 = {
                id: id,
                image: i,
                imageUp: false,
                matched: false
            };
            this.cards.push(card1);
            this.cards.push(card2);
            id++;
        }

        this.cards = _.shuffle(this.cards);

    }

    /**
     * getCard
     *
     * @param id
     * @returns {*}
     *
     * sameImage
     */

    getCard(id) {
        for (var i = 0; i < 2 * this.num_cards; i++) {
            if (this.cards[i].id === id) {
                return this.cards[i]
            }
        }
    }

    /**
     * flipCard
     *
     * @param id
     * @param imageUp
     *
     * set the proprietry imageUp on the cart selected
     */

    flipCard(id, imageUp) {
        this.getCard(id).imageUp = imageUp;
    }


    /**
     * sameImage
     *
     * @param id1
     * @param id2
     * @returns {boolean}
     *
     * check if the cards are the same
     */

    sameImage(id1, id2) {
        if (this.getCard(id1).image === this.getCard(id2).image)
            return true;
        else
            return false;
    }


    /**
     * setMatched
     *
     * @param id
     * @param matched
     *
     * set the property match true if the card are matched
     */

    setMatched(id, matched) {
        this.getCard(id).matched = matched;
    }

}


export default Memory;