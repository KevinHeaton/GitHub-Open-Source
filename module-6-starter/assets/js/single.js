var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    
    fetch(apiUrl).then(function(response) {
        // repuest was successful
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues) {
  for (var i = 0; i < issues.length; i++) {
      if (issues.length === 0) {
          issueContainerEl.textContent = "This repo has no open issues!";
          return;
      }
      // create a link element to take users to the issue on github
      var issueEl = document.createElement("a");
      issueEl.classList = "list-item flex-row justify-space-between align-center";
      issueEl.setAttribute("href", issues[i].html_url);
      issueEl.setAttribute("target", "_blank");

      // create span to hold issue title
      var titleEl = document.createElement("span");
      titleEl.textContent = issues[i].title;

      // append to container
      issueEl.appendChild(titleEl);

      // create a type element
      var typeEl = document.createAttribute("span");

      // check if issue is an actual issue or a pull request
      if (issues[i].pull_request) {
          typeEl.textContent = "(Pull request)";
      } else {
          titleEl.textContent = "(Issue)";
      }

      // append to container
      issueEl.appendChild(typeEl);

      issueContainerEl.appendChild(issueEl);
  }
}

getRepoIssues("facebook/react");