from ...config import db


class Player:
    @staticmethod
    def get_all():
        return db.child('players').get().val()

    @staticmethod
    def get(player: str):
        return db.child('players').child(player).get().val()

    @staticmethod
    def add(players: [str]):
        for player in players:
            data = {
                'wins': 0,
                'losses': 0,
                'rating': 1500
            }

            db.child('players').child(player).set(data)

    @staticmethod
    def update_ratings(winners: [str], losers: [str], score_diff: int):
        w0 = Player.get(winners[0])
        w1 = Player.get(winners[1])
        l0 = Player.get(losers[0])
        l1 = Player.get(losers[1])
        k = 25.0

        # Average of the ratings for the teams
        avg_winner = (w0['rating'] + w1['rating']) / 2
        avg_loser = (l0['rating'] + l1['rating']) / 2

        # This is the algorithm for the elo rankings.
        # It has 2 parts, the expected result (or probability of winning)
        # and the actual result.  Right now it is not optomized because we dont
        # have data to accurately fit the model.

        # Expected values (expected win probability of the winning team and the
        # losing team)
        wE = (1.0/(1.0+10.0**((avg_loser - avg_winner)/400.0)))

        # We modify the actual win value (normally a 1 for winning) to account
        # for score differential
        wA = 1.0 + ((score_diff**0.8)/11.0)
        rDelta = k * (wA - wE)

        # Ratings update
        w0_rating = round(w0['rating'] + rDelta)
        w1_rating = round(w1['rating'] + rDelta)
        l0_rating = round(l0['rating'] - rDelta)
        l1_rating = round(l1['rating'] - rDelta)

        db.child('players').child(winners[0]).child('rating').set(w0_rating)
        db.child('players').child(winners[1]).child('rating').set(w1_rating)
        db.child('players').child(losers[0]).child('rating').set(l0_rating)
        db.child('players').child(losers[1]).child('rating').set(l1_rating)

        db.child('players').child(winners[0]).child('wins').set(w0['wins'] + 1)
        db.child('players').child(winners[1]).child('wins').set(w1['wins'] + 1)
        db.child('players').child(losers[0]).child('losses').set(l0['losses']
                                                                 + 1)
        db.child('players').child(losers[1]).child('losses').set(l1['losses']
                                                                 + 1)
