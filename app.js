const maze = require('./maze');

document.onkeydown = function(e) {
    e = e || window.event;
    switch (e.keyCode) {
        // left
        case 37:
            m.turn(1);
            break;
        // forward
        case 38:
            m.move_forward();
            break;
        // right
        case 39:
            m.turn(-1);
            break;
    }
    m.render_to_svg(document.querySelector('svg'));
    m.print_to_console();
}

let m = new maze.HexMaze(3, 3);
//m.binary_tree();
m.aldous_broder();
//m.sidewinder();
//m.recursive_backtracker();
//m.wilson();
m.print_to_console();
m.render_to_svg(document.querySelector('svg'));
