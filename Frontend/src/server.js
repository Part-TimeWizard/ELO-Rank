import api from "./config"

const server = {
    getGames() {
        return api.get("game/get")
    },
    
    addGame(t1_p1, t1_p2, t2_p1, t2_p2, t1_score, t2_score, notes) {
        const body = {
            "t1_p1": t1_p1,
            "t1_p2": t1_p2,
            "t2_p1": t2_p1,
            "t2_p2": t2_p2,
            "t1_score": t1_score,
            "t2_score": t2_score,
            "notes": notes,
        }

        return api.post("game/add", body)
    },

    getPlayers() {
        return api.get("player/get")
    },

    getNames() {
        return api.get("player/get_names")
    }
}

export default server;