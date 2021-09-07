import TheCharacters from "../componets/theCharacters/theCharacters"
import Episodes from "../componets/episodes/episodes"
import Locations from "../componets/locations/locations"
import MyWatchList from "../componets/mywatchlist/mywatchlist"


export const routes=[
    {path:"/theCharacters",component:TheCharacters,exact:true},
    {path:"/",component:TheCharacters,exact:true},
    {path:"/episodes",component:Episodes,exact:true},
    {path:"/locations",component:Locations,exact:true},
    {path:"/mywatchlist",component:MyWatchList,exact:true}
]