const dummy = (blogs) => {return 1}

const totalLikes = (blogs) => {
    return blogs.length ===1 ? blogs[0].likes: 
    blogs.reduce((total, actual) => total+actual.likes,0);
}

const favoriteBlog = (blogs) => {
    let mayor=0;
    blogs.forEach(actual => actual.likes>mayor ? mayor=actual.likes:false);
    return blogs.find(actual => actual.likes === mayor)
}

const mostBlogs = (blogs) => {
    let mayor=0, author_fav, repetidos;
    for(let nombre of blogs){
        repetidos=0;
        blogs.forEach(actual => actual.author === nombre.author ? repetidos++: false);
        if(repetidos>mayor){
            mayor=repetidos;
            author_fav=nombre.author
        }
    }
    return {
        author: author_fav,
        blogs: mayor
    }
}

const mostLikes = (blogs) => {
    let set = new Set()
    let mayor=0, cont=0;
    let fav = {
        author:"",
        likes:0
    };
    blogs.forEach(actual => set.add(actual.author))
    for(let nombre of set){
        cont = blogs.reduce((total, curr) => {
            if(nombre === curr.author) return total+curr.likes
            else return total
        },0)
        if(cont>mayor) {
            mayor=cont
            fav.author=nombre
            fav.likes=mayor
        }
    }
    
    return fav
}

module.exports={dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}