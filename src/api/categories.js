import Category from '../models/category';


export const CATEGORIES = [
    new Category('c1', 'Action & Adventure', require('../../assets/genre/swords.png')),
    new Category('c2', 'Fantasy/Fiction',  require('../../assets/genre/unicorn.png')),
    new Category('c3', 'Kids',  require('../../assets/genre/kids.png')),
    new Category('c4', 'Biography', require('../../assets/genre/biography.png')),
    new Category('c5', 'Humor', require('../../assets/genre/clown.png')),
    new Category('c6', 'Romance', require('../../assets/genre/heart.png')),
    new Category('c7', 'Guide', require('../../assets/genre/info.png')),
    new Category('c8', 'Nonfiction', require('../../assets/genre/planet-earth.png')),
    new Category('c9', 'Business', require('../../assets/genre/stats.png')),
    new Category('c10', 'Personal Development', require('../../assets/genre/artificial-intelligence.png')),
    new Category('c12', 'Others', require('../../assets/genre/ellipsis.png')),
]