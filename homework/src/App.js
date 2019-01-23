'use strict';

/* global Util, Repository, Contributor */

class App {
  constructor(url) {
    this.initialize(url);
  }

  /**
   * Initialization
   * @param {string} url The GitHub URL for obtaining the organization's repositories.
   */
  async initialize(url) {
    const root = document.getElementById('root');
    try {
      const data = await Util.fetchJSON(url);
      let repo = new Repository(data); 
      repo.renderContainer(data);
      let contributor = new Contributor(data);
     /// await renderContainer(data);
    } catch (error) {
      this.renderError(error);
    }
    
    
  }


  /**
   * Removes all child elements from a container element
   * @param {*} container Container element to clear
   */
  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  /**
   * Fetch contributor information for the selected repository and render the
   * repo and its contributors as HTML elements in the DOM.
   * @param {number} index The array index of the repository.
   */
  /* async fetchContributorsAndRender(index) {
    try {
      const repo = this.repos[index];
      const contributors = await repo.fetchContributors();

      const container = document.getElementById('container');
      this.clearContainer(container);

      const leftDiv = Util.createAndAppend('div', container);
      const rightDiv = Util.createAndAppend('div', container);

      const contributorList = Util.createAndAppend('ul', rightDiv);

      repo.render(leftDiv);

      contributors
        .map(contributor => new Contributor(contributor))
        .forEach(contributor => contributor.render(contributorList));
    } catch (error) {
      this.renderError(error);
    }
  } */

  /**
   * Render an error to the DOM.
   * @param {Error} error An Error object describing the error.
   */
  
  renderError(err) {
    let catsrc = 'https://us.123rf.com/450wm/photodeti/photodeti1702/photodeti170200132/72587923-cat-holding-stop-sign-isolated-on-white-background-.jpg?ver=6';
    Util.createAndAppend('div', root, { text: err.message, class: 'alert-error' }), 
    Util.createAndAppend('img', root, {id: 'catImage', src: catsrc, class: 'alert-error', alt: 'error image of cat'});
  }


  
}

const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
let index0API = 'https://api.github.com/repos/HackYourFuture/alumni/contributors';


window.onload = () => new App(HYF_REPOS_URL);