'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
        console.log("Hello error");
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

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
  
  
  function main(url) {
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
   
    fetchJSON( HYF_REPOS_URL, (err, data) => {
      let newArray = [];
      let forkArray = [];
      let languageArray = [];
      let descriptionArray = [];
      let updatedAt = [];
      let htmlArray = [];
      let contributorsArray = [];
      for (let i = 0; i < data.length; i++){
          newArray.push(data[i].name);
          newArray.sort();
          descriptionArray.push(data[i].description);
          forkArray.push(data[i].forks);
          languageArray.push(data[i].language);
          updatedAt.push(data[i].updated_at);
          contributorsArray.push(data[i].contributors_url);
          contributorsArray.sort();
          htmlArray.push(data[i].html_url);
          htmlArray.sort(); 
       }
       
         
      let app = document.getElementById('root');   
      const header = createAndAppend('h1', app, { text: "Hack Your Future Repositories", class: 'title' });
      const subHeader = createAndAppend('h3', app, { text: "Select a repository:  ", class: 'subtitle'});
      const selectList = createAndAppend('select', app, { text: 'Select a Repo', id: "mySelect" });
      const container = createAndAppend('div', app, {class: 'container'});
      const card = createAndAppend('div', container, {text: "Information about this repository: ", class: 'card'});
      const ul = createAndAppend('ul', card, {id: "myUl", });
      const contributorsheader = createAndAppend('h1', root, { text: "Contributors", class: 'title' });
      const contributorsContainer = createAndAppend('div', root, { class: 'container'})
      const contributorsCard = createAndAppend('div', contributorsContainer, {text: "Contributors to this Repository", class: 'card'});
      const contributorsUl = createAndAppend('ul', contributorsCard, {id: 'contributorsUl'});
  
   
    
      data.forEach((repo) => {  
        for (let i = 0; i < newArray.length; i++) {
            createAndAppend('option', selectList, {id: "myOption", value: i, text: newArray[i]});
          }
        });
    
      function removeNodes(container){
            while (ul.hasChildNodes()) {
                ul.removeChild(ul.firstChild);
          }
            while (contributorsUl.hasChildNodes()) {
                contributorsUl.removeChild(contributorsUl.firstChild);
          }
        } //end removeNodes
        
      selectList.onchange = function(selectedIndex){
          let RepoName = createAndAppend('li', ul, { text: "Repository: ", class: 'nameInContainer', function: removeNodes()});
          createAndAppend('a', RepoName, { text: newArray[this.selectedIndex], id: 'linkInContainer', target: "_blank", href: htmlArray[this.selectedIndex]});
          createAndAppend('li', ul, {text: "Description: " + descriptionArray[this.selectedIndex], class: 'descriptionInContainer'});
          createAndAppend('li', ul, { text: "Number of Forks: " + forkArray[this.selectedIndex], class: 'forksInContainer'});
          createAndAppend('li', ul, { text: "Language: " + languageArray[this.selectedIndex], class: 'languageInContainer'});
          createAndAppend('li', ul, {text: "Updated at: " + updatedAt[this.selectedIndex], id: 'updatedAtInContainer'})
          createAndAppend('li', contributorsUl, { text: contributorsArray[this.selectedIndex], class: 'contributorsInContainer'});
          }
        });
    
    /*
    fetchJSON( theContributors_URL, (err, data) => {
      let theContributorsUrl = [];
      for (let i = 0; i < data.length; i++){
      }
    });*/
    }

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  const theContributors_URL = 'https://api.github.com/repos/HackYourFuture/contributors';
  window.onload = () => main(HYF_REPOS_URL);
  window.onload = () => main(theContributors_URL);
}