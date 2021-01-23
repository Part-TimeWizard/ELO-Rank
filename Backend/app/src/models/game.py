from ...config import db
from .player import Player
import datetime as dt
import pytz
from pytz import timezone


class Game:
    @staticmethod
    def get():
        return db.child('games').get().val()

    @staticmethod
    def add(t1_p1: str, t1_p2: str, t2_p1: str, t2_p2: str, t1_score: int,
            t2_score: int, notes: str):
        if t1_score < t2_score:
            t1_score, t2_score = t2_score, t1_score
            t1_p1, t2_p1 = t2_p1, t1_p1
            t1_p2, t2_p2 = t2_p2, t1_p2

        Player.update_ratings(winners=[t1_p1, t1_p2], losers=[t2_p1, t2_p2],
                              score_diff=(t1_score - t2_score))

        months = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        }

        time = dt.datetime.now(tz=pytz.utc).astimezone(timezone('US/Pacific'))
        month = months[time.month]
        year = str(time.year)
        day = str(time.day)

        data = {
            't1_p1': t1_p1,
            't1_p2': t1_p2,
            't2_p1': t2_p1,
            't2_p2': t2_p2,
            't1_score': t1_score,
            't2_score': t2_score,
            'notes': (notes if notes else ''),
            'date': month + ' ' + day + ', ' + year
        }

        db.child('games').push(data)
