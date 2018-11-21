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
      if (err) {
        createAndAppend('div', root, { text: err.message, class: 'alert-error' });
      }
      let newArray = [];
      let forkArray = [];
      let languageArray = [];
      let descriptionArray = [];
      let updatedAt = [];
      let htmlArray = [];
      data.sort((a, b) => (a.name).localeCompare(b.name));
      
      
      for (let i = 0; i < data.length; i++){
          newArray.push(data[i].name);
          descriptionArray.push(data[i].description);
          forkArray.push(data[i].forks);
          languageArray.push(data[i].language);
          updatedAt.push(data[i].updated_at);
          htmlArray.push(data[i].html_url); 
          var date =  new Date ((data[i].updated_at));
          date = date.toUTCString();
       }
       
         
      const root = document.getElementById('root');   
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
        fetchJSON('https://api.github.com/repos/HackYourFuture/' + newArray[this.selectedIndex] + '/contributors', (err, data) => {  
            for (let i = 0; i < data.length; i++){          
              let imageLink = createAndAppend('li', contributorsUl, {})
              let contributorName = createAndAppend('img', imageLink, {src: data[i].avatar_url, class: 'imageSrc'});
              let contributorLink = createAndAppend('a', imageLink, {text: data[i].login, target: "_blank", href: data[i].html_url, id: 'link'});
              let contributorBadge = createAndAppend('li', imageLink, {text:"Contributions: " + data[i].contributions, class: 'badge'});
            } //end for
          }); //end fetchJSON
        let repoName = createAndAppend('li', ul, { text: "Repository: ", class: 'nameInContainer', function: removeNodes()});
        createAndAppend('a', repoName, { text: newArray[this.selectedIndex], id: 'linkInContainer', target: "_blank", href: htmlArray[this.selectedIndex]});
        createAndAppend('li', ul, {text: "Description: " + descriptionArray[this.selectedIndex], class: 'descriptionInContainer'});
        createAndAppend('li', ul, { text: "Number of Forks: " + forkArray[this.selectedIndex], class: 'forksInContainer'});
        createAndAppend('li', ul, { text: "Language: " + languageArray[this.selectedIndex], class: 'languageInContainer'});
        let dates = new Date (updatedAt[this.selectedIndex]);
        dates = dates.toUTCString();
        createAndAppend('li', ul, {text: "Updated at: " + dates, class: 'updatedAtInContainer'});

      }// end of onchange
    
    }); //end of Fetch
    } //end main
  

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);

}