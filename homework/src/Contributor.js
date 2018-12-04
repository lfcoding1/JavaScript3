'use strict';

/* global Util */

// eslint-disable-next-line no-unused-vars
class Contributor {
  constructor(data) {
    this.data = data;
  }

  /**
   * Render the contributor info to the DOM.
   * @param {HTMLElement} contributorList The parent element in which to render the contributor.
  */
  render(contributorList) {
    function renderContributors(data){
      for (let i = 0; i < data.length; i++){          
        let ImageLink = Util.createAndAppend('li', contributorsUl, {})
        let contributorName = Util.createAndAppend('img', ImageLink, {src: data[i].avatar_url, class: 'imageSrc'});
        let contributorLink = Util.createAndAppend('a', ImageLink, {text: data[i].login, target: "_blank", href: data[i].html_url, id: 'link'});
        let contributorBadge = Util.createAndAppend('li', ImageLink, {text:"Contributions: " + data[i].contributions, class: 'badge'});
      } //end for
    }//end renderContributors
  }
}

//this is not part of Contributor constructor, but is here
function renderContributors(data){
  for (let i = 0; i < data.length; i++){          
    let ImageLink = Util.createAndAppend('li', contributorsUl, {})
    let contributorName = Util.createAndAppend('img', ImageLink, {src: data[i].avatar_url, class: 'imageSrc'});
    let contributorLink = Util.createAndAppend('a', ImageLink, {text: data[i].login, target: "_blank", href: data[i].html_url, id: 'link'});
    let contributorBadge = Util.createAndAppend('li', ImageLink, {text:"Contributions: " + data[i].contributions, class: 'badge'});
  } //end for
}//end renderContributors (called in Repository.js)