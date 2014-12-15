/**
 * Point instance
 * 
 * @param {double} x
 * @param {double} y
 * 
 * @returns {Point}
 */
function Point(x, y)
{
    this.x = x;
    this.y = y;

    /**
     * @param {Point} point
     * 
     * @returns {double}
     */
    this.distanceTo = function(point)
    {
        var x2 = (point.x - this.x) * (point.x - this.x);
        var y2 = (point.y - this.y) * (point.y - this.y);

        return Math.sqrt(x2 + y2);
    };

    /**
     * @param {Point} point
     * 
     * @returns {Point}
     */
    this.add = function(point)
    {
        return new Point(this.x + point.x, this.y + point.y);
    };

    /**
     * @param {Point} point
     * 
     * @returns {Point}
     */
    this.sub = function(point)
    {
        return new Point(this.x - point.x, this.y - point.y);
    };

    /**
     * @param {double} coef
     * 
     * @returns {Point}
     */
    this.mul = function(coef)
    {
        return new Point(this.x * coef, this.y * coef);
    };

    /**
     * Return a middle point between this and point.
     * Set coef between 0 and 1.
     * 0.5 is the middle, near 0 is near this point,
     * and near 1 is near point.
     * 
     * @param {Point} point
     * @param {double} coef (default to 0.5)
     * 
     * @returns {Point}
     */
    this.middle = function(point, coef)
    {
        if (undefined === coef) {
            coef = 0.5;
        }

        return point.sub(this).mul(coef).add(this);
    };
}

/**
 * Path instance.
 * Contains many points and can calculate a position
 * from a percentage of total path accomplished.
 * 
 * @param {Point[]} points
 * 
 * @returns {Path}
 */
function Path(points)
{
    /**
     * Number of points
     * 
     * @type {integer}
     */
    var _length = points.length;

    /**
     * Number of points
     * 
     * @type {integer}
     */
    this.length = _length;

    /**
     * Distance from origin to destination
     * 
     * @type {double}
     */
    var _distance;

    /**
     * Distance of each segments
     * 
     * @type {double[]}
     */
    var _distances;

    /**
     * Distance of each point to the origin.
     * The first is 0.
     * 
     * @type {double[]}
     */
    var _distanceToOrigin;

    /**
     * Percent of path of each point from the origin.
     * The first is 0.
     * 
     * @type {double[]}
     */
    var _coef;

    /**
     * Constructor
     * 
     * Prepare values
     */
    var construct = function()
    {
        _distances = [];
        _distanceToOrigin = [];
        _coef = [];
        _distance = 0;

        if (_length < 2) {
            console.warn('Cannot create a path with less than 2 points');
            return;
        }

        for (var i = 1; i < _length; i++) {
            var d = points[i - 1].distanceTo(points[i]);

            _distanceToOrigin[i - 1] = _distance;
            _distance += d;
            _distances[i - 1] = d;
        }

        _distanceToOrigin[_length - 1] = _distance;

        for (var i = 0; i < _length; i++) {
            _coef[i] = _distanceToOrigin[i] / _distance;
        }
    };

    /**
     * Get position of an item
     * when it is at x percent of path.
     * 
     * @param {double} coef in [0;1]
     * 
     * @returns {Point}
     */
    this.getPosition = function(coef)
    {
        if (coef > 1) {
            console.error('coef cannot be > 1');
            return null;
        }

        if (0 == coef) {
            return points[0];
        }

        if (1 == coef) {
            return points[_length - 1];
        }

        var i = 0;

        while (_coef[++i] < coef)
            ;

        var p0 = points[i - 1];
        var p1 = points[i];

        var localCoef = (coef - _coef[i - 1]) / (_coef[i] - _coef[i - 1]);

        return p0.middle(p1, localCoef);
    };

    this.info = function()
    {
        console.log('Path');
        console.log('  length   = ' + _length);
        console.log('  distance = ' + _distance);

        console.log('  Points: ');

        for (var i = 0; i < _length; i++) {
            console.log('    p[' + i + '] (' + points[i].x + ' ; ' + points[i].y + ')');
            console.log('      coef = ' + _coef[i]);
            console.log('      distToOrigin = ' + _distanceToOrigin[i]);
            console.log('      distToNextPoint = ' + _distances[i]);
        }
    };

    // Init object
    construct();
}

/**
 * Boat instance.
 * Contains image source, image dimensions,
 * and can navigate to a point on the path.
 * 
 * @param {string} path
 * @param {string} imgSrc
 * 
 * @returns {Boat}
 */
function Boat(path, imgSrc)
{
    var _this = this;

    var dimensions;
    
    /**
     * @type Point
     */
    var position;

    /**
     * @type {jQuery}
     */
    var $boat;

    var construct = function ()
    {
        if (!path) {
            console.warn('A boat cannot be instanciated without path');
            return;
        }

        if (!imgSrc) {
            imgSrc = 'img/default.png';
        }

        $boat = $('<img class="boat">');

        var image = new Image();

        image.onload = function () {
            dimensions = {
                width: this.width,
                height: this.height
            };

            $boat.attr('src', imgSrc);

            _this.move(0.0);
        };

        image.src = imgSrc;
    };

    this.move = function (coef)
    {
        position = path.getPosition(coef).sub(new Point(
            dimensions.width / 2,
            dimensions.height / 2
        ));

        $boat.css({
            left: position.x + 'px',
            top: position.y + 'px'
        });
    };

    this.navigate = function (coef)
    {
        position = path.getPosition(coef).sub(new Point(
            dimensions.width / 2,
            dimensions.height / 2
        ));

        _this.animate({
            left: position.x + 'px',
            top: position.y + 'px'
        });
    };

    /**
     * @returns {jQuery}
     */
    this.getBoatItem = function()
    {
        return $boat;
    };

    /**
     * @returns {Point}
     */
    this.getPosition = function()
    {
        return position;
    };

    // Init instance
    construct();
}

var Poseidon =
{
    seaPath: undefined,
    
    boats: [],
    
    waveCycle: 0,
    
    /**
     * @type {jQuery}
     */
    $waves: undefined,
    
    createWaves: function (power)
    {
        Poseidon.waveCycle = 0;

        var callbackWave = function ()
        {
            Poseidon.waveCycle++;
            Poseidon.waveCycle %= 4;
            
            var point;
            
            switch (Poseidon.waveCycle) {
                case 0: point = new Point(power * 0, power * 0); break;
                case 1: point = new Point(power * 3, power * 1); break;
                case 2: point = new Point(power * 3, power * 0); break;
                case 3: point = new Point(power * 0, power * 1); break;
            }

            Poseidon.$waves.animate({
                left: point.x + 'px',
                top: point.y + 'px'
            }, 1200, 'easeInOutSine', callbackWave);
        };
        
        callbackWave();
    },
    
    blowBoat: function (boat, toCoef)
    {
        
    }
};
