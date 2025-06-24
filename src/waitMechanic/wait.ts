

export async function waitTime(time:number){
    new Promise((resolve) =>{
        setTimeout(() => {       
        },time*1000)
    })
}