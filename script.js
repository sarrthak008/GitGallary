let userName = "sarrthak008"

let SearchBtn = document.querySelector("#serchBtn")

let profileImage = document.querySelector("#profile-pic img")
let name = document.querySelector("#name");
let followers = document.querySelector("#followers");
let following = document.querySelector("#following");
let repo = document.querySelector("#repo")
let date = document.querySelector("#date")
let repos = document.querySelector("#repos")

let infoDiv = document.querySelector("#info-container")
 
infoDiv.style.display=`none`




SearchBtn.addEventListener("click", () => {
    userName = document.querySelector("#User").value;

 console.log(userName)

    let url = `https://api.github.com/users/${userName}`;


    fetch(url).then(resp => {
        console.log(resp)

        if(resp.status != 200){
            infoDiv.style.display=`none` ;
            alert(`Cant found user\nStatus Code ${resp.status}`)
        }else{
            infoDiv.style.display=`flex`
        }

        return resp.json()
    }).then(resulte => {
         //console.log(resulte.status)
     
        //adding info  into dom...
        profileImage.setAttribute("src", `${resulte.avatar_url}`);

        if (resulte.name != null) {
            
           
            name.innerText = `Name: ${resulte.name}`
        } else {
            name.innerText = `Name: ${resulte.login}`
        }

        followers.innerText = `Followers:${resulte.followers}`

        following.innerText = `Following:${resulte.following}`

        repo.innerText = `Repo:${resulte.public_repos}`

        Cdate = `${resulte.created_at} `
        Cdate = Cdate.slice(0, 10)
        date.innerText = `Created At: ${Cdate}`

        addRepos(userName);


    }).catch(error => {
      
        //console.log(error)
    })



})

function addRepos(userName) {
   // console.log(userName)

    url = `https://api.github.com/users/${userName}/repos`
    fetch(url).then(responce => {
        return responce.json()
    }).then(result => {


        

        //create elem and into dom 
        result.map((repo) => {
            let RepoStyle = document.createElement('span')
            RepoStyle.classList.add('repo-style')
            // reponame add 

            let repoName = document.createElement('h5')
            repoName.classList.add('repo-headings')
            repoName.innerText = `${repo.name}`
            RepoStyle.append(repoName)

            //repo date adding 

            let repoDate = document.createElement('h5')
            repoDate.classList.add('repo-headings')
            Cdate = `${repo.created_at} `
            Cdate = Cdate.slice(0, 10)
            repoDate.innerText = `Date: ${Cdate}`
            RepoStyle.append(repoDate)


            let Language = document.createElement('h5')
            Language.classList.add('repo-headings')
            Language.innerText = `used lang:${repo.language}`
            RepoStyle.append(Language)

            //

            let Btn = document.createElement('button')
            Btn.classList.add('repo-btn')
            Btn.getAttribute('target', '_blank')
            let img = document.createElement('img')
            img.setAttribute('src', './images/arrow-right.svg')
            img.classList.add('img')
            Btn.innerText = `Visit:`
            Btn.append(img)
            Btn.addEventListener('click',()=>{window.open(`https://github.com/${userName}/${repo.name}`)})
                RepoStyle.append(Btn)

               // console.log(RepoStyle)
                repos.appendChild(RepoStyle)
        
                gitStatus(userName)
            
        SearchBtn.addEventListener('click',()=>{
            repos.removeChild(RepoStyle)
        })

    }).catch(error => {
           // console.log(error)
        })

    })
}

function gitStatus(userName){

  let Stats = document.querySelector("#stats img")
   Stats.setAttribute('src',`https://github-readme-stats.vercel.app/api?username=${userName}&show_icons=true&theme=radical`);

}