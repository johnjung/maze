function sort_fun(a, b) {
    // convert panel a and panel b to lines. 
    var line_a = a.get_line();
    var line_b = b.get_line();

    // triangle from line a to origin.
    var a_to_origin = [
        {x: 0.0, y: 0.0},
        {x: line_a[0][0], y: line_a[0][1]},
        {x: line_a[1][0], y: line_a[1][1]}
    ];

    // polygon from line b away from origin.
    var b_away_from_origin = [
        {x: line_b[0][0], y: line_b[0][1]},
        {x: line_b[0][0] * 100.0, y: line_b[0][1] * 100.0},
        {x: line_b[1][0] * 100.0, y: line_b[1][1] * 100.0},
        {x: line_b[1][0], y: line_b[1][1]}
    ];

    // if they overlap, plane b is in front.
    if (intersect(a_to_origin, b_away_from_origin).length > 0) {
        return -1;
    }

    // triangle from line b to origin.
    var b_to_origin = [
        {x: 0.0, y: 0.0},
        {x: line_b[0][0], y: line_b[0][1]},
        {x: line_b[1][0], y: line_b[1][1]}
    ];

    // polygon from line a away from origin.
    var a_away_from_origin = [
        {x: line_a[0][0], y: line_a[0][1]},
        {x: line_a[0][0] * 100.0, y: line_a[0][1] * 100.0},
        {x: line_a[1][0] * 100.0, y: line_a[1][1] * 100.0},
        {x: line_a[1][0], y: line_a[1][1]}
    ];

    // if they overlap, plane a is in front.
    if (intersect(b_to_origin, a_away_from_origin).length > 0) {
        return 1;
    }
   
    return 0;
}

function can_combine_func(a, b) {
    if (a instanceof Panel && b instanceof Panel) {
        if (a.is_horizontal() && a.is_on_same_plane_as(b)) {
            var min_a = Math.min(...a.get_xs());
            var max_a = Math.max(...a.get_xs());
            var min_b = Math.min(...b.get_xs());
            var max_b = Math.max(...b.get_xs());
        } else if (a.is_vertical() && a.is_on_same_plane_as(b)) {
            var min_a = Math.min(...a.get_zs());
            var max_a = Math.max(...a.get_zs());
            var min_b = Math.min(...b.get_zs());
            var max_b = Math.max(...b.get_zs());
        } else {
            return false;
        }
        return ((min_a < min_b && max_a >= min_b) ||
                (min_b < min_a && max_b >= min_a));
    } else {
        throw new Error('function takes two Panel instances.');
    }
}

function combine_func(a, b) {
    if (a instanceof Panel && b instanceof Panel) {
        if (a.is_horizontal() && b.is_horizontal()) {
            let x1 = Math.min(...a.get_xs().concat(b.get_xs()));
            let x2 = Math.max(...a.get_xs().concat(b.get_xs()));
            let y1 = Math.min(...a.get_ys().concat(b.get_ys()));
            let y2 = Math.max(...a.get_ys().concat(b.get_ys()));
            let z = a[0][2];
            return new Panel(
                new Point(x1, y1, z),
                new Point(x2, y1, z),
                new Point(x2, y2, z),
                new Point(x1, y2, z)
            );
        } else if (a.is_vertical() && b.is_vertical()) {
            let x = a[0][0];
            let y1 = Math.min(...a.get_ys().concat(b.get_ys()));
            let y2 = Math.max(...a.get_ys().concat(b.get_ys()));
            let z1 = Math.min(...a.get_zs().concat(b.get_zs()));
            let z2 = Math.max(...a.get_zs().concat(b.get_zs()));
            return new Panel(
                new Point(x, y1, z1),
                new Point(x, y1, z2),
                new Point(x, y2, z2),
                new Point(x, y2, z1)
            );
        } else {
            return;
        }
    } else {
        throw new Error('function takes two Panel instances.');
    }
}

function combine_panels(panels) {
    if (Array.isArray(panels) && panels.every(p => p instanceof Panel)) {
        for (var a = 0; a < panels.length; a++) {
            for (var b = 0; b < a; b++) {
                if (panels[a] != undefined && panels[b] != undefined && a != b && can_combine_func(panels[a], panels[b])) {
                    var new_p = combine_func(panels[a], panels[b]);
                    delete panels[a];
                    delete panels[b];
                    panels.push(new_p);
                    a = 0;
                    b = 0;
                }
            }
        }
    } else {
        throw new Error('function takes an Array of Panel instances.');
    }
}

function line_segment_intersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false;
    }

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // Lines are parallel
    if (denominator === 0) {
        return false;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false;
    }

    // get x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);

    // if the intersection happens at a line endpoint, return false
    if ((x == x1 && y == y1) ||
        (x == x2 && y == y2) ||
        (x == x3 && y == y3) ||
        (x == x4 && y == y4)) {
        return false
    }

    return [x, y];
}

function split_panel(world, panel) {
    var a_line = panel.get_line();

    var intersections = []; 
    for (var w = 0; w < world.length; w++) {
        if (panel.equals(world[w]) == false) {
            var b_line = world[w].get_line();
            var i = line_segment_intersection(
                a_line[0][0], a_line[0][1], a_line[1][0], a_line[1][1],
                b_line[0][0], b_line[0][1], b_line[1][0], b_line[1][1]
            );
            if (i !== false) {
                intersections.push(i);
            }   
        }
    }   
    if (intersections.length == 0) {
        return [panel];
    } else {
        var new_panels = []; 
        for (var i = 0; i < intersections.length + 1; i++) {
            if (i == 0) {
                var a_point = [a_line[0][0], a_line[0][1]];
            } else {
                var a_point = [intersections[i-1][0], intersections[i-1][1]];
            }   
            if (i < intersections.length) {
                var b_point = [intersections[i][0], intersections[i][1]];
            } else {
                var b_point = [a_line[1][0], a_line[1][1]];
            }   
            new_panels.push(
                new Panel(
                    new Point(a_point[0], -0.5, a_point[1]),
                    new Point(b_point[0], -0.5, b_point[1]),
                    new Point(b_point[0],  0.5, b_point[1]),
                    new Point(a_point[0],  0.5, a_point[1])
                )   
            );  
        }   
        delete panel;
        return new_panels;
    } 
}

function split_panels(panels) {
    if (Array.isArray(panels) && panels.every(p => p instanceof Panel)) {
        var out = []; 
        for (var i = 0; i < panels.length; i++) {
            var new_panels = split_panel(panels, panels[i]);
            for (var j = 0; j < new_panels.length; j++) {
                out.push(new_panels[j]);
            }
        }   
        delete panels;
        return out;
    } else {
        throw new Error('function takes an Array of Panel instances.');
    }
}

class Cell {
    link(cell, bidi=true) {
        this.links.add(cell);
        if (bidi) {
            cell.link(this, false);
        }
    }

    unlink(cell, bidi=true) {
        this.links.remove(cell);
        if (bidi) {
            cell.unlink(this, false);
        }
    }

    is_linked_to(cell) {
        return (this.links.has(cell));
    }
}

class SquareCell extends Cell {
    constructor(y, x) {
        super();
        this.y = y;
        this.x = x;
        this.n = null;
        this.s = null;
        this.e = null;
        this.w = null;
        this.links = new Set();
    }

    get_neighbors() {
        return [this.n, this.s, this.e, this.w];
    }

    l(d) {
        return [this.n, this.w, this.s, this.e][d];
    }

    f(d) {
        return [this.e, this.n, this.w, this.s][d];
    }

    r(d) {
        return [this.s, this.e, this.n, this.w][d];
    }
}

class HexCell extends Cell {
    constructor(y, x) {
        super();
        this.y = y;
        this.x = x;
        this.n = null;
        this.nw = null;
        this.ne = null;
        this.sw = null;
        this.se = null;
        this.s = null;
        this.links = new Set();
    }

    get_neighbors() {
        return [this.nw, this.n, this.ne, this.sw, this.s, this.se];
    }

    l(d) {
        return [this.n, this.nw, this.sw, this.s, this.se, this.ne][d];
    }

    f(d) {
        return [this.ne, this.n, this.nw, this.sw, this.s, this.se][d];
    }

    r(d) {
        return [this.se, this.ne, this.n, this.nw, this.sw, this.s][d];
    }
}

class DiGraph {
    constructor() {
        this.adjacency_list = {};
    }

    add_vertex(v) {
        if (!(v in this.adjacency_list)) {
            this.adjacency_list[v] = [];
        }
    }

    add_edge(v1, v2) {
        this.add_vertex(v1);
        this.add_vertex(v2);
        this.adjacency_list[v1].push(v2);
    }

    delete_vertex(v) {
        delete this.adjacency_list[v];
        for (let k of Object.keys(this.adjacency_list)) {
            while (true) {
                let i = this.adjacency_list[k].indexOf(v);
                if (i >= 0) {
                    delete this.adjacency_list[k][i];
                } else {
                    break;
                }
            }
            this.adjacency_list[k] = this.adjacency_list[k].filter(function(e) {
                return e !== undefined;
            });
        }
    }

    delete_edge(v1, v2) {
        delete this.adjacency_list[v1].indexOf(v2);
        this.adjacency_list[v1] = this.adjacency_list[v1].filter(function(e) {
            return e !== undefined;
        });
    }

    get_in_degree_0_nodes() {
        var zero = Object.keys(this.adjacency_list);
        for (let [k, vertices] of Object.entries(this.adjacency_list)) {
            for (let v of vertices) {
                delete zero[zero.indexOf(v.toString())];
            }
        }
        return zero.filter(function(e) {
            return e !== undefined;
        }).map(function(e) {
            return Number(e);
        });
    }

    print() {
        for (const [v, e] of Object.entries(this.adjacency_list)) {
            console.log(`${v} -> ${e.join(', ')}`);
        }
    }
}

class Panel extends Array {
    constructor(...elements) {
        if (elements.length != 4) {
            throw new Error('length not equal 4');
        }
        else if (!elements.every(e => e instanceof Point)) {
            throw new Error('constructor takes a list of four Points!');
        } else {
            super(...elements);
        }
    }

    get_coords = function(c) {
        let coords = [];
        for (let i = 0; i < this.length; i++) {
            coords.push(this[i][c]);
        }
        return coords;
    }

    get_line = function() {
        var coords = [];
        for (var i=0; i<4; i++) {
            if (this[i][1] > 0.0) {
                coords.push([this[i][0], this[i][2]]);
            }
        }
        return coords;
    }

    get_xs = function() {
        return this.get_coords(0);
    }

    get_ys = function() {
        return this.get_coords(1);
    }

    get_zs = function() {
        return this.get_coords(2);
    }

    get_min_z = function() {
        return Math.min(...this.get_zs());
    }

    get_max_z = function() {
        return Math.max(...this.get_zs());
    }

    is_horizontal = function() {
        return new Set(this.get_zs()).size == 1;
    }

    is_vertical = function() {
        return new Set(this.get_xs()).size == 1;
    }

    is_on_same_plane_as = function(p) {
        if (this.is_horizontal() && p.is_horizontal() && this.get_zs()[0] == p.get_zs()[0]) {
            return true;
        } else if (this.is_vertical() && p.is_vertical() && this.get_xs()[0] == p.get_xs()[0]) {
            return true;
        } else {
            return false;
        }
    }

    equals = function(p) {
        var found = new Set();
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this[i][0] == p[j][0] &&
                    this[i][1] == p[j][1] &&
                    this[i][2] == p[j][2]) {
                    found.add(i);
                }
            }
        }
        return found.size == 4;
    }

    get_center_point = function() {
        return new Point(
            (this[0][0] + this[1][0] + this[2][0] + this[3][0]) / 4,
            (this[0][1] + this[1][1] + this[2][1] + this[3][1]) / 4,
            (this[0][2] + this[1][2] + this[2][2] + this[3][2]) / 4
        )
    }

    clone = function() {
        return new Panel(
            new Point(this[0][0], this[0][1], this[0][2]),
            new Point(this[1][0], this[1][1], this[1][2]),
            new Point(this[2][0], this[2][1], this[2][2]),
            new Point(this[3][0], this[3][1], this[3][2])
        );
    }
}

class Point extends Array {
    constructor(...elements) {
        if (elements.length == 3 &&
            elements.every(e => typeof e === 'number')) {
            super(...elements);
        } else {
            throw new Error('constructor takes 3 numbers.');
        }
    }

    multiply(x, y, z) {
        this[0] *= x;
        this[1] *= y;
        this[2] *= z;
    }

    add(x, y, z) {
        this[0] += x;
        this[1] += y;
        this[2] += z;
    }
}

class Maze {
    aldous_broder() {
        let visited = Array(this.width * this.height).fill(false);
  
        let y = Math.floor(Math.random() * (this.height));
        let x = Math.floor(Math.random() * (this.width));
        let c = this.cells[(y * this.width) + x];
        let n = null, neighbors = [];

        do {
            visited[c.y * this.width + c.x] = true;
            neighbors = c.get_neighbors();
            do {
                n = neighbors[Math.floor(Math.random() * neighbors.length)];
            } while (n == null);
            if (visited[n.y * this.width + n.x] == false) {
                c.link(n);
            }
            c = n;
        } while (visited.indexOf(false) > -1);
    }

    wilson() {
        function get_unvisited_cell(cells, visited, width) {
            if (visited.indexOf(false) == -1) {
                return undefined;
            } else {
                var c;
                while (true) {
                    c = cells[Math.floor(Math.random() * cells.length)];
                    if (visited[c.y * width + c.x] == false) {
                        return c;
                    }
                }
            }
        }

        function get_random_neighbor(c) {
            do {
                var n = [c.s, c.e, c.n, c.w][Math.floor(Math.random() * 4)];
            } while (n == null);
            return n;
        }

        function link_path(path, cells, visited, width) {
            if (!(Array.isArray(path) && path.every(p => Array.isArray(p) && p.length == 2))) { 
                console.log(path);
                throw new Error('function takes path, an array of length 2 arrays.');
            }
            if (!(Array.isArray(cells) && cells.every(c =>  c instanceof SquareCell))) {
                throw new Error('function takes cells, an array of SquareCells.');
            }
            if (!(Array.isArray(visited) && visited.every(v => typeof v == 'boolean'))) {
                throw new Error('function take visited, an array of booleans.');
            }
            if (!(typeof width == 'number')) {
                throw new Error('function takes width, a number.');
            }
 
            var i, j, i_coords, j_coords;
            i_coords = path.shift();
            if (i_coords == undefined) {
                return;
            }
            i = cells[i_coords[1] * width + i_coords[0]];
            visited[i_coords[1] * width + i_coords[0]] = true;
            while (true) {
                if (path.length == 0) {
                    return;
                } else {
                    j_coords = path.shift();
                    visited[j_coords[1] * width + j_coords[0]] = true;
                    j = cells[j_coords[1] * width + j_coords[0]];
                    i.link(j);
                    i = j;
                }
            }
        }

        function get_index_of_cell_in_path(path, coords) {
            for (var i = 0; i < path.length; i++) {
                if (coords[0] == path[i][0] && coords[1] == path[i][1]) {
                    return i;
                }
            }
            return -1;
        }

        var visited = Array(this.width * this.height).fill(false);
        var path = [];
        var c, i, j, p;

        // mark a random cell as visited.
        visited[Math.floor(Math.random() * this.height * this.width)] = true;

        // choose any unvisited cell to start.
        c = get_unvisited_cell(this.cells, visited, this.width);
        path.push([c.x, c.y]);

        while (true) {
            if (visited.indexOf(false) == -1) {
                return;
            }

            c = get_random_neighbor(c);
            path.push([c.x, c.y]);

            if (visited[c.y * this.width + c.x]) {
                link_path(path, this.cells, visited, this.width);
                c = get_unvisited_cell(this.cells, visited, this.width);
                if (c != undefined) {
                    path.push([c.x, c.y]);
                }
            } else {
                p = get_index_of_cell_in_path(path, [c.x, c.y]);
                if (p > -1) {
                    path = path.slice(0, p);
                }
                path.push([c.x, c.y]);
            }
        }
    }

    hunt_and_kill() {
        var visited = new Array(this.width * this.height).fill(false);
        var n_arr, n;

        var c = this.cells[Math.floor(Math.random() * this.width * this.height)];
        visited[c.y * this.width + c.x] = true;

        while (true) {
            if (visited.indexOf(false) == -1) {
                break;
            }
            n_arr = [c.n, c.s, c.e, c.w].filter((i) => i != undefined && visited[i.y * this.width + i.x] == false);
            if (n_arr.length > 0) {
                n = n_arr[Math.floor(Math.random() * n_arr.length)];
                c.link(n); 
                visited[n.y * this.width + n.x] = true;
                c = n;
            } else {
                for (let y = this.height - 1; y >= 0; y--) {
                    for (let x = 0; x < this.width; x++) {
                        if (visited[y * this.width + x] == false) {
                            c = this.cells[y * this.width + x];
                            n_arr = [c.n, c.s, c.e, c.w].filter((i) => i != undefined && visited[i.y * this.width + i.x] == true);
                            if (n_arr.length > 0) {
                                n = n_arr[Math.floor(Math.random() * n_arr.length)];
                                c.link(n);
                                visited[c.y * this.width + c.x] = true;
                            }
                        }
                    }
                }
            }
        }
    }

    recursive_backtracker() {
        var n_arr, n;
        var stack = [];
        var visited = new Array(this.width * this.height).fill(false);

        var c = this.cells[0];
        stack.push(c);
        visited[c.y * this.width + c.x] = true;

        while (true) {
            if (stack.length == 0) {
                break;
            }

            n_arr = [c.n, c.s, c.e, c.w].filter((i) => i != undefined && visited[i.y * this.width + i.x] == false);
            if (n_arr.length > 0) {
                n = n_arr[Math.floor(Math.random() * n_arr.length)];
                c.link(n);
                stack.push(n);
                visited[n.y * this.width + n.x] = true;
                c = n;
            } else {
                stack.pop();
                if (stack.length > 0) {
                    c = stack[stack.length - 1];
                }
            }
        }
    }
            
}

class SquareMaze extends Maze {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.cells = [];

        for (let y = 0; y < this.width; y++) {
            for (let x = 0; x < this.height; x++) {
                this.cells.push(new SquareCell(y, x));
            }
        }
        for (let y = 0; y < this.width; y++) {
            for (let x = 0; x < this.width; x++) {
                if (y > 0) {
                    this.cells[(y * this.width) + x].n = this.cells[((y - 1) * this.width) + x];
                } 
                if (y < (height - 1)) {
                    this.cells[(y * this.width) + x].s = this.cells[((y + 1) * this.width) + x];
                }
                if (x < (this.width - 1)) {
                    this.cells[(y * this.width) + x].e = this.cells[(y * this.width) + (x + 1)];
                }
                if (x > 0) {
                    this.cells[(y * this.width) + x].w = this.cells[(y * this.width) + (x - 1)];
                }
            }
        }

        this.current_cell = this.cells[(this.height - 1) * this.width];
        this.direction = 1;
    }

    turn(d) {
        this.direction += d;
        while (this.direction < 0) {
            this.direction += 4;
        }
        while (this.direction > 3) {
            this.direction -= 4;
        }
    }

    move_forward() {
        if (this.direction == 0) {
            if (this.current_cell.is_linked_to(this.current_cell.e)) {
                this.current_cell = this.current_cell.e;
            }
        } else if (this.direction == 1) {
            if (this.current_cell.is_linked_to(this.current_cell.n)) {
                this.current_cell = this.current_cell.n
            }
        } else if (this.direction == 2) {
            if (this.current_cell.is_linked_to(this.current_cell.w)) {
                this.current_cell = this.current_cell.w
            }
        } else if (this.direction == 3) {
            if (this.current_cell.is_linked_to(this.current_cell.s)) {
                this.current_cell = this.current_cell.s
            }
        }
    }

    binary_tree() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let c = this.cells[(y * this.width) + x];
                if (y == 0) {
                    if (x < this.width - 1) {
                        c.link(c.e);
                    } 
                } else {
                    if (x < this.width - 1) {
                        if (Math.floor(Math.random() * 2) == 0) {
                            c.link(c.e);
                        } else {
                            c.link(c.n);
                        }
                    } else {
                        c.link(c.n);
                    }
                }
            }
        }
    }

    sidewinder() {
        for (let y = 0; y < this.height; y++) {
            let run_starts_at = 0;
            for (let x = 0; x < this.width; x++) {
                let c = this.cells[(y * this.width) + x];
                if (y == 0) {
                    if (x < this.width - 1) {
                        c.link(c.e);
                    }
                } else {
                    if (x < this.width - 1) {
                        if (Math.floor(Math.random() * 2) == 0) {
                            c.link(c.e);
                        } else {
                            let r = run_starts_at + Math.floor(Math.random() * (x - run_starts_at + 1));
                            let n = this.cells[(y * this.width) + r];
                            n.link(n.n);
                            run_starts_at = x + 1;
                        }
                    } else {
                        c.link(c.n);
                    }
                }
            }
        }
    }

    print_to_console() {
        let output_grid = [];

        // draw all walls 
        for (let y = 0; y < (this.height * 2) + 1; y++) {
            let row = [];
            for (let x = 0; x < (this.width * 4) + 1; x++) {
                if (y % 2 == 0) {
                    if (x % 4 == 0) {
                        row.push('+');
                    } else {
                        row.push('-');
                    }
                } else {
                    if (x % 4 == 0) {
                        row.push('|');
                    } else {
                        row.push(' ');
                    }
                }
            }
            output_grid.push(row);
        }

        // erase walls where paths are open   
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let cf = this.cells[((y - 1) * this.width) + x]; // the cell in front
                let cc = this.cells[(y * this.width) + x];       // the current cell
                let cr = this.cells[(y * this.width) + x + 1];   // the cell to the right
                if (y > 0 && cc.links.has(cf)) {
                    output_grid[(y * 2)][(x * 4) + 1] = ' ';
                    output_grid[(y * 2)][(x * 4) + 2] = ' ';
                    output_grid[(y * 2)][(x * 4) + 3] = ' ';
                }
                if (x < (this.width - 1) && cc.links.has(cr)) {
                    output_grid[((y * 2) + 1)][(x * 4) + 4] = ' ';
                }
            }
        }

        // plot current cell
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.cells[(y * this.width) + x] == this.current_cell) {
                    output_grid[(y * 2) + 1][(x * 4) + 2] = ['>', '^', '<', 'v'][this.direction];
                }
            }
        }

        // output grid
        for (let y = 0; y < output_grid.length; y++) {
            console.log(output_grid[y].join(''));
        }
    }

    get_world() {
        let world = [];
        let depth = 1;
        var c = this.current_cell;
        while (c) {
            var l = c.l(this.direction);
            var r = c.r(this.direction);
            if (l && (!l.l(this.direction) || !l.is_linked_to(l.l(this.direction)))) {
                world.push(
                    new Panel(
                        new Point(-1.5, -0.5, 1.0 * [depth + 0]), 
                        new Point(-1.5, -0.5, 1.0 * [depth + 1]), 
                        new Point(-1.5,  0.5, 1.0 * [depth + 1]), 
                        new Point(-1.5,  0.5, 1.0 * [depth + 0])
                    )
                );
            }
            if (l && (!l.f(this.direction) || !l.is_linked_to(l.f(this.direction)))) {
                world.push(
                    new Panel(
                        new Point(-1.5, -0.5, 1.0 * [depth + 1]),
                        new Point(-0.5, -0.5, 1.0 * [depth + 1]),
                        new Point(-0.5,  0.5, 1.0 * [depth + 1]),
                        new Point(-1.5,  0.5, 1.0 * [depth + 1])
                    )
                )
            }
            if (!c.l(this.direction) || !c.is_linked_to(c.l(this.direction))) {
                world.push(
                    new Panel(
                        new Point(-0.5, -0.5, 1.0 * [depth + 0]), 
                        new Point(-0.5, -0.5, 1.0 * [depth + 1]), 
                        new Point(-0.5,  0.5, 1.0 * [depth + 1]), 
                        new Point(-0.5,  0.5, 1.0 * [depth + 0])
                    )
                );
            }
            if (!c.f(this.direction) || !c.is_linked_to(c.f(this.direction))) {
                world.push(
                    new Panel(
                        new Point(-0.5, -0.5, 1.0 * [depth + 1]),
                        new Point( 0.5, -0.5, 1.0 * [depth + 1]),
                        new Point( 0.5,  0.5, 1.0 * [depth + 1]),
                        new Point(-0.5,  0.5, 1.0 * [depth + 1])
                    )
                )
            }
            if (!c.r(this.direction) || !c.is_linked_to(c.r(this.direction))) {
                world.push(
                    new Panel(
                        new Point(0.5, -0.5, 1.0 * [depth + 0]), 
                        new Point(0.5, -0.5, 1.0 * [depth + 1]), 
                        new Point(0.5,  0.5, 1.0 * [depth + 1]), 
                        new Point(0.5,  0.5, 1.0 * [depth + 0])
                    )
                )
            }
            if (r && (!r.f(this.direction) || !r.is_linked_to(r.f(this.direction)))) {
                world.push(
                    new Panel(
                        new Point( 0.5, -0.5, 1.0 * [depth + 1]),
                        new Point( 1.5, -0.5, 1.0 * [depth + 1]),
                        new Point( 1.5,  0.5, 1.0 * [depth + 1]),
                        new Point( 0.5,  0.5, 1.0 * [depth + 1])
                    )
                )
            }
            if (r && (!r.r(this.direction) || !r.is_linked_to(r.r(this.direction)))) {
                world.push(
                    new Panel(
                        new Point(1.5, -0.5, 1.0 * [depth + 0]), 
                        new Point(1.5, -0.5, 1.0 * [depth + 1]), 
                        new Point(1.5,  0.5, 1.0 * [depth + 1]), 
                        new Point(1.5,  0.5, 1.0 * [depth + 0])
                    )
                );
            }
            depth += 1;
            c = c.f(this.direction);
        }
        world.reverse();
        return world;
    }

    render_to_svg(svg) {
        const svgns = 'http://www.w3.org/2000/svg';

        let world = this.get_world();
        combine_panels(world);

        // for some mysterious reason, I can't wrap this in a function.
        var out = [];
        for (var i = 0; i < world.length; i++) {
            if (world[i] != undefined) {
                out.push(world[i].clone());
            }
        }
        world = out;

        // jej
        world = split_panels(world);

        var g = new DiGraph();
        for (var i = 0; i < world.length; i++) {
            for (var j = 0; j < i; j++) {
                var s = sort_fun(world[i], world[j]);
                if (s < 0) {
                    g.add_edge(i, j);
                } else if (s == 0) {
                    g.add_vertex(i);
                    g.add_vertex(j);
                } else if (s > 0) {
                    g.add_edge(j, i);
                }
            }
        }
        
        let width = 300;
        let height = 300;
        let scale = 300;

        while (svg.hasChildNodes()) {
            svg.removeChild(svg.firstChild);
        }

        // render this to a canvas or an SVG.
        while (true) {
            let zero_degree_nodes = g.get_in_degree_0_nodes();
            if (zero_degree_nodes.length == 0) {
                break;
            } else {
                let i = zero_degree_nodes[0];
                let coords = world[i];
                let polygon = document.createElementNS(svgns, 'polygon');
                polygon.setAttribute(
                    'points',
                    (( width / 2) + (coords[0][0] / coords[0][2] * scale)) + ', ' + 
                    ((height / 2) + (coords[0][1] / coords[0][2] * scale)) + ' ' + 
                    (( width / 2) + (coords[1][0] / coords[1][2] * scale)) + ', ' + 
                    ((height / 2) + (coords[1][1] / coords[1][2] * scale)) + ' ' +
                    (( width / 2) + (coords[2][0] / coords[2][2] * scale)) + ', ' +
                    ((height / 2) + (coords[2][1] / coords[2][2] * scale)) + ' ' +
                    (( width / 2) + (coords[3][0] / coords[3][2] * scale)) + ', ' +
                    ((height / 2) + (coords[3][1] / coords[3][2] * scale)) 
                );
                polygon.setAttribute('fill', 'white');
                polygon.setAttribute('stroke', 'black');
                polygon.setAttribute('stroke-width', '2px');
                polygon.setAttribute('stroke-linejoin', 'round');
                polygon.setAttribute('vector-effect', 'non-scaling-stroke');
    
                svg.appendChild(polygon);
                g.delete_vertex(i);
            }
        }
    }
}

class HexMaze extends Maze {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.cells = [];

        for (let y = 0; y < this.width; y++) {
            for (let x = 0; x < this.height; x++) {
                this.cells.push(new HexCell(y, x));
            }
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // ne
                if (x < this.width - 1) {
                    if (x % 2 == 0 && y < this.height - 1) {
                        this.cells[y * this.width + x].ne = this.cells[(y + 1) * this.width + (x + 1)];
                    } else if (x % 2 == 1) {
                        this.cells[y * this.width + x].ne = this.cells[(y + 0) * this.width + (x + 1)];
                    }
                }
                // n
                if (y < this.height -1) {
                    this.cells[y * this.width + x].n = this.cells[(y + 1) * this.width + x];
                }
                // nw
                if (x > 0) {
                    if (x % 2 == 0 && y > this.height - 1) {
                        this.cells[y * this.width + x].nw = this.cells[(y + 1) * this.width + (x - 1)];
                    } else if (x % 2 == 1) {
                        this.cells[y * this.width + x].nw = this.cells[(y + 0) * this.width + (x - 1)];
                    }
                }

                // sw
                if (x > 0) {
                    if (x % 2 == 0) {
                        this.cells[y * this.width + x].sw = this.cells[(y + 0) * this.width + (x - 1)];
                    } else if (x % 2 == 1 && y > 0) {
                        this.cells[y * this.width + x].sw = this.cells[(y - 1) * this.width + (x - 1)];
                    }
                }

                // s
                if (y > 0) {
                    this.cells[y * this.width + x].s = this.cells[(y - 1) * this.width + x];
                }
                // se
                if (x < this.width - 1) {
                    if (x % 2 == 0) {
                        this.cells[y * this.width + x].se = this.cells[(y + 0) * this.width + (x + 1)];
                    } else if (x % 2 == 1 && y > 0) {
                        this.cells[y * this.width + x].se = this.cells[(y - 1) * this.width + (x + 1)];
                    }
                }
            }
        }

        this.current_cell = this.cells[0];
        this.direction = 1;
    }

    turn(d) {
        this.direction += d;
        while (this.direction < 0) {
            this.direction += 6;
        }
        while (this.direction > 3) {
            this.direction -= 6;
        }
    }

    move_forward() {
        if (this.direction == 0) {
            if (this.current_cell.is_linked_to(this.current_cell.ne)) {
                this.current_cell = this.current_cell.ne;
            }
        } else if (this.direction == 1) {
            if (this.current_cell.is_linked_to(this.current_cell.n)) {
                this.current_cell = this.current_cell.n
            }
        } else if (this.direction == 2) {
            if (this.current_cell.is_linked_to(this.current_cell.nw)) {
                this.current_cell = this.current_cell.nw
            }
        } else if (this.direction == 3) {
            if (this.current_cell.is_linked_to(this.current_cell.sw)) {
                this.current_cell = this.current_cell.sw
            }
        } else if (this.direction == 4) {
            if (this.current_cell.is_linked_to(this.current_cell.s)) {
                this.current_cell = this.current_cell.s
            }
        } else if (this.direction == 5) {
            if (this.current_cell.is_linked_to(this.current_cell.se)) {
                this.current_cell = this.current_cell.se
            }
        }
    }

    wilson() {
        function get_unvisited_cell(cells, visited, width) {
            if (visited.indexOf(false) == -1) {
                return undefined;
            } else {
                var c;
                while (true) {
                    c = cells[Math.floor(Math.random() * cells.length)];
                    if (visited[c.y * width + c.x] == false) {
                        return c;
                    }
                }
            }
        }

        function get_random_neighbor(c) {
            do {
                var n = [c.s, c.e, c.n, c.w][Math.floor(Math.random() * 4)];
            } while (n == null);
            return n;
        }

        function link_path(path, cells, visited, width) {
            if (!(Array.isArray(path) && path.every(p => Array.isArray(p) && p.length == 2))) { 
                console.log(path);
                throw new Error('function takes path, an array of length 2 arrays.');
            }
            if (!(Array.isArray(cells) && cells.every(c =>  c instanceof Cell))) {
                throw new Error('function takes cells, an array of Cells.');
            }
            if (!(Array.isArray(visited) && visited.every(v => typeof v == 'boolean'))) {
                throw new Error('function take visited, an array of booleans.');
            }
            if (!(typeof width == 'number')) {
                throw new Error('function takes width, a number.');
            }
 
            var i, j, i_coords, j_coords;
            i_coords = path.shift();
            if (i_coords == undefined) {
                return;
            }
            i = cells[i_coords[1] * width + i_coords[0]];
            visited[i_coords[1] * width + i_coords[0]] = true;
            while (true) {
                if (path.length == 0) {
                    return;
                } else {
                    j_coords = path.shift();
                    visited[j_coords[1] * width + j_coords[0]] = true;
                    j = cells[j_coords[1] * width + j_coords[0]];
                    i.link(j);
                    i = j;
                }
            }
        }

        function get_index_of_cell_in_path(path, coords) {
            for (var i = 0; i < path.length; i++) {
                if (coords[0] == path[i][0] && coords[1] == path[i][1]) {
                    return i;
                }
            }
            return -1;
        }

        var visited = Array(this.width * this.height).fill(false);
        var path = [];
        var c, i, j, p;

        // mark a random cell as visited.
        visited[Math.floor(Math.random() * this.height * this.width)] = true;

        // choose any unvisited cell to start.
        c = get_unvisited_cell(this.cells, visited, this.width);
        path.push([c.x, c.y]);

        while (true) {
            if (visited.indexOf(false) == -1) {
                return;
            }

            c = get_random_neighbor(c);
            path.push([c.x, c.y]);

            if (visited[c.y * this.width + c.x]) {
                link_path(path, this.cells, visited, this.width);
                c = get_unvisited_cell(this.cells, visited, this.width);
                if (c != undefined) {
                    path.push([c.x, c.y]);
                }
            } else {
                p = get_index_of_cell_in_path(path, [c.x, c.y]);
                if (p > -1) {
                    path = path.slice(0, p);
                }
                path.push([c.x, c.y]);
            }
        }
    }

    hunt_and_kill() {
        var visited = new Array(this.width * this.height).fill(false);
        var n_arr, n;

        var c = this.cells[Math.floor(Math.random() * this.width * this.height)];
        visited[c.y * this.width + c.x] = true;

        while (true) {
            if (visited.indexOf(false) == -1) {
                break;
            }
            n_arr = [c.n, c.s, c.e, c.w].filter((i) => i != undefined && visited[i.y * this.width + i.x] == false);
            if (n_arr.length > 0) {
                n = n_arr[Math.floor(Math.random() * n_arr.length)];
                c.link(n); 
                visited[n.y * this.width + n.x] = true;
                c = n;
            } else {
                for (let y = this.height - 1; y >= 0; y--) {
                    for (let x = 0; x < this.width; x++) {
                        if (visited[y * this.width + x] == false) {
                            c = this.cells[y * this.width + x];
                            n_arr = [c.n, c.s, c.e, c.w].filter((i) => i != undefined && visited[i.y * this.width + i.x] == true);
                            if (n_arr.length > 0) {
                                n = n_arr[Math.floor(Math.random() * n_arr.length)];
                                c.link(n);
                                visited[c.y * this.width + c.x] = true;
                            }
                        }
                    }
                }
            }
        }
    }

    recursive_backtracker() {
        var n_arr, n;
        var stack = [];
        var visited = new Array(this.width * this.height).fill(false);

        var c = this.cells[0];
        stack.push(c);
        visited[c.y * this.width + c.x] = true;

        while (true) {
            if (stack.length == 0) {
                break;
            }

            n_arr = [c.n, c.s, c.e, c.w].filter((i) => i != undefined && visited[i.y * this.width + i.x] == false);
            if (n_arr.length > 0) {
                n = n_arr[Math.floor(Math.random() * n_arr.length)];
                c.link(n);
                stack.push(n);
                visited[n.y * this.width + n.x] = true;
                c = n;
            } else {
                stack.pop();
                if (stack.length > 0) {
                    c = stack[stack.length - 1];
                }
            }
        }
    }
            
    print_to_console() {
        let output_grid = [];

        var ox = this.width * 6 + 3;
        if (this.height == 1) {
            var oy = this.height * 4 + 1;
        } else {
            var oy = this.height * 4 + 3;
        }

        // fill output grid with spaces.
        for (var y = 0; y < oy; y++) {
            output_grid.push(new Array(ox).fill(' '));
        }

        // draw all walls.
        var ix, iy;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                ix = x * 6 + 4;
                if (x % 2 == 0) {
                    iy = oy - (y * 4 + 5);
                } else {
                    iy = oy - (y * 4 + 3);
                }
                output_grid[iy - 2][ix - 2] = 'x';
                output_grid[iy - 2][ix - 1] = '-';
                output_grid[iy - 2][ix    ] = '-';
                output_grid[iy - 2][ix + 1] = '-';
                output_grid[iy - 2][ix + 2] = 'x';
                output_grid[iy - 1][ix - 3] = '/';
                output_grid[iy - 1][ix + 3] = '\\';
                output_grid[iy    ][ix - 4] = 'x';
                output_grid[iy    ][ix + 4] = 'x';
                output_grid[iy + 1][ix - 3] = '\\';
                output_grid[iy + 1][ix + 3] = '/';
                output_grid[iy + 2][ix - 2] = 'x';
                output_grid[iy + 2][ix - 1] = '-';
                output_grid[iy + 2][ix    ] = '-';
                output_grid[iy + 2][ix + 1] = '-';
                output_grid[iy + 2][ix + 2] = 'x';
            }
        }
      
        // erase walls where paths are open and mark direction.
        var c;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                ix = x * 6 + 4;
                if (x % 2 == 0) {
                    iy = oy - (y * 4 + 5);
                } else {
                    iy = oy - (y * 4 + 3);
                }
                c = this.cells[y * this.width + x];
                if (c.ne && c.links.has(c.ne)) {
                    output_grid[iy - 1][ix + 3] = ' ';
                }
                if (c.n && c.links.has(c.n)) {
                    output_grid[iy - 2][ix - 1] = ' ';
                    output_grid[iy - 2][ix    ] = ' ';
                    output_grid[iy - 2][ix + 1] = ' ';
                }
                if (c.nw && c.links.has(c.nw)) {
                    output_grid[iy - 1][ix - 3] = ' ';
                }
                if (c.sw && c.links.has(c.sw)) {
                    output_grid[iy + 1][ix - 3] = ' ';
                }
                if (c.s && c.links.has(c.s)) {
                    output_grid[iy + 2][ix - 1] = ' ';
                    output_grid[iy + 2][ix    ] = ' ';
                    output_grid[iy + 2][ix + 1] = ' ';
                }
                if (c.se && c.links.has(c.se)) {
                    output_grid[iy + 1][ix + 3] = ' ';
                }
                if (x == this.current_cell.x && y == this.current_cell.y) {
                    output_grid[iy][ix] = ['/', '^', '\\', '/', 'v', '\\'][this.direction];
                }
            }
        }

        // output grid
        for (let y = 0; y < output_grid.length; y++) {
            console.log(output_grid[y].join(''));
        }
    }

    // jej- update this for hexes. 
    get_world() {
        let world = [];
        let depth = 1;
        var c = this.current_cell;
        let zu = Math.sqrt(1 - Math.pow(1 / 2, 2));
        while (c) {
            var l = c.l(this.direction);
            var r = c.r(this.direction);
            /*
            if (l && (!l.l(this.direction) || !l.is_linked_to(l.l(this.direction)))) {
                world.push(
                    new Panel(
                        new Point(-1.5, -0.5, 1.0 * [depth + 0]), 
                        new Point(-1.5, -0.5, 1.0 * [depth + 1]), 
                        new Point(-1.5,  0.5, 1.0 * [depth + 1]), 
                        new Point(-1.5,  0.5, 1.0 * [depth + 0])
                    )
                );
            }
            if (l && (!l.f(this.direction) || !l.is_linked_to(l.f(this.direction)))) {
                world.push(
                    new Panel(
                        new Point(-1.5, -0.5, 1.0 * [depth + 1]),
                        new Point(-0.5, -0.5, 1.0 * [depth + 1]),
                        new Point(-0.5,  0.5, 1.0 * [depth + 1]),
                        new Point(-1.5,  0.5, 1.0 * [depth + 1])
                    )
                )
            }
            */
            console.log(c);
            console.log(c.l(this.direction));
            if (!c.l(this.direction) || !c.is_linked_to(c.l(this.direction))) {
                world.push(
                    new Panel(
                        new Point(-1.0, -0.5, 1 + (1 * zu * depth)), 
                        new Point(-0.5, -0.5, 1 + (2 * zu * depth)),
                        new Point(-0.5,  0.5, 1 + (2 * zu * depth)),
                        new Point(-1.0,  0.5, 1 + (1 * zu * depth))
                    )
                );
            }
            console.log(c.f(this.direction));
            if (!c.f(this.direction) || !c.is_linked_to(c.f(this.direction))) {
                world.push(
                    new Panel(
                        new Point(-0.5, -0.5, 1 + (2 * zu * depth)),
                        new Point( 0.5, -0.5, 1 + (2 * zu * depth)),
                        new Point( 0.5,  0.5, 1 + (2 * zu * depth)),
                        new Point(-0.5,  0.5, 1 + (2 * zu * depth))
                    )
                )
            }
            console.log(c.r(this.direction));
            if (!c.r(this.direction) || !c.is_linked_to(c.r(this.direction))) {
                world.push(
                    new Panel(
                        new Point(0.5, -0.5, 1 + (2 * zu * depth)),
                        new Point(1.0, -0.5, 1 + (1 * zu * depth)),
                        new Point(1.0,  0.5, 1 + (1 * zu * depth)),
                        new Point(0.5,  0.5, 1 + (2 * zu * depth))
                    )
                )
            }
            /*
            if (r && (!r.f(this.direction) || !r.is_linked_to(r.f(this.direction)))) {
                world.push(
                    new Panel(
                        new Point( 0.5, -0.5, 1.0 * [depth + 1]),
                        new Point( 1.5, -0.5, 1.0 * [depth + 1]),
                        new Point( 1.5,  0.5, 1.0 * [depth + 1]),
                        new Point( 0.5,  0.5, 1.0 * [depth + 1])
                    )
                )
            }
            if (r && (!r.r(this.direction) || !r.is_linked_to(r.r(this.direction)))) {
                world.push(
                    new Panel(
                        new Point(1.5, -0.5, 1.0 * [depth + 0]), 
                        new Point(1.5, -0.5, 1.0 * [depth + 1]), 
                        new Point(1.5,  0.5, 1.0 * [depth + 1]), 
                        new Point(1.5,  0.5, 1.0 * [depth + 0])
                    )
                );
            }
            */
            depth += 1;
            c = c.f(this.direction);
        }
        world.reverse();
        return world;
    }

    render_to_svg(svg) {
        const svgns = 'http://www.w3.org/2000/svg';

        let world = this.get_world();
        combine_panels(world);

        // for some mysterious reason, I can't wrap this in a function.
        var out = [];
        for (var i = 0; i < world.length; i++) {
            if (world[i] != undefined) {
                out.push(world[i].clone());
            }
        }
        world = out;

        // jej
        world = split_panels(world);

        var g = new DiGraph();
        for (var i = 0; i < world.length; i++) {
            for (var j = 0; j < i; j++) {
                var s = sort_fun(world[i], world[j]);
                if (s < 0) {
                    g.add_edge(i, j);
                } else if (s == 0) {
                    g.add_vertex(i);
                    g.add_vertex(j);
                } else if (s > 0) {
                    g.add_edge(j, i);
                }
            }
        }
        
        let width = 300;
        let height = 300;
        let scale = 300;

        while (svg.hasChildNodes()) {
            svg.removeChild(svg.firstChild);
        }

        // render this to a canvas or an SVG.
        while (true) {
            let zero_degree_nodes = g.get_in_degree_0_nodes();
            if (zero_degree_nodes.length == 0) {
                break;
            } else {
                let i = zero_degree_nodes[0];
                let coords = world[i];
                let polygon = document.createElementNS(svgns, 'polygon');
                polygon.setAttribute(
                    'points',
                    (( width / 2) + (coords[0][0] / coords[0][2] * scale)) + ', ' + 
                    ((height / 2) + (coords[0][1] / coords[0][2] * scale)) + ' ' + 
                    (( width / 2) + (coords[1][0] / coords[1][2] * scale)) + ', ' + 
                    ((height / 2) + (coords[1][1] / coords[1][2] * scale)) + ' ' +
                    (( width / 2) + (coords[2][0] / coords[2][2] * scale)) + ', ' +
                    ((height / 2) + (coords[2][1] / coords[2][2] * scale)) + ' ' +
                    (( width / 2) + (coords[3][0] / coords[3][2] * scale)) + ', ' +
                    ((height / 2) + (coords[3][1] / coords[3][2] * scale)) 
                );
                polygon.setAttribute('fill', 'white');
                polygon.setAttribute('stroke', 'black');
                polygon.setAttribute('stroke-width', '2px');
                polygon.setAttribute('stroke-linejoin', 'round');
                polygon.setAttribute('vector-effect', 'non-scaling-stroke');
    
                svg.appendChild(polygon);
                g.delete_vertex(i);
            }
        }
    }
}

module.exports = { line_segment_intersection, split_panel, SquareMaze, HexMaze, Panel, Point };
