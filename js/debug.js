/**
 * Debug function to display path.
 * Call it again to remove path.
 * Call it again to re-display path.
 * Call it again to re-remove path.
 * Call it again to re-display one more time if you are not sure the last times.
 * And so on...
 */
function displayMainPath() {
    if ($('.main-path-debug').size()) {
        $('.main-path-debug').remove();
        return;
    }
    
    for (var i = 0; i <= 1.0; i += 0.0025) {
        var $p = $('<p class="main-path-debug">.</p>');
        var pos = Poseidon.seaPath.getPosition(i);
        
        $p.css({
            position: 'absolute',
            left: pos.x+'px',
            top: pos.y+'px'
        });
        
        $('#container').append($p);
    }
}

/**
 * Use it to trace a path with mouse.
 */
function logClicks() {
    $('#sea').click(function (e) {
        var origin = $('#sea').position();
        var p = new Point(e.pageX - origin.left, e.pageY - origin.top);
        console.log('new Point('+p.x+', '+p.y+'),');
    });
}
