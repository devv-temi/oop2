class Dom {
  static clearEvent(element) {
    const clonedEl = element.cloneNode(true);
    element.replaceWith(clonedEl);
    return clonedEl;
  }

  static moveEl(elementId, newDestination) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestination);
    destinationElement.append(element);
  }
}

class Tooltip {
  remove = () => {
    this.element.remove();
    this.element.parentElement.removeChild(this.element);
  };

  add() {}

  show() {
    // console.log('The tooltip....')
    const tooltipEl = document.createElement("div");
    tooltipEl.className = "card";
    tooltipEl.textContent = "this is just a text content";
    tooltipEl.addEventListener("click", this.remove);
    this, (element = tooltipEl);
    document.body.append(tooltipEl);
  }
}

class ProjectItem {
  constructor(id, updateProjectListFunction, type) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFunction;
    this.connectSwitchButton();
    this.connectMoreInfoButton(type);
  }

  showMoreInfoHandler() {
    const tooltip = new Tooltip();
    tooltip.show();
  }

  connectMoreInfoButton() {
    const projectItemEl = document.getElementById(this.id);
    const moreInfoButton = projectItemEl.querySelector("button:first-of-type");
    moreInfoButton.addEventListener("click", this.showMoreInfoHandler);
  }

  connectSwitchButton(type) {
    const projectItemEl = document.getElementById(this.id);
    let switchBtn = projectItemEl.querySelector("button:last-of-type");
    switchBtn = Dom.clearEvent(switchBtn);
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    switchBtn.addEventListener(
      "click",
      this.updateProjectListHandler.bind(null, this.id)
    );
  }

  update(updateProjectFn, type) {
    this.updateProjectHandler = updateProjectFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    // console.log(prjItems)
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    // console.log(this)
    this.projects.push(project);
    Dom.moveEl(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === proectId)
    // this.projects.splice(projectIndex, 1)
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");
    activeProjectList.setSwitchHandlerFunction(
      finishedProjectList.addProject.bind(finishedProjectList)
    );
    finishedProjectList.setSwitchHandlerFunction(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }
}

// const emailEl = document.getElementById('email')
// function message() {
//   window.open("mailto:balogunjames012@gmail.com?subject=Trying it for the first time&body=My message")
// }
// emailEl.addEventListener('click', message);

App.init();
