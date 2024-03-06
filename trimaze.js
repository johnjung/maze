const Flatten = globalThis["@flatten-js/core"];
const { Point, Polygon, Ray, Segment, Vector } = Flatten;

alphabet = {
    '0': [
        [[0,0],[8,0]],
        [[8,0],[8,12]],
        [[8,12],[0,12]],
        [[0,12],[0,0]],
        [[0,0],[8,12]]
    ],
    '1': [
        [[4,0],[4,12]],
        [[4,12],[3,10]]
    ],
    '2': [
        [[0,12],[8,12]],
        [[8,12],[8,7]],
        [[8,7],[0,5]],
        [[0,5],[0,0]],
        [[0,0],[8,0]]
    ],
    '3': [
        [[0,12],[8,12]],
        [[8,12],[8,0]],
        [[8,0],[0,0]],
        [[0,6],[8,6]]
    ],
    '4': [
        [[0,12],[0,6]],
        [[0,6],[8,6]],
        [[8,12],[8,0]]
    ],
    '5': [
        [[0,0],[8,0]],
        [[8,0],[8,6]],
        [[8,6],[0,7]],
        [[0,7],[0,12]],
        [[0,12],[8,12]]
    ],
    '6': [
        [[0,12],[0,0]],
        [[0,0],[8,0]],
        [[8,0],[8,5]],
        [[8,5],[0,7]]
    ],
    '7': [
        [[0,12],[8,12]],
        [[8,12],[8,6]],
        [[8,6],[4,0]]
    ],
    '8': [
        [[0,0],[8,0]],
        [[8,0],[8,12]],
        [[8,12],[0,12]],
        [[0,12],[0,0]],
        [[0,6],[8,6]]
    ],
    '9': [
        [[8,0],[8,12]],
        [[8,12],[0,12]],
        [[0,12],[0,7]],
        [[0,7],[8,5]]
    ],
    '': [
    ],
    '.': [
        [[3,0],[4,0]]
    ],
    ',': [
        [[2,0],[4,2]]
    ],
    '-': [
        [[2,6],[6,6]]
    ],
    '+': [
        [[1,6],[7,6]],
        [[4,9],[4,3]]
    ],
    '!': [
        [[4,0],[3,2]],
        [[3,2],[5,2]],
        [[5,2],[4,0]],
        [[4,4],[4,12]]
    ],
    '#': [
        [[0,4],[8,4]],
        [[8,4],[6,2]],
        [[6,2],[6,10]],
        [[6,10],[8,8]],
        [[8,8],[0,8]],
        [[0,8],[2,10]],
        [[2,10],[2,2]]
    ],
    '^': [
        [[2,6],[4,12]],
        [[4,12],[6,6]]
    ],
    '=': [
        [[1,4],[7,4]],
        [[1,8],[7,8]]
    ],
    '*': [
        [[0,0],[4,12]],
        [[4,12],[8,0]],
        [[8,0],[0,8]],
        [[0,8],[8,8]],
        [[8,8],[0,0]]
    ],
    '_': [
        [[0,0],[8,0]],
    ],
    '/': [
        [[0,0],[8,12]],
    ],
    '\\': [
        [[0,12],[8,0]],
    ],
    '@': [
        [[8,4],[4,0]],
        [[4,0],[0,4]],
        [[0,4],[0,8]],
        [[0,8],[4,12]],
        [[4,12],[8,8]],
        [[8,8],[4,4]],
        [[4,4],[3,6]]
    ],
    '$': [
        [[6,2],[2,6]],
        [[2,6],[6,10]],
        [[4,12],[4,0]]
    ],
    '&': [
        [[8,0],[4,12]],
        [[4,12],[8,8]],
        [[8,8],[0,4]],
        [[0,4],[4,0]],
        [[4,0],[8,4]]
    ],
    '[': [
        [[6,0],[2,0]],
        [[2,0],[2,12]],
        [[2,12],[6,12]]
    ],
    ']': [
        [[2,0],[6,0]],
        [[6,0],[6,12]],
        [[6,12],[2,12]]
    ],
    '(': [
        [[6,0],[2,4]],
        [[2,4],[2,8]],
        [[2,8],[6,12]]
    ],
    ')': [
        [[2,0],[6,4]],
        [[6,4],[6,8]],
        [[6,8],[2,12]]
    ],
    '{': [
        [[6,0],[4,2]],
        [[4,2],[4,10]],
        [[4,10],[6,12]],
        [[2,6],[4,6]]
    ],
    '}': [
        [[4,0],[6,2]],
        [[6,2],[6,10]],
        [[6,10],[4,12]],
        [[6,6],[8,6]]
    ],
    '%': [
        [[0,0],[8,12]],
        [[2,10],[2,8]],
        [[6,4],[6,2]]
    ],
    '<': [
        [[6,0],[2,6]],
        [[2,6],[6,12]]
    ],
    '>': [
        [[2,0],[6,6]],
        [[6,6],[2,12]]
    ],
    '|': [
        [[4,0],[4,5]],
        [[4,6],[4,12]]
    ],
    ':': [
        [[4,9],[4,7]],
        [[4,5],[4,3]]
    ],
    ';': [
        [[4,9],[4,7]],
        [[4,5],[1,2]]
    ],
    '"': [
        [[2,10],[2,6]],
        [[6,10],[6,6]]
    ],
    '\'': [
        [[2,6],[6,10]]
    ],
    '`': [
        [[2,10],[6,6]]
    ],
    '~': [
        [[0,4],[2,8]],
        [[2,8],[6,4]],
        [[6,4],[8,8]]
    ],
    '?': [
        [[0,8],[4,12]],
        [[4,12],[8,8]],
        [[8,8],[4,4]],
        [[4,1],[4,0]]
    ],
    'A': [
        [[0,0],[0,8]],
        [[0,8],[4,12]],
        [[4,12],[8,8]],
        [[8,8],[8,0]],
        [[0,4],[8,4]]
    ],
    'B': [
        [[0,0],[0,12]],
        [[0,12],[4,12]],
        [[4,12],[8,10]],
        [[8,10],[4,6]],
        [[4,6],[8,2]],
        [[8,2],[4,0]],
        [[4,0],[0,0]]
    ],
    'C': [
        [[8,0],[0,0]],
        [[0,0],[0,12]],
        [[0,12],[8,12]]
    ],
    'D': [
        [[0,0],[0,12]],
        [[0,12],[4,12]],
        [[4,12],[8,8]],
        [[8,8],[8,4]],
        [[8,4],[4,0]],
        [[4,0],[0,0]]
    ],
    'E': [
        [[8,0],[0,0]],
        [[0,0],[0,12]],
        [[0,12],[8,12]],
        [[0,6],[6,6]]
    ],
    'F': [
        [[0,0],[0,12]],
        [[0,12],[8,12]],
        [[0,6],[6,6]]
    ],
    'G': [
        [[6,6],[8,4]],
        [[8,4],[8,0]],
        [[8,0],[0,0]],
        [[0,0],[0,12]],
        [[0,12],[8,12]]
    ],
    'H': [
        [[0,0],[0,12]],
        [[0,6],[8,6]],
        [[8,12],[8,0]]
    ],
    'I': [
        [[0,0],[8,0]],
        [[4,0],[4,12]],
        [[0,12],[8,12]]
    ],
    'J': [
        [[0,4],[4,0]],
        [[4,0],[8,0]],
        [[8,0],[8,12]]
    ],
    'K': [
        [[0,0],[0,12]],
        [[8,12],[0,6]],
        [[0,6],[6,0]]
    ],
    'L': [
        [[8,0],[0,0]],
        [[0,0],[0,12]]
    ],
    'M': [
        [[0,0],[0,12]],
        [[0,12],[4,8]],
        [[4,8],[8,12]],
        [[8,12],[8,0]]
    ],
    'N': [
        [[0,0],[0,12]],
        [[0,12],[8,0]],
        [[8,0],[8,12]]
    ],
    'O': [
        [[0,0],[0,12]],
        [[0,12],[8,12]],
        [[8,12],[8,0]],
        [[8,0],[0,0]]
    ],
    'P': [
        [[0,0],[0,12]],
        [[0,12],[8,12]],
        [[8,12],[8,6]],
        [[8,6],[0,5]]
    ],
    'Q': [
        [[0,0],[0,12]],
        [[0,12],[8,12]],
        [[8,12],[8,4]],
        [[8,4],[0,0]],
        [[4,4],[8,0]]
    ],
    'R': [
        [[0,0],[0,12]],
        [[0,12],[8,12]],
        [[8,12],[8,6]],
        [[8,6],[0,5]],
        [[4,5],[8,0]]
    ],
    'S': [
        [[0,2],[2,0]],
        [[2,0],[8,0]],
        [[8,0],[8,5]],
        [[8,5],[0,7]],
        [[0,7],[0,12]],
        [[0,12],[6,12]],
        [[6,12],[8,10]]
    ],
    'T': [
        [[0,12],[8,12]],
        [[4,12],[4,0]]
    ],
    'U': [
        [[0,12],[0,2]],
        [[0,2],[4,0]],
        [[4,0],[8,2]],
        [[8,2],[8,12]]
    ],
    'V': [
        [[0,12],[4,0]],
        [[4,0],[8,12]]
    ],
    'W': [
        [[0,12],[2,0]],
        [[2,0],[4,4]],
        [[4,4],[6,0]],
        [[6,0],[8,12]]
    ],
    'X': [
        [[0,0],[8,12]],
        [[0,12],[8,0]]
    ],
    'Y': [
        [[0,12],[4,6]],
        [[4,6],[8,12]],
        [[4,6],[4,0]]
    ],
    'Z': [
        [[0,12],[8,12]],
        [[8,12],[0,0]],
        [[0,0],[8,0]],
        [[2,6],[6,6]]
    ]
}

function draw_message(svg, message, start_x, start_y, line_height, align_left) {
    const svgns = 'http://www.w3.org/2000/svg';
    var scale = 1.0 / 12.0 * line_height;
    var char;
    var xpos = start_x;
    if (align_left) {
        for (let m = 0; m < message.length; m++) {
            if (message[m] != ' ') {
                char = message[m];
                for (let i = 0; i < alphabet[char].length; i++) {
                    line = document.createElementNS(svgns, 'line');
                    line.setAttribute('x1', alphabet[char][i][0][0] * scale + xpos);
                    line.setAttribute('y1', start_y + (line_height - (alphabet[char][i][0][1] * scale)));
                    line.setAttribute('x2', alphabet[char][i][1][0] * scale + xpos);
                    line.setAttribute('y2', start_y + (line_height - (alphabet[char][i][1][1] * scale)));
                    line.setAttribute('stroke', 'white');
                    line.setAttribute('stroke-width', '1px');
                    line.setAttribute('stroke-linecap', 'round');
                    line.setAttribute('vector-effect', 'non-scaling-stroke');
                    svg.appendChild(line);
                }
            }
            xpos += line_height;
        }
    } else {
        for (let m = message.length - 1; m >= 0; m--) {
            if (message[m] != ' ') {
                char = message[m];
                for (let i = 0; i < alphabet[char].length; i++) {
                    line = document.createElementNS(svgns, 'line');
                    line.setAttribute('x1', alphabet[char][i][0][0] * scale + xpos);
                    line.setAttribute('y1', start_y + (line_height - (alphabet[char][i][0][1] * scale)));
                    line.setAttribute('x2', alphabet[char][i][1][0] * scale + xpos);
                    line.setAttribute('y2', start_y + (line_height - (alphabet[char][i][1][1] * scale)));
                    line.setAttribute('stroke', 'white');
                    line.setAttribute('stroke-width', '1px');
                    line.setAttribute('stroke-linecap', 'round');
                    line.setAttribute('vector-effect', 'non-scaling-stroke');
                    svg.appendChild(line);
                }
            }
            xpos -= line_height;
        }
    }
}

function get_distances(maze, start_cell) {
    var current_distance, x, y;

    // set up distances array- mark all cells undefined.
    var distances = [];
    for (let y = 0; y < maze.height; y++) {
        distances.push(new Array(maze.width).fill(undefined));
    };
 
    // mark all masked off cells as null.
    for (let y = 0; y < maze.height; y++) {
        for (let x = 0; x < maze.width; x++) {
            if (maze.mask[y][x] == 0) {
                distances[y][x] = null;
            }
        }
    }

    distances[start_cell.y][start_cell.x] = 0;
    current_distance = 0;

    while (true) {
        if (distances.some((r) => r.some((c) => c === undefined)) == false) {
            break;
        }

        // get all cells at the current distance.
        for (let y = 0; y < maze.height; y++) { 
            for (let x = 0; x < maze.width; x++) {
                if (distances[y][x] == current_distance) {
                    var links = Array.from(maze.cells[0][y][x].links);
                    for (let i = 0; i < links.length; i++) {
                        if (distances[links[i].y][links[i].x] === undefined) {
                            distances[links[i].y][links[i].x] = current_distance + 1;
                        }
                    }
                }
            }
        }
        current_distance++;
    }
    return distances;
}

function get_costs(maze, start_cell) {
    var current_cost, current_cost_cells, found_undefined, x, y;

    // set up costs array- mark all cells undefined.
    var costs = [];
    for (let y = 0; y < maze.height; y++) {
        costs.push(new Array(maze.width).fill(undefined));
    };
 
    // mark all masked off cells as null.
    for (let y = 0; y < maze.height; y++) {
        for (let x = 0; x < maze.width; x++) {
            if (maze.mask[y][x] == 0) {
                costs[y][x] = null;
            }
        }
    }

    costs[start_cell.y][start_cell.x] = 0;
    current_cost = 0;

    while (true) {
        if (costs.some((r) => r.some((c) => c === undefined)) == false) {
            break;
        }

        found_undefined = false;
        for (let y = 0; y < maze.height; y++) { 
            for (let x = 0; x < maze.width; x++) {
                if (costs[y][x] == current_cost) {
                    var links = Array.from(maze.cells[0][y][x].links);
                    for (let i = 0; i < links.length; i++) {
                        if (costs[links[i].y][links[i].x] === undefined) {
                            found_undefined = true;
                            if (maze.cells[0][links[i].y][links[i].x].links.size < 3) {
                                costs[links[i].y][links[i].x] = current_cost;
                            } else {
                                costs[links[i].y][links[i].x] = current_cost + 1;
                            }
                        }
                    }
                }
            }
        }
        if (found_undefined == false) {
            current_cost++;
        }
    }
    return costs;
}

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

function get_asteroid_outline(mask) {
    /**
     * @param {Array} segments - an array of Segment instances
     * @param {Point} center - torch position. 
     */

    // triangle edge length.
    let h = Math.sqrt(1 + Math.pow(0.5, 2));

    var height = mask.length;
    var width = mask[0].length;

    var cx, cy;

    var outline = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (mask[y][x] == 1) {
                cx = ((x / 2) - (((width + height) / 2 - 1) / 2) + ((height - 1 - y) / 2)) * h;
                cy = ((height - 1) / 2) - y;
                if (x % 2 == 0) {
                    // draw sw wall.
                    if (mask[y][x - 1] == 0) {                
                        outline.push(
                            new Segment(
                                new Point(cx - (0.5 * h), cy - 0.5),
                                new Point(cx, cy + 0.5)
                            )
                        );
                    }
                    // draw se wall.
                    if (mask[y][x + 1] == 0) {
                        outline.push(
                            new Segment(
                                new Point(cx + (0.5 * h), cy - 0.5),
                                new Point(cx, cy + 0.5)
                            )
                        );
                    }
                    // draw n wall.
                    if (mask[y + 1][x + 1] == 0) {
                        outline.push(
                            new Segment(
                                new Point(cx - (0.5 * h), cy - 0.5),
                                new Point(cx + (0.5 * h), cy - 0.5)
                            )
                        );
                    }
                } else {
                    // draw nw wall.
                    if (mask[y][x - 1] == 0) {
                        outline.push(
                            new Segment(
                                new Point(cx - (0.5 * h), cy + 0.5),
                                new Point(cx, cy - 0.5)
                            )
                        );
                    }
                    // draw ne wall.
                    if (mask[y][x + 1] == 0) {
                        outline.push(
                            new Segment(
                                new Point(cx + (0.5 * h), cy + 0.5),
                                new Point(cx, cy - 0.5)
                            )
                        );
                    }
                    // draw s wall.
                    if (mask[y - 1][x - 1] == 0) { 
                        outline.push(
                            new Segment(
                                new Point(cx - (0.5 * h), cy + 0.5),
                                new Point(cx + (0.5 * h), cy + 0.5)
                            )
                        );
                    }
                }
            }
        }
    }
    return outline;
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
    constructor(z, y, x) {
        super();
        this.z = z;
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
    deadends() {
        var deadends = [];
        for (let z = 0; z < this.depth; z++) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (this.cells[z][y][x].links.size == 1) {
                        deadends.push(this.cells[z][y][x]);
                    }
                }
            }
        }
        return deadends;
    }

    recursive_backtracker(z, overrides) {
        var n_arr, n, x, y;
        var stack = [];
        var visited = new Array();
        for (let i = 0; i < this.height; i++) {
            visited.push(new Array(this.width).fill(false));
        }

        /*
        for (let i = 0; i < overrides.length; i++) {
            this.mask[overrides[i][1]][overrides[i][0]] = 0;
            visited[overrides[i][1]][overrides[i][0]] = true;
        }
        */

        var c = null;
        while (true) {
            if (c != null) {
                break;
            }
            y = Math.floor(Math.random() * this.height);
            x = Math.floor(Math.random() * this.width);
            if (this.mask[y][x]) {
                c = this.cells[z][y][x];
            }
        }
        stack.push(c);
        visited[c.y][c.x] = true;

        while (true) {
            if (stack.length == 0) {
                break;
            }

            n_arr = c.get_neighbors().filter((i) => visited[i.y][i.x] == false);
            if (n_arr.length > 0) {
                n = n_arr[Math.floor(Math.random() * n_arr.length)];
                c.link(n);
                stack.push(n);
                visited[n.y][n.x] = true;
                c = n;
            } else {
                stack.pop();
                if (stack.length > 0) {
                    c = stack[stack.length - 1];
                }
            }
        }
        /*
        for (let i = 0; i < overrides.length; i++) {
            this.mask[overrides[i][1]][overrides[i][0]] = 1;
        }
        */
    }

    // jej
    goal_is_visible(segments) {
        let h = Math.sqrt(1 + Math.pow(0.5, 2));
        var x1 = ((this.current_cell.x / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - this.current_cell.y) / 2)) * h;
        var y1 = ((this.height - 1) / 2) - this.current_cell.y;
        var x2 = ((this.goal_cell.x / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - this.goal_cell.y) / 2)) * h;
        var y2 = ((this.height - 1) / 2) - this.goal_cell.y;
    
        // if a line from the current cell to the goal is unbroken by any wall
        // segment, then the goal is visible.
        var line_of_sight = new Segment(new Point(x1, y1), new Point(x2, y2));
        for (let i = 0; i < segments.length; i++) {
            if (line_of_sight.intersect(segments[i]).length) {
                return false;
            }
        }
        return true;
    }
}

class TriMaze extends Maze {
    constructor(width, height, depth, mask) {
        super();
        this.E = 0;
        this.NE = 1;
        this.N = 6;
        this.NW = 2;
        this.W = 3;
        this.SW = 4;
        this.S = 7;
        this.SE = 5;
        
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.mask = mask;
        this.cells = new Array();

        var level, row;
        for (let z = 0; z < this.depth; z++) {
            level = new Array();
            for (let y = 0; y < this.height; y++) {
                row = new Array();
                for (let x = 0; x < this.width; x++) {
                    row.push(new TriCell(z, y, x));
                }
                level.push(row);
            }
            this.cells.push(level);
        }

        for (let z = 0; z < this.depth; z++) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (this.mask[y][x]) {
                        // ne
                        if (x % 2 == 1 && x < this.width - 1 && this.mask[y][x + 1]) {
                            this.cells[z][y][x].ne = this.cells[z][y][x + 1];
                        }
                        // n
                        if (x % 2 == 0 && y < (this.height - 1) && x < (this.width - 1) && this.mask[y + 1][x + 1]) {
                            this.cells[z][y][x].n = this.cells[z][y + 1][x + 1];
                        }
                        // nw
                        if (x % 2 == 1 && x > 0 && this.mask[y][x - 1]) {
                            this.cells[z][y][x].nw = this.cells[z][y][x - 1];
                        }
                        // sw 
                        if (x % 2 == 0 && x > 0 && this.mask[y][x - 1]) {
                            this.cells[z][y][x].sw = this.cells[z][y][x - 1];
                        }
                        // s
                        if (x % 2 == 1 && y > 0 && x > 0 && this.mask[y - 1][x - 1]) {
                            this.cells[z][y][x].s = this.cells[z][y - 1][x - 1];
                        }
                        // se
                        if (x % 2 == 0 && x < (this.width - 1) && this.mask[y][x + 1]) {
                            this.cells[z][y][x].se = this.cells[z][y][x + 1];
                        }
                    }
                }
            }
        }

        this.current_cell = undefined;
        this.goal = undefined;
        this.current_wall = undefined;
        this.direction = undefined;
    }

    finish_setup() {
        if (this.current_cell.x % 2 == 1 && this.current_cell.links.has(this.current_cell.ne)) {
            this.direction = this.NE;
            this.current_cell = this.current_cell.ne;
            this.current_wall = this.SW;
        } else if (this.current_cell.x % 2 == 1 && this.current_cell.links.has(this.current_cell.nw)) {
            this.direction = this.NW;
            this.current_cell = this.current_cell.nw;
            this.current_wall = this.SE;
        } else if (this.current_cell.x % 2 == 0 && this.current_cell.links.has(this.current_cell.sw)) {
            this.direction = this.SW;
            this.current_cell = this.current_cell.sw;
            this.current_wall = this.NE;
        } else if (this.current_cell.x % 2 == 0 && this.current_cell.links.has(this.current_cell.se)) {
            this.direction = this.SE;
            this.current_cell = this.current_cell.se;
            this.current_wall = this.NW;
        } else if (this.current_cell.x % 2 == 0 && this.current_cell.links.has(this.current_cell.n)) {
            this.direction = this.NE;
            this.current_cell = this.current_cell.n;
            this.current_wall = this.S;
            this.direction = this.NW;
        } else if (this.current_cell.x % 2 == 1 && this.current_cell.links.has(this.current_cell.s)) {
            this.direction = this.SW;
            this.current_cell = this.current_cell.s;
            this.current_wall = this.N;
        }
    }

    turn(d) {
        this.direction += d;
        while (this.direction < 0) {
            this.direction += 6;
        }
        while (this.direction > 5) {
            this.direction -= 6;
        }
        if (
            this.direction == this.E &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.NE && 
            this.current_cell.links.has(this.current_cell.ne)
        ) {
            this.current_cell = this.current_cell.ne;
            this.current_wall = this.SW;
        } else if (
            this.direction == this.E &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall == this.SE && 
            this.current_cell.links.has(this.current_cell.se)
        ) {
            this.current_cell = this.current_cell.se;
            this.current_wall = this.NW;
        } else if (
            this.direction == this.NE &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.NE &&
            this.current_cell.links.has(this.current_cell.ne)
        ) {
            this.current_cell = this.current_cell.ne;
            this.current_wall = this.SW;
        } else if (
            this.direction == this.NE &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall == this.N &&
            this.current_cell.links.has(this.current_cell.n)
        ) {
            this.current_cell = this.current_cell.n;
            this.current_wall = this.S;
        } else if (
            this.direction == this.NW &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.NW &&
            this.current_cell.links.has(this.current_cell.nw)
        ) {
            this.current_cell = this.current_cell.nw;
            this.current_wall = this.SE;
        } else if (
            this.direction == this.NW &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall == this.N &&
            this.current_cell.links.has(this.current_cell.n)
        ) {
            this.current_cell = this.current_cell.n;
            this.current_wall = this.S;
        } else if (
            this.direction == this.W &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.NW &&
            this.current_cell.links.has(this.current_cell.nw)
        ) {
            this.current_cell = this.current_cell.nw;
            this.current_wall = this.SE;
        } else if (
            this.direction == this.W &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall == this.SW &&
            this.current_cell.links.has(this.current_cell.sw)
        ) {
            this.current_cell = this.current_cell.sw;
            this.current_wall = this.NE;
        } else if (
            this.direction == this.SW &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.S &&
            this.current_cell.links.has(this.current_cell.s)
        ) {
            this.current_cell = this.current_cell.s;
            this.current_wall = this.N;
        } else if (
            this.direction == this.SW &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall == this.SW &&
            this.current_cell.links.has(this.current_cell.sw)
        ) {
            this.current_cell = this.current_cell.sw;
            this.current_wall = this.NE;
        } else if (
            this.direction == this.SE &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.S &&
            this.current_cell.links.has(this.current_cell.s)
        ) {
            this.current_cell = this.current_cell.s;
            this.current_wall = this.N;
        } else if (
            this.direction == this.SE &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall == this.SE &&
            this.current_cell.links.has(this.current_cell.se)
        ) {
            this.current_cell = this.current_cell.se;
            this.current_wall = this.NW;
        }
    }

    move_forward() {
        if (
            this.direction == this.E &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall == this.SW &&
            this.current_cell.is_linked_to(this.current_cell.se)
        ) {
            this.current_cell = this.current_cell.se;
            this.current_wall = this.NW;
        } else if (
            this.direction == this.E &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.NW &&
            this.current_cell.is_linked_to(this.current_cell.ne)
        ) {
            this.current_cell = this.current_cell.ne;
            this.current_wall = this.SW;
        } else if (
            this.direction == this.NE &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall == this.SW &&
            this.current_cell.is_linked_to(this.current_cell.n)
        ) {
            this.current_cell = this.current_cell.n;
            this.current_wall = this.S;
        } else if (
            this.direction == this.NE &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.S &&
            this.current_cell.is_linked_to(this.current_cell.ne)
        ) {
            this.current_cell = this.current_cell.ne;
            this.current_wall = this.SW;
        } else if (
            this.direction == this.NW &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall == this.SE &&
            this.current_cell.is_linked_to(this.current_cell.n)
        ) {
            this.current_cell = this.current_cell.n;
            this.current_wall = this.S;
        } else if (
            this.direction == this.NW &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.S &&
            this.current_cell.is_linked_to(this.current_cell.nw)
        ) {
            this.current_cell = this.current_cell.nw;
            this.current_wall = this.SE;
        } else if (
            this.direction == this.W &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall == this.SE &&
            this.current_cell.is_linked_to(this.current_cell.sw)
        ) {
            this.current_cell = this.current_cell.sw;
            this.current_wall = this.NE;
        } else if (
            this.direction == this.W &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.NE &&
            this.current_cell.is_linked_to(this.current_cell.nw)
        ) {
            this.current_cell = this.current_cell.nw;
            this.current_wall = this.SE;
        } else if (
            this.direction == this.SW &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall ==  this.N &&
            this.current_cell.is_linked_to(this.current_cell.sw)
        ) {
            this.current_cell = this.current_cell.sw;
            this.current_wall = this.NE;
        } else if (
            this.direction == this.SW &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.NE &&
            this.current_cell.is_linked_to(this.current_cell.s)
        ) {
            this.current_cell = this.current_cell.s;
            this.current_wall = this.N; 
        } else if (
            this.direction == this.SE &&
            this.current_cell.x % 2 == 0 &&
            this.current_wall == this.N &&
            this.current_cell.is_linked_to(this.current_cell.se)
        ) {
            this.current_cell = this.current_cell.se;
            this.current_wall = this.NW;
        } else if (
            this.direction == this.SE &&
            this.current_cell.x % 2 == 1 &&
            this.current_wall == this.NW &&
            this.current_cell.is_linked_to(this.current_cell.s)
        ) {
            this.current_cell = this.current_cell.s; 
            this.current_wall = this.N;
        }
    }

    print_to_console() {
        let output_grid = [];
        var cx, cy, c;

        for (let z = 0; z < this.depth; z++) {
            console.log('');
            console.log('--------');
            console.log('LEVEL ' + z.toString());
            console.log('--------');
            console.log('');
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
                }
            }
    
            // erase walls where there are links. 
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    cx = (x * 2 + 2) + ((this.height - 1 - y + 1) * 2 - 2);
                    cy = this.height * 2 - 1 - (y * 2);
                    c = this.cells[z][y][x];
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
    }
    get_world(z) {
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
                c = this.cells[z][y][x];
                n = this.cells[z][y][x + 2];
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
                c = this.cells[z][y][x];
                n = this.cells[z][y + 1][x];
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
                c = this.cells[z][y][x];
                n = this.cells[z][y + 1][x + 2];
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
    
    render_to_svg_2d(svg, fuel, load, money, level) {
        const svgns = 'http://www.w3.org/2000/svg';

        svg.innerHTML = '';

        // triangle edge length.
        let h = Math.sqrt(1 + Math.pow(0.5, 2));

        var line, circle;

        var world = this.get_world(0);

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
        var outline = get_asteroid_outline(this.mask);
        for (let i = 0; i < outline.length; i++) {
            x1 = outline[i].ps.x;
            y1 = outline[i].ps.y;
            x2 = outline[i].pe.x;
            y2 = outline[i].pe.y;
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

        // draw current spot.
        x = this.current_cell.x;
        y = this.current_cell.y;
        x1 = ((x / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - y) / 2)) * h;
        y1 = ((this.height - 1) / 2) - y;

        // add offset for wall.
        if (this.current_wall == this.NE) {
            x1 += (0.25 * h);
        } else if (this.current_wall == this.N) {
            y1 -= 0.5;
        } else if (this.current_wall == this.NW) {
            x1 -= (0.25 * h);
        } else if (this.current_wall == this.SW) {
            x1 -= (0.25 * h);
        } else if (this.current_wall == this.S) {
            y1 += 0.5;
        } else if (this.current_wall == this.SE) {
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
        var deg_str = '0deg';
        if (this.direction == this.E) {
            deg_str = '0deg';
        } else if (this.direction == this.NE) {
            deg_str = '300deg';
        } else if (this.direction == this.NW) {
            deg_str = '240deg';
        } else if (this.direction == this.W) {
            deg_str = '180deg';
        } else if (this.direction == this.SW) {
            deg_str = '120deg';
        } else if (this.direction == this.SE) {
            deg_str = '60deg';
        }
 
        document.getElementById('ship').style.transform = 'rotate(' + deg_str + ')';

        var use;
        use = document.createElementNS(svgns, 'use');
        use.setAttribute('x', x1);
        use.setAttribute('y', y1);
        use.setAttribute('x', x1);
        use.setAttribute('y', y1);
        use.setAttribute('href', '#ship');
        svg.appendChild(use);

        // draw goal.
        if (this.goal_is_visible(world)) {
            x = this.goal_cell.x;
            y = this.goal_cell.y;
                
            x1 = ((x / 2) - (((this.width + this.height) / 2 - 1) / 2) + ((this.height - 1 - y) / 2)) * h;
            y1 = ((this.height - 1) / 2) - y;
    
            var circle;
            circle = document.createElementNS(svgns, 'circle');
            circle.setAttribute('cx', x1);
            circle.setAttribute('cy', y1);
            circle.setAttribute('stroke', 'none');
            circle.setAttribute('fill', 'white');
            circle.setAttribute('r', .1);
            svg.appendChild(circle);
        }

        //var asteroid = build_asteroid(1, 10, .1, .3)
        draw_message(svg, 'FUEL: ' + fuel, -9, -9, 0.5, true);
        draw_message(svg, 'LOAD: ' + load,  9, -9, 0.5, false);
        draw_message(svg, 'MONEY: ' + money, -9,  9, 0.5, true);
        draw_message(svg, 'LEVEL: ' + level,  9,  9, 0.5, false);
    }
}

module.exports = { TriMaze, get_costs, get_distances };
