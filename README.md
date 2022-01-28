# ELO Rank ReadMe
Jump to: [Documentation](./README.md#Documentation)

## Intro
Everyone thinks they’re the best at a certain game. Whether it’s ping-pong, Mario Kart, Joust,
or even pickup basketball, everyone has their favorite casual game where they think they can
beat all their friends. We set out to find a way to prove, with mathematical evidence, that we
were better than them at certain games (and then cue the trash talk).

In about 2 months, we created a web app using React.js for the frontend and Python and the FlaskAPI for the backend.  We used a modified Elo Algorithm to take games logged on the site and generate a set of rankings that would update every time a match was inputted.  We then hosted on AWS allowing users to visit our site and log games.  The web app ran for 3 months and in that time over 150 games were logged from over 50 players.  For those 3 months, we completely changed how our friends played casual games.

But let’s first take a step back and look at the core algorithm that supports ELO Rank.  What is an Elo Algorithm?

## Hello ELO
Surprisingly, our inspiration to use an Elo algorithm didn’t originally stem from chess, but rather came from ranked competitive video games like [League of Legends]( https://leagueoflegends.fandom.com/wiki/Elo_rating_system) and [FiveThirtyEight’s systems]( https://fivethirtyeight.com/features/introducing-nfl-elo-ratings/) for rating NFL and MLB teams.  We figured we could apply the same algorithm to casual games between friends to generate standings that prove who is the best and a given game.

The Elo system is a rating system designed by Arpad Elo that uses Bayesian analysis to determine a player’s relative ranking compared to other players.  Essentially, all players start out with a rating of 1500.  When two players go against each other, we calculate the probability that each of them will win with the formula (using a logistic curve):

<img width="249" alt="Ea = 1/(1+10^((Rb-Ra)/400))" src="https://user-images.githubusercontent.com/43940800/151481883-a1bcb560-5e2d-4128-9b09-296b890c4568.png">

Most systems use (Rb-Ra)/400 which means that for every 400 rating points a player is above another player, they are 10x more likely to win than the other player.

Let’s say that player A beat player B.  Then both player’s ratings get adjusted by the formulas:

<img width="249" alt="R'a = Ra + K(Sa-Ea)" src="https://user-images.githubusercontent.com/43940800/151482356-fb21381b-3566-4c6d-a152-297faa0bebcd.png">

Where Sa is the actual outcome which in most cases means 1 for a win, 0 for a loss, and 0.5 for a tie (however you’ll see in a bit we do something slightly different). The Elo system is a closed system, so ratings points that are added to the winning player’s ranking are taken from the losing player’s rating.  The K value is a constant that represents how much weight we should put on the most recent game.  If the player with the lower rating wins, is it more because of luck or does it indicate that our prediction was wrong and the ratings need to be greatly adjusted.  The K value can also be thought of as how much are the ratings going to change after each game.  A higher K value means to higher jumps and drops of ratings after each game, and a lower K value means that a team would have to win or lose a lot of times for their rating to change dramatically.  Most times, this value is fit based on pre-existing data, but since we didn’t have any data and we wanted it to work on many different games, we decided for a fairly high K value.  This is because we wanted to increase engagement and player usage, so by having a high K value, the ratings would jump and drop much faster, so player rankings would be more volatile, preventing players from getting stuck at the bottom of the rankings and feeling like they couldn’t make it back up or having players that seemed untouchable as they stayed at the top of the leaderboard and nothing could dethrone them.

Unlike chess where the game can either result in a win, a loss, or a tie, most of the games we were interested in recording had a point system, so players could win 10-1 or 2-1 and we wanted to reflect this in the rankings.  A team that just barely loses by one point shouldn’t loose as many ratings points as a team that was blown out, and likewise, if a team destroys another team, it doesn’t feel as good to only gain the same number of points as if you beat them by a point or two.  To remedy this, we added a modifier that awards extra rating points for larger score differentials.  We modified Sa using the following formula:

<img width="329" alt="Sa = 1 + (score_diff^0.8/total_score)" src="https://user-images.githubusercontent.com/43940800/151482099-82b874f5-6c27-4253-b97e-f4ed6e48fd5b.png">

Other algorithms use modifications similar, for example, [FiveThirtyEight’s NFL Elo system]( https://fivethirtyeight.com/features/introducing-nfl-elo-ratings/) uses a natural log system that gives diminishing returns for larger and larger blowouts.  We decided that since most of the games we would have a fixed point celling (most casual games are first to X points) we decided we didn’t need to factor in diminishing returns and wanted to maximum points for a shutout.

Our final adjustment was we wanted to be able to account for 2 vs. 2 matches (like playing doubles in ping-pong or 2 vs. 2 in Fifa).  To do this, we simply converted Player A into Team A, and averaged the ratings of the two players to create a single R_Team A for all of the calculations.  The ratings points awarded (or lost) would then be split evenly between the two players. 

And there you have it.  Our system in a nutshell.  The Elo algorithm generates a prediction of the probability of each player winning based on the player’s ratings, then it updates the ratings based on the actual outcome of the game.

## Post-game Analysis
The user response was absolutely staggering.  We set up an AWS server to host our beta version and shared the link with our friends.  Immediately it took off.  Games started piling in, the trash talking started and leaders in the rankings started to emerge.  At the end of the application’s 3 month uptime, we had over 50 users logging over 150 games.  

After 3 months, we completely changed the way our friends played games.  As it turns out, we ruined it.  Watching people play, you could feel the air of competitiveness.  We elevated the level of play, but in the process, we lost a lot of what made the games fun. Our friends liked the idea of getting the rankings and seeing who was the best.  But once they got a high rating, they wanted to protect it.  They would choose their partners based on ratings and would try to play games against weaker opponents to boost their ratings and avoid games they thought they might lose.  Players would want to log the game if they won, but if they lost, they didn’t want it to affect their rating, leading to the classic “if I win, its ranked, if I lose, it was just practice.”

Eventually, we decided to close down the beta.  We were left a little puzzled, how could something everyone loved (even when we shut it down, lots of games were still being logged) be something everyone also hated?

We realized that a lot of it came down to the fact that there was no way to agree and guarantee beforehand that a game was unranked.  In chess and video games with ranking systems, the player chooses before they begin queuing for a game if they want to play ranked or not (in chess ranked matches are only at tournaments and most competitive video games have ranked and casual modes).  These games have separate queues which ensures that if a player wants to play an unranked game, their opponent does as well.  For our players, the groups usually were a mix of players who wanted to play ranked (usually players who had medium to high ratings and wanted to bolster them) and players who wanted to play casually (players who had lower ratings who just wanted to have fun and improve, not have their rating slide even more).  This mix meant that there would often be matchups of half wanting ranked and half wanting casual, leading to casual players playing ranked games when they didn’t want to, causing frustration and adding a lot more pressure.

To solve this we came up with a few solutions that we could implement in the future.  The best solution seemed to be creating a rotating system, so ranked matches happen for one week every 3-4 weeks.  Games can be logged in the non-ranked time, but they wouldn’t change a player’s rating.  This way, when the ranked week or weekend comes up, players would be more excited and less burnt out, and the players who don’t want to play ranked don’t constantly feel pressured to do so.  These non-ranked games could still be used for stats and could also be used to generate seedings and matchups that would create the most interesting or most balanced games.

Right now, the application can only support one game and set of players at a time, so we had to create a different web app for each game and set of players, all of whom had to be added to the database directly.  But eventually, we want to create a system where a player could sign up to the site and join different leagues for multiple different games that all work on the same web app, so a player could play in say his friend group’s Super Smash Brother’s league and his work’s ping-pong league all from the same site.

We also wanted to add a way to track stats other than just points scored such as aces in ping-pong.  With multiple seasons for a league and more data points, we also wanted to use the data to update our algorithm.  As we showed above, the K value represents how much weight to put on a single game’s outcome.  With more data over longer periods, we could fit the K value for different games to get more accurate ratings.  With this data, we could also fit the score modifier (how much the point differential affects the ratings) and how much each player’s rating changes (what game stats can best determine how much a player contributed to the win/loss and therefore how many rating points should they win/lose because of that?). 


## Documentation
- [Backend ReadMe](Backend/README.md "Backend ReadMe")
- [Frontend ReadMe](Frontend/README.md "Frontend ReadMe")

## How to Run Locally
1. Follow the `How to Run` steps in the [Backend ReadMe](Backend/README.md "Backend ReadMe")
2. Follow the `How to Run` steps in the [Frontend ReadMe](Frontend/README.md "Frontend ReadMe")
3. Open [`http://localhost:3000`](http://localhost:3000) in your browser
