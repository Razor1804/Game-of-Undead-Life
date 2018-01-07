let cells;
let rows = 60;
let cols = 60;
let res;
let goButton, resetButton, emptyGridButton;
let radioSpecies;
let toggleZombiesBox, toggleDraw;
let canvas;
let heading, sliderLabel;
let slider;
let boolCycle;

// This function runs one time once the webpage has loaded. The p5 library
// needs to have its functions run in its own base function like setup, draw, etc.
function setup() {
  canvas = createCanvas(720, 720);
  styles();
  res = width / cols;
  cells = new Grid(rows, cols);
  Grid.Populate(cells);
  frameRate(24);
  boolCycle = false;
}

// This function runs on-repeat at the frequency specified by the frameRate('fps')
// function, with the default being 60.
// In this function occurs the program loop which happens when the boolCycle
// variable is true. The rest of the function is left to run so that each frame
// the program recieves input and draws the new entities.
function draw() {
  background(0);
  Grid.Display(cells);

  // This is where the program calculates the next generation of cells based upon
  // the current cells. This is performed with the Calculate function.
  if (boolCycle) {
    let newGrid = new Grid(rows, cols);
    newGrid.Calculate(cells);
    cells = newGrid;
  }

  // This first checks the user's mouse is being pressed, and then that the
  // draw checkbox is ticked. It then uses the mouse coordinates (relative to
  // the canvas's top left corner) and converts them to the index of the selected
  // cell. Then the radio selector for humans, zombies, and dead is checked to
  // decide which type of Being to create.
  if (mouseIsPressed) {
    if (toggleDraw.checked()) {
      let a = floor(mouseX / res);
      let b = floor(mouseY / res);
      let val = radioSpecies.value() || 4;
      if (a >= 0 && b >= 0 && a < cols && b < rows) {
        if (val == 0) {
          cells.a[a][b] = new Human(a, b);
        } else if (val == 1) {
          cells.a[a][b] = new Zombie(a, b);
        } else if (val == 2) {
          cells.a[a][b] = new Dead(a, b);
        }
      }
    }
  }
}

// I call this function to apply the CSS to the HTML elements that were made in
// this script such as the font, and positions.
function styles() {
  goButton = createButton("Go");
  goButton.position(width + 40, 90);
  goButton.mousePressed(goButtonStart);
  goButton.style("height", "32px");
  goButton.style("width", "80px");
  goButton.style("font-family", "Questrial");
  goButton.style("font-size", "18pt");

  resetButton = createButton("Reset");
  resetButton.position(width + 40, 128);
  resetButton.mousePressed(resetButtonReset);
  resetButton.style("height", "32px");
  resetButton.style("width", "80px");
  resetButton.style("font-family", "Questrial");
  resetButton.style("font-size", "18pt");

  emptyGridButton = createButton("Clear Grid");
  emptyGridButton.position(width + 180, 236);
  emptyGridButton.mousePressed(clearGrid);
  emptyGridButton.style("height", "32px");
  emptyGridButton.style("width", "140px");
  emptyGridButton.style("font-family", "Questrial");
  emptyGridButton.style("font-size", "18pt");

  toggleZombiesBox = createCheckbox("Zombies", false);
  toggleZombiesBox.position(width + 24, 168);
  toggleZombiesBox.style("width", "120px");
  toggleZombiesBox.style("height", "32px");
  toggleZombiesBox.style("font-family", "Questrial");
  toggleZombiesBox.style("font-size", "18pt");

  toggleDraw = createCheckbox("Draw Cells", false);
  toggleDraw.position(width + 24, 240);
  toggleDraw.style("width", "160px");
  toggleDraw.style("height", "32px");
  toggleDraw.style("font-family", "Questrial");
  toggleDraw.style("font-size", "18pt");

  radioSpecies = createRadio();
  radioSpecies.position(width + 23, 280);
  radioSpecies.option("Humans", 0);
  radioSpecies.option("Zombies", 1);
  radioSpecies.option("Dead", 2);
  radioSpecies.style("font-family", "Questrial");
  radioSpecies.style("font-size", "14pt");

  slider = createSlider(0, 100, 25, 1);
  slider.position(width + 136, 200);
  sliderLabel = createP("Humans");
  sliderLabel.position(width + 42, 174);
  sliderLabel.style("font-family", "Questrial");
  sliderLabel.style("font-size", "18pt");

  canvas.position(8, 90);
  canvas.style("border", "4px solid #534B81");

  heading = createP("Game of Life");
  heading.position(12, -84);
  heading.style("font-family", "Nova Cut");
  heading.style("font-size", "80px");
  heading.style("color", "#231B51");

  // The function that executes when the Reset button is pressed.
  // Simply clears the grid of live cells.
  function resetButtonReset() {
    goButtonStop();
    boolCycle = true;
    Grid.Populate(cells);
    boolCycle = false;
  }

  function goButtonStart() {
    boolCycle = true;
    goButton.remove();
    goButton = createButton("Stop");
    goButton.position(width + 40, 90);
    goButton.mousePressed(goButtonStop);
    goButton.style("height", "32px");
    goButton.style("width", "80px");
    goButton.style("font-family", "Questrial");
    goButton.style("font-size", "18pt");
  }

  function goButtonStop() {
    boolCycle = false;
    goButton.remove();
    goButton = createButton("Go");
    goButton.position(width + 40, 90);
    goButton.mousePressed(goButtonStart);
    goButton.style("height", "32px");
    goButton.style("width", "80px");
    goButton.style("font-family", "Questrial");
    goButton.style("font-size", "18pt");
  }

  function clearGrid() {
    boolCycle = false;
    goButtonStop();
    Grid.PopulateEmpty(cells);
  }
}