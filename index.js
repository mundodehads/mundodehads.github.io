let ORIGINAL_DATA = {};
let DISPLAY_DATA = {};
let TAG_CLICKED = 0;

function onTagClick(tag) {
  if (tag === 'clearTags') {
    const clearTag = document.getElementById('clearTags');
    clearTag.parentNode.removeChild(clearTag);
    DISPLAY_DATA = Object.assign({}, ORIGINAL_DATA);
    TAG_CLICKED = 0;
    updateBlogPosts();
    return;
  }
  const newDataToDisplay = {};
  for (let repo of Object.keys(ORIGINAL_DATA)) {
    if (ORIGINAL_DATA[repo].language === tag) {
      newDataToDisplay[repo] = {
        html_url: ORIGINAL_DATA[repo].html_url,
        description: ORIGINAL_DATA[repo].description,
        language: ORIGINAL_DATA[repo].language,
        updated_at: ORIGINAL_DATA[repo].updated_at
      };
    }
  }
  DISPLAY_DATA = Object.assign({}, newDataToDisplay);
  TAG_CLICKED++;
  updateBlogPosts();
 }

const showTagList = (tagsList) => {
  const tags = document.getElementById('tags');
  for (let tag of tagsList) {
    tags.innerHTML += `<a onclick="onTagClick(\'${tag}\')" class="tag js" style="background: ${languages[tag.toLowerCase()] || languages.default}; color: ${tag.toLowerCase() === 'javascript' ? 'black' : 'white'}">${tag}</a>`;
  }
}

const updateBlogPosts = () => {
  const blog = document.getElementById('blog');
  blog.innerHTML = '';
  for (let repo of Object.keys(DISPLAY_DATA)) {
    blog.innerHTML += `<a href="${DISPLAY_DATA[repo].html_url}" target="_blank">
      <div class="blog-post">
        <div class="titles">
          <p class="blog-post-title">${repo}</p>
          <p class="blog-post-subtitle">${DISPLAY_DATA[repo].description}</p>
          ${DISPLAY_DATA[repo].language ? `
          <div class="blog-post-tag">
            <div class="ball-align"><div class="balls" style="background: ${languages[DISPLAY_DATA[repo].language.toLowerCase()] || languages.default}"></div></div>
            <div><p class="blog-post-language">${DISPLAY_DATA[repo].language}</p></div>
          </div>
          ` : ''}
        </div>
        <div class="date">
          <p class="blog-post-date">${DISPLAY_DATA[repo].updated_at.split('T')[0]}</p>
        </div>
      </div>
    </a>`;
  }

  if (TAG_CLICKED === 1) {
    const tags = document.getElementById('tags');
    tags.innerHTML += `<a id="clearTags" onclick="onTagClick(\'clearTags\')" class="tag clear">X</a>`;
  }
}

const textField = document.getElementById('awesomeAnimation');

const typewriter = new Typewriter(textField, {
  loop: true,
  delay: 200,
});

typewriter
  .typeString(`<span>Henrique Silva</span>`)
  .pauseFor(200)
  .deleteChars(14)
  .pauseFor(500)
  .typeString(`<span>mundodehads</span>`)
  .pauseFor(200)
  .start()



const languages = {
  typescript: 'blue',
  javascript: 'yellow',
  java: 'red',
  html: 'orange',
  python: 'green',
  php: 'purple',
  kotlin: 'violet',
  'c#': 'darkgreen',
  css: 'purple',
  default: '#00F3FE',
};

fetch('https://api.github.com/users/mundodehads/repos?sort=updated')
  .then(response => response.json())
  .then(data => {
    const tagsList = {};
    for (let repo of data) {
      ORIGINAL_DATA[repo.name] = {
        html_url: repo.html_url,
        description: repo.description,
        language: repo.language,
        updated_at: repo.updated_at
      };
      if (repo.language) tagsList[repo.language] = true;
    }
    DISPLAY_DATA = Object.assign({}, ORIGINAL_DATA);
    updateBlogPosts();
    showTagList(Object.keys(tagsList));
  })
  .catch(error => console.log(error.message));

