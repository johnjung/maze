const maze = require('./trimaze');
const Flatten = globalThis["@flatten-js/core"];
const { Point, Polygon, get_most_distant_cell } = Flatten;

document.onkeydown = function(e) {
    e = e || window.event;
    switch (e.keyCode) {
        // left
        case 37:
            if (fuel) {
                m.turn(1);
                fuel--;
            }
            break;
        // forward
        case 38:
            if (fuel) {
                m.move_forward();
                fuel -= 2;
            }
            break;
        // right
        case 39:
            if (fuel) {
                m.turn(-1);
                fuel--;
            }
            break;
        // turn around
        case 40:
            m.turn(-3);
            break;
    }
    m.render_to_svg_2d(document.querySelector('svg'));
    console.log('fuel: ' + fuel);
    console.log('money: ' + money);
    console.log('load: ' + load);
    console.log('level: ' + level);
}

let width = 20;
let height = 12;
/* the top of this array renders at the bottom of the screen.
 * 8, 4 - 10, 4 / 9, 5 - 11, 5 */
let mask = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
/*
let width = 8;
let height = 6;
let mask = [[0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]];
*/

/*
var overrides = [
    [10, 3],
    [ 8, 4],
    [ 9, 4],
    [10, 4],
    [11, 4],
    [ 9, 5],
    [10, 5],
    [11, 5],
    [12, 5],
    [13, 6]
];
*/

let m = new maze.TriMaze(width, height, 1, mask);
/*
m.cells[0][6][12].link(m.cells[0][6][13]);
m.cells[0][6][13].link(m.cells[0][5][12]);
m.cells[0][5][12].link(m.cells[0][5][11]);
m.cells[0][5][11].link(m.cells[0][5][10]);
m.cells[0][5][10].link(m.cells[0][5][ 9]);
m.cells[0][5][ 9].link(m.cells[0][4][ 8]);
m.cells[0][4][ 8].link(m.cells[0][4][ 9]);
m.cells[0][4][ 9].link(m.cells[0][4][10]);
m.cells[0][4][10].link(m.cells[0][4][11]);
m.cells[0][4][11].link(m.cells[0][3][10]);
*/

m.recursive_backtracker(0, []);

// link between levels.
//m.cells[0][5][9].link(m.cells[1][4][8]);

var cells_from = maze.get_most_distant_cell(m, null);
var cells_to = maze.get_most_distant_cell(m, cells_from['most_distance_cells'][0]);
m.current_cell = cells_from['most_distance_cells'][0];
m.goal_cell = cells_to['most_distance_cells'][0];
console.log(cells_to['max_distance']);
m.finish_setup();


//m.print_to_console();
m.render_to_svg_2d(document.querySelector('svg'));


var fuel = 1000;
var money = 0;
var load = 0;
var level = 1;





