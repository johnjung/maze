const Flatten = globalThis["@flatten-js/core"];
const { Point, Polygon, Ray, Segment, Vector } = Flatten;

function build_asteroid(diameter, number_of_points, rand_min, rand_max) {
    var a, b, d, x, y;
    var points = []; 
    for (let p = 0; p < number_of_points; p++) {
        a = Math.PI * 2 / number_of_points * p;
        b = Math.random() * Math.PI * 2;
        d = Math.random() * (rand_max - rand_min) + rand_min;
        points.push(
            new Point(
                Math.cos(a) + (Math.cos(b) * d), 
                Math.sin(a) + (Math.sin(b) * d)
            )
        ); 
    }   
    return new Polygon(points);
}

function get_intersections(point, segments, center) {
    if (point instanceof Point && segments.every(s => s instanceof Segment)) {
        var ray = new Segment(
            center, 
            new Point(
                point.translate(-center.x, -center.y).scale(100, 100).translate(center.x, center.y)
            )
        );
        var intersections = [];
        for (let i = 0; i < segments.length; i++) {
            intersections = intersections.concat(ray.intersect.segments[i]);
        }

        return intersections;
    } else {
        throw new Error ('function takes a Point and an Array of Segments.');
    }
}

function is_point_in_front(point, segments, center) {
    /**
     * Check to see if a point is in front of an Array of line segments
     * from the perspective of the origin.
     * @param {Point} point - point to test
     * @param {Array} segments - array of line segments
     * @param {Point} center - centerpoint.
     */
    if (point instanceof Point && segments.every(s => s instanceof Segment)) {
        /*
        var intersections = get_intersections(point, segments, center);
        return intersections[0].x == point.x && intersections[0].y == point.y;
        */
        var ray = new Segment(center, point);
        for (let i = 0; i < segments.length; i++) {
            if (!(point.x == segments[i].ps.x && point.y == segments[i].ps.y) &&
                !(point.x == segments[i].pe.x && point.y == segments[i].pe.y)) {
                if (ray.intersect(segments[i]).length) {
                    return false;
                }
            }
        }
        return true;
    } else {
        throw new Error ('function takes a Point and an Array of Segments.');
    }
}
   
function segment_has_obstruction(segment, segments) {
    /**
     * Check to see if an individual segment is obstructed by any others.
     * @param {Segment} segment - segment to test against
     * @param {Array} segments - an array of segments to check
     */
    if (segment instanceof Segment && segments.every(s => s instanceof Segment)) {
        for (let i = 0; i < segments.length; i++) {
            if (segment != segments[i]) {
                if (segment.intersect(new Segment(segments[i].ps, segments[i].ps.scale(100, 100))).length ||
                    segment.intersect(new Segment(segments[i].pe, segments[i].pe.scale(100, 100))).length ||
                    new Segment(segment.ps, new Point(0, 0)).intersect(segments[i]).length ||
                    new Segment(segment.pe, new Point(0, 0)).intersect(segments[i]).length) {
                    return true;
                }
            }
        }
        return false;
    } else {
        throw new Error('function takes a Segment and an Array of Segments.');
    }
}

function get_torch_polygon(segments, center) {
    /**
     * Get a polygon of torch outline.
     * @param {Array} segments - an array of Segment instances
     * @param {Point} center - torch position. 
     */

    var iota = Math.PI / 720;

    //collect all angles.
    var angles = [];
    var a;
    for (let i = 0; i < segments.length; i++) {
        a = Math.atan2(segments[i].ps.y - center.y, segments[i].ps.x - center.x);
        angles.push(a - iota);
        angles.push(a + iota);
        a = Math.atan2(segments[i].pe.y - center.y, segments[i].pe.x - center.x);
        angles.push(a - iota);
        angles.push(a + iota);
    }
    angles.sort(function (a, b) { 
        return a - b; 
    });

    // return polygon points for all intersections.
    var output = [];

    var intersections, inter, r;
    for (let i = 0; i < angles.length; i++) {
        intersections = [];
        r = new Ray(
            center,
            new Vector(-Math.sin(angles[i]), Math.cos(angles[i]))
        );
        for (let j = 0; j < segments.length; j++) {
            inter = r.intersect(segments[j]);
            if (inter.length) {
                intersections.push(inter[0]);
            }
        }
        intersections.sort(function (a, b) {
            return center.distanceTo(a)[0] - center.distanceTo(b)[0];
        });
        if (intersections.length) {
            output.push(intersections[0]);
        }
    }
    return output;
}

function get_torch_segments(segments, center) {
    /**
     * Get an array of wall segments lit by a torch.
     * @param {Array} segments - an array of Segment instances
     * @param {Point} center - torch position. 
     */

    var iota = Math.PI / 720;

    //collect all angles.
    var angles_segments = [];
    var a;
    for (let i = 0; i < segments.length; i++) {
        a = Math.atan2(segments[i].ps.y - center.y, segments[i].ps.x - center.x);
        angles_segments.push([a - iota, segments[i]]);
        angles_segments.push([a + iota, segments[i]]);
        a = Math.atan2(segments[i].pe.y - center.y, segments[i].pe.x - center.x);
        angles_segments.push([a - iota, segments[i]]);
        angles_segments.push([a + iota, segments[i]]);
    }
    if (angles_segments.length == 0) {
        return;
    }
    angles_segments.sort(function (a, b) { 
        return a[0] - b[0]; 
    });
    // hack, to avoid blind spot.
    for (let i = 0; i < 50; i++) {
        angles_segments.push(angles_segments[i]);
    }

    // rotate angles array so that a start point is first. 
    /*
    var a, b, inter, intersections, s, tmp;
    while (true) {
        //a = angles_segments[0][0];
        s = angles_segments[0][1];
        if (!segment_has_obstruction(s, segments)) {
            break;
        b = Math.atan2(s.pe.y, s.pe.x);
        if (a < b) {
            tmp = s.ps.clone();
            s.ps = s.pe;
            s.pe = tmp;
        }
        } else {
            angles_segments.unshift(angles_segments.pop());
        }
    }
    */

    // return segments.
    var output = [];

    var intersections, inter, r;
    var line_start = null;
    var previous_point = null;
    var previous_segment = null;

    for (let i = 0; i < angles_segments.length; i++) {
        intersections = [];
        r = new Ray(
            center,
            new Vector(-Math.sin(angles_segments[i][0]), Math.cos(angles_segments[i][0]))
        );
        for (let j = 0; j < segments.length; j++) {
            inter = r.intersect(segments[j]);
            if (inter.length) {
                intersections.push([inter[0], segments[j]]);
            }
        }
        intersections.sort(function (a, b) {
            return center.distanceTo(a[0])[0] - center.distanceTo(b[0])[0];
        });
        if (intersections.length) {
            if (line_start == null) {
                line_start = intersections[0][0];
                previous_point = intersections[0][0];
                previous_segment = intersections[0][1];
            } else {
                if (previous_segment != intersections[0][1]) {
                    output.push(
                        new Segment(
                            line_start,
                            previous_point
                        )
                    );
                    line_start = intersections[0][0];
                }
            }
            previous_point = intersections[0][0];
            previous_segment = intersections[0][1];
        }
    }
    return output;
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

class TriCell extends Cell {
    constructor(y, x) {
        super();
        this.y = y;
        this.x = x;
        this.ne = null;
        this.n = null;
        this.nw = null;
        this.se = null;
        this.s = null;
        this.sw = null;
        this.links = new Set();
    }

    get_neighbors() {
        return [this.ne, this.n, this.nw, this.sw, this.s, this.se].filter((i) => i != null);
    }

    l(d) {
        if (this.x % 2 == 0) {
            return [this.n, this.sw, this.se][d];
        } else {
            return [this.ne, this.nw, this.s][d];
        }
    }

    f(d) {
        if (this.x % 2 == 0) {
            return [this.se, this.n, this.sw][d];
        } else {
            return [this.s, this.ne, this.nw][d];
        }
    }

    r(d) {
        if (this.x % 2 == 0) {
            return [this.sw, this.se, this.n][d];
        } else {
            return [this.nw, this.s, this.ne][d];
        }
    }
}

class Maze {
    aldous_broder() {
        let visited = Array(this.width * this.height).fill(false);
  
        let c = this.cells[Math.floor(Math.random() * this.width * this.height)];
        let n = null, neighbors = [];

        var i = 0;

        do {
            visited[c.y * this.width + c.x] = true;
            neighbors = c.get_neighbors();
            n = neighbors[Math.floor(Math.random() * neighbors.length)];
            if (visited[n.y * this.width + n.x] == false) {
                c.link(n);
            }
            c = n;

            i++;
            if (i > 1000) {
                return;
            }
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
            n_arr = c.get_neighbors().filter((i) => visited[i.y * this.width + i.x] == false);
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
                            n_arr = c.get_neighbors().filter((i) => visited[i.y * this.width + i.x] == true);
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
        var n_arr, n, x, y;
        var stack = [];
        var visited = new Array(this.width * this.height).fill(false);

        var c = null;
        while (true) {
            if (c != null) {
                break;
            }
            y = Math.floor(Math.random() * this.height);
            x = Math.floor(Math.random() * this.width);
            if (this.mask[y][x]) {
                c = this.cells[y * this.width + x];
            }
        }

        stack.push(c);
        visited[c.y * this.width + c.x] = true;

        while (true) {
            if (stack.length == 0) {
                break;
            }

            n_arr = c.get_neighbors().filter((i) => visited[i.y * this.width + i.x] == false);
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

class TriMaze extends Maze {
    constructor(width, height, mask) {
        super();
        this.width = width;
        this.height = height;
        this.mask = mask;
        this.cells = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.cells.push(new TriCell(y, x));
            }
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.mask[y][x]) {
                    // ne
                    if (x % 2 == 1 && x < this.width - 1 && this.mask[y][x + 1]) {
                        this.cells[y * this.width + x].ne = this.cells[y * this.width + x + 1];
                    }
                    // n
                    if (x % 2 == 0 && y < (this.height - 1) && x < (this.width - 1) && this.mask[y + 1][x + 1]) {
                        this.cells[y * this.width + x].n = this.cells[(y + 1) * this.width + x + 1];
                    }
                    // nw
                    if (x % 2 == 1 && x > 0 && this.mask[y][x - 1]) {
                        this.cells[y * this.width + x].nw = this.cells[y * this.width + (x - 1)];
                    }
                    // sw 
                    if (x % 2 == 0 && x > 0 && this.mask[y][x - 1]) {
                        this.cells[y * this.width + x].sw = this.cells[y * this.width + (x - 1)];
                    }
                    // s
                    if (x % 2 == 1 && y > 0 && x > 0 && this.mask[y - 1][x - 1]) {
                        this.cells[y * this.width + x].s = this.cells[(y - 1) * this.width + (x - 1)];
                    }
                    // se
                    if (x % 2 == 0 && x < (this.width - 1) && this.mask[y][x + 1]) {
                        this.cells[y * this.width + x].se = this.cells[y * this.width + (x + 1)];
                    }
                }
            }
        }

        this.current_cell = this.cells[5 * this.width + 6];
        this.current_wall = undefined;
        // e, ne, nw, w, sw, se
        this.direction = undefined;
    }

    finish_setup() {
        // walls
        // ne, n, nw, sw, s, se
        // direction
        // e, ne, nw, w, sw, se
        if (this.current_cell.links.has(this.current_cell.ne)) {
            this.current_wall = 0;
            this.direction = 4;
        } else if (this.current_cell.links.has(this.current_cell.n)) {
            this.current_wall = 1;
            this.direction = 5;
        } else if (this.current_cell.links.has(this.current_cell.nw)) {
            this.current_wall = 2;
            this.direction = 5;
        } else if (this.current_cell.links.has(this.current_cell.sw)) {
            this.current_wall = 3;
            this.direction = 1;
        } else if (this.current_cell.links.has(this.current_cell.s)) {
            this.current_wall = 4;
            this.direction = 1;
        } else if (this.current_cell.links.has(this.current_cell.se)) {
            this.current_wall = 5;
            this.direction = 2;
        }
    }

    turn(d) {
        // e, ne, nw, w, sw, se
        this.direction += d;
        while (this.direction < 0) {
            this.direction += 6;
        }
        while (this.direction > 5) {
            this.direction -= 6;
        }
        if (this.current_cell.x % 2 == 0) {
            // jej pick up here.
        }
    }

    move_forward() {
        // walls
        // ne, n, nw, sw, s, se
        // direction
        // e, ne, nw, w, sw, se
        if (this.direction == 0) { // e
            if (this.current_cell.x % 2 == 0) {
                if (this.current_wall == 2 && this.current_cell.is_linked_to(this.current_cell.ne)) {
                    this.current_cell = this.current_cell.ne;
                    this.current_wall = 3;
                }
            } else {
                if (this.current_wall == 5 && this.current_cell.is_linked_to(this.current_cell.se)) {
                    this.current_cell = this.current_cell.se;
                    this.current_wall = 2;
                }
            }
        } else if (this.direction == 1) { // ne
            if (this.current_cell.x % 2 == 0) {
                if (this.current_wall == 0 && this.current_cell.is_linked_to(this.current_cell.ne)) {
                    this.current_cell = this.current_cell.ne;
                    this.current_wall = 3;
                }
            } else {
                if (this.current_wall = 3 && this.current_cell.is_linked_to(this.current_cell.n)) {
                    this.current_cell = this.current_cell.n;
                    this.current_wall = 5;
                }
            }
        } else if (this.direction == 2) { // nw
            if (this.current_cell.x % 2 == 0) {
                if (this.current_wall = 4 && this.current_cell.is_linked_to(this.current_cell.nw)) {
                    this.current_cell = this.current_cell.nw;
                    this.current_wall = 3;
                }
            } else {
                if (this.current_wall = 3 && this.current_cell.is_linked_to(this.current_cell.n)) {
                    this.current_cell = this.current_cell.n;
                    this.current_wall = 4;
                }
            }
        } else if (this.direction == 3) { // w
            if (this.current_cell.x % 2 == 0) {
                if (this.current_wall = 2 && this.current_cell.is_linked_to(this.current_cell.nw)) {
                    this.current_cell = this.current_cell.n;
                    this.current_wall = 5;
                }
            } else {
                if (this.current_wall = 5 && this.current_cell.is_linked_to(this.current_cell.se)) {
                    this.current_cell = this.current_cell.se;
                    this.current_wall = 0;
                }
            }
        } else if (this.direction == 4) { // sw
            if (this.current_cell.x % 2 == 0) {
                if (this.current_wall == 0 && this.current_cell.is_linked_to(this.current_cell.s)) {
                    this.current_cell = this.current_cell.s;
                    this.current_wall = 1;
                }
            } else {
                if (this.current.wall == 1 && this.current_cell.is_linked_to(this.current_cell.sw)) {
                    this.current_cell = this.current_cell.sw;
                    this.current_wall = 0;
                }
            }
        } else if (this.direction == 5) { // se
            if (this.current_cell.x % 2 == 0) {
                if (this.current_wall == 0 && this.current_cell.is_linked_to(this.current_cell.s)) {
                    this.current_cell = this.current_cell.s;
                    this.current_wall = 1;
                }
            } else {
                if (this.current_wall == 1 && this.current_cell.is_linked_to(this.current_cell.se)) {
                    this.current_cell = this.current_cell.se;
                    this.current_wall = 0;   
                }
            }
        }
    }

    print_to_console() {
        let output_grid = [];
        var cx, cy, c;

        for (let y = 0; y < (this.height * 2 + 1); y++) {
            var row = [];
            for (let x = 0; x < ((this.width * 2 + 3) + ((this.height - 1) * 2)); x++) {
                row.push(' ');
            }
            output_grid.push(row);
        }

        // draw all walls 
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                cx = (x * 2 + 2) + ((this.height - 1 - y + 1) * 2 - 2);
                cy = this.height * 2 - 1 - (y * 2);

                if (x % 2 == 0) {
                    output_grid[cy - 1][cx - 2] = 'x';
                    output_grid[cy - 1][cx - 1] = '-';
                    output_grid[cy - 1][cx    ] = '-';
                    output_grid[cy - 1][cx + 1] = '-';
                    output_grid[cy - 1][cx + 2] = 'x';
                    output_grid[cy    ][cx - 1] = '\\';
                    output_grid[cy    ][cx + 1] = '/';
                    output_grid[cy + 1][cx    ] = 'x';
                } else {
                    output_grid[cy - 1][cx    ] = 'x';
                    output_grid[cy    ][cx - 1] = '/';
                    output_grid[cy    ][cx + 1] = '\\';
                    output_grid[cy + 1][cx - 2] = 'x';
                    output_grid[cy + 1][cx - 1] = '-';
                    output_grid[cy + 1][cx    ] = '-';
                    output_grid[cy + 1][cx + 1] = '-';
                    output_grid[cy + 1][cx + 2] = 'x';
                }
                if (y == this.current_cell.y && x == this.current_cell.x) {
                    output_grid[cy][cx] = 'o';
                }
            }
        }

        // erase walls where there are links. 
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                cx = (x * 2 + 2) + ((this.height - 1 - y + 1) * 2 - 2);
                cy = this.height * 2 - 1 - (y * 2);
                c = this.cells[y * this.width + x];
                if (c.links.has(c.ne)) {
                    output_grid[cy][cx + 1] = ' ';
                }
                if (c.links.has(c.n)) {
                    output_grid[cy - 1][cx - 1] = ' ';
                    output_grid[cy - 1][cx    ] = ' ';
                    output_grid[cy - 1][cx + 1] = ' ';
                }
                if (c.links.has(c.nw)) {
                    output_grid[cy][cx - 1] = ' ';
                }
                if (c.links.has(c.sw)) {
                    output_grid[cy][cx - 1] = ' ';
                }
                if (c.links.has(c.s)) {
                    output_grid[cy + 1][cx - 1] = ' ';
                    output_grid[cy + 1][cx    ] = ' ';
                    output_grid[cy + 1][cx + 1] = ' ';
                }
                if (c.links.has(c.se)) {
                    output_grid[cy][cx + 1] = ' ';
                }
            }
        }

        // output grid
        for (let y = 0; y < output_grid.length; y++) {
            console.log(output_grid[y].join(''));
        }
    }
    get_world() {
        // triangle edge length.
        let h = Math.sqrt(1 + Math.pow(0.5, 2));
  
        var world = [];

        var c, n, cx, cx1, cx2, cy, cy1, cy2, line, circle;
        var start, end, x_min;

        // horizontal
        for (var y = 0; y < this.height - 1; y++) {
            start = null;
            end = null;
            for (var x = 0; x < this.width - 3; x += 2) {
                c = this.cells[y * this.width + x    ];
                n = this.cells[y * this.width + x + 2];
                if (start == null && (this.mask[c.y][c.x] + this.mask[c.y + 1][c.x + 1] == 1 || (c.n && !c.links.has(c.n)))) {
                    start = x;
                }
                if (start != null && (this.mask[n.y][n.x] + this.mask[n.y + 1][n.x + 1] == 0 || (n.n && n.links.has(n.n)))) {
                    end = x;
                }
                if (start != null && end != null) {
                    cx1 = ((start / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - y) / 2)) * h;
                    cx2 = ((end   / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - y) / 2)) * h;
                    cy = ((this.height - 1) / 2) - y;
                    world.push(
                        new Segment(
                            new Point(cx1 - (.5 * h), cy - .5),
                            new Point(cx2 + (.5 * h), cy - .5)
                        )
                    );
                    start = null;
                    end = null;
                }
            }
        }

        // diagonal upper left to lower right
        for (var x = 1; x < this.width - 2; x += 2) {
            start = null;
            end = null;
            for (var y = 0; y < this.height - 1; y++) {
                c = this.cells[(y    ) * this.width + x];
                n = this.cells[(y + 1) * this.width + x];
                if (start == null && (this.mask[c.y][c.x] + this.mask[c.y][c.x + 1] == 1 || (c.ne && !c.links.has(c.ne)))) {
                    start = [x, y];
                    cx1 = ((x / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - y) / 2)) * h;
                    cy1 = ((this.height - 1) / 2) - y;
                }
                if (start != null && (this.mask[n.y][n.x] + this.mask[n.y][n.x + 1] == 0 || (n.ne && n.links.has(n.ne)))) {
                    end = [x, y];
                    cx2 = ((x / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - y) / 2)) * h;
                    cy2 = ((this.height - 1) / 2) - y;
                }
                if (start != null && end != null) {
                    world.push(
                        new Segment(
                            new Point(cx1 + (.5 * h), cy1 + .5),
                            new Point(cx2, cy2 - .5)
                        )
                    );
                    start = null;
                    end = null;
                }
            }
        }

        // diagonal lower left to upper right
        for (var y_min = this.height - 1; y_min > (0 - this.width); y_min--) {
            start = null;
            end = null;
            for (var x = 0, y = y_min; x < this.width - 2 && y < this.height - 1; x += 2, y++) {
                if (y < 0) {
                    continue;
                }   
                c = this.cells[(y    ) * this.width + x    ];
                n = this.cells[(y + 1) * this.width + x + 2];
                if (start == null && (this.mask[c.y][c.x] + this.mask[c.y][c.x + 1] == 1 || (c.se && !c.links.has(c.se)))) {
                    start = [x, y];
                    cx1 = ((x / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - y) / 2)) * h;
                    cy1 = ((this.height - 1) / 2) - y;
                }
                if (start != null && (this.mask[n.y][n.x] + this.mask[n.y][n.x + 1] == 0 || (n.se && n.links.has(n.se)))) {
                    end = [x, y];
                    cx2 = ((x / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - y) / 2)) * h;
                    cy2 = ((this.height - 1) / 2) - y;
                }
                if (start != null && end != null) {
                    world.push(
                        new Segment(
                            new Point(cx1, cy1 + .5),
                            new Point(cx2 + (.5 * h), cy2 - .5)
                        )
                    );
                    start = null;
                    end = null;
                }
            }
        }
        return world;
    }
    
    render_to_svg_2d(svg) {
        const svgns = 'http://www.w3.org/2000/svg';

        // triangle edge length.
        let h = Math.sqrt(1 + Math.pow(0.5, 2));

        var line, circle;

        var world = this.get_world();

        var x, y, x1, y1, x2, y2;

        x = this.current_cell.x;
        y = this.current_cell.y;
        x1 = ((x / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - y) / 2)) * h;
        y1 = ((this.height - 1) / 2) - y;

        // render torch polygon.
        var torch_outline = get_torch_polygon(world, new Point(x1, y1));
        var point_str = [];
        for (var i = 0; i < torch_outline.length; i++) {
            point_str.push(torch_outline[i].x.toString() + ',' + torch_outline[i].y.toString());
        }
        var polygon; 
        polygon = document.createElementNS(svgns, 'polygon');
        polygon.setAttribute('points', point_str.join(' '));
        polygon.setAttribute('stroke', 'none');
        polygon.setAttribute('fill', 'rgb(42, 42, 42)');
        svg.appendChild(polygon);

        // render walls. 
        var torch_segments = get_torch_segments(world, new Point(x1, y1));
        for (let i = 0; i < torch_segments.length; i++) {
            x1 = torch_segments[i].ps.x;
            y1 = torch_segments[i].ps.y;
            x2 = torch_segments[i].pe.x;
            y2 = torch_segments[i].pe.y;
            line = document.createElementNS(svgns, 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', 'white');
            line.setAttribute('stroke-width', '2px');
            line.setAttribute('stroke-linecap', 'round');
            line.setAttribute('vector-effect', 'non-scaling-stroke');
            svg.appendChild(line);
        }

        // render walls. 
        /*
        for (let i = 0; i < world.length; i++) {
            x1 = world[i].ps.x;
            y1 = world[i].ps.y;
            x2 = world[i].pe.x;
            y2 = world[i].pe.y;
            line = document.createElementNS(svgns, 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', 'white');
            line.setAttribute('stroke-width', '1px');
            line.setAttribute('stroke-linecap', 'round');
            line.setAttribute('vector-effect', 'non-scaling-stroke');
            svg.appendChild(line);
        }
        */

        // draw current spot.
        x = this.current_cell.x;
        y = this.current_cell.y;
        x1 = ((x / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - y) / 2)) * h;
        y1 = ((this.height - 1) / 2) - y;

        // add offset for wall.
        // ne, n, nw, sw, s, se
        if (this.current_wall == 0) {
            x1 += (0.25 * h);
        } else if (this.current_wall == 1) {
            y1 -= 0.5;
        } else if (this.current_wall == 2) {
            x1 -= (0.25 * h);
        } else if (this.current_wall == 3) {
            x1 -= (0.25 * h);
        } else if (this.current_wall == 4) {
            y1 += 0.5;
        } else if (this.current_wall == 5) {
            x1 += (0.25 * h);
        }

        // draw ship.
        var defs;
        defs = document.createElementNS(svgns, 'defs');
        svg.appendChild(defs);
 
        var polygon; 
        polygon = document.createElementNS(svgns, 'polygon');
        polygon.setAttribute('id', 'ship');
        polygon.setAttribute('points', '-0.2,-.16 .28,0 -0.2,.16 -0.1,.08 -0.1,-.08');
        polygon.setAttribute('stroke', 'none');
        polygon.setAttribute('fill', 'white');
        defs.appendChild(polygon);

        // rotate: e, ne, nw, w, sw, se
        document.getElementById('ship').style.transform = 'rotate(' +
            [0, 300, 240, 180, 120, 60][this.direction].toString() + 'deg)';

        var use;
        use = document.createElementNS(svgns, 'use');
        use.setAttribute('x', x1);
        use.setAttribute('y', y1);
        use.setAttribute('x', x1);
        use.setAttribute('y', y1);
        use.setAttribute('href', '#ship');
        svg.appendChild(use);

        

        //var asteroid = build_asteroid(1, 10, .1, .3)
    }
}

module.exports = { TriMaze };

