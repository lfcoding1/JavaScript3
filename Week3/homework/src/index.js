'use strict';
{
function fetchJSON(url) {
  return new Promise(function(resolve, reject){
  const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        resolve(xhr.response);
      } else {
        reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    }
    xhr.onerror = () => reject(new Error('Network request failed'));
    xhr.send();
  }); // end promise
 } //end fetchJSON
 
function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.keys(options).forEach((key) => {
    const value = options[key];
    if (key === 'text') {
      elem.innerText = value;
      } else {
      elem.setAttribute(key, value);
      }
  });
  return elem;
}
let catsrc = 'https://us.123rf.com/450wm/photodeti/photodeti1702/photodeti170200132/72587923-cat-holding-stop-sign-isolated-on-white-background-.jpg?ver=6';

async function main(url) {
      try {
        let repos = await fetchJSON(url)
      await renderContainer(repos)
      } catch(error) {
        renderError(error);
      } // end catch
} //end main

function renderContainer(repos){
    async function get0API(url){
      try{
        let data = await fetchJSON(index0API)
        await renderIndex0(data) 
      } catch(error) {
        renderError(error);
      }  
    } //end asyn function
  
  get0API(index0API)
  let newArray = [];
  let forkArray = [];
  let languageArray = [];
  let descriptionArray = [];
  let updatedAt = [];
  let htmlArray = [];
  const root = document.getElementById('root'); 
  repos.sort((a, b) => (a.name).localeCompare(b.name));
                        
  for (let i = 0; i < repos.length; i++){
      newArray.push(repos[i].name);
      descriptionArray.push(repos[i].description);
      forkArray.push(repos[i].forks);
      languageArray.push(repos[i].language);
      updatedAt.push(repos[i].updated_at);
      htmlArray.push(repos[i].html_url); 
      var date =  new Date ((repos[i].updated_at));
      date = date.toUTCString();
  }
  
                                                
  while (root.firstChild) {
      root.removeChild(root.firstChild);
  }
                  
  createAndAppend('h1', root, { text: "Hack Your Future Repositories", class: 'title' });
  createAndAppend('h3', root, { text: "Select a repository:  ", class: 'subtitle'});
  const selectList = createAndAppend('select', root, {id: "mySelect" });
  const headerDiv = createAndAppend('div', root, {class: 'headerdiv'});
  createAndAppend('h3', headerDiv, { text: "Repository Information", class: 'subtitle', id: 'repoHeader' });
  createAndAppend('h3', headerDiv, { text: "Contributors", class: 'subtitle', id:'contributorHeader' });
  const container = createAndAppend('div', root, {class: 'container'});
  const card = createAndAppend('div', container, { class: 'card'});
  const ul = createAndAppend('ul', card, {id: "myUl", });
  const contributorsCard = createAndAppend('div', container, {class: 'card'});
  const contributorsUl = createAndAppend('ul', contributorsCard, {id: 'contributorsUl'});
  const Index0Name = createAndAppend ('li', ul, {text: "Repository: ", class: 'nameInContainer'});
  const Index0Link = createAndAppend ('a', Index0Name, {text: newArray[0], target: "_blank", href: htmlArray[0]});
  const Index0Description = createAndAppend('li', ul, {text: "Description: " + descriptionArray[0], class:"descriptionInContainer"});
  const Index0Fork = createAndAppend ('li', ul, {text: "Number of Forks: " + forkArray[0], class: 'forksInContainer'});
  const Index0Language = createAndAppend ('li', ul, {text: "Language: "  + languageArray[0], class: 'updatedAtInContainer'});
  const Index0UpdatedAt = createAndAppend ('li', ul, {text: "Updated at: " + date, class: 'updatedAtInContainer'})
                                             
  function renderIndex0(data){
      for (let i = 0; i < data.length; i++){          
          let Image0Link = createAndAppend('li', contributorsUl, {})
          let contributor0Name = createAndAppend('img', Image0Link, {src: data[i].avatar_url, class: 'imageSrc'});
          let contributor0Link = createAndAppend('a', Image0Link, {text: data[i].login, target: "_blank", href: data[i].html_url, id: 'link'});
          let contributor0Badge = createAndAppend('li', Image0Link, {text:"Contributions: " + data[i].contributions, class: 'badge'});
      } //end for
 
      for (let i = 0; i < newArray.length; i++) {
          createAndAppend('option', selectList, {id: "myOption",  value: i, text: newArray[i]});
      }
 
                      
    function removeNodes(container){
        while (ul.hasChildNodes()) {
          ul.removeChild(ul.firstChild);
        }
        while (contributorsUl.hasChildNodes()) {
          contributorsUl.removeChild(contributorsUl.firstChild);
        }
    } //end removeNodes
                        
    selectList.onchange = function(selectedIndex){
        let contributorAPI = 'https://api.github.com/repos/HackYourFuture/' + newArray[this.selectedIndex] + '/contributors'
        async function getAPI(url){
          try{
            let dataContributor = await fetchJSON(contributorAPI)
            await renderContributors(dataContributor) 
          } catch(error) {
            this.renderError(error);
          }  
      }
  
    getAPI(contributorAPI);
    let repoName = createAndAppend('li', ul, { text: "Repository: ", class: 'nameInContainer', function: removeNodes()});
    createAndAppend('a', repoName, { text: newArray[this.selectedIndex], id: 'linkInContainer', target: "_blank", href: htmlArray[this.selectedIndex]});
    createAndAppend('li', ul, {text: "Description: " + descriptionArray[this.selectedIndex], class: 'descriptionInContainer'});
    createAndAppend('li', ul, { text: "Number of Forks: " + forkArray[this.selectedIndex], class: 'forksInContainer'});
    createAndAppend('li', ul, { text: "Language: " + languageArray[this.selectedIndex], class: 'languageInContainer'});
    let dates = new Date (updatedAt[this.selectedIndex]);
    dates = dates.toUTCString();
    createAndAppend('li', ul, {text: "Updated at: " + dates, class: 'updatedAtInContainer'});
                  
    }// end of onchange
    }// end renderIndex0
  } //end renderContainer

  function renderContributors(dataContributor){
      for (let i = 0; i < dataContributor.length; i++){          
          let ImageLink = createAndAppend('li', contributorsUl, {})
          let contributorName = createAndAppend('img', ImageLink, {src: dataContributor[i].avatar_url, class: 'imageSrc'});
          let contributorLink = createAndAppend('a', ImageLink, {text: dataContributor[i].login, target: "_blank", href: dataContributor[i].html_url, id: 'link'});
          let contributorBadge = createAndAppend('li', ImageLink, {text:"Contributions: " + dataContributor[i].contributions, class: 'badge'});
      } //end for
  }//end renderContributors

  function renderError(err) {
      let catsrc = 'https://us.123rf.com/450wm/photodeti/photodeti1702/photodeti170200132/72587923-cat-holding-stop-sign-isolated-on-white-background-.jpg?ver=6';
      createAndAppend('div', root, { text: err.message, class: 'alert-error' }), 
      createAndAppend('img', root, {id: 'catImage', src: catsrc});
  }
                
  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  let index0API = 'https://api.github.com/repos/HackYourFuture/alumni/contributors';
  window.onload = () => main(HYF_REPOS_URL);
                
  }
  