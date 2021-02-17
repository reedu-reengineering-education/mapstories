// editor.js
//
// Requires jquery and http://momentjs.com

Array.prototype.remove = function(item) {
    for(var i = this.length; i--;) {
        if(this[i] === item) {
            this.splice(i, 1);
        }
    }
};

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

if (!Object.keys) {
    Object.keys = function (object) {
        var keys = [];

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
    }
}

function debug() {
    if(console && console.log) {
        // converts arguments to real array
        var args = Array.prototype.slice.call(arguments);
        args.unshift('**');
        console.log.apply(console, args); // call the function
    }
}

function parseQueryString() {
    var nvpair = {};
    var qs = window.location.search.replace('?', '');
    var pairs = qs.split('&');
    
    for(var i = 0, p; i < pairs.length;i++) {
        p = pairs[i].split('=');
        nvpair[p[0]] = p[1];
    }
    return nvpair;
}

function getScriptPath(scriptname) {
    var scriptTags = document.getElementsByTagName('script');

    for(var i = 0; i < scriptTags.length; i++) {
        if(scriptTags[i].src.match(scriptname)) {
            script_path = scriptTags[i].src;          
            return script_path.split('?')[0].split('/').slice(0, -1).join('/');
        }
    }
    return '';
}

function format_dt(dt_string) {
    var m = moment(dt_string);
    return m.format('DD.MM.YYYY')+' um '+m.format('HH:MM') + ' Uhr';
}

//
// ajax
//

function noop() {}

function _ajax(url, type, data, on_error, on_success, on_complete) {
    var _error = '';
    var _error_detail = '';
    
    $.ajax({
        url: url,
        type: type,
        data: data,
        cache: false,
        dataType: 'json',
        timeout: 45000, // ms
        error: function(xhr, status, err) { 
            _error = err || status;
            debug('ajax error', _error)           
            on_error(_error);
        },
        success: function(data) {
            debug('ajax data', data);
            if(data.error) {
                _error = data.error;
                _error_detail = data.error_detail || '';
                on_error(_error, _error_detail);
            } else {
                on_success(data);
            }
        },
        complete: function() {
            on_complete(_error, _error_detail);
        }
    });
}

function ajax_get(url, data, on_error, on_success, on_complete) {
    _ajax(url, 'GET', data, on_error, on_success || noop, on_complete || noop);
}

function ajax_post(url, data, on_error, on_success, on_complete) {
    _ajax(url, 'POST', data, on_error, on_success || noop, on_complete || noop);
}


function format_error(msg, err) {
    var message = msg;
    if(err) {
        if(err.hasOwnProperty('message')) {
            message += ': ' + err.message;
        } else {
            message += ': ' + err;
        }    
    }
    return message;
}

function format_navigator_info() {
    return ''
        + 'appCodeName: '+navigator.appCodeName+'\n'
        + 'appName: '+navigator.appName+'\n'
        + 'appVersion: '+navigator.appVersion+'\n'
        + 'platform: '+navigator.platform+'\n'
        + 'userAgent: '+navigator.userAgent+'\n';
}

function format_report_link(subject, error_msg, error_stack) {
    var subject = 'StoryMapJS Editor Report ('+subject+')';
    var body = 'Please describe what you were doing when this error occurred:\n\n\n'
            + '---DIAGNOSTICS---\n'
            + error_msg+'\n'
            + '\n'
            + format_navigator_info()
            + '\n'
            + error_stack+'\n';
    
    var link = 'mailto:support@knightlab.zendesk.com?'
        + 'subject='+encodeURIComponent(subject)
        + '&body='+encodeURIComponent(body);

    return '<p><a class="report" href="'+link+'">Report this error to the Knight Lab</a></p>';
}

function show_error(msg, err) { 
    var message = msg;
    
    if(err) {
        if(err.hasOwnProperty('message')) {
            message += ': ' + err.message;
        } else {
            message += ': ' + err;
        }
        
        if(err.hasOwnProperty('stack')) {
            message += format_report_link(msg, message, err.stack);
        }
    }
    
    hide_progress();
    $('#error_modal .modal-msg').html(message);
    $('#error_modal').modal('show');
}

function hide_error() {
    $('#error_modal').modal('hide');
}

function show_progress(msg) {
    hide_error();
    $('#progress_modal .modal-msg').html(msg);
    $('#progress_modal').modal('show');
}

function hide_progress() {
    $('#progress_modal').modal('hide');
}

function show_confirm(msg, callback) {
    $('#confirm_modal .modal-msg').html(msg);
    $('#confirm_modal .btn-primary').one('click.confirm', function(event) {
        $('#confirm_modal').modal('hide');
        if(callback) {
            callback();
        }
    });
    $('#confirm_modal').modal('show');
}

function show_message(msg, callback) {
    hide_progress();
    
    $('#message_modal .modal-msg').html(msg);
    $('#message_modal .btn').bind('click.confirm', function(event) {
        $(this).unbind('click.confirm');
        $('#message_modal').modal('hide');
        if(callback) {
            callback();
        }
    });
    $('#message_modal').modal('show');
}

function show_message_report(msg, detail, callback) {
    detail = (detail || '')+'\nurl = '+document.location.href+'\n';
    var message = msg + format_report_link(msg, msg, detail);        
    show_message(message, callback);
}


//
// on load
//
$(function() {   
    // handle popover hiding
    $('a.help').popover({
        trigger: 'manual'
    }).click(function(event) {
        if(!$(this).next().hasClass('popover')) {
            $('a.help').not(this).popover('hide');
        }     
        $(this).popover('toggle');
        event.stopPropagation();
        event.preventDefault();
    });

    $(document).click(function(e) {
        $('a.help').popover('hide');
    });
});


