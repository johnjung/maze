const assert = require('assert');
const maze = require('../maze');

function array_equals(a, b) {
    if (Array.isArray(a) && Array.isArray(b) && a.length == b.length) {
        return a.every((item, i) => item == b[i]);
    }
    return false;
}

describe('line_segment_intersection()', function() {
    it('parallel lines return false', function(done) {
        assert.equal(
            maze.line_segment_intersection(0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0),
            false
        );
        done();
    });
    it('perpendicular lines that cross return a coordinate', function(done) {
        assert.equal(
            array_equals(
                maze.line_segment_intersection(-1.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 1.0),
                [0, 0]
            ),
            true
        );
        done();
    });
    it('perpendicular lines that touch at an endpoint return false', function(done) {
        assert.equal(
            maze.line_segment_intersection(0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0),
            false
        );
        done();
    });
    it('non-perpendicular lines that cross return a coordinate', function(done) {
        assert.equal(
            array_equals(
                maze.line_segment_intersection(-1.0, -1.0, 1.0, 1.0, 0.0, -1.0, 0.0, 1.0),
                [0, 0]
            ),
            true
        );
        done();
    });
});

describe('split_panel()', function() {
    var a = maze.split_panel(
        [
            new maze.Panel(
                new maze.Point(-0.5, -0.5, 1.0),
                new maze.Point(-0.5, -0.5, 3.0),
                new maze.Point(-0.5,  0.5, 3.0),
                new maze.Point(-0.5,  0.5, 1.0),
            ),
            new maze.Panel(
                new maze.Point(-1.5, -0.5, 2.0),
                new maze.Point( 0.5, -0.5, 2.0),
                new maze.Point( 0.5,  0.5, 2.0),
                new maze.Point(-1.5,  0.5, 2.0),
            ),
        ],
        new maze.Panel(
            new maze.Point(-0.5, -0.5, 1.0),
            new maze.Point(-0.5, -0.5, 3.0),
            new maze.Point(-0.5,  0.5, 3.0),
            new maze.Point(-0.5,  0.5, 1.0),
        )
    );
    it('split panel in two', function(done) {
        assert.equal(a.length, 2);
        done();
    });
    var b = maze.split_panel(
        [
            new maze.Panel(
                new maze.Point(-0.5, -0.5, 1.0),
                new maze.Point(-0.5, -0.5, 4.0),
                new maze.Point(-0.5,  0.5, 4.0),
                new maze.Point(-0.5,  0.5, 1.0),
            ),
            new maze.Panel(
                new maze.Point(-1.5, -0.5, 2.0),
                new maze.Point( 0.5, -0.5, 2.0),
                new maze.Point( 0.5,  0.5, 2.0),
                new maze.Point(-1.5,  0.5, 2.0),
            ),
            new maze.Panel(
                new maze.Point(-1.5, -0.5, 3.0),
                new maze.Point( 0.5, -0.5, 3.0),
                new maze.Point( 0.5,  0.5, 3.0),
                new maze.Point(-1.5,  0.5, 3.0),
            ),
        ],
        new maze.Panel(
            new maze.Point(-0.5, -0.5, 1.0),
            new maze.Point(-0.5, -0.5, 4.0),
            new maze.Point(-0.5,  0.5, 4.0),
            new maze.Point(-0.5,  0.5, 1.0),
        )
    );
    it('split panel in three', function(done) {
        assert.equal(b.length, 3);
        done();
    });
});

describe('Panel()', function() {
    it('equals() is true for identical coordinates', function(done) {
        assert.equal(
            new maze.Panel(
                new maze.Point(-1.5, -0.5, 2.0),
                new maze.Point( 0.5, -0.5, 2.0),
                new maze.Point( 0.5,  0.5, 2.0),
                new maze.Point(-1.5,  0.5, 2.0)
            ).equals(
                new maze.Panel(
                    new maze.Point(-1.5, -0.5, 2.0),
                    new maze.Point( 0.5, -0.5, 2.0),
                    new maze.Point( 0.5,  0.5, 2.0),
                    new maze.Point(-1.5,  0.5, 2.0)
                )
            ),
            true
        );
        done();
    });
    it('equals() is true for out of order coordinates', function(done) {
        assert.equal(
            new maze.Panel(
                new maze.Point(-1.5, -0.5, 2.0),
                new maze.Point( 0.5, -0.5, 2.0),
                new maze.Point( 0.5,  0.5, 2.0),
                new maze.Point(-1.5,  0.5, 2.0)
            ).equals(
                new maze.Panel(
                    new maze.Point(-1.5, -0.5, 2.0),
                    new maze.Point( 0.5,  0.5, 2.0),
                    new maze.Point( 0.5, -0.5, 2.0),
                    new maze.Point(-1.5,  0.5, 2.0)
                )
            ),
            true
        );
        done();
    });
    it('equals() is false for non-equal panels', function(done) {
        assert.equal(
            new maze.Panel(
                new maze.Point(-1.5, -0.5, 2.0),
                new maze.Point( 0.5, -0.5, 2.0),
                new maze.Point( 0.5,  0.5, 2.0),
                new maze.Point(-1.5,  0.5, 2.0)
            ).equals(
                new maze.Panel(
                    new maze.Point(-1.5, -0.5, 2.0),
                    new maze.Point( 1.5, -0.5, 2.0),
                    new maze.Point( 1.5,  0.5, 2.0),
                    new maze.Point(-1.5,  0.5, 2.0)
                )
            ),
            false
        );
        done();
    });
    it('get_line() returns correct coordinates', function(done) {
        var l = new maze.Panel(
            new maze.Point(-1.5, -0.5, 2.0),
            new maze.Point( 0.5, -0.5, 2.0),
            new maze.Point( 0.5,  0.5, 2.0),
            new maze.Point(-1.5,  0.5, 2.0)
        ).get_line();
        assert.equal(array_equals(l[0], [0.5, 2.0]), true);
        assert.equal(array_equals(l[1], [-1.5, 2.0]), true);
        done();
    });
});
