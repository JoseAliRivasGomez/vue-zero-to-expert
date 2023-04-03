

const getRandomInt = () => {
    return new Promise(resolve => {
        const rndInt = Math.floor((Math.random() * 20) + 1)
        
        setTimeout(() => {
            resolve(rndInt)
        },1000)
    })
}

export default getRandomInt