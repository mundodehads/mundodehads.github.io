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

const blog = document.getElementById('blog');

const languages = {
  typescript: 'blue',
  javascript: 'yellow',
  java: 'red',
  html: 'orange',
  python: 'green',
  php: 'purple',
  kotlin: 'violet',
  'c#': 'darkgreen',
  default: '#00F3FE',
};

fetch('https://api.github.com/users/mundodehads/repos?sort=updated')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    for (let repo of data) {
      blog.innerHTML += `<a href="${repo.html_url}" target="_blank">
        <div class="blog-post">
          <div class="titles">
            <p class="blog-post-title">${repo.name}</p>
            <p class="blog-post-subtitle">${repo.description}</p>
            ${repo.language ? `
            <div class="blog-post-tag">
              <div class="ball-align"><div class="balls" style="background: ${languages[repo.language.toLowerCase()] || languages.default}"></div></div>
              <div><p class="blog-post-language">${repo.language}</p></div>
            </div>
            ` : ''}
          </div>
          <div class="date">
            <p class="blog-post-date">${repo.updated_at.split('T')[0]}</p>
          </div>
        </div>
      </a>`;
    }
  })
  .catch(error => console.log(error.message));
