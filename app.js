const maze = require('./trimaze');
const Flatten = globalThis["@flatten-js/core"];
const { Point, Polygon, get_costs, get_distances } = Flatten;

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
    m.render_to_svg_2d(document.querySelector('svg'), 0, 0, 0, 0);
}

let width = 20;
let height = 12;
/* the top of this array renders at the bottom of the screen.
 * 8, 4 - 10, 4 / 9, 5 - 11, 5 */
let mask = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

let m = new maze.TriMaze(width, height, 1, mask);

m.recursive_backtracker(0, []);

var costs = maze.get_costs(m, m.cells[0][3][4]);

// make a cost/distance lookup.
var deadends = m.deadends();
var lookup = new Object();
var c, costs, d, distances, l;
for (let i = 0; i < deadends.length; i++) {
    costs = maze.get_costs(m, m.cells[0][deadends[i].y][deadends[i].x]);
    distances = maze.get_distances(m, m.cells[0][deadends[i].y][deadends[i].x]);
    for (let j = 0; j < deadends.length; j++) {
        c = costs[deadends[j].y][deadends[j].x];
        d = distances[deadends[j].y][deadends[j].x];
        l = (c * 1) - d;
        if (Object.hasOwn(lookup, l) == false) {
            lookup[l] = new Set();
        }
        lookup[l].add([deadends[i], deadends[j]]);
        lookup[l].add([deadends[j], deadends[i]]);
    }
}
// lowest cost. 
var i = Math.min(...Object.keys(lookup).map((i) => Number(i)));
// random index.
var j = Math.floor(Math.random() * lookup[i].size);
m.current_cell = Array.from(lookup[i])[j][0];
m.goal_cell = Array.from(lookup[i])[j][1];

m.finish_setup();


m.print_to_console();
var fuel = 1000;
var money = 0;
var load = 0;
var level = 1;
m.render_to_svg_2d(document.querySelector('svg'), fuel, load, money, level);

console.log(m);







