$(function () {
    init();
    initPath();
    initBoats();
    initUI();
    start();
});

function init() {
    Poseidon.$waves = $('#waves');
}

function initPath() {
    Poseidon.seaPath = new Path([
        new Point(166, 250),
        new Point(150, 322),
        new Point(175, 360),
        new Point(258, 405),
        new Point(281, 452),
        new Point(253, 484),
        new Point(177, 536),
        new Point(161, 575),
        new Point(180, 618),
        new Point(317, 731),
        new Point(602, 896),
        new Point(681, 917),
        new Point(799, 887),
        new Point(846, 854),
        new Point(883, 773),
        new Point(910, 724),
        new Point(950, 710),
        new Point(986, 748),
        new Point(1026, 734),
        new Point(1032, 678),
        new Point(998, 619),
        new Point(940, 571),
        new Point(941, 479),
        new Point(977, 424),
        new Point(1024, 415),
        new Point(1072, 443),
        new Point(1115, 427),
        new Point(1151, 385),
        new Point(1188, 324)
    ]);
}

function initBoats() {
    var boatImg = [
        'img/pirate-boat-1.png',
        'img/pirate-boat-2.png',
        'img/pirate-boat-4.png',
        'img/pirate-boat-3.png',
        'img/default.png'
    ];
    
    for (var i = 0; i < Config.boatsNumber; i++) {
        Poseidon.addBoat(boatImg[i]);
    }
}

function initUI() {
    $('#ui .team').each(function () {
        var $team = $(this);
        var $btnMore = $team.find('.more');
        var $btnLess = $team.find('.less');
        var boat = parseInt($team.data('boat'));
        
        $btnMore.click(function () {
            Score.update(boat, 1);
        });
        
        $btnLess.click(function () {
            Score.update(boat, -1);
        });
    });
}

function start() {
    Poseidon.createWaves(4);
    
    setTimeout(function () {
        Persister.load();
        Persister.autoSave();
    }, 1000);
}
