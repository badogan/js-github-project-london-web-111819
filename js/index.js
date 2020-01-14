document.addEventListener("DOMContentLoaded",function(){
    //HELPER APIS
    function get(URI) {
        return fetch(URI).then(response=>response.json())
    }
    
    //CONSTANTS
    const USER_SEARCH_BASE_URL = 'https://api.github.com/search/users?q='
    // Example: 'https://api.github.com/search/users?q=octocat'
    const REPO_SEARCH_BASE_URL_PART_1 = 'https://api.github.com/users/'
    const REPO_SEARCH_BASE_URL_PART_2 = '/repos'
    // Example: https://api.github.com/users/octocat/repos
    const SEARCH_FORM = document.getElementById("github-form")
    const SEARCH = document.getElementById("search")
    const USER_LIST = document.getElementById("user-list")

    //FUNCTIONS
    function searchAction(event){
        //build URI to pass to get
        uriToSend = `${USER_SEARCH_BASE_URL}${SEARCH.value}`
        get(uriToSend).then(renderUsersToPage);
    }

    function renderUsersToPage(object){
        //object.items has the list of users
        object.items.forEach(renderOneOfTheUsers)
    }

    function renderOneOfTheUsers(user){
        let newDiv = document.createElement('div')
        let newImg = document.createElement('img')
        newImg.src = user.avatar_url
        let newP = document.createElement('p')
        let newATagLogin = document.createElement('a')
        newATagLogin.innerText = user.login
        let newATagRepo = document.createElement('a')
        newATagRepo.innerText = "User repo"
        newATagRepo.href =""
        newATagRepo.addEventListener("click",()=>bringUserRepo(user))
        let newBreak = document.createElement('br')
        newP.append(newATagLogin,newBreak,newATagRepo)
        newDiv.append(newImg,newP)
        USER_LIST.appendChild(newDiv)
    }

    function bringUserRepo(user){
        let uriToSendForRepo = `${REPO_SEARCH_BASE_URL_PART_1}${user.login}${REPO_SEARCH_BASE_URL_PART_2}`
        debugger
        get(uriToSendForRepo).then(renderRepos)
    }

    function renderRepos(object) {
        // Where is the repos?
        let reposOfTheUser
        reposOfTheUser.forEach(renderOneOfTheRepos)
    }

    function renderOneOfTheRepos(repo){
        //how to render a repo?
    }


    //EVENTLISTENERS, LOADERS
    SEARCH_FORM.addEventListener("submit",function(event){
        event.preventDefault()
        searchAction(event)
    })

    

})