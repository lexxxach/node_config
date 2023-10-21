const requestIP = require('request-ip')
const fs = require('fs')
//let currentIp = requestIP.getClientIp(req)

async function writeIp(pathWrite, fileName, currentIp, path) {
    try {
        let resp = await fetch(`http://api.sypexgeo.net/json/${currentIp.replace(/::ffff:/, '')}`)
    let res = await resp.json()

    let ipAddr = res.ip
    let ipRegion = res.region?.name_ru
    let ipCity = res.city.name_ru
    let resStr = `IP:${ipAddr}_Область:${ipRegion}_Город:${ipCity}_${new Date()}_${path}`
        
    

    fs.appendFileSync(pathWrite + fileName, resStr + '\n')
        
    } catch (error) {
       // console.log(error)
        fs.appendFileSync(pathWrite + fileName, error.message + '\n')
    }
    
    

}

function n(){
    return 3+2
}

exports.writeIp = writeIp
exports.nPlus = n