'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Repository {
    constructor(data) {
        this.data = data;
        renderContainer(data);
    } //end constructor

  /**
   * Render the repository info to the DOM.
   * @param {HTMLElement} parent The parent element in which to render the repository.
   */
   
} //end Repository


function renderContainer(data){
    async function get0API(url){
        try{
          let data = await Util.fetchJSON(index0API)
          await renderIndex0(data) 
        } catch(error) {
          this.renderError(error);
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
                                                
  while (root.firstChild) {
      root.removeChild(root.firstChild);
  }
                    
  Util.createAndAppend('h1', root, { text: "Hack Your Future Repositories", class: 'title', role:'banner' });
  Util.createAndAppend('h3', root, { text: "Select a repository:  ", class: 'subtitle'});
  const selectList = Util.createAndAppend('select', root, {id: "mySelect", role: 'navigation' });
  const headerDiv = Util.createAndAppend('div', root, {class: 'headerdiv'});
  Util.createAndAppend('h3', headerDiv, { text: "Repository Information", class: 'subtitle', id: 'repoHeader' });
  Util.createAndAppend('h3', headerDiv, { text: "Contributors", class: 'subtitle', id:'contributorHeader' });
  const container = Util.createAndAppend('div', root, {class: 'container', role: 'main'});
  const card = Util.createAndAppend('div', container, { class: 'card'});
  const ul = Util.createAndAppend('ul', card, {id: "myUl", });
  const contributorsCard = Util.createAndAppend('div', container, {class: 'card', role: 'main'});
  const contributorsUl = Util.createAndAppend('ul', contributorsCard, {id: 'contributorsUl'});
  const Index0Name = Util.createAndAppend ('li', ul, {text: "Repository: ", class: 'nameInContainer'});
  const Index0Link = Util.createAndAppend ('a', Index0Name, {text: newArray[0], target: "_blank", href: htmlArray[0]});
  const Index0Description = Util.createAndAppend('li', ul, {text: "Description: " + descriptionArray[0], class:"descriptionInContainer"});
  const Index0Fork = Util.createAndAppend ('li', ul, {text: "Number of Forks: " + forkArray[0], class: 'forksInContainer'});
  const Index0Language = Util.createAndAppend ('li', ul, {text: "Language: "  + languageArray[0], class: 'updatedAtInContainer'});
  const Index0UpdatedAt = Util.createAndAppend ('li', ul, {text: "Updated at: " + date, class: 'updatedAtInContainer'})
                                             
  function renderIndex0(data){
      for (let i = 0; i < data.length; i++){          
          let Image0Link = Util.createAndAppend('li', contributorsUl, {})
          let contributor0Name = Util.createAndAppend('img', Image0Link, {src: data[i].avatar_url, class: 'imageSrc', alt: 'Image Icon of Contributor'});
          let contributor0Link = Util.createAndAppend('a', Image0Link, {text: data[i].login, target: "_blank", href: data[i].html_url, id: 'link'});
          let contributor0Badge = Util.createAndAppend('li', Image0Link, {text:"Contributions: " + data[i].contributions, class: 'badge'});
      } //end for
                                       
      for (let i = 0; i < newArray.length; i++) {
          Util.createAndAppend('option', selectList, {id: "myOption", value: i, text: newArray[i]});
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
          let data = await Util.fetchJSON(contributorAPI)
          await renderContributors(data) 
        } catch(error) {
          this.renderError(error);
        }  
      } //end async getAPI
         
  getAPI(contributorAPI);
  let repoName = Util.createAndAppend('li', ul, { text: "Repository: ", class: 'nameInContainer', function: removeNodes()});
  Util.createAndAppend('a', repoName, { text: newArray[this.selectedIndex], id: 'linkInContainer', target: "_blank", href: htmlArray[this.selectedIndex]});
  Util.createAndAppend('li', ul, {text: "Description: " + descriptionArray[this.selectedIndex], class: 'descriptionInContainer'});
  Util.createAndAppend('li', ul, { text: "Number of Forks: " + forkArray[this.selectedIndex], class: 'forksInContainer'});
  Util.createAndAppend('li', ul, { text: "Language: " + languageArray[this.selectedIndex], class: 'languageInContainer'});
  let dates = new Date (updatedAt[this.selectedIndex]);
  dates = dates.toUTCString();
  Util.createAndAppend('li', ul, {text: "Updated at: " + dates, class: 'updatedAtInContainer'});

  }// end of onchange
  }// end renderIndex0
  } //end renderContainer

  function renderContributors(data){
    for (let i = 0; i < data.length; i++){          
      let ImageLink = Util.createAndAppend('li', contributorsUl, {})
      let contributorName = Util.createAndAppend('img', ImageLink, {src: data[i].avatar_url, class: 'imageSrc', alt: 'Image of Contributor Icon'});
      let contributorLink = Util.createAndAppend('a', ImageLink, {text: data[i].login, target: "_blank", href: data[i].html_url, id: 'link'});
      let contributorBadge = Util.createAndAppend('li', ImageLink, {text:"Contributions: " + data[i].contributions, class: 'badge'});
    } //end for
  }//end renderContributors (called in Repository.js)


  /**
   * Returns an array of contributors as a promise
   */
  /*fetchContributors() {
    return Util.fetchJSON(this.data.contributors_url);
  }

  /**
   * Returns the name of the repository
   
  name() {
    return this.data.name;}*/
   //end name 

  